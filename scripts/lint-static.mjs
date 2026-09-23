#!/usr/bin/env node
/*
	lint-static.mjs — dependency-free hygiene checks for the static site.

	Run with `npm run lint`. Catches unbalanced block tags, oversized page
	assets, insecure http:// references, and SEO metadata that has drifted
	out of the useful length range.
*/

import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { pageAssetRefs } from './asset-refs.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index.html', 'bn.html'];
const BALANCED_TAGS = ['html', 'head', 'body', 'header', 'main', 'footer', 'section', 'div', 'nav', 'ul', 'table', 'figure', 'article'];
const MAX_ASSET_BYTES = 1_500_000;

const problems = [];
const warn = (msg) => problems.push(msg);

const read = (rel) => readFileSync(join(root, rel), 'utf8');

/* Strip comments so the dormant template markup is not linted. */
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

for (const rel of PAGES) {
	if (!existsSync(join(root, rel))) {
		warn(`${rel}: missing`);
		continue;
	}
	const raw = read(rel);
	const html = stripComments(raw);

	for (const tag of BALANCED_TAGS) {
		const open = (html.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
		const close = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
		if (open !== close)
			warn(`${rel}: <${tag}> opened ${open}x but closed ${close}x`);
	}

	const title = html.match(/<title>([\s\S]*?)<\/title>/);
	if (!title) warn(`${rel}: no <title>`);
	else if (title[1].length > 110)
		warn(`${rel}: <title> is ${title[1].length} chars (keep under 110)`);

	const description = html.match(/<meta name="description" content="([^"]*)"/);
	if (!description) warn(`${rel}: no meta description`);
	else if (description[1].length < 70)
		warn(`${rel}: meta description is only ${description[1].length} chars`);

	for (const m of html.match(/(?:src|href)="http:\/\/[^"]*"/g) || [])
		warn(`${rel}: insecure reference ${m}`);

	/* Referenced local assets (including those named by stylesheets) must be
	   small enough for a slow connection. */
	for (const ref of pageAssetRefs(root, rel, raw).keys()) {
		const file = join(root, ref);
		if (!existsSync(file)) continue;
		const bytes = statSync(file).size;
		if (bytes > MAX_ASSET_BYTES)
			warn(`${rel}: ${ref} is ${(bytes / 1e6).toFixed(1)} MB (limit ${MAX_ASSET_BYTES / 1e6} MB)`);
	}
}

if (problems.length > 0) {
	console.error(`lint-static: ${problems.length} problem(s)`);
	for (const p of problems) console.error(`  - ${p}`);
	process.exit(1);
}
console.log('lint-static: all checks passed');

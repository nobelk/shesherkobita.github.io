/*
	asset-refs.mjs — collect every local file a page pulls in: src / href /
	srcset / poster attributes, url() in inline styles, and, recursively,
	@import and url() inside every local stylesheet the page links. CSS paths
	resolve relative to the stylesheet that names them.
*/

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const REMOTE = /^(https?:|mailto:|tel:|data:|#|\/\/|javascript:)/i;

export const stripHtmlComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');
const stripCssComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const clean = (value) => value.trim().replace(/^['"]|['"]$/g, '').split(/[?#]/)[0];

function cssRefs(css) {
	const out = [];
	const re = /@import\s+(?:url\()?\s*(['"]?)([^'")\s;]+)\1\s*\)?|url\(\s*(['"]?)([^'")]+)\3\s*\)/g;
	let m;
	while ((m = re.exec(css)) !== null) out.push(m[2] || m[4]);
	return out;
}

/*
	Returns Map<repo-relative path, referrer> for one page. `root` is the repo
	root, `rel` the page path, `html` its source.
*/
export function pageAssetRefs(root, rel, html) {
	const refs = new Map();
	const body = stripHtmlComments(html);
	const pageDir = dirname(rel);
	const add = (value, fromDir, referrer) => {
		if (!value || REMOTE.test(value.trim())) return null;
		const path = normalize(join(fromDir, clean(value)));
		if (!refs.has(path)) refs.set(path, referrer);
		return path;
	};

	const attrRe = /\b(src|href|poster)\s*=\s*"([^"]*)"/gi;
	let m;
	while ((m = attrRe.exec(body)) !== null) add(m[2], pageDir, rel);

	for (const [, list] of body.matchAll(/\bsrcset\s*=\s*"([^"]*)"/gi))
		for (const candidate of list.split(','))
			add(candidate.trim().split(/\s+/)[0], pageDir, rel);

	for (const [, style] of body.matchAll(/\bstyle\s*=\s*"([^"]*)"/gi))
		for (const value of cssRefs(style)) add(value, pageDir, rel);

	const queue = [];
	for (const [tag] of body.matchAll(/<link\b[^>]*>/gi)) {
		if (!/\brel\s*=\s*"stylesheet"/i.test(tag)) continue;
		const href = tag.match(/\bhref\s*=\s*"([^"]*)"/i);
		const path = href && add(href[1], pageDir, rel);
		if (path) queue.push(path);
	}

	const seen = new Set();
	while (queue.length > 0) {
		const sheet = queue.shift();
		if (seen.has(sheet) || !existsSync(join(root, sheet))) continue;
		seen.add(sheet);
		const css = stripCssComments(readFileSync(join(root, sheet), 'utf8'));
		for (const value of cssRefs(css)) {
			const path = add(value, dirname(sheet), sheet);
			if (path && path.endsWith('.css')) queue.push(path);
		}
	}
	return refs;
}

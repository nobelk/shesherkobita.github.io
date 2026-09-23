#!/usr/bin/env node
/*
	verify-site.mjs — dependency-free structural checks for the static site.

	Run with `npm test`. Checks that every local asset referenced by the HTML
	pages exists, that in-page anchors resolve, that the English and Bengali
	pages stay in sync (hreflang, canonical, contact details, nav sections),
	that every proposal, concept and flyer image is used on both pages, that no
	template filler survives, and that sitemap.xml points only at real files.
*/

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { pageAssetRefs, stripHtmlComments } from './asset-refs.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://shesherkobita.com';
const CONTACT_EMAIL = 'shesherkobita38@gmail.com';
const PAGES = [
	{ file: 'index.html', lang: 'en', canonical: `${SITE}/`, alternate: 'bn.html' },
	{ file: 'bn.html', lang: 'bn', canonical: `${SITE}/bn.html`, alternate: 'index.html' }
];

/* Every file in these folders must be shown on both pages. */
const IMAGE_DIRS = ['images/pp', 'images/concept', 'images/flyers'];
/* Strings that only appear if template demo content leaked into a page. */
const TEMPLATE_LEFTOVERS = [
	'southtemplate', 'Lorem', 'Suspendisse', 'Los Angeles', 'img/bg-img', 'img/core-img',
	'maps.googleapis.com', 'preloader', 'plugins.js', 'classy-nav.min.js', 'document.write'
];
/* Stable phrases from the two disclaimers each page must keep. */
const DISCLAIMERS = {
	en: ['Authoritative citations will be appended', 'subject to final design approval'],
	bn: ['তথ্যসূত্র প্রসঙ্গে', 'অনুমোদন সাপেক্ষে পরিবর্তনযোগ্য']
};

const failures = [];
const fail = (msg) => failures.push(msg);

const read = (rel) => readFileSync(join(root, rel), 'utf8');

/* Collect every attribute value of the given names. */
function attrValues(html, attrs) {
	const out = [];
	const re = new RegExp(`\\b(?:${attrs.join('|')})\\s*=\\s*"([^"]*)"`, 'gi');
	let m;
	while ((m = re.exec(html)) !== null) out.push(m[1]);
	return out;
}

function ids(html) {
	return new Set(attrValues(html, ['id']));
}

for (const page of PAGES) {
	const rel = page.file;
	if (!existsSync(join(root, rel))) {
		fail(`${rel}: missing`);
		continue;
	}
	const html = read(rel);

	/* Language and canonical wiring. */
	if (!new RegExp(`<html lang="${page.lang}"`).test(html))
		fail(`${rel}: <html lang="${page.lang}"> not found`);
	if (!html.includes(`<link rel="canonical" href="${page.canonical}" />`))
		fail(`${rel}: canonical is not ${page.canonical}`);
	for (const hl of ['en', 'bn', 'x-default']) {
		if (!new RegExp(`rel="alternate" hreflang="${hl}"`).test(html))
			fail(`${rel}: missing hreflang="${hl}" alternate`);
	}
	if (!html.includes(`href="${page.alternate}"`))
		fail(`${rel}: no in-page link to its ${page.alternate} counterpart`);

	/* Contact details must match the project proposal. */
	if (!html.includes(`mailto:${CONTACT_EMAIL}`))
		fail(`${rel}: contact email ${CONTACT_EMAIL} not linked`);
	if (/shesherkobita\.contact@gmail\.com/.test(html))
		fail(`${rel}: stale contact address shesherkobita.contact@gmail.com still present`);

	/* Every local asset resolves, including files pulled in by stylesheets. */
	const refs = pageAssetRefs(root, rel, html);
	for (const [target, referrer] of refs) {
		if (!existsSync(join(root, target)))
			fail(`${rel}: ${referrer} references missing file ${target}`);
	}

	/* Every proposal, concept and flyer image is used. */
	for (const dir of IMAGE_DIRS) {
		for (const name of readdirSync(join(root, dir))) {
			if (name.startsWith('.')) continue;
			if (!refs.has(`${dir}/${name}`)) fail(`${rel}: ${dir}/${name} is not used`);
		}
	}

	/* No template demo content, and the CC BY credit stays visible. */
	const live = stripHtmlComments(html);
	for (const needle of TEMPLATE_LEFTOVERS) {
		if (live.includes(needle)) fail(`${rel}: template leftover "${needle}"`);
	}
	if (!/<a\b[^>]*href="https:\/\/colorlib\.com\/?"/.test(live))
		fail(`${rel}: Colorlib template credit link missing`);

	/* Both disclaimers survive. */
	for (const phrase of DISCLAIMERS[page.lang]) {
		if (!live.includes(phrase)) fail(`${rel}: disclaimer text "${phrase}" missing`);
	}

	/* Bengali fragments on the English page are marked for screen readers. */
	if (page.lang === 'en') {
		for (const [tag] of live.matchAll(/<[a-z0-9]+\b[^>]*\bclass="(?:[^"]*\s)?bn(?:\s[^"]*)?"[^>]*>/gi)) {
			if (!/\blang="bn"/.test(tag)) fail(`${rel}: .bn element without lang="bn" — ${tag.slice(0, 80)}`);
		}
	}

	/* Every in-page anchor resolves. */
	const pageIds = ids(html);
	for (const value of attrValues(html, ['href'])) {
		if (!value.startsWith('#') || value === '#') continue;
		if (!pageIds.has(value.slice(1)))
			fail(`${rel}: anchor ${value} has no matching id`);
	}

	/* Every image carries alt text. */
	for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
		if (!/\balt\s*=\s*"/.test(tag))
			fail(`${rel}: <img> without alt — ${tag.slice(0, 90)}`);
	}

	/* JSON-LD parses. */
	for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []) {
		const json = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
		try {
			JSON.parse(json);
		} catch (err) {
			fail(`${rel}: JSON-LD does not parse — ${err.message}`);
		}
		/* Site URLs in structured data point at real files. */
		for (const [url] of json.matchAll(/https:\/\/shesherkobita\.com\/[^"#\s]*/g)) {
			const path = url.slice(`${SITE}/`.length);
			if (path && !existsSync(join(root, path)))
				fail(`${rel}: JSON-LD URL ${url} does not resolve to a file`);
		}
	}
}

/* Nav parity: both pages expose the same section ids in the same order. */
const navIds = PAGES.map((page) => {
	const html = existsSync(join(root, page.file)) ? read(page.file) : '';
	const nav = html.match(/<nav id="nav"[^>]*>([\s\S]*?)<\/nav>/);
	return nav ? (nav[1].match(/href="#([a-z]+)"/g) || []).join(',') : '';
});
PAGES.forEach((page, i) => {
	if (!navIds[i]) fail(`${page.file}: <nav id="nav"> has no section links`);
});
if (navIds[0] !== navIds[1])
	fail(`nav sections differ between index.html (${navIds[0]}) and bn.html (${navIds[1]})`);

/* Sitemap: well-formed enough, and every local URL exists. */
const sitemap = read('sitemap.xml');
for (const loc of sitemap.match(/<(?:image:)?loc>([^<]+)<\/(?:image:)?loc>/g) || []) {
	const url = loc.replace(/<[^>]+>/g, '');
	if (!url.startsWith(`${SITE}/`)) {
		fail(`sitemap.xml: unexpected host in ${url}`);
		continue;
	}
	const path = url.slice(`${SITE}/`.length) || 'index.html';
	if (!existsSync(join(root, path)))
		fail(`sitemap.xml: ${url} does not resolve to a file`);
}
for (const page of PAGES) {
	const expected = page.file === 'index.html' ? `${SITE}/` : `${SITE}/${page.file}`;
	if (!sitemap.includes(`<loc>${expected}</loc>`))
		fail(`sitemap.xml: missing <loc> for ${expected}`);
}

if (failures.length > 0) {
	console.error(`verify-site: ${failures.length} problem(s)`);
	for (const f of failures) console.error(`  - ${f}`);
	process.exit(1);
}
console.log('verify-site: all checks passed');

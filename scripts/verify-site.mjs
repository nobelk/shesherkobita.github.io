import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'styles.css'), 'utf8');

const expectations = [
  'meta name="viewport"',
  'id="concept"',
  'id="gallery"',
  'id="facilities"',
  'id="wellbeing"',
  'id="contact"',
  'Village serenity',
  'Dhaka proximity and modern healthcare',
  'Organic food',
  'Activities',
  'Worship access near the mosque',
  'shesherkobita@gmail.com',
  'img/shesher_kobita_design1.png',
  'img/shesher_kobita_design2.png',
  'img/shesher_kobita_logo.png'
];

for (const snippet of expectations) {
  if (!html.includes(snippet)) {
    throw new Error(`Missing required HTML content: ${snippet}`);
  }
}

const responsiveSignals = [
  '@media (max-width: 1100px)',
  '@media (max-width: 840px)',
  '@media (max-width: 520px)',
  'grid-template-columns',
  'aspect-ratio: 4 / 3',
  'object-fit: cover',
  'clamp('
];

for (const snippet of responsiveSignals) {
  if (!css.includes(snippet)) {
    throw new Error(`Missing responsive CSS signal: ${snippet}`);
  }
}

for (const asset of [
  'img/shesher_kobita_logo.png',
  'img/shesher_kobita_design1.png',
  'img/shesher_kobita_design2.png'
]) {
  if (!existsSync(join(root, asset))) {
    throw new Error(`Missing expected asset: ${asset}`);
  }
}

const sectionCount = [...html.matchAll(/<section\b/g)].length;
if (sectionCount < 5) {
  throw new Error(`Expected at least 5 sections, found ${sectionCount}`);
}

console.log('PASS verify-site: required content, assets, and responsive CSS hooks are present.');

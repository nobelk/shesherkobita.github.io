import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const files = ['index.html', 'styles.css', 'scripts/verify-site.mjs', 'scripts/lint-static.mjs'];

for (const file of files) {
  const text = readFileSync(join(process.cwd(), file), 'utf8');
  const lines = text.split(/\n/);

  lines.forEach((line, index) => {
    if (/\t/.test(line)) {
      throw new Error(`${file}:${index + 1} contains a tab character`);
    }

    if (/\s+$/.test(line)) {
      throw new Error(`${file}:${index + 1} contains trailing whitespace`);
    }
  });
}

const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
const imgTags = [...html.matchAll(/<img\b[^>]*alt="([^"]+)"[^>]*>/g)];

if (imgTags.length < 3) {
  throw new Error(`Expected at least 3 images with alt text, found ${imgTags.length}`);
}

if (/TODO|FIXME/.test(html)) {
  throw new Error('index.html still contains TODO/FIXME markers');
}

console.log('PASS lint-static: formatting, alt text, and basic content hygiene checks passed.');

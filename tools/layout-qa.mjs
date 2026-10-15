import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  if (entry.name === '.git') return [];
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});
const htmlFiles = walk(root).filter(file => file.endsWith('.html'));
const errors = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('assets/css/layout-refinement.css')) errors.push(`${path.relative(root, file)}: missing layout refinement stylesheet`);
}

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const featured = [...home.matchAll(/<a class="panel tool" href="[^"]+"><h3>[^<]+<\/h3><p>([^<]+)<\/p><\/a>/g)].map(match => match[1]);
if (featured.length !== 8) errors.push(`index.html: expected 8 featured calculator cards, found ${featured.length}`);
if (featured.some(text => text === 'Open the production calculator.')) errors.push('index.html: generic featured calculator copy remains');
if (new Set(featured).size !== featured.length) errors.push('index.html: duplicate featured calculator descriptions');

const postPress = fs.readFileSync(path.join(root, 'tools', 'post-press-finishing.html'), 'utf8');
const postPressCards = [...postPress.matchAll(/<a class="panel tool" href="[^"]+"><h2>[^<]+<\/h2><p>([^<]+)<\/p><\/a>/g)].map(match => match[1]);
if (postPressCards.length !== 8) errors.push(`post-press-finishing.html: expected 8 cards, found ${postPressCards.length}`);
if (postPressCards.some(text => text === 'Open the focused planning tool.')) errors.push('post-press-finishing.html: generic card copy remains');
if (new Set(postPressCards).size !== postPressCards.length) errors.push('post-press-finishing.html: duplicate card descriptions');

const badgeUrls = ['kittylaunch.com/p/print-production-lab', 'sellwithboost.com', 'twelve.tools', 'findly.tools/printproductionlab'];
for (const url of badgeUrls) if (!home.includes(url)) errors.push(`index.html: owner-managed badge missing: ${url}`);

const refinement = fs.readFileSync(path.join(root, 'assets/css/layout-refinement.css'), 'utf8');
if (!/@media\s*\(min-width:\s*769px\)\s*and\s*\(max-width:\s*935px\)\s*\{\s*\.footer \.footer-inner\s*\{\s*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)\s*!important/.test(refinement)) {
  errors.push('Missing scoped tablet footer reflow; preserve the 768px mobile boundary');
}
const inbound = new Map(htmlFiles.map(file => [path.resolve(file), new Set()]));
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8'), ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${path.relative(root, file)}: duplicate IDs`);
  const route = '/' + path.relative(root, file).replaceAll('\\', '/');
  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const url = new URL(match[2], 'https://printproductionlab.com' + route);
    if (url.origin !== 'https://printproductionlab.com') continue;
    let target = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) errors.push(`${path.relative(root, file)}: broken ${match[1]} ${match[2]}`);
    if (match[1] === 'href' && file !== target && inbound.has(target)) inbound.get(target).add(file);
  }
}
const orphans = [...inbound].filter(([file, sources]) => !sources.size && !['index.html', '404.html'].includes(path.relative(root, file)));
// Explicit baseline debt, not a zero-orphan assertion or part of the footer fix.
const knownOrphans = new Set(['reference/binding-page-count.html']);
for (const [file] of orphans) {
  const name = path.relative(root, file).replaceAll('\\', '/');
  if (knownOrphans.has(name)) console.warn(`KNOWN ISSUE: ${name}: pre-existing orphan; separate discovery-link repair needed`);
  else errors.push(`${name}: new/unreviewed orphan page`);
}

if (errors.length) {
  console.error(`LAYOUT QA FAIL\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`LAYOUT QA PASS with ${orphans.length} explicit baseline orphan: ${htmlFiles.length} HTML pages, scoped footer breakpoint, unique IDs, local links/assets; homepage/Post-Press cards and owner badges verified`);


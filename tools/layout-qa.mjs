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

if (errors.length) {
  console.error(`LAYOUT QA FAIL\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`LAYOUT QA PASS: ${htmlFiles.length} HTML pages use the shared refinement; homepage and Post-Press card contracts verified`);


import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const tools = join(process.cwd(), 'tools');
const files = readdirSync(tools).filter(file => file.endsWith('.html') && file !== 'index.html');
const failures = [];
const descriptions = new Map();
const run2Inputs = {
  thickness:['a','b'], ream:['a','b','c'], mweight:['a','b','c'], 'sheets-weight':['a','b','c'], nup:['a','b','c'], bleedsize:['a','b'], allowance:['a','b','c'], presssheets:['a','b','c'], signatures:['a','b'], saddle:['a'], bookweight:['a','b','c'], coil:['a','b','c'], pixels:['a','b'], scaling:['a','b'], safearea:['a','b'], rolllength:['a','b','c'], rolldiameter:['a','b','c'], remainingroll:['a','b','c'], bannerarea:['a','b'], rollyield:['a','b'], costpiece:['a','b','c'], spoilage:['a','b'], runtime:['a','b','c'], profit:['a','b']
};
const legacy = [
  'Plan a specific production decision with transparent editable inputs.',
  'Use the default values as an illustrative starting point',
  'Use this as a planning estimate.',
  'This calculator does not certify',
  'Reference value'
];

for (const file of files) {
  const source = readFileSync(join(tools, file), 'utf8');
  for (const text of legacy) if (source.includes(text)) failures.push(`${file}: legacy scaffold: ${text}`);
  if (/<h[23]>[^<]+<\/h[23]>\s*<h[23]>/.test(source)) failures.push(`${file}: heading immediately followed by another heading`);
  if ((source.match(/class="related-content"/g) || []).length > 1) failures.push(`${file}: duplicate detailed related-content block`);
  const description = source.match(/<meta name="description" content="([^"]*)">/)?.[1];
  if (!description || description === 'Commercial print production planning.') failures.push(`${file}: generic or missing meta description`);
  else descriptions.set(description, [...(descriptions.get(description) || []), file]);
  const type = source.match(/onclick="run2\('([^']+)'\)"/)?.[1];
  if (type) {
    const actual = [...source.matchAll(/<input id="([a-z])"/g)].map(match => match[1]).sort();
    const expected = run2Inputs[type];
    if (!expected) failures.push(`${file}: unknown run2 handler ${type}`);
    else if (actual.join(',') !== [...expected].sort().join(',')) failures.push(`${file}: input IDs ${actual} do not match ${type} handler ${expected}`);
  }
}
for (const [description, matching] of descriptions) if (matching.length > 1) failures.push(`duplicate calculator meta description: ${matching.join(', ')}`);
const booklet = readFileSync(join(tools, 'booklet-page-order-calculator.html'), 'utf8');
if (!/id="a"/.test(booklet) || /id="[bc]"/.test(booklet)) failures.push('booklet-page-order-calculator.html: page count must be the only calculator input');
if (failures.length) {
  console.error(`LEGACY SCAFFOLD QA FAIL (${failures.length})\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`LEGACY SCAFFOLD QA PASS: ${files.length} calculators checked.`);

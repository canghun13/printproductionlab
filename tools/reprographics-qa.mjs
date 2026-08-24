import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  'drawing-scale-converter.html',
  'plan-print-scaling-calculator.html',
  'plot-sheet-fit-planner.html',
  'printed-scale-verification.html',
  'plan-tiling-calculator.html'
];
const elements = new Map();
const field = (id, value) => {
  const element = { id, value: String(value), innerHTML: '' };
  elements.set(id, element);
  return element;
};
field('result', '');
[
  ['drawing-length', 84], ['drawing-unit', 'mm'], ['scale-denominator', 50], ['real-unit', 'm'],
  ['source-scale', 100], ['target-scale', 50],
  ['real-width', 24], ['real-height', 15], ['fit-scale', 50], ['sheet-margin', 10], ['paper-series', 'iso'],
  ['known-real-length', 10], ['measured-print-length', 199], ['stated-scale', 50],
  ['plan-width', 841], ['plan-height', 594], ['printable-width', 190], ['printable-height', 277], ['tile-overlap', 10]
].forEach(([id, value]) => field(id, value));

const context = {
  window: {},
  document: { getElementById: id => elements.get(id) },
  Number, Math, Intl, console
};
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/calculators/reprographics.js'), 'utf8'), context);
const run = name => {
  elements.get('result').innerHTML = '';
  context.window.runReprographics(name);
  return elements.get('result').innerHTML;
};
const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

expect(run('scaleConverter').includes('4.2 m real length'), 'scale converter valid case');
elements.get('drawing-length').value = '0';
expect(run('scaleConverter').includes('class="error"'), 'scale converter zero validation');
elements.get('drawing-length').value = '84';

expect(run('printScaling').includes('200% print scale'), 'print scaling 1:100 to 1:50');
elements.get('target-scale').value = '-2';
expect(run('printScaling').includes('class="error"'), 'print scaling negative validation');
elements.get('target-scale').value = '50';

expect(run('sheetFit').includes('A2 landscape'), 'ISO sheet-fit orientation');
elements.get('real-width').value = '1000';
elements.get('real-height').value = '1000';
elements.get('fit-scale').value = '1';
expect(run('sheetFit').includes('No listed sheet fits'), 'sheet-fit no-match case');
elements.get('real-width').value = '24';
elements.get('real-height').value = '15';
elements.get('fit-scale').value = '50';

const verified = run('verifyScale');
expect(verified.includes('Effective scale 1:50.25'), 'effective scale result');
expect(verified.includes('100.5%'), 'scale correction result');
elements.get('measured-print-length').value = '';
expect(run('verifyScale').includes('class="error"'), 'verification blank validation');
elements.get('measured-print-length').value = '199';

expect(run('tiling').includes('15 tiles (5 × 3)'), 'tiling best orientation and count');
elements.get('tile-overlap').value = '200';
expect(run('tiling').includes('class="error"'), 'tiling overlap validation');
elements.get('tile-overlap').value = '10';

for (const page of pages) {
  const source = fs.readFileSync(path.join(root, 'tools', page), 'utf8');
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  expect(ids.length === new Set(ids).size, page + ' duplicate id');
  expect(source.includes('G-QMCP8M0CW6'), page + ' GA4');
  expect(source.includes('application/ld+json'), page + ' JSON-LD');
  expect(source.includes('rel="canonical"'), page + ' canonical');
  expect(source.includes('runReprographics('), page + ' calculate action');
  expect(source.includes('aria-live="polite"'), page + ' live result');
  expect(source.includes('Last reviewed: 2026-08-24'), page + ' review date');
}

console.log('REPROGRAPHICS QA PASS: ' + pages.length + ' calculators, 10 valid/invalid formula cases, metadata and duplicate IDs');

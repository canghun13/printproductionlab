import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const script = readFileSync('assets/js/calculators/calculators.js', 'utf8');
const expected = {
  8: ['Sheet 1: front 8, 1; reverse 2, 7', 'Sheet 2: front 6, 3; reverse 4, 5'],
  12: ['Sheet 1: front 12, 1; reverse 2, 11', 'Sheet 3: front 8, 5; reverse 6, 7'],
  16: ['Sheet 1: front 16, 1; reverse 2, 15', 'Sheet 4: front 10, 7; reverse 8, 9'],
  20: ['Sheet 1: front 20, 1; reverse 2, 19', 'Sheet 5: front 12, 9; reverse 10, 11']
};
for (const [pages, lines] of Object.entries(expected)) {
  const nodes = { a: { value: pages }, result: { innerHTML: '' } };
  vm.runInNewContext(script, { document: { getElementById: id => nodes[id] || null } });
  vm.runInNewContext(`${script};run('order')`, { document: { getElementById: id => nodes[id] || null } });
  for (const line of lines) if (!nodes.result.innerHTML.includes(line)) throw new Error(`${pages} pages: missing ${line}`);
}
for (const invalid of [0, -4, 10, 14, 16.5]) {
  const nodes = { a: { value: invalid }, result: { innerHTML: '' } };
  vm.runInNewContext(`${script};run('order')`, { document: { getElementById: id => nodes[id] || null } });
  if (!nodes.result.innerHTML.includes('divisible by four') || nodes.result.innerHTML.includes('<ol>')) throw new Error(`${invalid}: invalid page count produced a page order`);
}
console.log('BOOKLET PAGE ORDER QA PASS: 8, 12, 16, 20 pages and invalid page counts verified.');

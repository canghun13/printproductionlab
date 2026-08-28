import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync('assets/js/calculators/calculators.js', 'utf8');
function calculate(a, b, c) {
  const fields = { a: { value: a }, b: { value: b }, c: { value: c }, result: { innerHTML: '' } };
  const context = vm.createContext({ document: { getElementById: id => fields[id] }, Number, Math, Array });
  vm.runInContext(source + "\nrun('spine');", context);
  return fields.result.innerHTML;
}
const normal = [
  [[100, .10, 0], '5.00', '0.197', '50.0', '5.00', '0.00'],
  [[200, .10, .50], '10.50', '0.413', '100.0', '10.00', '0.50'],
  [[240, .12, .60], '15.00', '0.591', '120.0', '14.40', '0.60'],
  [[120, .095, .25], '5.95', '0.234', '60.0', '5.70', '0.25'],
];
for (const [inputs, spine, inches, leaves, raw, allowance] of normal) {
  const output = calculate(...inputs);
  for (const expected of [spine + ' mm <span>(' + inches + ' in)</span>', 'result-label">Planning leaves:</span> ' + leaves, 'result-label">Raw book block:</span> ' + raw + ' mm', 'result-label">Allowance:</span> ' + allowance + ' mm']) {
    if (!output.includes(expected)) throw new Error('Missing ' + expected + ': ' + output);
  }
  if (/NaN|Infinity|undefined/.test(output)) throw new Error('Non-finite normal output: ' + output);
}
const odd = calculate(101, .10, .50);
if (!odd.includes('5.55 mm') || !odd.includes('50.5') || !odd.includes('Printed interiors normally resolve to an even page count')) throw new Error('Odd page warning failed: ' + odd);
for (const inputs of [[0,.1,0],[-10,.1,0],['',.1,0],[100.5,.1,0],[100,0,0],[100,-.1,0],[100,.1,-.01],[100,'x',0]]) {
  const output = calculate(...inputs);
  if (!output.includes('class="error"') || output.includes('<strong>') || /NaN|Infinity|undefined/.test(output)) throw new Error('Invalid input did not fail safely: ' + inputs);
}
const page = fs.readFileSync('tools/book-spine-width-calculator.html', 'utf8');
for (const [ok, name] of [
  [page.includes('Final interior page count'), 'page-count label'],
  [page.includes('Measured leaf caliper (mm)'), 'caliper label'],
  [page.includes('Binding / production allowance (mm)'), 'allowance label'],
  [page.includes('calculators.js?v=book-spine-20260828a'), 'calculator cache version'],
  [page.includes('href="/tools/book-cover-size-calculator.html"'), 'cover workflow link'],
  [page.includes('href="/reference/paper-caliper.html"'), 'caliper workflow link'],
  [page.includes('href="/guides/book-spine-width.html"'), 'guide workflow link'],
]) if (!ok) throw new Error('Page contract failed: ' + name);
console.log('Book spine width QA PASS: ' + normal.length + ' normal, 1 odd-page, 8 invalid, 7 page-contract cases.');

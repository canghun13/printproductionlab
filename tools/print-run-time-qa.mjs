import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('assets/js/calculators/expansion.js', 'utf8');

function calculate(a, b, c) {
  const fields = { a: { value: a }, b: { value: b }, c: { value: c }, result: { innerHTML: '' } };
  const context = vm.createContext({
    document: { getElementById: id => fields[id] },
    Number,
    Math,
    Set,
  });
  vm.runInContext(`${source}\nrun2('runtime');`, context);
  return fields.result.innerHTML;
}

const normalCases = [
  { inputs: [12000, 6000, 4], hours: '8.00', impressions: '48,000', passes: '4 passes', perPass: '2.00' },
  { inputs: [2500, 5000, 1], hours: '0.50', impressions: '2,500', passes: '1 pass', perPass: '0.50' },
  { inputs: [1000, 2000, 2], hours: '1.00', impressions: '2,000', passes: '2 passes', perPass: '0.50' },
  { inputs: [1250.5, 2500.5, 2], hours: ((1250.5 / 2500.5) * 2).toFixed(2), impressions: '2,501', passes: '2 passes', perPass: (1250.5 / 2500.5).toFixed(2) },
];

for (const test of normalCases) {
  const output = calculate(...test.inputs);
  for (const expected of [`<strong>${test.hours} press hours</strong>`, test.impressions, test.passes, `${test.perPass} hours per pass`]) {
    if (!output.includes(expected)) throw new Error(`Missing ${JSON.stringify(expected)} for ${test.inputs.join(', ')}: ${output}`);
  }
  if (/NaN|Infinity|undefined/.test(output)) throw new Error(`Non-finite output for ${test.inputs.join(', ')}: ${output}`);
}

const invalidCases = [
  [0, 6000, 4],
  [-1, 6000, 4],
  ['', 6000, 4],
  ['not-a-number', 6000, 4],
  [12000, 0, 4],
  [12000, 6000, 0],
  [12000, 6000, 1.5],
];

for (const inputs of invalidCases) {
  const output = calculate(...inputs);
  if (!output.includes('class="error"') || output.includes('<strong>')) throw new Error(`Invalid input did not fail safely for ${inputs.join(', ')}: ${output}`);
  if (/NaN|Infinity|undefined/.test(output)) throw new Error(`Invalid input leaked a non-finite value for ${inputs.join(', ')}: ${output}`);
}

const calculator = fs.readFileSync('tools/print-run-time.html', 'utf8');
const guide = fs.readFileSync('guides/print-run-time.html', 'utf8');
const contracts = [
  [calculator.includes('Impressions per pass'), 'calculator input label'],
  [calculator.includes('Sustainable press speed (impressions/hour)'), 'sustainable-speed label'],
  [calculator.includes('Sequential passes'), 'pass label'],
  [calculator.includes('value="12000"') && calculator.includes('value="6000"') && calculator.includes('value="4"'), 'auditable defaults'],
  [calculator.includes('href="/guides/print-run-time.html"'), 'calculator-to-guide link'],
  [guide.includes('href="/tools/print-run-time.html"'), 'guide-to-calculator link'],
  [!guide.includes('href="/tools/print-imposition-calculator.html">Print Run Time Calculator'), 'no mislabeled imposition link'],
];
for (const [passed, name] of contracts) if (!passed) throw new Error(`Page contract failed: ${name}`);

console.log(`Print run time QA PASS: ${normalCases.length} normal cases, ${invalidCases.length} invalid cases, ${contracts.length} page contracts.`);

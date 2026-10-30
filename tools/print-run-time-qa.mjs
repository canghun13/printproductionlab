import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

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
  [calculator.includes('expansion.js?v=runtime-20261030a'), 'runtime cache buster'],
  [calculator.includes('href="/guides/print-run-time.html"'), 'calculator-to-guide link'],
  [guide.includes('href="/tools/print-run-time.html"'), 'guide-to-calculator link'],
  [!guide.includes('href="/tools/print-imposition-calculator.html">Print Run Time Calculator'), 'no mislabeled imposition link'],
];
for (const [passed, name] of contracts) if (!passed) throw new Error(`Page contract failed: ${name}`);

console.log(`Print run time QA PASS: ${normalCases.length} normal cases, ${invalidCases.length} invalid cases, ${contracts.length} page contracts.`);

// Independent unit vectors: hours = impressions / impressions-per-hour * passes;
// seconds = hours * 3600. Never generate expected strings with the production formatter.
const precisionCases=[
 {input:[1,6000,1],primary:'0.60 press seconds',detail:'0.60 seconds per pass'},
 {input:[12,6000,1],primary:'7.20 press seconds',detail:'7.20 seconds per pass'},
 {input:[2.5,4000,1],primary:'2.25 press seconds',detail:'2.25 seconds per pass'},
 {input:[0.000001,6000,1],primary:'less than 0.01 press seconds',detail:'1.00e-6 total press impressions'},
 {input:[29,6000,1],primary:'17.40 press seconds',detail:'17.40 seconds per pass'},
 {input:[30,6000,1],primary:'0.01 press hours',detail:'0.01 hours per pass'},
 {input:[1,6000,10000],primary:'1.67 press hours',detail:'0.60 seconds per pass'},
 {input:[1e308,1e308,1],primary:'1.00 press hours',detail:'1.00e+308 total press impressions'},
];
for(const {input,primary,detail} of precisionCases){const actual=calculate(...input);assert.ok(actual.includes(`<strong>${primary}</strong>`),actual);assert.ok(actual.includes(detail),actual);assert.ok(!/NaN|Infinity|undefined|∞|>0\.00 press hours/.test(actual));}
const rangeErrors=[[1e308,1e308,2],[1e308,1,2],[1e-300,1e300,1],[1,1e-308,2]];
for(const input of rangeErrors){const output=calculate(...input);assert.ok(output.includes('class="error"')&&!output.includes('<strong>'));assert.ok(!/NaN|Infinity|undefined|∞/.test(output));}
const baseline='86902e19114e9cb02e7d751dee670d8927ea14fc';
const before=execFileSync('git',['show',baseline+':assets/js/calculators/expansion.js'],{encoding:'utf8'});
const removeRuntime=s=>s.replace(/if\(type==='runtime'\)[\s\S]*?(?=if\(type==='rolldiameter'\))/,'').replaceAll('\r\n','\n');
assert.equal(removeRuntime(source),removeRuntime(before),'No non-runtime implementation change');
const inputCases=vm.runInNewContext(fs.readFileSync('tools/verify-expanded.mjs','utf8').split(';let count=')[0]+';cases',{});
let unchanged=0;
for(const [type,rows]of Object.entries(inputCases))if(type!=='runtime')for(const [a,b,c]of rows){
 const evaluate=code=>{const fields={a:{value:a},b:{value:b},c:{value:c},result:{innerHTML:''}},context=vm.createContext({document:{getElementById:id=>fields[id]},Number,Math,Set});vm.runInContext(code,context);context.run2(type);return fields.result.innerHTML;};
 assert.equal(evaluate(source),evaluate(before),type);unchanged++;
}
const oldHTML=execFileSync('git',['show',baseline+':tools/print-run-time.html'],{encoding:'utf8'});
assert.equal(calculator.split('</head>')[0].replace('<link rel="stylesheet" href="../assets/css/print-run-time-layout.css?v=runtime-20261030a">',''),oldHTML.split('</head>')[0],'SEO and shared CSS head unchanged; only new page-scoped stylesheet allowed');
const form=s=>s.split('<section class="calculator')[1].split('<section class="content-detail">')[0];
assert.deepEqual([...form(calculator).matchAll(/<label>[\s\S]*?<\/label>/g)].map(m=>m[0]),[...form(oldHTML).matchAll(/<label>[\s\S]*?<\/label>/g)].map(m=>m[0]),'All original label/input/helper markup preserved');
assert.ok(calculator.includes('<button onclick="run2(\'runtime\')">Calculate press time</button>'));
assert.ok(calculator.includes('id="result">Enter impressions, sustainable speed and sequential passes.</div>'));
assert.equal(calculator.split('</main>')[1].split('<script')[0],oldHTML.split('</main>')[1].split('<script')[0],'Footer unchanged');
console.log(`Runtime precision QA PASS: ${precisionCases.length} independently expected displays, ${rangeErrors.length} overflow/underflow errors; ${unchanged} non-runtime fixture outputs unchanged, source/form/SEO/Footer preservation PASS`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tools = path.join(root, 'tools');
const calculators = fs.readdirSync(tools)
  .filter(name => name.endsWith('.html'))
  .filter(name => fs.readFileSync(path.join(tools, name), 'utf8').includes('class="calculator"'));

const failures = [];
for (const name of calculators) {
  const html = fs.readFileSync(path.join(tools, name), 'utf8');
  if (html.includes('data-copy')) failures.push(`${name}: static Copy Result control remains`);
  if (!/main\.js\?v=copy-result-\d{8}[a-z]/.test(html)) failures.push(`${name}: versioned shared Copy Result logic is missing`);
}

const main = fs.readFileSync(path.join(root, 'assets', 'js', 'main.js'), 'utf8');
for (const marker of ['setupCopyResult', 'new MutationObserver(updateCopy)', "!result.querySelector('.error')", "Boolean(result.querySelector('strong'))", 'button.dataset.copyValue', 'result.append(actions)', '.filter(node => node !== actions)', 'actions.hidden = true']) {
  if (!main.includes(marker)) failures.push(`main.js: missing state-management marker ${marker}`);
}

if (calculators.length !== 43) failures.push(`Expected 43 calculators, found ${calculators.length}`);
if (failures.length) {
  console.error(`COPY RESULT QA FAIL:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`COPY RESULT QA PASS: ${calculators.length} calculators use one shared, state-managed Copy Result control`);

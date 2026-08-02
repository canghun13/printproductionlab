import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  if (entry.name === '.git') return [];
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

for (const file of walk(root).filter(file => file.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('assets/css/layout-refinement.css')) continue;
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const prefix = rel.includes('/') ? '../' : '';
  html = html.replace('</head>', `<link rel="stylesheet" href="${prefix}assets/css/layout-refinement.css"></head>`);
  fs.writeFileSync(file, html);
}

const homepage = path.join(root, 'index.html');
let home = fs.readFileSync(homepage, 'utf8');
const descriptions = new Map([
  ['/tools/print-imposition-calculator.html', 'Plan how many finished pieces fit on a press sheet.'],
  ['/tools/paper-weight-calculator.html', 'Estimate sheet mass from dimensions and paper GSM.'],
  ['/tools/gsm-basis-weight-converter.html', 'Convert GSM and basis weight using the correct paper grade.'],
  ['/tools/book-spine-width-calculator.html', 'Estimate spine width from page count and measured caliper.'],
  ['/tools/dpi-print-size-calculator.html', 'Relate pixel dimensions, print size and effective resolution.'],
  ['/tools/roll-diameter.html', 'Estimate roll diameter from length, core size and material caliper.'],
  ['/tools/print-job-cost-calculator.html', 'Combine material, setup, labour and finishing costs.'],
  ['/tools/n-up-printing.html', 'Compare compact N-up arrangements on a parent sheet.']
]);
for (const [href, description] of descriptions) {
  const pattern = new RegExp(`(<a class="panel tool" href="${href.replaceAll('/', '\\/')}"><h3>[^<]+<\\/h3><p>)Open the production calculator\.(<\\/p>)`);
  home = home.replace(pattern, `$1${description}$2`);
}
home = home.replace('Browse 14 production guides', 'Browse 15 production guides');
fs.writeFileSync(homepage, home);

const postPress = path.join(root, 'tools', 'post-press-finishing.html');
let hub = fs.readFileSync(postPress, 'utf8');
const hubDescriptions = new Map([
  ['Brochure Fold Panel Calculator', 'Set bi-fold, tri-fold and Z-fold panel widths from the flat sheet.'],
  ['Roll Fold Panel Calculator', 'Build a progressive nested-panel schedule with an editable step-down.'],
  ['Gate Fold Panel Calculator', 'Balance centre panels and closing flaps with job-specific clearance.'],
  ['Folding Allowance Planner', 'Document cumulative panel adjustments before artwork release.'],
  ['Lamination Material & Cost Calculator', 'Estimate roll-film use, setup time, run time and finishing cost.'],
  ['Cutting Stack / Lift Planner', 'Plan sheets per lift, blade drops and cutting time from measured caliper.'],
  ['Finished Quantity After Spoilage', 'Add production loss before ordering stock or committing finished quantity.'],
  ['Post-Press Time & Cost Planner', 'Combine finishing setup, throughput, labour, machine and outside cost.']
]);
for (const [title, description] of hubDescriptions) {
  hub = hub.replace(`<h2>${title}</h2><p>Open the focused planning tool.</p>`, `<h2>${title}</h2><p>${description}</p>`);
}
fs.writeFileSync(postPress, hub);


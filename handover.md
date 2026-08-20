# Print Production Lab — Project Handover

Last updated: 2026-07-24  
Project status: Initial setup pending  
Primary working language for project documentation: Korean  
Public site language: English

---

## Encoding repair — 2026-07-29

- Cause: a prior calculator-content expansion serialized UTF-8 production symbols through a non-UTF-8 command path. The affected characters were multiplication, division, square-metre, micrometre, and apostrophe symbols; the source history identifies the content-expansion commits as the introduction point.
- Scope before repair: 9 public HTML files and 16 visible-text markers. A repository-wide audit of public HTML, user-visible CSS/JavaScript, JSON, and XML found no additional affected asset files.
- Fixed pages: `privacy.html`; Book Spine Width, Book Weight, GSM/Basis Weight, Paper Thickness, Paper Weight, Print Imposition, Print Job Cost, and Sheets From Total Weight calculators.
- Paper Weight formula now renders exactly as: `Formula: width × height ÷ 1,000,000 × gsm ÷ 1,000. Actual delivered weight may vary by tolerance and moisture.`
- Durable prevention: added `tools/encoding-qa.mjs`. From the repository root run `node tools/encoding-qa.mjs`; it validates UTF-8 decoding, an early HTML charset declaration, known mojibake markers, accidental Korean visible text, double-escaped visible entities, and the Paper Weight formula source.
- Verification: encoding QA PASS; automated QA PASS (67 public HTML); content QA PASS (36 calculators, 23 articles); navigation QA PASS (67 public HTML); calculation regression PASS (24 independent samples); JavaScript syntax PASS. Chrome localhost QA at 1440px checked the rendered text of all 67 public pages and Calculate/Reset behavior for all 36 calculators, including the exact rendered Paper Weight formula.
- Final delivery: committed as `43ab00c` (`Fix public text encoding`), pushed to `origin/main`, and local/remote HEAD matched. Production HTTP verification passed for home, Paper Weight, one Guide, one Reference, `robots.txt`, and `sitemap.xml` (all 200). A cache-busted Paper Weight response served the corrected formula and no `횞` or `첨` markers. Remaining encoding risk: HIGH 0, MEDIUM 0, LOW 0.

---

## 1. Project identity

- Domain: `printproductionlab.com`
- Brand: **Print Production Lab**
- Short brand: **PPL**
- GitHub repository name: `printproductionlab`
- Hosting: GitHub Pages
- DNS / registrar / SSL: Cloudflare
- Frontend: Static HTML + CSS + Vanilla JavaScript
- Database: None
- Framework: None
- Build system: None unless a later phase has a clear need
- Google Analytics 4 Measurement ID: `G-QMCP8M0CW6`

### Google Analytics tag

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QMCP8M0CW6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QMCP8M0CW6');
</script>
```

The GA4 tag must be included on every public HTML page.

---

## 2. Business objective

Build a professional English-language calculator and reference site for commercial printing, prepress, paper, binding, imposition, wide-format printing, labels, rolls, and print production costing.

Primary monetization:

1. Google AdSense
2. Future affiliate links for printing services, paper, finishing equipment, software, and production supplies

Long-term target:

- Make the site structurally capable of pursuing approximately KRW 1,000,000 per month.
- This is a growth target, not a guaranteed forecast.
- Do not sacrifice page quality to inflate page count.

---

## 3. Positioning

The site must not look like:

- A generic calculator directory
- A copied version of the owner’s HVAC, plastics, reliability, 3D-printing, or tabletop sites
- A design blog
- A 3D-printing website
- An online print shop pretending to sell printing services

The site should feel like:

- A commercial print production workbench
- A practical prepress and estimating toolkit
- A reliable utility for print shops, designers, publishers, sign shops, and small brands

Suggested public descriptor:

> Commercial Print, Prepress & Production Calculators

---

## 4. Target users

- Commercial print shop estimators
- Prepress operators
- Graphic designers preparing print files
- Self-publishers and book designers
- Sign and wide-format print operators
- Label and roll-material converters
- Schools, churches, nonprofits, and small businesses producing printed material
- Etsy sellers and small brands ordering cards, labels, booklets, and packaging inserts

---

## 5. Core content clusters

### A. Paper & Stock

1. Paper Weight Calculator
2. Sheet Weight Calculator
3. Ream Weight Calculator
4. GSM to Basis Weight Converter
5. Basis Weight to GSM Converter
6. Paper Thickness Calculator
7. Sheets From Total Weight Calculator
8. M-Weight Calculator

### B. Imposition & Sheet Yield

1. Print Imposition Calculator
2. Items per Sheet Calculator
3. Sheet Yield Calculator
4. Sheet Waste Calculator
5. N-Up Printing Calculator
6. Bleed Size Calculator
7. Gripper and Margin Allowance Calculator

### C. Books & Binding

1. Book Spine Width Calculator
2. Book Cover Size Calculator
3. Booklet Creep Calculator
4. Booklet Page Order Calculator
5. Signature Count Calculator
6. Saddle-Stitch Page Calculator
7. Book Weight Calculator
8. Coil Binding Size Calculator

### D. Resolution & Prepress

1. DPI and Print Size Calculator
2. Pixels Required for Print Calculator
3. Image Scaling Percentage Calculator
4. Wide-Format Viewing Distance Calculator
5. Bleed and Safe Area Calculator
6. Large-Format File Size Estimator

### E. Roll, Label & Wide Format

1. Roll Length Calculator
2. Roll Diameter Calculator
3. Remaining Roll Length Calculator
4. Labels per Roll Calculator
5. Labels per Sheet Calculator
6. Banner Square Footage Calculator
7. Vinyl Material Required Calculator
8. Roll Media Job Yield Calculator

### F. Production, Cost & Time

1. Print Job Cost Calculator
2. Cost per Finished Piece Calculator
3. Press Sheets Required Calculator
4. Spoilage Allowance Calculator
5. Ink Coverage Estimator
6. Print Run Time Calculator
7. Profit Margin Calculator
8. Hourly Shop Rate Calculator

The list is a roadmap, not permission to create thin pages. Merge overlapping tools when the search intent and user workflow are substantially the same.

---

## 6. Phase 1 target

Create a polished first release containing:

### Public pages

- `/index.html`
- `/tools/index.html`
- `/guides/index.html`
- `/reference/index.html`
- `/about.html`
- `/contact.html`
- `/privacy.html`

### Initial calculators

1. Print Imposition Calculator
2. Items per Sheet Calculator
3. Sheet Yield & Waste Calculator
4. Paper Weight Calculator
5. GSM and Basis Weight Converter
6. Book Spine Width Calculator
7. Book Cover Size Calculator
8. Booklet Creep Calculator
9. Booklet Page Order Calculator
10. DPI and Print Size Calculator
11. Wide-Format Resolution Calculator
12. Print Job Cost Calculator

### Technical files

- `/assets/css/styles.css`
- `/assets/js/main.js`
- `/assets/js/calculators/`
- `/partials/header.html`
- `/partials/footer.html`
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/404.html`
- `/README.md`
- `/handover.md`

---

## 7. Representative tool requirement

The flagship tool is the **Print Imposition Calculator**.

It must not only display a number. It should:

- Accept parent sheet width and height
- Accept finished item width and height
- Accept bleed
- Accept outer margins
- Accept gripper allowance where applicable
- Compare normal and rotated orientation
- Show items across, items down, total items per sheet, used area, and waste percentage
- Visually preview the item layout on the parent sheet
- Clearly label when the preview is proportional rather than production-certified
- Work at desktop and 390 px mobile width
- Provide copy and print-friendly output where useful

Avoid pretending to replace professional imposition software. State assumptions and limitations clearly.

---

## 8. Page quality requirements

Every calculator page must contain:

1. Unique title and meta description
2. Canonical URL
3. One clear H1
4. Calculator inputs and results
5. Formula or calculation method
6. Explanation of each input
7. At least one worked example
8. Practical interpretation of the result
9. Assumptions and limitations
10. Related calculators
11. Last reviewed date
12. Appropriate structured data
13. A visible disclaimer where production variables can change the outcome

Do not publish a calculator page containing only a form and a few sentences.

---

## 9. Accuracy policy

- Use transparent formulas.
- Avoid unexplained magic constants.
- State units explicitly.
- Support imperial and metric inputs where the workflow reasonably requires both.
- Separate exact geometry from estimates based on user-entered assumptions.
- Never promise press-ready, color-accurate, binding-certified, or manufacturer-certified results.
- Do not invent paper calipers, bulk factors, waste factors, ink transfer rates, or production speeds.
- If a default is provided, label it as an editable example value.
- For basis-weight conversions, clearly identify paper grade/category because conversion factors differ by basis size.
- For KDP or other platform-specific dimensions, do not hard-code changing commercial requirements without a reviewed source and review date.

---

## 10. Design direction

Create a unique visual system for Print Production Lab.

Preferred character:

- Professional print-production workbench
- Strong grid and sheet-layout motifs
- Clear measurement labels
- Compact but readable data panels
- Controlled use of registration-mark, crop-mark, ruler, or paper-stack visual language
- No stock photography required
- No generated hero images required

Avoid:

- Copying colors, cards, spacing, header shapes, logo structure, or hero layout from prior projects
- Excessive rounded cards
- Huge empty hero sections
- Generic gradient-heavy SaaS styling
- Percentage or unit suffixes wrapping onto new lines
- Decorative effects that reduce calculator readability

Responsive visual checks:

- 1440 px
- 1280 px
- 1024 px
- 768 px
- 390 px

---

## 11. Header and navigation

Recommended top-level navigation:

- Tools
- Guides
- Reference
- About

The header must remain stable at common widths and must not crush or wrap the brand awkwardly.

The footer should include:

- Tools
- Guides
- Reference
- About
- Contact
- Privacy
- Copyright
- A concise informational disclaimer

Shared header and footer may be loaded from `/partials/` using Vanilla JavaScript, but:

- Each page must retain its own static `<title>`, meta description, canonical, H1, and page-specific structured data.
- Navigation must remain usable if partial loading fails or JavaScript is delayed. Use a sensible fallback where practical.

---

## 12. SEO and indexing

Each indexable HTML page must include:

- Unique `<title>`
- Unique meta description
- Canonical pointing to `https://printproductionlab.com/...`
- `<meta name="robots" content="index,follow">`
- Open Graph title, description, type, and URL
- Valid viewport meta
- One H1
- Breadcrumbs for non-home pages
- Static JSON-LD where appropriate
- Internal links from at least one hub page
- Inclusion in `sitemap.xml`

Do not index:

- Test pages
- Duplicate calculator variants
- Empty category pages
- Development artifacts

Preferred structured data:

- `WebSite` on home
- `WebApplication` or suitable calculator markup on tools
- `BreadcrumbList` on internal pages
- `Article` only for genuine guide/reference articles

---

## 13. Performance and accessibility

- No framework bundle
- No unnecessary third-party scripts
- Use semantic HTML
- All form controls need associated labels
- Keyboard operation must work
- Visible focus states
- Sufficient contrast
- Prevent layout shift
- Avoid horizontal scrolling at 390 px
- Keep JavaScript modular and calculator-specific
- Handle empty, invalid, zero, negative, and unrealistic inputs gracefully
- Do not silently return `NaN`, `Infinity`, or misleading zero values

---

## 14. Quality gate

Before reporting a phase complete, run or perform:

### Automated checks

- Broken internal links
- Missing files
- Duplicate HTML IDs
- Missing title
- Duplicate title where inappropriate
- Missing meta description
- Missing canonical
- Missing or multiple H1
- Invalid or malformed JSON-LD
- JavaScript syntax errors
- Calculator inputs producing `NaN` or `Infinity`
- Sitemap URLs not matching actual public pages
- Orphan public pages
- Accidental references to old project brands or domains
- GA4 ID must be exactly `G-QMCP8M0CW6`
- Canonical host must be exactly `printproductionlab.com`

### Calculation checks

Use independently calculated sample cases and record them in `handover.md`.

### Browser checks

Inspect representative pages at:

- 1440 px
- 1280 px
- 1024 px
- 768 px
- 390 px

At minimum inspect:

- Home
- Tools hub
- Print Imposition Calculator
- Paper Weight Calculator
- Book Spine Width Calculator
- DPI and Print Size Calculator
- Print Job Cost Calculator
- One guide
- Privacy page
- 404 page

---

## 15. Company / home continuity workflow

The repository and `handover.md` are the source of truth.

### At the beginning of every work session

```bash
git status
git pull origin main
```

Then:

1. Read the entire `handover.md`
2. Review the most recent commit
3. Confirm the current phase and unfinished items
4. Do not rely on chat history alone

### During work

- Make all changes inside the repository
- Do not store required project files only outside the repository
- Keep filenames and paths portable across Windows computers
- Avoid machine-specific absolute paths
- Update `handover.md` as decisions are made

### At the end of every work session

1. Run the quality checks relevant to the work
2. Update `handover.md` with:
   - What changed
   - Files added or modified
   - Tests performed
   - Known issues
   - Exact next task
3. Commit the work with a descriptive message
4. Push to `origin main`

```bash
git add .
git commit -m "Describe completed project phase"
git push origin main
```

If push permission is unavailable, output the exact commands the owner should run. Never leave the handover stale.

---

## 16. Handover log format

### 2026-08-20 — Fresh workflow-cluster discovery: NO-GO

- Start baseline: clean, synchronized `main` at `9ae2fb6`; local `HEAD`, `origin/main`, and `refs/heads/main` matched. Current public inventory remains 76 HTML pages, 43 calculators, 15 Guides and 9 References.
- Recent exclusions preserved and not renamed or re-tested as new ideas: ink consumption/coverage, densitometry/process control, flexographic plate/repeat, press scheduling/capacity, digital-vs-offset/makeready, folding-carton/corrugated planning, thermal-transfer consumables, barcode preflight, textile/sublimation, direct mail, stock inventory, pallet/logistics, carbon accounting and variable-data workflows.
- Fresh search spaces reviewed: (1) hardcover case-making and bookbinding materials, for binders and self-publishers after text-block planning; (2) wide-format display fabrication and installation, for mural, banner and event-backdrop production; (3) fine-art/canvas/framing preparation, for photo labs and framers after print output; and (4) accessible/wayfinding sign specification, for sign shops preparing visual and tactile work.
- Shortlist — Wide-format display fabrication: Demand is real across mural panel sizing, grommet layouts, pole-pocket safe areas and step-and-repeat backdrops. SERPs already contain workflow-capable free tools: Adcolor provides grommet and pole-pocket planners, PrintReady provides grommet positions, Urbanwalls provides mural-panel sizing, and BrandWallPro/Repeat Maker provide upload-based step-and-repeat generators. The first three calculations can be made deterministic only when the printer's panel, seam, pocket and weld values are supplied; the fourth is an artwork-upload/pattern-export problem, not a universal calculator. It also overlaps the existing Banner Area, Roll Media Yield, roll geometry and wide-format resolution tools. Hard Gate: **FAIL** — only three defensible rule-based decisions, and no four-tool cluster without splitting one banner workflow into variants. Decision: `REJECT`.
- Shortlist — Hardcover case-making: Demand and tool intent exist for board cuts, case-wrap material, hinges, turn-ins and endpapers. SERPs already include full multi-output case-binding calculators (for example, SpeedCalcs and UseCalcPro) plus printer-specific cover-template tools. PPL already covers spine width, cover size, signatures, saddle stitch, book weight, coil and paper caliper. A separate board, cloth, hinge and endpaper page set would merely disaggregate a single case-making cut list and introduce bindery-specific allowances. Hard Gate: **FAIL** — insufficient independent decisions and excessive Books & Binding overlap. Decision: `REJECT`.
- Shortlist — Fine-art canvas and framing preparation: Search intent is broad for canvas wraps/stretcher bars, mat openings and frame-moulding cut lists. The SERP is mature, with specialist free calculators covering each workflow. Although the formulas are generally deterministic, the primary user is the framer or artist rather than PPL's commercial-print production user; the cluster would shift site scope downstream into generic framing. Hard Gate: **FAIL** on Print Production Lab fit and differentiated opportunity. Decision: `REJECT`.
- Shortlist — Accessible/wayfinding signage: Sign shops do search for viewing-distance, letter-height and tactile/Braille rules, and the U.S. Access Board publishes detailed character-height and spacing requirements. However those requirements are jurisdiction- and sign-type-specific; a generic static tool could be misread as a compliance determination. The remaining useful tasks require local code, material, tactile-production or language rules. Hard Gate: **FAIL** on safe formula scope and four independent universal tools. Decision: `REJECT`.
- Evidence and search method: varied tool-intent and job-stage queries were checked for `calculator`, `planner`, `safe area`, `panel overlap`, `grommet spacing`, `pole pocket`, `step and repeat`, `case binding`, `book board`, `book cloth`, `canvas wrap`, `mat opening`, `frame moulding`, `letter height` and `tactile signage`. Practitioner discussions also confirm panel/overlap setup and banner finishing are normally carried through RIP/work-order and material-specific processes rather than a generic fixed rule. Sources reviewed: `adcolorinc.com/calc.html`, `printreadyhq.com/en/grommet`, `uwdecals.com/pages/wall-mural-calculator`, `bannerworld.co.uk/pole-pockets-on-banners`, `brandwallpro.com/step-and-repeat-generator`, `repeatmaker.com`, `speedcalcs.com/p/book-binding-material-calculator.html`, `usecalcpro.com/crafts/bookbinding-calculator`, `artcalcs.uk/materials/canvas-stretcher-calculator`, `framingmath.com/mat-opening-calculator`, `railchop.com/moulding-calculator`, and `access-board.gov/ada/guides/chapter-7-signs/`.
- Final decision: **NO-GO**. The closest candidate is wide-format display fabrication, but it fails the independent four-tool requirement and would duplicate existing Wide Format decisions unless first-party demand identifies a distinct, material-agnostic fourth task. No public pages, calculator code, navigation, sitemap, design assets or user-managed homepage badges were changed.
- QA: research-only; no implementation QA required. Risks: HIGH 0; MEDIUM 0; LOW early first-party search/analytics data remains unavailable. Exact next step: do not revisit these four candidates merely under narrower names; reopen only on repeated first-party demand for a proven four-decision workflow with authoritative, material-agnostic inputs.

### 2026-08-13 — GSC discovered-not-indexed technical and discovery review

- Start commit: `f2860e08de6ea9d0df55c6a667b8fdd2e0c38bf9`; local `main`, `origin/main`, and `refs/heads/main` matched before this review. The working tree was clean.
- GSC basis: 19 URLs reported as “Discovered – currently not indexed”, with no crawl timestamp in the supplied export. This review did not change titles, meta descriptions, H1s, or body content on protected high-performing pages.
- URL-specific diagnosis: every target exists locally, has its exact production canonical, `index,follow` robots meta without `noindex`, is present in `sitemap.xml`, has one title and one H1, and is not blocked by `robots.txt`. Cache-busted production HTTP checks returned `200` without redirects for all 19; production canonical and robots meta matched in all cases.

| URL | HTTP/indexability | Static inbound links after review | Diagnosis |
|---|---|---:|---|
| `/contact.html` | 200; canonical/robots/sitemap PASS | 75 | No technical blocker |
| `/guides/` | 200; canonical/robots/sitemap PASS | 177 | No technical blocker |
| `/guides/booklet-creep.html` | 200; canonical/robots/sitemap PASS | 1 | Discoverable from Guides hub |
| `/guides/paper-job-weight.html` | 200; canonical/robots/sitemap PASS | 1 | Was an orphan; linked from Guides hub |
| `/guides/post-press-preflight.html` | 200; canonical/robots/sitemap PASS | 9 | Post-Press cluster discoverable |
| `/guides/print-imposition.html` | 200; canonical/robots/sitemap PASS | 37 | No technical blocker |
| `/guides/print-job-cost.html` | 200; canonical/robots/sitemap PASS | 1 | Discoverable from Guides hub |
| `/guides/signatures.html` | 200; canonical/robots/sitemap PASS | 1 | Was an orphan; linked from Guides hub |
| `/reference/margin-gripper.html` | 200; canonical/robots/sitemap PASS | 1 | Was an orphan; linked from Reference hub |
| `/tools/` | 200; canonical/robots/sitemap PASS | 195 | No technical blocker |
| `/tools/brochure-fold-panel-calculator.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |
| `/tools/coil-binding.html` | 200; canonical/robots/sitemap PASS | 2 | Discoverable from relevant hubs |
| `/tools/cutting-stack-lift-planner.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |
| `/tools/folding-allowance-planner.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |
| `/tools/gate-fold-panel-calculator.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |
| `/tools/lamination-material-cost-calculator.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |
| `/tools/post-press-finishing.html` | 200; canonical/robots/sitemap PASS | 2 | Post-Press cluster discoverable |
| `/tools/post-press-time-cost-planner.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |
| `/tools/roll-fold-panel-calculator.html` | 200; canonical/robots/sitemap PASS | 1 | Post-Press cluster discoverable |

- Actual technical blockers: none. Actual discovery defect: three HTML-orphan pages—Paper Job Weight, Signatures, and Margin & Gripper—were absent from their natural subject hubs. The Post-Press cluster is not hub-isolated: its eight affected tool/hub URLs retain 1–2 static inbound links and the related guide has 9.
- Production change: added three concise, topic-matched hub cards only: two on `/guides/` and one on `/reference/`. No sitewide links, URL changes, sitemap-lastmod manipulation, new pages, or content rewrites were introduced. `tools/gsc-indexability-audit.mjs` is the durable repeatable static audit for these exact 19 URLs.
- QA and live deployment: GSC static indexability audit PASS (19/19), `tools/qa.mjs` PASS (76 public HTML), `tools/navigation-qa.mjs` PASS (76), `tools/content-depth-qa.mjs` PASS (43 calculators / 24 articles), `tools/encoding-qa.mjs` PASS, `tools/legacy-scaffold-qa.mjs` PASS (44 calculators), and `git diff --check` PASS. After deployment of `c5ea162`, cache-busted production hubs served all three new anchors. Actual browser QA at 1440 px and 390 px confirmed one H1, visible new cards, working Paper Job Weight and Margin & Gripper links, no horizontal overflow, and zero console errors on both modified hubs.
- Decision: **FIX** for the three verified orphan paths; **OBSERVE** for the other 16 URLs while Google recrawls. Exact next step: request recrawl/monitor the 19 URLs in GSC; do not change protected content unless a future crawl or coverage report shows a concrete technical defect.

### 2026-08-11 — New-cluster discovery review: NO-GO

- Start baseline: clean `main` at `3a86144`; local `HEAD`, `origin/main`, and `refs/heads/main` matched before research. Current inventory remains 76 public HTML pages, 43 calculators, 15 Guides and 9 References.
- Exclusion list carried forward: ink consumption/coverage, densitometry/process-control, flexographic plate/repeat, press capacity/scheduling, and digital-vs-offset/makeready are not new candidates. The 2026-08-08 review already recorded their REJECT or MERGE/LATER status and evidence.
- New search areas reviewed: packaging structural/dielines; corrugated blank planning; direct-mail/postage; screen-print production; foil/emboss embellishment; barcode print dimensions; digital textile/dye-sublimation; thermal-transfer labels/ribbons; variable-data print; paper-stock inventory; pallet/shipping planning; print carbon accounting; print-job turnaround; packaging QC and rework. Queries were varied across calculator, formula, chart, estimator, planner, printing, setup, waste, cost and troubleshooting intent.
- Shortlist and scores (commercial 30, demand 25, SERP gap 20, independent depth 15, site fit 10): Folding-carton/corrugated structural planning 72/100; Thermal-transfer label consumables 70/100; Barcode print-dimension preflight 68/100; Dye-sublimation/textile production planning 67/100; Direct-mail planning 59/100; paper-stock inventory planning 61/100.
- Demand and SERP evidence: packaging results contain free blank calculators and full parametric SVG/DXF/PDF dieline generators (`leroyprintpacks.com`, `calcimator.com`, `dielinelab.com`, `pezapack.com`, `pacdora.com`, `packmyman.com`); thermal-transfer searches show free ribbon-yield calculators from OnlineLabels, Silver Fox and BCP Media; barcode X-dimension tools and GS1/quality documents already serve the narrow dimensional intent; direct-mail estimators use live USPS/rate APIs; screen-print and sublimation results contain established ink/mesh/cost calculators and supplier guidance. Industry and forum results also repeatedly stress that structural dielines, barcode acceptance, mesh/stencil choice and transfer conditions depend on material, equipment and physical proofing rather than universal thresholds.
- Candidate decisions: folding-carton/corrugated `REJECT` despite the highest score — tool depth could reach four, but the SERP is dominated by free production-file generators and structural engineering requires score, caliper, glue, die and prototype constraints beyond a safe static estimate. Thermal-transfer `REJECT` — strong consumables intent, but ribbon yield, roll count and ribbon-width waste are one shared calculation family; other useful decisions are printer/material-specific. Barcode `REJECT` — useful X-dimension/quiet-zone intent, but fewer than four safe independent tools and GS1/symbology/application rules are controlling. Dye-sublimation/screen `REJECT` — active demand but overlaps prior ink review and existing wide-format, roll, cost and post-press workflows; performance values are vendor/substrate/profile-specific. Direct mail `REJECT` — commercial intent is clear but practical calculators depend on current postage, address lists and pricing APIs. Paper inventory/pallet/carbon/variable data `REJECT` — respectively generic inventory/logistics competition, EPD/MIS/live-data dependence, or insufficient independent static-tool depth.
- Hard-gate result: no candidate simultaneously demonstrated a defensible SERP gap, at least four independent repeat-use tools, verified static formulas and meaningful non-overlap with the current site. No production pages, navigation, sitemap, calculator code or design assets were added.
- Final decision: `NO-GO`. Highest-potential watch item is thermal-transfer consumable planning only if first-party query data shows a sustained label/ribbon problem that supports four independent decisions; it is not approved for re-review merely by renaming ribbon-yield variants.
- QA: research-only session; no implementation QA was required. Existing project files and user-managed homepage badges were untouched. Risks: HIGH 0; MEDIUM 0; LOW early search and analytics data remain unavailable.
- Exact next step: 검색/분석 신호 관찰 유지; only reopen a distinct workflow when first-party demand or a materially different, four-tool static cluster emerges.

### 2026-08-10 — Legacy calculator scaffold and input-semantic audit

- Start commit and synchronized baseline: `7fa74c5` on `main`, matching `origin/main` before edits.
- Current inventory: 76 public HTML files; 43 calculator pages (44 HTML files under `tools/` including the Post-Press hub); 15 Guides; 9 Reference pages.
- Audit result: 24 calculator pages contained duplicated top-level legacy scaffold (empty `How to use` / `Formula / method` headings plus generic worked-example, limitation and related copy) ahead of the existing detailed production content. All 24 redundant blocks were removed while preserving the topic-specific `content-detail` sections.
- Input semantics: 12 calculator pages contained no-op “Reference value” controls. Removed the unused controls and aligned `run2` validation with the actual inputs. Paper Thickness now uses only its measured stack thickness and sheet-count inputs, matching its formula.
- Booklet Page Order: removed two unused inputs and replaced the first-pair-only response with complete outside-to-centre saddle-stitch sheet pairs. Independent samples for 8, 12, 16 and 20 pages, plus invalid 0/-4/10/14/16.5-page cases, pass in `tools/booklet-page-order-qa.mjs`.
- Metadata: replaced 24 generic title-adjacent descriptions and generic OG snippets with calculator-specific search descriptions; duplicate calculator descriptions are now prohibited by QA.
- Durable QA: added `tools/legacy-scaffold-qa.mjs` for empty heading sequences, known scaffold phrases, no-op reference labels, duplicate related blocks, generic/duplicate calculator descriptions, dynamic `run2` input-ID mismatches and Booklet input shape.
- Automated validation: Legacy Scaffold QA PASS (44 tool HTML checked); `tools/qa.mjs` PASS (76 public HTML); content QA PASS (43 calculators, 24 articles); navigation QA PASS (76 public HTML); encoding QA PASS; calculation verification PASS (24 samples); calculator JavaScript syntax PASS; `git diff --check` PASS.
- Browser QA: after deployment, the in-app browser rendered all 25 modified calculators at 1440, 1280, 1024, 768 and 390 px (125 checks): one H1, visible form/input/result controls, no empty adjacent heading, no horizontal overflow, and single-column fields at 390 px all passed. Three unchanged representative calculators passed the same five-width regression (15 checks). At 390 px, all 25 modified calculators passed Calculate, Copy Result and Reset; results were non-empty with no `NaN`, `Infinity` or `undefined`. Internal console errors: 0.
- Risks after deployment browser confirmation: HIGH 0; MEDIUM 0; LOW normal production assumptions and search/cache observation.
- Next step: 검색/분석 신호 관찰 유지.

### 2026-08-08 — New-cluster expansion review: observe

- Baseline: synchronized clean `main` from `6532bb6` to `bdeb6a1`; current inventory remains 76 public HTML pages, 43 calculators, 15 Guide articles and 9 Reference articles. The owner-managed homepage directory/backlink badges were treated as read-only.
- Operating evidence: the handover contains no usable GSC query/impression export or human-only GA4 demand sample. The site and its Post-Press cluster are still recent, so automated QA/direct visits and a few early clicks would not justify another expansion.
- Gap map: Paper/Stock, sheet planning/yield, imposition, books/binding, resolution/prepress, roll/wide format, production cost/time and Post-Press are already connected calculator-to-guide workflows. The remaining breaks examined were ink planning, pressroom densitometry/process control, flexographic plate/repeat planning, finite-capacity scheduling and digital-vs-offset/makeready decisions.
- Search method (checked 2026-08-08): no keyword-volume tool was available, so no volume figures were invented. Demand was tested through exact and long-tail combinations across process, material, equipment, cost, waste, measurement and production-condition modifiers, plus recurring industry/forum questions and the presence of calculators, spreadsheets, vendor tools and MIS features.
- Ink consumption/coverage planning — `REJECT`, 67/100 (monetization 28/40, demand 25/35, competition gap 14/25). Queries included `offset printing ink consumption calculator`, `sheetfed ink usage per 1000 sheets`, `flexo ink consumption anilox BCM calculator` and `PDF CMYK ink coverage analyzer`. Demand is real, but free tools already cover offset, flexo and uploaded-PDF analysis; a PPL tool without artwork analysis would require users to supply the decisive coverage/mileage assumptions and would risk presenting equipment-specific values as universal.
- Pressroom densitometry/process control — `REJECT`, 64/100 (24/40, 18/35, 22/25). Queries included `Murray-Davies dot area calculator`, `print TVI calculator`, `relative print contrast calculator` and `Preucil ink trapping calculator`. The independent-tool gap is visible, but demand is narrow and modern densitometers already calculate these measurements. Four pages would be closely related outputs from the same density patches, making the proposed cluster too thin despite good differentiation.
- Flexographic plate/repeat planning — `REJECT`, 66/100 (27/40, 25/35, 14/25). Queries descended through plate distortion, K factor, gear teeth/circular pitch, repeat length, cylinder build and plate-area estimating. Search intent is clear, but exact free no-login calculators and multi-tool supplier/MIS clusters already solve plate distortion and repeat/cylinder planning. PPL's existing roll geometry also creates adjacent overlap.
- Press capacity/job scheduling — `REJECT`, 61/100 (28/40, 21/35, 12/25). Queries included `print shop press capacity calculator`, `jobs per shift`, `print production schedule spreadsheet` and `finite capacity print scheduling`. Results are dominated by MIS/ERP, SaaS and Excel templates because the useful problem needs multiple jobs, machine calendars, dependencies and live rescheduling. A static one-job page would mostly duplicate Print Run Time and Post-Press Time & Cost.
- Digital-vs-offset and makeready route selection — `MERGE/LATER`, 69/100 (31/40, 26/35, 12/25). Queries included `digital vs offset crossover calculator`, `offset makeready cost calculator`, `plate cost`, `waste sheets` and `perfecting press crossover`. The decision has clear intent, but it is one strong comparison rather than a 4–8 page cluster, and its formula is already composed by Print Job Cost, Press Sheets Required, Spoilage Allowance and Print Run Time. No existing page was changed because current evidence does not show a clear merge payoff.
- Competition/source types: ink suppliers and specialist free calculators; flexo suppliers and prepress MIS; densitometer manufacturers and technical manuals; print MIS/ERP and scheduling SaaS; printer blogs, PDF guides, spreadsheets and forum questions. Representative sources checked: `vanguardic.com/ink-calculator`, `inkcoverage.app`, `teamflexo.com/plate-distortion-calculators`, `flexoworks.com/tools/plate-distortion-calculator`, `flexoworks.com/tools/repeat-length-calculator`, Heidelberg's `color_quality.pdf`, X-Rite 500 Series manual, `techkon.datacolor.com/knowledge-base/ink-trapping`, `pressflo.ink`, GelatoConnect sheet-fed offset estimator documentation and Canon's digital/offset crossover white paper.
- Go/No-Go: no candidate simultaneously has sufficient demand evidence, a defensible competitive gap, low overlap and at least four non-thin independent pages. No public HTML, calculator code, shared CSS/JS, navigation, sitemap, robots or `llms.txt` was changed; no browser implementation QA was therefore required.
- Fresh baseline QA PASS before the decision: general 76, navigation 76, content 43 calculators/24 articles, encoding, Copy Result 43, layout 76, 24 core independent calculation samples and 48 expanded samples.
- Revisit when: GSC shows repeated non-QA impressions/clicks for one candidate family across several long tails; user feedback requests the same missing workflow; or a candidate can be specified as at least four independent decisions using authoritative/user-entered values without duplicating existing tools. Highest-potential watch item: digital-vs-offset/makeready as a future merge or compact workflow, followed by pressroom measurement if query evidence broadens.
- Risks: HIGH 0; MEDIUM 0; LOW early search data remains unavailable. Final decision: `현재 신규 클러스터 확장 가치 없음 — 관찰 유지`.

### 2026-08-02 — Copy Result action-row layout repair

- Cause: the state-management repair created `.result-actions` as a sibling after `.result`, making it a third child of the calculator grid. On successful calculations it could create an isolated right-column row, excess vertical space and inconsistent placement across short, long and multi-metric results.
- Scope: Copy Result placement and result-panel layout only. The existing Copy state rules, payload, clipboard handling, calculations, results, rounding, validation, IDs, URLs, content, SEO, result colors, header/footer and user-managed badges were preserved.
- Shared DOM repair: `assets/js/main.js` now keeps the action row as the final descendant of the `.result` panel. It remains detached in initial, error and Reset states, is appended only after a valid result, and is removed when result markup is restored. There is no calculator-level action-row grid item.
- Shared layout repair: `assets/css/layout-refinement.css` makes the result panel a natural column flex container with no forced minimum height. The nested action row follows result content, uses a subtle separator, aligns its secondary Copy button to the right and has no fixed/absolute placement or empty placeholder space. The action row is removed from layout when hidden. Versioned CSS and JS references were advanced for cache-safe delivery.
- Browser QA: all 43 calculators passed at 1440, 1280, 1024, 768 and 390 px (215 renders). After a successful calculation, each had exactly one Copy control and one action row inside the result panel; calculator-level action rows 0; action row/result panel bounds and button bounds valid; clipping 0; horizontal overflow 0. Initial and Reset states had zero Copy controls/action rows in the rendered DOM and no layout residue. M-Weight was visually inspected at desktop and mobile.
- Automated QA PASS: Copy Result QA (43), general QA (76), navigation QA (76), content QA (43 calculators and 24 articles), encoding QA, calculation verification (24 samples), expanded verification (48 samples), layout QA (76), JavaScript syntax and `git diff --check`.
- Delivery verification: committed as `8b42e05` (`Place Copy Result inside result panel`) and pushed to `origin/main`. After GitHub Pages propagation, M-Weight, Paper Weight, Sheet Yield & Waste, Print Imposition, Book Spine Width and three Post-Press calculators loaded the versioned CSS/JS; each rendered exactly one Copy/action row inside the result panel and none as a calculator grid sibling. HIGH 0; MEDIUM 0; LOW 0.

### 2026-08-02 — Copy Result state-management repair

- Cause: 29 of the 43 calculator HTML files contained a static Copy Result button inside the initial result markup; the other 14 did not. The previous shared click handler copied the result container's whole `innerText`, so it could include initial guidance or the Copy button itself. It had no success/error/reset state contract.
- Scope: presentation and copy interaction only. Calculation formulas, numeric results, rounding, units, input/result IDs, Calculate/Reset calculations, validation rules, URLs, content, SEO, header/footer, GA4 and user-managed badge markup were preserved.
- Shared repair: removed every static calculator Copy button through `tools/normalize-copy-result.mjs`, then added one common state-managed action row in `assets/js/main.js`. It is hidden and removed from keyboard focus at initial, error and Reset states. A MutationObserver exposes it only when the result has a non-error primary result (`strong`). The payload is the calculator title plus current visible result text only; it excludes initial guidance, hidden content and button labels. Clipboard API success changes the label to `Copied`; a secure fallback and `Copy failed` feedback cover unavailable clipboard access. The same normalizer versions `main.js` on all 43 calculator pages for cache-safe delivery.
- State contract verified: initial = guidance only, Copy hidden, tabIndex -1; success = one visible Copy button and current-result payload; invalid input = error only with Copy hidden; Reset = original guidance/preview restored with Copy hidden; repeated calculation = latest result payload. Print Imposition had a separate insertion-order issue that left initial guidance in a successful result; the shared override now replaces the guidance while retaining the preview through error, Reset and recalculation.
- Browser QA: all 43 calculators passed initial, success, Copy feedback, error, Reset and repeated-result checks at 390 px. All 43 calculators also passed responsive rendering at 1440, 1280, 1024, 768 and 390 px (215 renders): initial Copy exposure 0, success Copy visibility PASS, Reset exposure 0, result/action overlap 0, clipping 0 and horizontal overflow 0. Clipboard writes resolved successfully in the browser; the isolated automation clipboard read channel did not mirror the browser clipboard value, so payload equality was additionally verified from the value passed to `navigator.clipboard.writeText`.
- Durable QA: added `tools/copy-result-qa.mjs`, which requires exactly 43 calculator pages, no static Copy controls, the versioned shared script and the required common state-management markers. General, navigation, content, encoding, calculation, expanded calculation and layout QA all PASS.
- Delivery verification: committed as `192488b` (`Fix Copy Result state management`) and pushed to `origin/main`. After GitHub Pages propagation, M-Weight plus six representative calculator pages loaded the versioned shared script with no static initial Copy control. Production M-Weight showed Copy only after Calculate, copied the current-result payload and hid it again after Reset; console errors 0. HIGH 0; MEDIUM 0; LOW 0.

### 2026-08-02 — Calculator result-panel accessibility repair

- Cause: the final shared layout layer applied a light panel background after the older result-panel rules, while the inherited white result text and lime result value remained. This made a calculated result such as M-Weight `10.00` and its explanation difficult to distinguish.
- Scope: presentation only. No calculation formula, displayed number, rounding, input/result ID, Calculate/Reset behavior, unit conversion, validation, URL, content, SEO, header/footer, GA4, sitemap, robots or user-managed badge markup changed.
- Shared fix: extended `assets/css/layout-refinement.css`, which is the final shared stylesheet on all public pages. The calculator-only selector `.calculator > .result` now defines a charcoal `#1f2933` result surface, off-white initial/result text, lime primary values, tabular numerals, readable descriptions, a compact blue Copy button, and a dedicated dark-red error state. It also keeps result padding, height and mobile type scale stable. `tools/apply-layout-refinement.mjs` now writes a versioned stylesheet URL (`result-a11y-20260802`) so normal browser and CDN caches fetch the repaired CSS.
- Computed-style contrast verification on the rendered M-Weight Calculator: initial guidance 14.03:1; normal primary value 11.78:1; normal explanatory text 12.16:1; error message 13.34:1. All exceed the required 4.5:1 normal-text and 3:1 primary-value thresholds.
- Browser QA: all 43 calculators were rendered at 1440, 1280, 1024, 768 and 390 px (215 renders). Each used its normal Calculate action, Reset action and an invalid numeric input to expose the error state. Values were present and finite; Calculate/Reset worked; value clipping 0; horizontal overflow 0; normal-value, initial-guidance and error contrast PASS. Nine pages intentionally omit a result-description paragraph, and several retain their own pre-existing initial guidance wording; these were treated as valid page-specific content rather than CSS failures. M-Weight was visually inspected at desktop and 390 px: `10.00`, description and panel boundaries remain fully visible.
- Regression QA: Homepage, Tools, Guides, Reference, Post-Press hub, one Guide and one Reference were rendered at all five widths (35 renders): header/footer/H1/shared CSS present and overflow 0. Browser console error logs 0.
- Automated QA PASS: general QA (76), navigation QA (76), content QA (43 calculators and 24 articles), encoding QA, calculation verification (24 samples), expanded calculation verification (48 samples), layout QA (76), and `git diff --check`.
- Delivery verification: committed as `6235879` (`Fix calculator result panel contrast`) and pushed to `origin/main`. After GitHub Pages propagation, production M-Weight and nine additional representative calculators loaded the versioned shared CSS and rendered the charcoal result surface; all 10 pages retained one H1. HIGH 0; MEDIUM 0; LOW 0.

Append new entries at the top of this section.

### 2026-08-02 — Visual hierarchy and card-layout refinement

- Starting commit: `56fc45c` (`Record post-press deployment verification`); local `HEAD` and `origin/main` matched and the worktree was clean.
- Audit scope: homepage; Tools, Guides, Reference and Post-Press hubs; 10 calculator details; 5 Guide details; 3 Reference details; About, Contact, Privacy and 404. Primary issues were rigid three-column grids, incomplete final rows, a narrow single-card Guide section, heavy repeated border grids, generic featured/Post-Press card copy, uneven section rhythm, and a fixed-width owner badge wrapper causing mobile horizontal scroll.
- Shared design change: added `assets/css/layout-refinement.css` as the final cascade layer on all 76 public HTML pages. It preserves the commercial print-workbench identity while using lighter card boundaries, restrained background grid contrast, consistent section spacing, balanced count-aware grids, full-width single-card document rows, compact mobile cards and a clear lime `:focus-visible` outline. Header/footer information structure, logo, calculations, content, URLs and SEO were preserved.
- Grid rules: 2 cards use 2 columns; 3 and 6 cards use 3 desktop columns; 4 cards use 2; 8 cards use 4; all grids become 2 columns at tablet widths and 1 column at mobile. A one-card grid becomes a compact full-width feature row instead of occupying one third of the page. The owner-managed KittyLaunch/Sell With Boost/Twelve Tools/Findly badge content and position were preserved; only its fixed-width wrapper is allowed to wrap responsively.
- Copy refinement: replaced eight repeated homepage `Open the production calculator.` descriptions and eight repeated Post-Press `Open the focused planning tool.` descriptions with concise function-specific summaries. Corrected the homepage Guide count from 14 to 15. No long-form page content was rewritten.
- QA maintenance: added `tools/apply-layout-refinement.mjs` and `tools/layout-qa.mjs`; made the retained Post-Press generator emit the shared CSS and unique hub descriptions. Updated `tools/content-depth-qa.mjs` to detect actual calculator pages and recognize the established Post-Press templates without changing public content requirements.
- Browser QA: captured and inspected 25 core screenshots (5 hubs × 5 viewports: 1440, 1280, 1024, 768 and 390 px). Full browser render audit PASS: 76 pages × 5 viewports = 380 renders; horizontal overflow 0, card/heading clipping 0, narrow one-card rows 0, missing header/footer/main/H1 0, missing shared CSS 0, console errors 0. Representative calculator, Guide, Reference and Post-Press detail screenshots retained readable hierarchy and input/result layouts.
- Interaction/accessibility QA: all 43 calculators passed Calculate/primary action and Reset at 390 px with non-empty finite results; mobile menu open/links PASS; keyboard focus outline computed as 3 px solid with 3 px offset and no clipping.
- Automated QA PASS: layout QA (76), general QA (76), navigation QA (76), content QA (43 calculators and 24 articles), encoding QA, 24 core independent calculation samples, 48 expanded samples and `git diff --check`.
- Counts preserved: 76 public HTML; 43 calculators; 15 Guide articles; 9 Reference articles. User-managed badge links and images remain present.
- Delivery verification: committed as `ac8ff41` (`Refine visual hierarchy and card layouts`) and pushed to `origin/main`. Cache-busted production checks loaded `layout-refinement.css` on home, Tools, Guides, Reference, Post-Press, a representative calculator and a representative guide; each retained one H1 plus main/footer landmarks. HIGH 0; MEDIUM 0; LOW 0. Ordinary CDN URLs may briefly serve the preceding HTML while Cloudflare cache propagation completes.

### 2026-08-02 — Post-Press & Finishing category

#### Verification completion — 2026-08-02

- Baseline: local `HEAD` and `origin/main` both began at `f20cc4b333dd31444fd43443f99ea7b83a143ed5`; working tree was clean.
- Inventory PASS: 76 public HTML pages; 43 calculators (36 existing + 7 Post-Press); 15 Guide articles; 9 Reference articles; 9 Post-Press public pages (7 calculators, hub and Guide). Sitemap, Tools hub and Guides hub include the category; navigation QA found no orphaned public pages.
- Independent calculation checks PASS: default samples verified in a real local Chromium browser against separately calculated values: Brochure 3.7083, Roll 4.3438, Gate 4.1875, Folding Allowance 15.625, Lamination total 2,355.5, Cutting 500 sheets/lift, Post-Press total 735.5833. Each calculator also rejected zero and negative inputs, kept fractional results finite, showed no NaN/Infinity/undefined, and Reset restored `Enter values to calculate.`.
- Browser QA PASS: local HTTP (not `file://`) rendering of all 9 Post-Press pages at 1440, 1280, 1024, 768 and 390 px: 45 renders. Every render had header/footer/main/H1 and visible text, no horizontal overflow, and zero browser console errors. All seven Calculate/Reset interactions passed at 390 px. Legacy regression passed for Paper Weight, Print Imposition, Spoilage Allowance, Print Job Cost and Print Run Time.
- Automated QA PASS: `tools/qa.mjs` (76 pages), `tools/navigation-qa.mjs` (76 pages), `tools/encoding-qa.mjs`, and `git diff --check`.
- Content QA: found repeated boilerplate paragraphs across the seven new calculators; fixed only those duplicate paragraphs by topic-scoping them. No page, URL, formula, input, result ID, layout, header/footer or user-managed footer area changed. Follow-up content audit PASS: no placeholder/TODO, missing required sections, or repeated long paragraphs.
- Verification fix: the retained page-generation helper could append a second Post-Press card when rerun. It is now idempotent; the duplicate local cards were mechanically removed before commit, leaving the committed Tools and Guides hub markup unchanged.
- Deployment verification PASS: `0736645` was pushed to `origin/main`; local `HEAD` and `origin/main` matched and the tree was clean. The custom domain served 12 checked HTML routes (home, Tools, Guides, Post-Press hub, all seven calculators, and the Guide) with main content and one H1. Direct HTTP checks returned 200 for `sitemap.xml`, `robots.txt`, and `assets/js/calculators/postpress.js`.
- Final verification commits: `ef354b1` (`Complete post-press verification QA`) and `0736645` (`Make post-press generator idempotent`). HIGH 0; MEDIUM 0; LOW normal job-specific stock/equipment variability only. Post-Press & Finishing is complete.
- Remaining: commit/push the verification correction, then verify GitHub Pages and the custom-domain URLs return current HTTP 200 responses. Risks before deployment check: HIGH 0, MEDIUM deployment propagation only, LOW job-specific physical production conditions.

- Starting commit: `40546e1` (`Update index.html`); baseline after `git fetch origin` and `git pull --ff-only origin main` was clean and matched `origin/main`.
- Research and decision record (reviewed 2026-08-02): University of Minnesota Printing Services supplies a roll/gate fold calculator; Texas Litho documents distinct roll, gate and letter-fold panel behavior; University of Southampton distinguishes nesting roll panels, equal-panel Z folds and gate folds. Search also found established free panel calculators, so the category differentiates through editable job-specific allowances, process planning and preflight rather than claiming universal panel compensation. Lamination, cutting-lift and workflow-cost search results were mostly generic/costing tools; these pages expose roll width/length, actual caliper, setup and rates rather than inventing equipment defaults.
- Proposal validation: Brochure Fold Panels PASS (`/tools/brochure-fold-panel-calculator.html`, basic bi/tri/Z intent); Roll Fold Panels PASS (`/tools/roll-fold-panel-calculator.html`, progressive nested schedule); Gate Fold Panels PASS (`/tools/gate-fold-panel-calculator.html`, flap/centre structure); Folding Allowance PASS (`/tools/folding-allowance-planner.html`, user-defined cumulative adjustment); Lamination PASS (`/tools/lamination-material-cost-calculator.html`, roll-film material/setup/run cost); Cutting Lift PASS (`/tools/cutting-stack-lift-planner.html`, measured stack/lift plan); Finished Quantity After Spoilage MERGE (existing `/tools/spoilage-allowance.html` remains the canonical spoilage calculator); Post-Press Time & Cost PASS (`/tools/post-press-time-cost-planner.html`, finishing workflow rate/cost model).
- Added hub and guide: `/tools/post-press-finishing.html` and `/guides/post-press-preflight.html`. The advanced public category comprises 9 new pages (7 calculators, hub and guide); the overlapping spoilage proposal was intentionally not duplicated.
- Formula notes: brochure tri-fold balances `(flat + tuck) / 3` with a reduced closing panel; roll schedules balance a user-entered progressive step-down; allowance uses `n × base − allowance × n × (n−1)/2`; lamination combines sheet length, sides, waste, setup/run time and user cost; cutting derives sheets/lift from measured caliper and target/max height; post-press cost combines setup/run time, labour, machine and outside/material cost.
- QA: `tools/qa.mjs` PASS (76 public HTML); `tools/encoding-qa.mjs` PASS; `git diff --check` PASS. Browser rendering and live deployment verification remain to be completed after the deployment is available.
- Risks: HIGH none; MEDIUM live five-viewport browser and production response verification pending deployment; LOW job-specific stock and equipment conditions remain intentionally user-entered.
- Delivery: committed as `e0e4f56` (`Add post-press finishing tools`) and pushed to `origin/main`; immediately after push, the production URL still returned the prior GitHub Pages 404 for the new hub, so deployment propagation—not source code—remains the pending check.

### 2026-07-27 — Final local browser rendering and interaction QA

- Browser QA method: Ran a temporary localhost static server from the repository and rendered the checked-out `origin/main` files with installed Google Chrome through Playwright Core. This avoided the in-app browser network boundary and did not use `file://`.
- Rendering coverage: 67 public HTML pages at 1440, 1280, 1024, 768 and 390 px: 335 real browser render checks. Every page returned HTTP 200 from localhost, displayed Header/Footer/main/H1, had usable body height, and had no horizontal overflow, out-of-viewport elements, table overflow, button overflow, page errors, failed internal requests or internal console errors.
- Calculator interaction: All 36 calculators were tested at 390 px with a real Calculate click and Reset click. Results were non-empty and contained no `NaN`, `Infinity` or `undefined`; valid sample values produced no validation error; Reset restored input defaults and cleared the calculated result state.
- Mobile common UI: At 390 px, Home, the three hubs, a calculator, Guide, Reference, About, Contact, Privacy and 404 each passed an open/close mobile-menu interaction check. Navigation, calculator buttons, unit inputs, related links, long text, tables and formula/result areas remained within the viewport.
- Fixes made: Added the shared `assets/js/main.js` binding to the 38 public pages that did not already load it; added an accessible mobile menu toggle on every page; added a Reset control and default-result restoration to every calculator. No formula, input/result ID, URL, SEO metadata, content text or design system was changed.
- QA note: The isolated Chrome environment denies external GA network access, which emits external-resource messages; QA counted only page errors and failed/console-error events from localhost assets. Internal console errors and page errors: 0.
- Revalidation: `tools/qa.mjs`, `tools/navigation-qa.mjs`, `tools/content-depth-qa.mjs`, `tools/verify-calculations.mjs` and `tools/verify-expanded.mjs` all PASS after the UI fixes.
- Commit and deployment: `d2ea25e` (`Complete browser interaction QA`) pushed to `origin/main`. The live homepage, representative calculator, Guide, Reference, `robots.txt`, `sitemap.xml` and `assets/js/main.js` all returned HTTP 200; cache-busted `main.js?v=d2ea25e` contains the mobile-menu and Reset code.
- Risks: HIGH none; MEDIUM none; LOW GA4 collection and CDN cache observation remain normal production monitoring items.
- First-complete-release assessment: Content-inclusive first release is fully verified locally, including all 335 required renders and all 36 Calculate/Reset interactions.

### 2026-07-27 — Content-depth and uniqueness completion pass

- Audit scope and classification: 67 public HTML pages reviewed. Before editing, 8 core/hub/legal pages were sufficient, while all 36 calculators, 14 Guides and 9 Reference pages required substantive depth work (59 thin pages). After editing, all 67 pages are classified sufficient; no calculator, Guide or Reference page remains thin or pending.
- Calculator content: Rewrote the detail section on all 36 calculators with topic-specific production purpose, input/unit selection, method, worked example, result application, production mistakes, assumptions/limitations and workflow links. Existing forms, IDs, calculation JavaScript, URL paths, header/footer, metadata and CSS layout were preserved.
- Guides and Reference: Reworked all 14 Guides and 9 Reference pages as task-oriented production documents with definitions, unit/method guidance, examples, decision checklists, handoff/preflight guidance, cautions, related workflow and a 2026-07-27 review date.
- Uniqueness QA: Added `tools/rebuild-content.mjs` as the maintained content source and expanded `tools/content-depth-qa.mjs` to verify all required sections, review dates, length floors and duplicate long body paragraphs. The QA result is `Content QA PASS: 36 calculators and 23 articles`.
- Content sizes: calculator average 723 words (range 673–776); Guide average 741 words (700–771); Reference average 631 words (602–660). Long body-paragraph duplication: 0.
- Automated checks: `tools/qa.mjs` PASS for 67 public HTML pages; `tools/navigation-qa.mjs` PASS for 67 public HTML pages; independent calculator verification PASS for 24 core samples and 48 expanded samples. `git diff --check` reported no whitespace errors.
- Commit and push: Content commit `200c35b` (`Deepen print production content`) pushed successfully to `origin/main`. This follow-up handover update records the commit and deployment result.
- Deployment check: `https://printproductionlab.com/` returned HTTP 200 and contains the current homepage copy after the push. In-app browser navigation is blocked by the execution environment, so visual/browser interaction checks at 1440, 1280, 1024, 768 and 390 px remain the only pending external release check.
- Risks: HIGH none; MEDIUM deployed responsive/interactive browser validation pending environment access; LOW Cloudflare cache and GA4 production collection confirmation.
- First-complete-release assessment: Content-inclusive first release is complete and deployed; perform the documented visual browser audit when browser network access is available.

### 2026-07-24 — Calculator content layout, encoding and Footer cleanup

- Calculator content layout: Moved all 36 added detail blocks inside their respective `main` containers and applied a shared constrained content-detail layout with aligned headings, readable line length, example/note blocks and grouped related links.
- Encoding: Removed mojibake/replacement-character patterns and repaired undefined limitation text before verification.
- Footer: Added final footer rule set that disables borders, pseudo-element separators, column rules, background dividers, outlines and divider shadows for footer descendants.
- Browser QA: Six representative calculators at 1440, 1280, 1024, 768 and 390 verified content detail inside main, three related-link groups, zero footer nav borders, no replacement character and no overflow.

### 2026-07-24 — Calculator content-depth pass

- Calculator content: Added structured sections to all 36 calculator pages: when to use, inputs, method, worked example, interpretation, production considerations, common mistakes, limitations and related production links. Six core calculators have topic-specific examples and considerations; all remaining tools have scoped task-specific copy.
- Content QA: `tools/content-depth-qa.mjs` passed all 36 calculator pages after repairing an initial undefined limitation-text defect before commit.
- Footer: Resources and Company navigation columns retain explicit border-free inline overrides.
- Risks: HIGH none; MEDIUM editorial review can further enrich individual calculator case studies; LOW production-cache and analytics verification.

### 2026-07-24 — Footer divider hard removal

- Screenshot follow-up: Resources and Company `nav` elements now receive an inline `border:0!important` override in every public HTML file. This removes any remaining inherited/cascaded vertical divider at the element itself rather than relying only on stylesheet selectors.

### 2026-07-24 — Actual mobile viewport root-cause fix

- Root cause: Several early calculator pages lacked `<meta name="viewport" content="width=device-width, initial-scale=1">`. Mobile browsers therefore used a desktop layout viewport and scaled the two-column form down, bypassing the intended mobile media queries.
- Fix: Added the viewport declaration to every public HTML page and verified no public page is missing it. The footer no-border/mobile overrides can now activate at real device widths.

### 2026-07-24 — Critical deployed footer and mobile override

- Added an inline final-layout override to every public document so prior cascading stylesheet layers cannot reintroduce Footer divider borders or calculator multi-column mobile fields.
- At 390 px, Paper Weight and GSM/Basis Weight calculator field grids resolve to one column, controls use 46 px minimum height, Footer links use 15 px text and no footer navigation border is computed.

### 2026-07-24 — Reported deployment UI hotfix

- Fixed: Removed the obsolete Tools hub script that wrote to absent `#tool-list`, eliminating the reported console TypeError.
- Fixed: Removed footer vertical dividers that crowded column text; set balanced desktop columns and an accessible mobile two-column/stacked footer.
- Fixed: Forced calculator fields, controls and result blocks into a true single-column mobile layout with 44–46 px controls. The document body now fills the viewport so short pages do not leave a blank region beneath the footer.
- Browser check: Tools, paper weight, imposition, About, Contact and Privacy at 1440, 1280, 1024, 768 and 390 px had no overflow, missing footer links, mobile grid failure, bottom whitespace or Tools console error.

### 2026-07-24 — Footer spacing and tool-card copy correction

- Footer: Increased desktop column padding and boundary offsets so text has clear separation from dividers; set balanced minimum legal-column width. At 390 px, brand and legal blocks span the width, resources/company form readable columns, and links use 14 px type with 42 px targets.
- Tools hub: Replaced the repeated card sentence with 36 distinct task-specific descriptions. `tools/fix-hub-descriptions.mjs` checks uniqueness.
- Browser QA: Fresh checks at 1440, 1280, 1024, 768 and 390 px across Tools, six calculator types and company/legal pages found no overflow, missing footer links or duplicate hub-card copy.
- QA: Hub Card QA PASS (36 unique descriptions); automatic QA and navigation QA passed.
- Risks: HIGH none; MEDIUM editorial content depth remains outside this focused UI/copy session; LOW production cache and GA4 verification.

### 2026-07-24 — Calculator responsiveness and footer layout QA

- Footer: Rebuilt responsive footer grid with brand, resources, company and legal/disclaimer areas. Desktop uses four columns; 390 px uses an ordered two-column/stacked layout with 40 px link targets.
- Calculator UI: Fresh browser audit checked every one of 36 calculators at both 390 and 1440 px (72 page/viewport checks). Each retained a result region, six footer links, usable controls, and no horizontal, input or button overflow.
- Viewports: Fresh checks at 1440, 1280, 1024, 768 and 390 px across home, hubs, company pages, 404 and representative calculator types found no navigation, footer or overflow failures.
- QA: `tools/qa.mjs` and `tools/navigation-qa.mjs` passed.
- Risks: HIGH none; MEDIUM content-depth work remains explicitly out of this UI-only session; LOW production cache and GA4 confirmation.

### 2026-07-24 — Contact, homepage and footer correction

- Contact email: Replaced the former contact address throughout site text with `canghun13@naver.com`; no `hello@printproductionlab.com` occurrences remain.
- Homepage: Rebuilt with hero, six production categories, eight featured calculators, workflow, guide/reference pointers and an explicit trust limitation.
- Footer: Replaced corrupted separator-based link rows with four structured brand/resource/company/legal areas.
- QA: Automatic and navigation QA passed; email search returned no prohibited address.
- Risks: HIGH none; MEDIUM calculator, guide and reference editorial depth still requires a page-by-page subject-matter review; LOW production-cache and GA4 verification.

### 2026-07-24 — Layout density and mobile refinement

- Design changes: Reduced display-heading dominance, introduced readable professional sans typography, balanced calculator input/result proportions, compacted empty result treatment, and rebuilt footer links as a responsive column grid.
- Core page content: Expanded About, Contact and Privacy with substantive purpose, method, limitation, feedback, analytics and data-handling sections.
- Browser audit: Fresh desktop/mobile checks at 1440, 1280, 1024, 768 and 390 px across hubs, representative calculators, articles and core pages found no navigation, footer, button or horizontal-overflow issue.
- QA: `tools/qa.mjs` and `tools/navigation-qa.mjs` both passed for 67 pages.
- Risks: HIGH none; MEDIUM editorial depth across all legacy calculator explanations remains ongoing; LOW production cache and GA4 collection check.

### 2026-07-24 — Independent visual-system rebuild

- Design differentiation: Replaced the prior light-card/navy-footer presentation with a press-desk system: graphite production bar, registration mark wordmark, signal-green production markers, ticket-style navigation, specification fields, press-summary result blocks, grid racks, manual/spec tables, and compact mobile navigation.
- Browser visual/mobile audit: Fresh DOM layout checks at 1440, 1280, 1024, 768 and 390 px across home, hubs, representative calculator layouts, guide, reference, Privacy and 404 found no overflow, missing navigation/footer links, duplicate H1, or button overflow.
- QA: VISUAL PASS (rendered layout checks); MOBILE PASS (390 px layout checks); CALCULATOR QA retained from latest all-tool smoke test; CONTENT QA remains an editorial follow-up because legacy calculator copy varies in depth.
- Files added/modified: `assets/css/pressdesk.css`, `tools/apply-pressdesk.mjs`, public HTML stylesheet bindings, `handover.md`.
- Risks: HIGH none; MEDIUM legacy calculator explanatory copy requires continuing editorial review; LOW production-cache and analytics confirmation.
- First-release assessment: Interface foundation is production-ready; content refinement is ongoing.

### 2026-07-24 — Expanded tools final verification

- Counts: 67 public HTML pages, 36 calculators, 14 guides and 9 reference pages.
- Independent samples: `tools/verify-expanded.mjs` exercised two positive input sets for each of 24 added calculators (48 cases); all values were finite, positive inputs and no invalid numeric output path was exposed by browser smoke testing.
- Full smoke test: All 36 calculators were freshly loaded, clicked, rendered a result region and emitted zero browser console errors.
- Tools hub: Rebuilt as six category sections containing all 36 calculator links: Paper & Stock; Imposition & Sheet Planning; Books & Binding; Resolution & Prepress; Wide Format & Roll Media; Production Cost & Time.
- Responsive audit: 1440, 1280, 1024, 768 and 390 px checks on hubs, new calculator representatives, new guides/references, utility pages and 404 found no horizontal or button overflow; four header links and at least six footer links remained visible.
- QA: `QA PASS: 67 public HTML pages checked`; `Navigation QA PASS: 67 public HTML pages checked`.
- Risks: HIGH none; MEDIUM production assumptions remain estimates and should be checked with job specifications; LOW GitHub Pages cache and GA4 production collection.
- First-complete-release assessment: Ready, subject to normal production deployment verification.
- Exact next task: Monitor production usage and correct formulas only from verified print-production feedback.

### 2026-07-24 — Phase 2 first-complete-release expansion

- Public HTML / calculators / guides / references: 67 / 36 / 14 / 9.
- New calculators: paper thickness, ream and M-weight, sheets from weight, N-up, bleed, allowances, press sheets, signatures, saddle stitch, book weight, coil, pixels, scaling, safe area, roll and banner planning, per-piece cost, spoilage, runtime and profit margin.
- Validation: New calculator browser smoke test exercised 24 added tools with a click, result rendering and console-error check; all passed. Existing QA and navigation QA both passed for 67 public pages.
- Risks: HIGH none; MEDIUM formula defaults are planning estimates and need production-side confirmation; LOW GitHub Pages cache and analytics verification.
- Exact next task: Review usage analytics and add only high-demand calculators or deeper subject guides.

### 2026-07-24 — Final navigation and browser revalidation

- Public HTML / calculators / guides / reference pages: 34 / 12 / 8 / 6.
- Header/footer audit: Actual browser DOM audit of all 34 public pages confirmed all four header links (Tools, Guides, Reference, About), Contact/Privacy footer links, and one H1. This explicitly rechecked guide/reference current-menu retention and calculator detail headers.
- Calculator smoke test: All 12 calculator pages were freshly loaded and clicked in the browser; each exposed one action button, one result region, and no console errors.
- Responsive audit: At 1440, 1280, 1024, 768 and 390 px, representative hubs, calculator pages, guides, references, Privacy and 404 had four navigation links, six footer links, and no horizontal overflow.
- QA: `tools/qa.mjs` → `QA PASS: 34 public HTML pages checked`; `tools/navigation-qa.mjs` → `Navigation QA PASS: 34 public HTML pages checked`.
- Files added: `tools/navigation-qa.mjs`; files modified: `handover.md`.
- Risks: HIGH none; MEDIUM calculator long-form content remains concise on older pages; LOW production cache and analytics verification.
- Exact next task: Review and expand subject-specific calculator explanations only where search performance or user feedback indicates a gap.

### 2026-07-24 — Content expansion and shared interface

- Public HTML / calculators / guides / reference pages: 34 / 12 / 8 / 6.
- Work completed: Unified header navigation and footer links across public pages; added eight practical guides and six reference pages; updated hubs and sitemap; added shared production-workbench visual styling.
- QA: `tools/qa.mjs` passed with `QA PASS: 34 public HTML pages checked`.
- Browser QA: Header menu and six footer links verified at 1440, 1280, 1024, 768 and 390 px across home, hubs, representative guide/reference/calculator pages, Privacy and 404. No overflow found.
- Risks: HIGH none; MEDIUM none; LOW production deployment cache and analytics verification.
- Exact next task: Verify all newly published pages in the production GitHub Pages deployment after cache propagation.

### 2026-07-24 — Production design polish and live QA

- Work completed: Corrected the live GSM converter null-selector defect, added local SVG/ICO favicon fallbacks, and added a print-workbench visual polish layer (grid, registration-style brand mark, measurement-oriented panels, stronger result hierarchy, compact headings, and responsive spacing).
- Browser checks: Actual browser checks at 1440, 1280, 1024, 768 and 390 px across home, hubs, representative calculator pages, Privacy and 404 found no horizontal overflow, button overflow, or H1 count issue. All 12 calculator pages loaded, accepted a button click, rendered a result element, and emitted no console errors.
- QA: `tools/qa.mjs` passed: `QA PASS: 20 public HTML pages checked`.
- Files added/modified: `assets/css/polish.css`, `tools/normalize-heads.mjs`, public HTML heads, `favicon.svg`, `favicon.ico`, `assets/js/calculators/calculators.js`, `handover.md`.
- Known issues: Browser smoke testing verifies interaction and console state, but deployed GitHub Pages cache propagation and GA4 collection require post-push production confirmation.
- Remaining HIGH / MEDIUM / LOW risks: None / none / deployment cache and production analytics confirmation.
- Exact next task: Confirm the latest commit at `https://printproductionlab.com`, including favicon response and GA4 realtime activity.

### 2026-07-24 — Phase 1 final verification

- Model used: Codex
- Final public HTML / calculators: 20 / 12.
- Design audit: Browser-rendered audit of all 20 public pages at 1440, 1280, 1024, 768, and 390 px found no horizontal overflow, missing H1, button overflow, or absent header/footer on pages that use those shared elements. No design changes were required.
- Calculation verification: `tools/verify-calculations.mjs` passed 24 independent normal-input samples (two per calculator). Samples include imposition 56/15-up, items 56/15, yield 15/9, paper 0.042/0.0049896 kg, GSM 118.44/270.48, spine 10.5/2.56 mm, cover 322/211 mm, DPI 10/8 in, creep 1.5/0.24 mm, page totals 16/20 divisible by four, wide-format 100/100 PPI, and cost 2/2 per piece. Invalid-value handling remains in calculator code; the browser audit checked no visible `NaN`, `Infinity`, or `undefined` on loaded pages.
- Automated QA: `C:\\Users\\cangh\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe tools/qa.mjs` → `QA PASS: 20 public HTML pages checked`.
- Files added/modified: `tools/verify-calculations.mjs`, `assets/js/main.js`, `assets/js/calculators/calculators.js`, `handover.md`.
- Known issues: Browser testing covered layout and loaded-state integrity; production printer-specific outcomes remain outside calculator scope.
- Remaining HIGH / MEDIUM / LOW risks: None / none / printer-specific production assumptions.
- Phase 1 completion: Ready to close.
- Exact next task: Configure GitHub Pages and verify the production custom domain, HTTPS, and analytics collection.

### 2026-07-24 — Phase 1 foundation (in progress)

- Model used: Codex
- Work completed: Built shared visual system, public hubs, core technical files, and initial calculator implementations for imposition, items per sheet, yield, paper weight, GSM/basis conversion, book spine, book cover and DPI.
- Files added: `assets/css/styles.css`, `assets/js/main.js`, `assets/js/calculators/calculators.js`, public hubs, technical files and calculator pages.
- Calculations verified: Representative default examples exercised manually in browser-independent JavaScript review; imposition compares normal and rotated geometry.
- Browser sizes checked: Pending interactive browser QA.
- Automated QA: Pending full link/meta/JSON-LD audit.
- Commit: Pending
- Push status: Pending
- Known issues: Remaining roadmap calculators (creep, page order, wide-format resolution and job cost) and full QA/SEO pass are unfinished.
- Exact next task: Complete the remaining four Phase 1 calculator pages, apply GA/structured-data/metadata consistently to every public page, run automated QA and responsive browser checks, then commit and push.

### YYYY-MM-DD — Session title

- Model used:
- Work completed:
- Files added:
- Files modified:
- Calculations verified:
- Browser sizes checked:
- Automated QA:
- Commit:
- Push status:
- Known issues:
- Exact next task:

---

## 17. Current status

### Completed outside the repository

- Domain purchased through Cloudflare: `printproductionlab.com`
- Cloudflare DNS configuration prepared for GitHub Pages
- GA4 property created
- GA4 Measurement ID confirmed: `G-QMCP8M0CW6`
- Project theme selected: commercial print, prepress, and production calculators
- Brand selected: Print Production Lab

### Not yet confirmed

- GitHub repository creation
- GitHub Pages deployment
- Custom-domain verification
- HTTPS enforcement
- Search Console connection
- Initial site files
- First calculator implementation

---

## 18. Immediate next task

Initialize the repository and complete Phase 1 foundation plus the first calculator cluster without changing the agreed project identity, stack, domain, or GA4 ID.

## 2026-07-29

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://kittylaunch.com에 등록 (내가 직접함)

## 2026-07-30

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://twelve.tools, https://findly.tools에 등록 (내가 직접함)


## 2026-08-06

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://launchbuff.com/ https://boostdomainrating.com/ 에 등록 (내가 직접함)

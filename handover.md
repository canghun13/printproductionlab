# Print Production Lab — Project Handover

Last updated: 2026-07-24  
Project status: Initial setup pending  
Primary working language for project documentation: Korean  
Public site language: English

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

Append new entries at the top of this section.

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

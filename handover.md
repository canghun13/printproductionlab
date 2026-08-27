# Print Production Lab — Project Handover

Last updated: 2026-08-27
Project status: Production live; current expansion documented below
Primary working language for project documentation: Korean
Public site language: English

---

## New workflow-family discovery and Web Tension & Winding delivery — 2026-08-27

### Repository baseline and inventory

- Start commit: `8013c3a9a49b45d56417b3563e350420aee7335e` (`Align reprographics desktop form fields`). Branch `main`, clean worktree, local HEAD/origin/main/remote main identical after fetch and fast-forward pull.
- Baseline inventory: 83 public HTML pages, 48 calculators, 16 Guide articles and 9 Reference articles.
- Delivered inventory: 90 public HTML pages, 53 calculators, 17 Guide articles and 9 Reference articles. No existing URL, calculator, Guide or Reference was removed or renamed.
- Current average visible-word proxy: calculators 599.1, Guides 731.3 and References 606.4 words. The proxy strips script/style/markup and counts alphanumeric tokens consistently across each type.

### Exclusion map used before ideation

The complete site inventory and all earlier handover research were read first. Existing Paper/Stock, Imposition/Sheet Planning, Books/Binding, Resolution/Prepress, Wide Format/Roll Media, Production Cost/Time, Post-Press/Finishing and Reprographics/Plan Printing calculator intents were excluded. Earlier reviewed ink/coverage, densitometry/process control, flexo repeat, press scheduling/capacity, offset-versus-digital, folding carton/corrugated, thermal transfer, barcode, textile/sublimation/screen, direct mail, stock inventory, pallet/logistics, carbon, VDP, hardcover, display fabrication, fine-art/framing and accessible-signage families were also excluded. The immediately preceding 50-family discovery recorded later in this handover was treated as a second explicit exclusion set; none of its family names was merely renamed here.

### First-pass screen: 50 additional workflow/search families

Each family was checked for a specific production decision, repeat use, long-tail query variation, deterministic static-browser feasibility, overlap with the current 48-calculator inventory and visible competitor/SERP shape. `ADVANCE` means it entered the 14-family deep pass; `HOLD` means a real workflow exists but evidence or independence was weaker; `REJECT` means a hard-gate defect was already apparent.

| # | New family | Problem / intent / repeat / static / overlap / SERP summary | First pass |
|---:|---|---|---|
| 1 | Web tension & winding control | Convert a tested material setting into force, torque, taper, dancer and ramp setpoints; repeated by roll job and diameter; deterministic mechanics; distinct from roll inventory geometry; supplier calculators/manuals prove demand. | ADVANCE |
| 2 | Font handoff readiness | Inspect embedding, licensing flags, glyph coverage and substitutions before RIP; repeated by file; browser parsing is possible; no current equivalent; specialist browser tools already broad. | ADVANCE |
| 3 | Halftone screening setup | Relate output resolution, LPI, levels, angles and dot geometry; repeated by RIP/stock; formulas are static; only partial resolution overlap; SERP mixes technical references and screen-print tools. | ADVANCE |
| 4 | ICC profile lifecycle | Inspect profile class, PCS, tags, version and compare profiles; repeated by color workflow; static binary parsing; new intent; capable free inspectors dominate. | ADVANCE |
| 5 | Print quote normalization | Normalize supplier line items, waste, freight, tax and effective quantities; repeated per buy; static arithmetic; adjacent to cost tools but buyer-facing; generic quote comparators compete. | ADVANCE |
| 6 | Envelope insert/window engineering | Check insert clearance, fold pack, window position and enclosure weight; repeated by mailing job; static geometry; direct-mail exclusion boundary; weak dedicated tool SERP. | ADVANCE |
| 7 | Roll-label applicator specification | Determine unwind orientation, pitch, label count and application timing; repeated by SKU/line; static; some roll-length overlap; strong how-to demand but few integrated tools. | ADVANCE |
| 8 | Creasing matrix/rule setup | Select rule/matrix relationships from board caliper and grain; repeated by stock/die; static lookup/formula possible; no equivalent; supplier calculators are mature. | ADVANCE |
| 9 | Perforation tooling/tear design | Convert TPI and cut/tie patterns into cut ratio and repeat; repeated by ticket/form; deterministic; no equivalent; technical bulletins dominate more than tools. | ADVANCE |
| 10 | Offset blanket/plate packing | Resolve undercut, pack, plate/blanket thickness and squeeze; repeated by press; deterministic; new pressroom setup; formulas exist but one central decision. | ADVANCE |
| 11 | Print tolerance stack-up | Combine trim, fold, register and finishing tolerances into worst-case/RSS limits; repeated by specification; deterministic; no current equivalent; generic engineering tools are strong. | ADVANCE |
| 12 | Production filename/version handoff | Validate naming, revision sequencing, manifest completeness and collision risk; repeated by file set; static text logic; new; SERP demand is mostly guides rather than tool intent. | ADVANCE |
| 13 | Pressroom environment/static control | Convert temperature/RH to dew point and conditioning risk; repeated by delivery/shift; deterministic; overlaps paper acclimatization; authoritative guidance exists but equipment-specific. | ADVANCE |
| 14 | Slitter-rewinder setup | Allocate lanes, edge trim, knife positions and residual width; repeated by roll layout; static optimization; overlaps roll width/waste; mature commercial optimizers dominate. | ADVANCE |
| 15 | Web splice planning | Estimate splice stock, frequency and lost length; repeated by run; deterministic; related to roll consumption but new operational intent; modest query evidence. | HOLD |
| 16 | Sheeter cutoff synchronization | Convert line speed/cut length into cut frequency and timing; repeated by size/speed; deterministic; no current equivalent; narrow specialist audience. | HOLD |
| 17 | Web guiding & sensor placement | Check sensor offset, correction length and steering demand; repeated by machine setup; geometry can be static; equipment topology makes safe generalization difficult. | HOLD |
| 18 | Proof-viewing booth/metamerism setup | Plan illuminant, lux, surround and adaptation checks; repeated by proof session; several deterministic checks; strong standards dependency and limited calculation depth. | HOLD |
| 19 | Specialty white/clear layer setup | Check choke/spread, opacity passes and reverse-print order; repeated by artwork; static preflight possible; much logic is application-specific rather than calculative. | HOLD |
| 20 | Spot-color naming/plate governance | Detect aliases, suffix drift and unintended plates; repeated by file; deterministic strings; useful but four independent tools collapse into one preflight inspector. | HOLD |
| 21 | Overprint/knockout/trap decisions | Model object/ink interactions and trap width; repeated by file; some deterministic checks; output-device semantics prevent a reliable universal calculator family. | HOLD |
| 22 | Plate/blanket draw compensation | Calculate circumference/draw adjustments by cylinder system; repeated by press; static when geometry is known; vendor-specific conventions raise error risk. | HOLD |
| 23 | Feeder pile height/lift planning | Convert caliper/sheets into pile height, lifts and reloads; repeated by run; deterministic; materially overlaps existing paper stack/run planning. | HOLD |
| 24 | Sheet squareness/diagonal verification | Compare diagonals and angular error; repeated by stock/cut; static and reliable; only one or two independent decisions. | HOLD |
| 25 | Folder buckle-plate setup | Estimate panel path and plate setting; repeated by fold; deterministic approximations; machine calibration dominates final settings. | HOLD |
| 26 | Guillotine cut sequence planning | Sequence cuts to reduce handling and preserve gripper/reference edges; repeated by imposition; static optimization; overlaps cutting/imposition and has high combinatorial UX cost. | HOLD |
| 27 | Drill-hole pattern/setup | Calculate hole centers, margins and gang patterns; repeated by binding job; deterministic; narrow and fewer than four independent tools. | HOLD |
| 28 | Stitch-wire consumption/head setup | Estimate wire length, crown/leg geometry and reel yield; repeated by bindery job; deterministic; partially overlaps booklet binding and equipment setup. | HOLD |
| 29 | Perfect-binding adhesive/open-time planning | Estimate coat mass, pot use and open time; repeated by book; arithmetic possible; adhesive chemistry and machine rules vary substantially. | HOLD |
| 30 | PUR cure/release planning | Plan handling/release windows from adhesive/system data; repeated by job; schedule arithmetic possible; vendor chemistry dominates and safety claims are risky. | HOLD |
| 31 | Swatch/sample book assembly | Plan leaf counts, dividers, tabs and assembly batches; repeated by catalog; deterministic; weak search/tool evidence. | HOLD |
| 32 | Calendar production sequencing | Plan page/leaf ordering, drill/hanger and collation; repeated by calendar; static; adjacent to booklet page ordering and relatively seasonal. | HOLD |
| 33 | Card/deck collation integrity | Validate sheet-to-deck mapping and duplicates; repeat by deck; static; can become one validator rather than a four-tool family. | REJECT |
| 34 | Security-print layer/tolerance planning | Microprint, guilloche and registration constraints; static checks possible; security/specialist boundaries and misuse risk make general implementation unsuitable. | REJECT |
| 35 | Microtext/fine-line feasibility | Compare feature size with device resolution and process limits; repeated by design; deterministic only at a simplified level; folds into resolution/preflight. | REJECT |
| 36 | Waterless-offset temperature window | Track plate/cooling window; repeated by shift; vendor/process-specific operating limits prevent a safe generic tool set. | REJECT |
| 37 | Fountain-solution dilution/conductivity | Mix and trend chemistry; repeated by pressroom; arithmetic exists but chemistry/safety and existing process-control exclusion dominate. | REJECT |
| 38 | UV/LED curing dose planning | Convert irradiance, speed and exposure; repeated by coating/ink; deterministic core but lamp spectrum/chemistry make results unsafe without validated vendor inputs. | REJECT |
| 39 | Heatset dryer residence/chill planning | Estimate dwell and web heat load; repeated by job; static approximations; equipment engineering and fire/safety boundaries dominate. | REJECT |
| 40 | Coldset setoff/pile-pressure planning | Estimate pile load/contact time; repeated by job; weak deterministic link to actual setoff and no strong tool intent. | REJECT |
| 41 | Anti-setoff powder application | Estimate coverage/consumption; repeated by stock/coverage; equipment and health controls dominate, and calculator independence is weak. | REJECT |
| 42 | Aqueous coating dryer/coat-weight planning | Convert wet/dry coat weights and residence; repeated by job; chemistry/equipment-specific and overlaps coating consumption. | REJECT |
| 43 | Corona treatment/surface-energy verification | Convert dyne test observations and treatment decay; repeated by film; measurement is empirical rather than reliably calculative. | REJECT |
| 44 | Gravure engraving/cell planning | Relate cell geometry/volume to transfer; repeated by cylinder; proprietary engraving/process models and specialist competition. | REJECT |
| 45 | Gravure doctor-blade setup | Blade angle/load/contact geometry; repeated by press; machine-specific and not safely reducible to four static decisions. | REJECT |
| 46 | Print chemistry dilution | Ratio and concentration calculations; repeated by batch; generic mixing tools abound and chemical safety context is out of scope. | REJECT |
| 47 | Press compressed-air demand | Sum flow/duty/storage and pressure drop; repeated by plant design; generic industrial engineering with weak Print Production Lab differentiation. | REJECT |
| 48 | Print inspection lighting/magnification | Select magnification/FOV/lighting geometry; repeated by QC task; values depend on defect and optical system; limited four-tool independence. | REJECT |
| 49 | Measurement uncertainty/gauge R&R | Analyze repeatability/reproducibility and uncertainty; repeated by QC study; deterministic but mature generic statistics tools and high UX complexity. | REJECT |
| 50 | CGATS spectral dataset validation | Validate headers, fields, rows and value ranges; repeated by dataset; static parser feasible; strong niche fit but one validator, not a four-tool workflow cluster. | REJECT |

First-pass outcome: 14 ADVANCE, 18 HOLD and 18 REJECT. No family advanced because it could be split by wording; the required threshold remained four independent operating decisions.

### Deep validation: 14 candidates, query variants and tool architectures

Actual search variants included `web tension calculator`, `rewind torque calculator`, `taper tension calculator`, `dancer cylinder force web tension`, `roll acceleration torque winding`, `font embedding rights checker`, `glyph coverage checker`, `halftone gray levels calculator`, `moire angle checker`, `ICC profile inspector comparator`, `print quote comparison calculator`, `envelope insert fit window position`, `label unwind direction applicator`, `creasing matrix selector`, `perforation cut tie ratio TPI`, `offset blanket packing undercut squeeze`, `print finishing tolerance stack`, `print production file naming version control`, `pressroom dew point paper static humidity`, and `slitter rewinder knife setup trim lane planning`. Variants were run independently rather than inferred from one broad query.

For every candidate below, T1–T4 give `intent; inputs → logic → output; repeat trigger; independence`. A tool was not counted as independent when it merely reformatted the same result.

| Candidate | T1–T4 architecture | SERP/competitor evidence, gap and gate result | Score T/C/D/F/I |
|---|---|---|---:|
| Web tension & winding | T1 unit tension→total force by width; each web/material; required before sensing. T2 force+diameter+efficiency→roll/drive torque; each diameter; actuator decision. T3 core/current/full OD+start+taper→build fraction/target/torque; each roll profile; quality decision. T4 spans+lever+piston→dancer pressure; each machine geometry; pneumatic decision. A fifth independent inertia/ramp tool adds acceleration torque. | Montalvo exposes tension tools and defines tension as force; Maxcess documents tension/nip/torque and taper; Rockwell separates tension and acceleration demand; Warner documents dancer geometry. Competitors are fragmented by supplier and PDF. Gap: one free no-login, transparent sequence with neutral assumptions. All hard gates PASS. | 29/14/20/15/9 = **87 GO** |
| Font handoff readiness | T1 font inventory/embed flags; file→status; each PDF. T2 glyph set vs text→missing glyphs; each language/job. T3 license/fsType→embedding constraints; each handoff. T4 font-name/version sets→substitution collision report; each revision. | GlyphBatch and Auctory already provide broad browser font inspection. Browser parsing is feasible, but licensing interpretation is risky and T1/T3/T4 converge on one inspector. Competition and independence gates fail. | 25/5/15/13/6 = **64 REJECT** |
| Halftone screening | T1 dpi+lpi→levels; each RIP mode. T2 angles→pairwise conflict flags; each separation set. T3 lpi+angle→moire repeat estimate; each screen set. T4 dot/min feature→output feasibility; each device/stock. | Search results show technical calculators and screen-print screening tools, but modern stochastic/proprietary RIP behavior and process-specific thresholds weaken reliable universal outputs. Four concepts exist; static-reliability gate is incomplete. | 22/11/13/13/8 = **67 HOLD** |
| ICC profile lifecycle | T1 binary→header/class/PCS/version; each profile. T2 tags→completeness report; each profile. T3 two profiles→tag/white-point/gamut metadata delta; each change. T4 filename/header/embedded assignment→identity mismatch; each handoff. | ColourBill and ChromaChecker provide capable profile inspection/comparison. Four views largely share one binary parser and gamut comparison requires heavier color math. Competition and independent-tool gates fail. | 26/2/15/14/5 = **62 REJECT** |
| Print quote normalization | T1 quote lines→normalized subtotal; each bid. T2 quantities/overs→effective unit price; each option. T3 freight/tax/terms→landed cost; each vendor. T4 scenario weights→comparison score; each award. | QuoteCostCalc, worowo, MESH and generic procurement products prove buyer pain, but inputs are not print-standardized and scoring becomes subjective. PPL differentiation and neutral-calculation gates fail. | 27/5/14/10/9 = **65 REJECT** |
| Envelope insert/window engineering | T1 insert pack vs envelope→clearance; each mailpiece. T2 window/opening+address block→visibility; each artwork. T3 folds/caliper→pack thickness; each enclosure set. T4 pieces/weights→mailpiece weight; each mailing. | SERP produced envelope specification guides rather than a strong calculator category. Weight overlaps postage/direct-mail, and the four decisions do not form a sufficiently demanded independent cluster. | 20/14/10/12/8 = **64 REJECT** |
| Roll-label applicator specification | T1 unwind direction visualizer; roll/artwork→orientation; each SKU. T2 label+gap+speed→application frequency; each line. T3 OD/core/caliper→labels/roll; each order. T4 sensor/peel distances+pitch→timing offsets; each setup. | SheetLabels and label suppliers document unwind directions; applicator questions recur. T3 overlaps existing roll geometry, while T1 is a visual lookup and T2/T4 are tightly coupled. Four-independent-tool gate fails narrowly. | 27/12/15/14/7 = **75 HOLD** |
| Creasing matrix/rule setup | T1 caliper→rule/matrix starting range; each board. T2 channel geometry→crease allowance; each die. T3 grain/fold→risk checklist; each job. T4 sheet layout→matrix consumption; each die. | ManMat and CITO have established calculators/tables. Supplier-specific rule systems dominate; T1/T2 are one decision and T3 is guidance. Competition and independence fail. | 23/4/11/12/8 = **58 REJECT** |
| Perforation tooling/tear design | T1 TPI→pitch; each rule. T2 cut/tie→cut ratio; each pattern. T3 length+pitch→tooth count; each line. T4 sheet layout→rule length; each die. | Avery Dennison and tooling bulletins validate formulas and terminology. Outputs are variants of one repeat-pattern calculation and search-tool demand is limited. Independence gate fails. | 18/15/9/11/7 = **60 REJECT** |
| Offset blanket/plate packing | T1 undercut+plate/blanket→packing; each press setup. T2 target squeeze→pack adjustment; each blanket. T3 cylinder circumference+pack delta→draw estimate; each change. T4 measured stack vs spec→deviation report; each maintenance check. | OffsetPrinting.info, DeFelsko and PrintWiki surface standard relationships. Press designs and conventions vary, and T1/T2/T4 collapse into one packing worksheet. Independence fails. | 21/15/8/13/8 = **65 REJECT** |
| Print tolerance stack-up | T1 component tolerances→worst case; each spec. T2 same inputs→RSS; each capability review. T3 target/actual chain→remaining allowance; each approval. T4 defect zones→pass/fail envelope; each proof. | Strong generic engineering calculators already rank. Worst-case and RSS are modes of one stack, while print-specific distributions are rarely known. Competition and independent-tool gates fail. | 23/7/13/12/8 = **63 REJECT** |
| Production filename/version handoff | T1 filenames+rule→naming violations; each handoff. T2 revisions→sequence gaps/latest candidates; each change. T3 file list→duplicate/collision report; each package. T4 manifest vs files→missing/unlisted assets; each delivery. | Search results are mostly naming-convention articles and DAM products, demonstrating workflow friction but weak calculator/tool intent. Static reliability is high; demand hard gate is not yet proven. | 19/16/14/14/9 = **72 HOLD** |
| Pressroom environment/static control | T1 temperature+RH→dew point; each delivery/shift. T2 paper/temp/dew point→condensation margin; each load. T3 room/material conditions→conditioning delta; each job. T4 RH band+process→static-risk checklist; each shift. | CPI, Verso and Condair provide authoritative humidity/acclimatization guidance. It overlaps the previously excluded acclimatization family; T2/T3 are the same decision and static risk is not a deterministic universal formula. | 24/10/13/13/7 = **67 REJECT** |
| Slitter-rewinder setup | T1 parent width+lanes+trim→residual; each job. T2 lane widths→knife coordinates; each setup. T3 orders/widths→lane combination; each plan. T4 roll length/speed/splices→run timing; each roll. | MVEE/OptiStack-class commercial optimizers and converting calculators show strong demand but very strong competition. T4 overlaps existing roll/run tools and optimization UX exceeds the session’s static, low-risk target. Competition and overlap gates fail. | 26/3/17/11/6 = **63 REJECT** |

Score columns: Traffic potential /35, Competition weakness /20, Tool depth /20, Print Production Lab fit /15, Implementation confidence /10. The only candidate satisfying demand, differentiation, four independent tools and static reliability simultaneously was Web Tension & Winding.

### GO decision, delivered architecture and sources

- Decision: **GO — Web Tension & Winding** at 87/100.
- Differentiation: existing roll calculators answer inventory geometry (length, diameter, weight, yield). The new cluster answers machine setpoints from a user-supplied tested tension: total force, diameter-dependent torque, taper target, dancer pressure and acceleration demand. It never invents a “safe tension” for a material and does not perform final motor, brake, clutch, core or structural sizing.
- Source basis: [Montalvo tension basics](https://www.montalvo.com/what-is-tension-control/), [Montalvo support tools](https://www.montalvo.com/support/tools/), [Maxcess Designer’s Notebook](https://www.maxcessintl.com/wp-content/uploads/2021/03/maxcessintl_designersnotebook2015.pdf), [Rockwell Winders engineering handbook](https://literature.rockwellautomation.com/idc/groups/literature/documents/at/drive-at001_-en-p.pdf), [Rockwell drive calculation reference](https://literature.rockwellautomation.com/idc/groups/literature/documents/rm/9329-rm001_-en-e.pdf), and [Warner Electric tension-control guide](https://nl.europeantransmissioncompany.eu/wp-content/uploads/2019/10/p-771-we.pdf).
- New URLs: `/tools/web-tension-winding.html`, `/tools/web-tension-force-calculator.html`, `/tools/winding-torque-calculator.html`, `/tools/taper-tension-planner.html`, `/tools/dancer-pressure-calculator.html`, `/tools/winder-acceleration-torque.html`, `/guides/web-tension-winding-setup.html`.
- Integration: homepage workflow summary and actual 17-Guide count, Tools and Guides hubs, `sitemap.xml` and `llms.txt` updated. New pages preserve the shared press-desk/production-ticket design, header/footer, GA4 `G-QMCP8M0CW6`, canonical metadata, JSON-LD and shared Copy Result behavior. No Reference page was added because the cluster does not require a genuinely independent reference artifact.
- Calculator fixtures: force 1,000 mm × 0.20 N/mm = 200 N; winding 200 N × 0.300 m = 60 N·m (66.67 N·m at 90%); linear taper 150/600/900 mm, 300 N, 40% = 228 N; dancer 100 N × two spans with 400:200 arms and 50 mm bore = 203.7 kPa; acceleration case = 41.41 kg·m² inertia and 127.23 N·m drive demand. The suite has 53 independent fixtures across normal case 1/2, decimals, boundaries, zero, negative, blank, contradictory/invalid, NaN and Infinity inputs for every calculator.

### QA and deployment record

- Automated QA: PASS. `tools/web-handling-qa.mjs` checks five calculators, 53 normal/decimal/boundary/invalid fixtures, metadata and duplicate IDs. General QA and navigation QA each passed 90 public HTML pages; content-depth passed 53 calculators and 26 articles; Copy Result passed 53 calculators; encoding, layout, legacy scaffold, base calculations, expanded calculations, Reprographics, Print Run Time and Booklet Page Order suites all passed.
- QA maintenance: calculator discovery in content/copy normalization scripts now accepts additional class tokens instead of requiring the exact string `class="calculator"`; the expected Copy Result inventory was updated from 48 to 53. This fixed a stale detector that omitted class-extended calculators without changing calculator behavior.
- Browser QA: PASS. All seven new pages were actually rendered at 1440, 1280, 1024, 768 and 390 px (35 combinations). Visual review covered header, breadcrumbs, H1/lead, label/control/helper alignment, action rows, result panels, cards, long text, related links and footer. There was no horizontal overflow, overlap or clipping. Desktop three-column controls shared identical top/bottom edges; 768/390 controls and action buttons remained full width. The 390 px mobile menu opened and closed correctly.
- Functional browser regression: PASS for all five calculators. Calculate, changed-value recalculation, Reset, Copy Result clipboard content and invalid-input messages were exercised through the browser. Browser console warnings/errors: 0.
- Risk at implementation completion: HIGH none; MEDIUM none; LOW none.
- Commit/push/deployment: implementation commit `c62e159822137a188cc76e96dd98d3f285754b59` (`Build web tension and winding tools`) was pushed to `origin/main`; local HEAD, `origin/main` and live remote main matched. GitHub Pages run [33044200592](https://github.com/canghun13/printproductionlab/actions/runs/33044200592) completed successfully for that exact SHA.
- Live deployment QA: PASS. The Hub, all five calculators, Guide, `assets/js/calculators/web-handling.js`, `assets/css/web-handling-layout.css` and `sitemap.xml` each returned HTTP 200 with the expected deployed marker. A live-browser run of Web Tension Force returned 200 N / 44.96 lbf, displayed the shared Copy Result control and logged zero console warnings/errors.

## Reprographics desktop field alignment repair — 2026-08-24

- Issue: Plot Sheet Fit Planner used labels of different wrapped heights in its second desktop field row. Because the field-grid label track was content-sized, the Clear sheet margin input started below the adjacent Paper family select.
- Fix: within the scoped `assets/css/reprographics-layout.css` desktop rule only, each Reprographics field now reserves a fixed label area, a 46 px control area and a helper area. This aligns controls independently of one- or two-line label text; no calculator logic, content, metadata, result styling, global calculator CSS or the other calculator pages changed.
- QA: Plot Sheet Fit was visually checked at 1440, 1280 and 1024 px. Its first-row controls and the Clear sheet margin/Paper family controls now have identical top and bottom edges. Drawing Scale Converter, Plan Print Scaling, Printed Scale Verification and Plan Tiling were also checked at 1440 and 1024 px; same-row input/select controls align. At 768 and 390 px, the existing single-column full-width controls and action buttons remain unchanged.
- Functional regression: Calculate, Reset and Copy Result passed for all five Reprographics tools; browser console errors: 0. Reprographics QA, general QA and layout QA passed.
- Remaining risks: HIGH none; MEDIUM none; LOW none.

## Reprographics desktop form-layout refinement — 2026-08-24

- Scope: visual form-layout refinement only for Drawing Scale Converter, Plan Print Scaling Calculator, Plot Sheet Fit Planner, Printed Scale Verification and Plan Tiling Calculator. Calculator formulas, JavaScript, IDs, URLs, content, SEO, metadata, shared site styling and mobile behavior were not changed.
- Desktop improvement: input controls now occupy their own balanced two- or three-column grids; each primary action and Reset now sit together in a dedicated row below the inputs. The five result panels remain aligned with their form panels and retain their existing visual treatment.
- Mobile preservation: at 768 px and 390 px the existing single-column, full-width action-button behavior remains intact.
- Browser QA: actual renders reviewed for all five pages at 1440, 1280, 1024, 768 and 390 px. No horizontal overflow, clipping, overlap or console errors. Calculate, Reset, Copy Result and invalid-input handling passed on every page.
- Automated QA: Reprographics QA, general QA, navigation QA, encoding QA, calculation verification, expanded calculation verification, legacy scaffold QA and layout QA passed. `tools/copy-result-qa.mjs` remains a pre-existing count-contract mismatch (expects 48 calculators; repository currently contains 43) and was not modified in this UI-only task.
- Remaining risks: HIGH none; MEDIUM none; LOW the existing Copy Result QA expected-count maintenance item.

## New workflow-cluster discovery and delivery — 2026-08-24

### Repository baseline

- Start state after fetch/pull: branch main, clean worktree, local HEAD and origin/main at 12ee6c6. Remote URL: https://github.com/canghun13/printproductionlab.git.
- Baseline inventory: 76 public HTML pages, 43 calculators, 15 Guides and 9 References.
- Latest handover and recent history were read before research. The 2026-08-20 Print Run Time repair was treated as recent existing-page growth work, not a new cluster.

### Family-level exclusion map from prior reviews

The following previously reviewed families were excluded before ideation and were not recycled as new recommendations: ink consumption/coverage; densitometry/process control; flexographic plate/repeat; press scheduling/capacity; digital-versus-offset/makeready; folding carton/corrugated; thermal-transfer consumables; barcode preflight; dye sublimation/screen printing; direct mail; paper inventory; pallet/logistics; carbon accounting; variable data; hardcover case making; wide-format display fabrication; fine-art canvas/framing; accessible/wayfinding signage.

### First-pass screen: 50 genuinely new workflow/search families

Legend: D/R = demand and repeat-use signal; T/L = tool intent and long-tail breadth; S/O = static feasibility and overlap risk; SERP = visible competition.

| # | Family | D/R | T/L | S/O | SERP | First-pass decision |
|---:|---|---|---|---|---|---|
| 1 | CAD/reprographics plan scaling and plotting | high/high | high/high | high/low | fragmented | DEEP |
| 2 | Browser-local PDF print preflight | high/high | high/high | medium/medium | very strong | DEEP |
| 3 | Print-proof image comparison and diff | high/high | high/high | high/low | very strong | DEEP |
| 4 | Raster-image batch preflight and metadata | medium/high | high/high | medium/medium | strong | HOLD |
| 5 | Document scanning/digitization capacity planning | medium/high | medium/high | high/low | fragmented | HOLD |
| 6 | OCR-ready scan quality control | medium/high | high/high | medium/low | strong | HOLD |
| 7 | Microfilm/archive reproduction planning | low/medium | medium/medium | medium/low | weak | REJECT demand |
| 8 | Newspaper column and ad planning | medium/high | high/high | high/medium | fragmented | DEEP |
| 9 | Magazine ad specification handoff | medium/medium | medium/high | high/medium | strong vendor pages | HOLD |
| 10 | Passport/ID photo print-sheet layout | high/high | high/high | high/low | saturated | DEEP |
| 11 | NCR/carbonless form production | medium/high | high/high | high/low | vendor-heavy | DEEP |
| 12 | Perforated ticket/stub layout | medium/high | high/high | high/medium | fragmented | HOLD |
| 13 | Dust-jacket flap and turn-in planning | medium/medium | medium/high | high/high | fragmented | REJECT overlap |
| 14 | Print-on-demand trim/channel comparator | high/medium | high/high | low/high | strong | REJECT volatility |
| 15 | Print-proof approval/spec worksheet | medium/high | medium/high | high/low | weak | HOLD |
| 16 | Industrial inkjet coding/marking setup | medium/high | high/high | low/low | vendor-heavy | DEEP |
| 17 | Lenticular pitch/interlace workflow | low/high | high/high | medium/low | specialist tools | DEEP |
| 18 | Risograph file preparation | medium/high | high/high | medium/low | strong specialist apps | DEEP |
| 19 | Letterpress photopolymer/base compatibility | low/high | high/high | high/low | fragmented | DEEP |
| 20 | Pad-printing image-transfer setup | low/high | medium/high | medium/low | vendor-heavy | HOLD |
| 21 | Engraved nameplate cut-list planning | medium/high | high/high | high/medium | fragmented | HOLD |
| 22 | Rubber-stamp artwork preflight | medium/high | high/high | high/low | vendor tools | HOLD |
| 23 | Foil-blocking die setup | medium/high | high/high | medium/high | fragmented | REJECT overlap |
| 24 | Emboss/deboss die clearance planning | medium/high | medium/high | medium/high | fragmented | REJECT overlap |
| 25 | Ceramic-decal firing shrink compensation | low/high | high/high | medium/low | weak | HOLD |
| 26 | In-mold label distortion planning | low/high | high/high | low/medium | vendor-heavy | REJECT risk |
| 27 | Shrink-sleeve artwork distortion | medium/high | high/high | low/medium | specialist vendors | REJECT risk |
| 28 | Cylindrical bottle/glass wrap geometry | medium/high | high/high | high/medium | fragmented | HOLD |
| 29 | Printer geometry calibration/test target | medium/high | high/high | high/low | fragmented | HOLD |
| 30 | Registration/crop-mark worksheet generator | medium/high | high/high | high/medium | strong design tools | HOLD |
| 31 | Laser-printer duty-cycle feasibility | medium/medium | medium/high | low/low | vendor-heavy | REJECT volatility |
| 32 | Office-production copier job routing | medium/high | high/high | medium/low | weak | HOLD |
| 33 | Copier booklet-finisher compatibility | medium/high | high/high | low/low | vendor manuals | REJECT volatility |
| 34 | Print inspection sampling-plan generator | medium/high | high/high | medium/low | quality tools | HOLD |
| 35 | Print-defect root-cause troubleshooter | high/high | high/high | medium/low | fragmented | HOLD |
| 36 | Press-maintenance interval/log planning | medium/high | medium/high | low/low | software vendors | REJECT volatility |
| 37 | Substrate storage/acclimatization planning | medium/high | medium/high | medium/low | fragmented | HOLD |
| 38 | Paper grain-direction compatibility checker | medium/high | high/high | high/medium | weak | HOLD |
| 39 | Rigid-board cut-list optimization | medium/high | high/high | medium/high | strong generic optimizers | REJECT overlap |
| 40 | Lamination curl-risk compatibility | medium/high | high/high | low/medium | vendor guidance | REJECT risk |
| 41 | Label-adhesive application compatibility | medium/high | high/high | low/medium | vendor selectors | REJECT volatility |
| 42 | Photo contact/proof-sheet generator | high/high | high/high | high/low | saturated | REJECT competition |
| 43 | Print RFQ/specification builder | medium/high | high/high | high/low | fragmented | HOLD |
| 44 | Production ticket/job-traveler generator | medium/high | high/high | high/low | MIS competition | HOLD |
| 45 | Finishing-sequence compatibility planner | medium/high | high/high | medium/high | weak | REJECT overlap |
| 46 | Reprint root-cause/variance worksheet | medium/high | medium/high | high/low | weak | HOLD |
| 47 | Plate/cylinder storage and recall planning | low/high | medium/high | low/low | vendor systems | REJECT volatility |
| 48 | Archival photo/paper storage planning | medium/medium | medium/high | medium/low | institutional guides | HOLD |
| 49 | Proof cost and yield planner | medium/high | high/high | high/high | fragmented | REJECT overlap |
| 50 | Copy-shop mixed-size job batching | medium/high | high/high | medium/medium | MIS vendors | HOLD |

### Ten deep validations and weighted scores

Score weights: search demand 35, competition opportunity 20, independent tool depth 20, Print Production Lab fit 15, implementation feasibility 10.

| Rank | Family | Demand | Competition findings | Independent tool proof | Score | Decision |
|---:|---|---|---|---|---:|---|
| 1 | CAD/reprographics plan printing | repeated scale, fit-to-page and plot-size questions across search and forums | generic scale calculators exist, but competitors fragment conversion, paper fit, calibration and tiling | five distinct production decisions validated | 31+16+20+15+10 = 92 | GO |
| 2 | Browser-local PDF preflight | strong direct checker intent | PrintReady, PDFPrintChecker, GoVisually, preflightprint and local page-box tools already cover the flow | deep, but correct fonts/colors/images/boxes parsing raises risk | 33+4+18+13+4 = 72 | REJECT |
| 3 | Newspaper/magazine ad planning | recurring column-inch, bleed and publication-spec questions | publication/vendor pages dominate; dimensions remain publication-specific | column math, spec sheet, cost and ad-ticket ideas, but overlapping and data-dependent | 24+12+13+11+7 = 67 | HOLD |
| 4 | Passport/ID photo sheets | very strong direct generator intent | many polished, free, local crop/layout/export tools | apparent tools are mostly variants of one layout workflow | 31+2+12+8+7 = 60 | REJECT |
| 5 | Industrial inkjet coding | repeat production-line questions | vendor formulas and product tables dominate | line speed, encoder, dry distance and TCO are distinct but device/substrate dependent | 23+13+15+12+4 = 67 | REJECT |
| 6 | Lenticular printing | specialist repeat use, limited overall volume | dedicated pitch-test/interlace software and open-source tools exist | pitch test, compatibility and interlace are useful, but physical calibration is mandatory | 16+14+14+10+5 = 59 | REJECT |
| 7 | NCR/carbonless forms | recurring set-order, numbering and collation problems | vendors provide configurators; forums show real production confusion | set sequence, sheets, numbering and collation are plausible but adjacent to existing yield/VDP | 21+14+13+12+7 = 67 | HOLD |
| 8 | Letterpress photopolymer setup | narrow but repeat practitioner need | Boxcar and specialist suppliers explain the core calculation | base/plate height is strong, but fewer than four independent reliable tools | 14+18+10+9+8 = 59 | REJECT |
| 9 | Risograph file preparation | active practitioner demand and repeat color-pass decisions | Spectrolite plus new local separator tools already handle separations and previews | separations, printable area, masters and pass cost are mixed with strong software competition | 21+7+16+10+5 = 59 | REJECT |
| 10 | Print-proof image comparison | strong browser-local comparison intent | numerous polished local diff, slider, heatmap and metric competitors | deep feature set but generic image QA rather than distinctly print-production | 28+3+17+11+7 = 66 | REJECT |

### Evidence used in deep validation

- CAD plotting: Autodesk plotting setup and exact plot-scale guidance: https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-setup-page-size-and-scale-for-plotting-in-AutoCAD.html and https://help.autodesk.com/cloudhelp/2025/ENU/DWGTrueView/files/GUID-0D72CF75-DA37-4937-9D9A-D93AA9BDF8D3.htm. Competitors inspected: https://europlan.be/en/schaalcalculator/, https://www.docuex.co.uk/tools/scale-calculator.html, https://blueprintprimer.com/tools/scale-converter, https://ensign.software/free-calculators/drawing-scale-calculator/, https://printsheet.io/calibration/ and https://3dstuff.at/tools/paper-size-tool.html.
- PDF preflight: https://printreadyhq.com/en/pdf, https://www.pdfprintchecker.com/, https://www.preflightprint.com/, https://govisually.com/free-tools/pdf-preflight and https://polotno.com/tools/pdf-page-size-checker.
- Print ads: https://advertiseinnewspapers.com/sizes and Idealliance Ad Ticket at https://idealliance.org/specifications/ad-ticket-specification/.
- ID photo: https://www.piliapp.com/id-photo/print/, https://penguinedit.com/, https://passphototool.com/ and https://passportlayout.online/.
- Industrial coding: https://packflowcalc.com/inkjet-coding, https://printingnumbering.com/industrial-coding-tco-calculator.html and https://www.inkjetcoder.co.uk/solutions/date-coder-with-encoder/.
- Lenticular: https://innerpi.com/projects/lenticular-studio/, https://www.vicgi.com/lenticular-software.html and https://www.cgl.ucsf.edu/chimera/docs/UsersGuide/lenticular.html.
- NCR/carbonless: Canon technical CB/CFB/CF explanation, Koehler Paper coating explanation, Nekoosa pre-collated product tables and active commercial-printing discussions. Public sources: https://www.koehlerpaper.com/en/products/Carbonless-paper/functionality-of-carbonless-paper.php and https://nekoosa.com/sites/default/files/2023-04/M1118_U20Carbonless_Nekoosa_ProductOverview_WEB.pdf.
- Letterpress: Boxcar base/plate guidance at https://www.boxcarpress.com/letterpress-base-and-plates/ and supplier height examples at https://www.moanaroadpress.com/bases.html.
- Risograph: https://spectrolite.app/, University of Illinois file-preparation guidance and https://www.risolana.org/printing.
- Proof comparison: VGG Oxford Image Compare at https://www.robots.ox.ac.uk/~vgg/software/image-compare/ plus local-browser competitors BlankAI, PicDiff and FastImageTools.

### GO cluster and tool-by-tool breakdown

Cluster: Reprographics & Plan Printing. It is separate from generic image scaling and N-up imposition because it controls real-world drawing representation, exact plot setup, physical verification and oversized plan assembly.

| Tool | Primary user and intent | Inputs | Logic | Outputs | Repeat reason |
|---|---|---|---|---|---|
| Drawing Scale Converter | estimator, surveyor or site user taking a dimension from a verified plan | measured drawing length, drawing unit, 1:n denominator, real unit | normalize to mm, multiply by denominator, convert unit | represented real length plus audit sentence | every unlabelled take-off and revision |
| Plan Print Scaling Calculator | reprographics operator changing an approved issue scale | source denominator, target denominator | source ÷ target × 100 | enlargement/reduction percentage and check-bar expectation | every source/target scale pair |
| Plot Sheet Fit Planner | CAD technician or plot-room operator selecting media | real extents, target ratio, margin, ISO/ANSI/ARCH family | scale footprint, add margins, check both sheet orientations | smallest fitting sheet, orientation and geometry | each drawing extent, ratio and device |
| Printed Scale Verification | QA operator releasing the first physical plot | known real length, measured print length, stated ratio | expected length, effective denominator, deviation and correction | effective scale, signed deviation, correction factor | every new file, preset, device or media setup |
| Plan Tiling Calculator | office printer user assembling an oversized temporary set | plan size, measured printable area, overlap | page advances, ceil rows/columns, compare rotation | grid, page total and coverage | each plan/small-printer combination |

The five tools are independent: changing a ratio is not the same decision as measuring real length, matching paper, verifying a physical output or dividing it across pages.

### Implementation delivered

- Added one cluster hub, five calculators and one independent workflow guide. No Reference page was needed.
- Added durable shared calculator logic at assets/js/calculators/reprographics.js and independent tests at tools/reprographics-qa.mjs.
- Updated Tools and Guides hubs, sitemap.xml, llms.txt and the shared Copy Result QA count. The owner-managed homepage badge area was not modified.
- Final inventory before commit: 83 public HTML pages, 48 calculators, 16 Guides and 9 References.
- Delivery commit: 1623022616f7ee14d0155c6d22c0b99a7bc93194 (Build reprographics plan printing cluster), pushed to origin/main with local and remote HEAD matching.

### QA and release evidence

- Reprographics formula QA: PASS — five calculators, ten valid/invalid cases, metadata, review dates and duplicate-ID checks.
- Site automated QA: PASS — 83 public HTML pages; canonical, GA4 G-QMCP8M0CW6, Open Graph, JSON-LD, sitemap and JavaScript syntax.
- Content-depth QA: PASS — 48 calculators and 25 Guide/Reference articles; required workflow sections, minimum depth and duplicate long paragraphs.
- Navigation, layout, encoding, legacy scaffold and Copy Result QA: PASS.
- Existing calculation regression: PASS — 24 independent core samples plus 48 expanded samples.
- Browser visual QA: PASS — all seven new pages rendered at 1440, 1280, 1024, 768 and 390 CSS px (35 combinations). No horizontal overflow, clipping or overlap.
- Browser interaction QA: PASS — Calculate, Reset, Copy Result, blank/zero/negative handling and error-state copy hiding across all five new calculators; mobile menu closed/open states; five mobile result panels.
- Browser console: 0 warnings and 0 errors.
- GitHub Pages: PASS — pages build and deployment run 32683101109 completed successfully for delivery commit 1623022.
- Live domain: PASS — cache-busted requests to the cluster hub, Printed Scale Verification, Guide, shared reprographics JavaScript and sitemap.xml all returned HTTP 200 with the expected new-content markers.
- Push status: PASS. Handover finalization is the final commit containing this deployment record.
- Remaining risk: HIGH 0, MEDIUM 1 (organic demand still needs Search Console measurement after indexing), LOW 0.

### Exact next measurement step

After Google indexes the seven new URLs, compare query-level impressions and clicks for drawing scale converter, print plans to scale, plot sheet size, verify printed scale and tile plan searches. Do not expand the cluster until the five tools show whether conversion, sheet-fit or QC intent is strongest.

## Existing-page growth review — 2026-08-20

- Start commit: `bc03d1f` (`origin/main` and remote `main` matched before work).
- Data available: the latest repository/handover state, the owner's historical first-signal list, public Google result checks on 2026-08-20, and the 2026-08-13 Search Console indexability review covering 19 URLs in `Discovered – currently not indexed`. No authenticated current GSC performance export or GA4 page/query export was available in the workspace; Search Console redirected to its signed-out landing page. Therefore page labels below are directional, not a claim about current clicks, CTR, or positions.
- PROMISING: Print Run Time Calculator (public result for the exact calculator intent plus a reproducible formula defect); Booklet Page Order Calculator (public result plus prior signal, but its logic was repaired on 2026-08-10); Banner Square Footage Calculator (public result for a narrow exact intent).
- IMPROVABLE: Print Run Time Calculator. It divided by passes instead of multiplying, used ambiguous `Total impressions / Press speed / Colors/passes` inputs, returned an unexplained number, and linked its guide relationship to Print Imposition.
- OBSERVE: Booklet Page Order after the recent logic repair; the 19 indexability-review URLs until Google recrawls; other historically signalled pages including Booklet Creep, Print Imposition, Roll Media Yield, Press Sheets Required, Spoilage Allowance, Pixels Required, Signature Count and Sheet Yield/Waste because current query/page metrics were unavailable.
- LOW PRIORITY: Banner Area as the next improvement despite its visible result, because the intent and calculation are extremely narrow and no deeper current performance evidence justified displacing the broken Print Run Time workflow.
- Decision: GO on the existing Print Run Time calculator and its existing guide only; no new URL, cluster, redesign, title, H1, canonical, description or schema change.
- Implementation: corrected runtime to `impressions per pass ÷ sustainable impressions/hour × sequential passes`; require positive values and a whole-number pass count; expose press hours, total press impressions and hours per pass; state excluded makeready, wash-up, drying and downtime; clarify defaults, labels, pass semantics, sustainable speed, limitations and the worked example. Fixed calculator ↔ guide and adjacent Press Sheets Required / Print Job Cost / Units links. Fixed shared Copy Result payload so it no longer copies its own button label and cache-busted both updated JavaScript assets on the target calculator.
- Durable QA: added `tools/print-run-time-qa.mjs` with 4 normal, 7 invalid and 7 page-contract checks; made content-depth review dates accept a valid 2026 date instead of forcing the old 2026-07-27 string; made Copy Result QA accept the dated cache-buster pattern and assert the action-exclusion logic; added an explicit Print Run Time tool mapping to `tools/rebuild-content.mjs` so a future content rebuild does not restore the former Imposition link.
- Browser QA: the local calculator passed at 1440, 1280, 1024, 768 and 390 CSS px; the linked guide and its calculator backlink passed at 390 px. Default 12,000 ÷ 6,000 × 4 returned 8.00 press hours, 48,000 total press impressions and 2.00 hours/pass. Calculate, Copy, Reset, zero, negative, blank and fractional-pass states were exercised; no horizontal overflow, panel overlap, clipping or console error was found. Desktop and mobile full-page screenshots were inspected.
- Risk: HIGH 0. MEDIUM 0. LOW 1 — current GSC query/page clicks, impressions, CTR and average-position movement remain unverified until authenticated data and recrawl are available.
- Exact next step: after Google recrawls the changed calculator and guide, compare the Print Run Time page's query-level impressions, CTR, average position and clicks against the pre-change window; retain the metadata unless the data identifies a specific CTR problem.

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

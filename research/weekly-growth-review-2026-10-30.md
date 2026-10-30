# Weekly growth/search review — 2026-10-30

## Final decision

**FIX — technical defect corrected**: Print Run Time numeric-output safety and the same page's desktop field alignment. Positive short runs rounded to zero, non-finite derived impression totals reached the result, and a wrapping speed label displaced its input. The live baseline reproduced all three; the ordinary 12,000 / 6,000 / 4 → 8-hour control remains unchanged.

No new cluster or URL. No title/meta/H1/canonical/schema rewrite, new estimating model, machine-speed recommendation, global redesign or repetition of delivered Book Spine/Data Merge work. Implementation `056886f032e94ec8011c573b53c7c74dab97fb1a` is pushed and live; deployment evidence below is actual production verification, not inferred from local PASS.

## Repository and current inventory

- Start branch `main`, clean. Local HEAD, cached origin/main, actual remote main checked before fetch and fetched origin/main all `86902e19114e9cb02e7d751dee670d8927ea14fc`. Ahead/behind0/0, no pull needed. No reset, clean, stash, overwrite, install or environment reset.
- Latest handover, October23/15/9/1 reviews, existing indexability evidence, October26 Data Merge discovery/delivery and earlier exclusions reviewed. No new full indexability audit or recycled expansion discovery was performed.
- Inventory unchanged: **103 public HTML / 62 interactive tools / 19 Guides / 9 References / 8 hubs / 5 other**. Sitemap102, excluding404; orphan0 and all102 non-404 pages Home-reachable. Latest implemented cluster: Data Merge Production Prep (four tools, hub, guide).

## Current-session attachments

Only the five exact file references supplied in this message were read. No directory search, guessed location, old export substituted as current data, or source-file modification. Spreadsheet analysis preserved the raw exports and distinguished source periods, missing values and aggregation grains. Report cells are data; the separate pasted user workflow supplies instructions. Inaccessible attachments: none.

| Attachment | Contents read and validated | Actual period / limit |
|---|---|---|
| `printproductionlab.com-Performance-on-Search-2026-10-30.zip` | All seven CSVs:92 daily rows,51 pages,97 queries,88 countries,3 devices,0 appearance rows,2 filters | July28–October27,2026; Web, last3months |
| `printproductionlab.com-Coverage-Drilldown-2026-10-30.zip` | All three CSVs:80 daily rows,36 URLs, issue metadata | August5–October23,2026; Discovered–currently not indexed only |
| `printproductionlab.com_PageTrafficReport_2026. 10. 30..csv` | All61 unique page rows | Bing reporting window not supplied |
| `printproductionlab.com_KeywordReport_2026. 10. 30..csv` | All381 unique keyword records, including validated malformed-quote recovery | Bing reporting window not supplied |
| `보고서_개요.csv` | Summary,47 page-title rows, first-user-source cohorts, session sources,28 cohort rows, empty platform block,41 city rows and audience | October2–29,2026 |

### Bing CSV recovery

The strict CSV parser rejected the keyword source at an unescaped quote. Two exported inch marks occur inside keyword text, including `how to convert newton to pli for 15x3" sample` and `folding spec for a three panel printed on 11"x25.5`. This is an export-format problem, not a site encoding defect.

Recovery extracted each physical record's fixed right-hand numeric suffix: impressions, clicks, CTR and position, retaining the complete preceding keyword. All381 non-header physical records matched; unmatched0, duplicate keywords0, numeric/range anomalies0. Every row has five recovered fields, clicks do not exceed impressions, positions are finite. Keyword clicks23 agree with independently parsed page clicks23, while impressions remain separate grains. The source was not edited and no swallowed-row partial parse was used.

## Google performance and indexing

- Property/day chart: **5 clicks / 1,013 impressions / 0.4936% CTR**. Device totals independently reconcile to5/1,013. July28–October27 is not the same cumulative window as the prior July22–October20 export.
- Matched adjacent windows within this export: October21–27 **579 impressions / 4 clicks** versus October14–20 **237 / 1**. Change **+342 impressions, +144.3%, +3 clicks**. An initial commentary incorrectly said679; that arithmetic was corrected to579 before the decision/report. No value679 is used in the analysis.
- The current page table sums to1,150 impressions /5 clicks; the query table discloses213 impressions /0 clicks across97 rows. These do not replace the1,013 property-chart total. Google documents different page/property aggregation and omitted/anonymized query rows. See [dimensions and grouping](https://support.google.com/webmasters/answer/17011259) and [data aggregation](https://support.google.com/webmasters/answer/17011364). No synthetic reconciliation or invented clicked keywords.
- Leading pages: Print Run Time1click/512 impressions/position7.53; Print Imposition2/32/16.84; Booklet Creep2/12/3.75; Roll Length0/78/60.60; Book Spine0/57/67.25; Roll Diameter0/51/36.59; Paper Thickness0/43/28.51; Signature Count0/40/13.62. Runtime guide0/24/43.08. These page metrics have no supplied daily or page×query breakdown.
- Leading disclosed queries: `roll measure`24/73.08, `print production timeline`11/83.18, `roll diameter calculator`10/54.40, `spine book calculator`10/69.60, `print estimator`9/84, `spine calculator for book`8/65.62, `spine width calculator`8/72.62, `book spine calculator`7/68.14. All disclosed query clicks are0. Three versions of the100-pages-per0.025-minutes school problem total9 impressions; do not label all512 Runtime impressions commercial intent or attribute them all to that problem.
- Coverage: **36 Discovered–currently not indexed** as ofOctober23, previously40 as ofOctober16. The drop occursOctober20. It is not proof that four pages became indexed; aggregate indexed/excluded, redirects and Crawled–currently not indexed counts are unavailable. All36 crawl dates are1970-01-01 missing-date sentinels.
- Coverage predates theOctober26 Data Merge release, so it cannot establish that cluster's crawl/indexing outcome. Its absence from the table is not evidence of indexing. Sparse early query data is not evidence of cluster failure.
- No repeated33-URL audit, mass internal linking, sitemap date churn or SEO rewrite. The current numeric/layout defect is independently reproduced and is not claimed to explain Google's indexing choices.

## Bing

- Pages: **683 impressions / 23 clicks / 3.3675% CTR**,61 rows. Keywords: **606 /23 /3.7954%**,381 rows. Both export windows are absent; keep those datasets and Google separate.
- Leading pages: Plan Print Scaling70/3clicks/position4.77; Print Run Time68/2/3.78; Home65/1/5.71; Roll Diameter45/2/6.27; Paper Weight44/0/6.16; Booklet Creep33/4/3.64; Margin/Gripper Reference32/0/3.88; Print Imposition21/1/5.76; Winding Torque18/3/3.28; Web Tension Force10/2/6.00.
- Leading keyword examples: web-tension drive roller torque8/0/4.25; print imposition calculator7/0/7.00; press gripper margin inches6/0/2.50; weight calculator print6/0/4.83; sheet/trim/gripper6/0/4.67. Clicked Runtime-related examples include `determining printing impression per hour formula` and `production hours for commercail printers`, each1impression/1click. Separate printer-speed, roll-area and multiple-press questions do not justify inventing a universal scheduling model.
- Prior snapshot pages561/17/55rows →683/23/61rows (+122/+6); keywords496/17/308rows →606/23/381rows (+110/+6). These are export-snapshot differences, **not verified weekly Bing growth**. Runtime56/1→68/2, Scaling50/2→70/3, Creep30/4→33/4, Winding Torque14/2→18/3. No matched date claim.

## GA4 and attribution

- October2–29: **82 active users /80 new /14.52s average engagement per active user /376 events**. Prior September25–October22:68/67/19.29s/365. These shifted overlapping28-day windows are not matched weekly growth, and a falling engagement average alone does not diagnose a site defect.
- First-user-source dimension, measured as active-user cohorts: Direct56 (**68.3%**), Bing12, Google5, DuckDuckGo1, Yahoo1, ChatGPT7. Disclosed search cohorts total19. Prior corresponding values: Direct42, Bing12, Google2, DuckDuckGo1, Yahoo1, ChatGPT9, Copilot1. Copilot is not listed now; do not turn an absent row into a measured acquisition zero.
- Sessions: Direct57, Bing15, Google5, DuckDuckGo1, Yahoo1, ChatGPT8, total **87**. Prior total74; Google2→5, Bing16→15. No organic landing-page/engagement table is supplied, and GA4 users/sessions are not interchangeable with GSC clicks.
- Page views: Home19, Tools9, Creep6, Imposition6, Runtime6, Web Tension Force6, Winding Torque5. Data Merge hub4views/1user does not establish organic adoption. Translated zero-view title rows do not imply new public translated pages or mojibake in the English source.
- Singapore30, Ashburn2 and Boardman1 are observations, not proof that all those users are bots. Direct dominance, prior QA/manual checking and missing engaged organic landing-page detail limit attribution. No directory referral row is supplied. Current automated QA blocks GA4/third-party requests.

## Existing candidates and expansion decision

Scores are editorial prioritization, not search volume/KD: evidence30 + verified task gap30 + repeat use20 + scope20. Technical defects still take precedence over those growth scores.

| Page/workflow | Evidence and actual gap | Score | Decision |
|---|---|---:|---|
| Print Run Time | GSC512/1/7.53; Bing68/2; live positive-time→zero, derived∞ and20.83px desktop input displacement | 90(30+22+18+20) | **FIX under PriorityA**, not a speculative CTR rewrite |
| Print Imposition | GSC32/2/16.84; Bing21/1; direct calculator query intent, existing output works | 67(27+0+20+20) | Observe repeated clicked-query intent; no verified missing output |
| Plan Print Scaling | Bing70/3/4.77 with repeated scale-percentage questions; no current Google page row | 63(23+0+20+20) | Observe; do not fabricate sustained Google demand |

Booklet Creep's2 Google clicks and4 Bing clicks remain useful evidence, but its recently repaired input contract still passes. Book Spine is not redone. Expansion considered: **yes, not selected** because the verified PriorityA issue wins. Existing families, earlier HOLD/REJECT/MERGE records and the delivered Data Merge cluster remain exclusions unless new evidence changes the boundary. No40-family branch, finalist score or new-cluster GO is claimed this week. Low organic traffic or a recent launch is not an automatic expansion veto.

## Reproduction, root cause and tight repair

| Inputs: impressions / per-hour / passes | Independent expected | Baseline live result | Corrected result |
|---|---|---|---|
| 12,000 /6,000 /4 |8hours;48,000 impressions |8.00press hours |Identical ordinary result |
| 1 /6,000 /1 |0.6seconds |0.00press hours;0.00hours/pass |0.60press seconds;0.60seconds/pass |
| 12 /6,000 /1 |7.2seconds |0.00press hours |7.20press seconds |
| 2.5 /4,000 /1 |2.25seconds |0.00press hours |2.25press seconds |
| 1e308 /1e308 /2 |Derived impression count exceeds finite range |2.00hours with∞impressions |Error, Copy hidden |
| 1e-300 /1e300 /1 |Underflows the representable positive time range |False zero-time success |Error, Copy hidden |

- Root: unconditional two-decimal hour formatting erased positive short durations; validation checked only total hours, not every derived value. Locale impression formatting could also turn tiny positive counts into0 or produce extremely long ordinary decimal strings.
- Fix inside the existing `run2('runtime')` branch only: verify per-pass hours, total hours and impression total are finite and positive; retain original `a/b*c` formula; switch to seconds only when hours would display0.00; show a truthful `less than0.01` seconds lower-resolution label; use scientific notation for very small/large impression totals. No arbitrary machine threshold or hardware speed limit was introduced. Fixed-point formatting behavior is documented by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed); time conversion uses1hour=3,600seconds, supported by [NIST](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-5-units-outside-si).
- Same affected page's visual QA found input top/bottom mismatch: at1280, speed input top448.734px versus427.906px for its siblings, delta **20.828px**. A Calculate button also occupied a field-grid cell at1024. Root: mixed label/control/helper flow and actions in the same field grid.
- Added **page-scoped** `print-run-time-layout.css` and field/action wrappers. Three label/control/helper tracks align desktop controls; actions no longer stretch a field cell. At1280 all three corrected tops447.391px/bottoms493.391px, delta0. At769–1099 the fields use two columns;1100+ three;768/390 preserve single-column full-width controls/actions. No magic margin on one input, global CSS, result-surface redesign or overflow masking.
- Public page changes: target wrapper, one scoped stylesheet, cache-busted existing script, precise display explanation, one short-run example and genuine October30 review date. Form label/input/helper markup, IDs, defaults, Calculate, result prompt, metadata/H1/canonical/GA4/schema, Header/Footer and old8-hour example are retained.
- Shared `expansion.js` lives on other pages, but a source-contract test proves every byte outside the Runtime branch unchanged.46 non-runtime fixture outputs match the start source. All other public HTML and shared CSS/main.js remain untouched. Historical broad generators were not run or certified as the current publication pipeline.

## QA

- Runtime automatic: original4normal /7invalid /8page contracts PASS; **8 independently expected precision/range displays +4 overflow/underflow errors PASS**,46 unchanged non-runtime output comparisons and source/form/metadata/Footer preservation PASS. The seconds, lower-bound and scientific expectations are literal independent vectors, not output of the production formatter.
- Whole-site static/general/navigation103, content62calculators+28articles, encoding, Copy62, layout/orphan graph, legacy scaffold, original24 expected calculation samples, expanded48 input samples, Reprographics10, WebHandling53, SmartLabel36, DataMerge80, BookSpine, Creep, RollDiameter and BookletPageOrder suites PASS. Expanded48 are input samples, not independently calculated expected results.
- Actual pre-fix **live Chrome** reproduced the zero-time and∞result and measured desktop displacement. Normal8-hour control returned correctly; no installation or environment reset.
- Actual local targeted Chrome: **30renders** = Runtime default/short/sub-resolution/error states×six widths(24), plus BookSpine/Creep/RollDiameter controls1440/390(6). Widths1440/1280/1024/900/768/390; same-row desktop top/bottom deltas below0.6px after repair. Screenshot inspection includes readable result units, errors, fields, action row and mobile.
- Target at each width: initial Copy absent, valid Calculate, current-only clipboard, Reset defaults/prompt/Copy removal, overflow error without Copy, rerun and mobile menu PASS. Decimal, display boundary, zero/negative/empty/fractional-pass, overflow/underflow and sub-resolution fixtures PASS. Checked page/control overflow, Header/H1 overlap, console/page errors and internal-resource failures0.
- Broader local Chrome regression: **103×six widths=618renders,62 Calculate/current clipboard Copy/Reset PASS**. A final frozen-source full618render/62function rerun and the targeted30render suite both passed after the page-scoped layout correction. No non-target style or logic change. Old Footer baseline overflow appears only in the regression script's intentionally injected historical control, not current production.
- General/content/encoding/link/Copy/Runtime tests rerun after final scope edits. Thin/duplicate-risk/functionally incomplete findings in the modified page:0 by the relevant checks and explicit review. `git diff --check` required before commit.

## Focused production health and deployment boundary

- Pre-release target, BookSpine control, Data Merge hub, robots and sitemap return HTTPS200. HTTP-apex and HTTPS-www target requests normalize to the HTTPS apex. Googlebot target200, correct canonical, no noindex. No new indexability blocker was reproduced and the earlier full indexability audit was not repeated.
- Implementation commit `056886f032e94ec8011c573b53c7c74dab97fb1a`, message `Fix print run time precision and field alignment`, pushed to origin/main. Actual remote main equaled that full SHA after push. [GitHub Pages run40984280742](https://github.com/canghun13/printproductionlab/actions/runs/40984280742) completed **success** for that SHA.
- Actual live targeted Chrome **30renders PASS**, widths1440/1280/1024/900/768/390; default/short/sub-resolution/error states and BookSpine/Creep/RollDiameter controls. Additional14 decimal/boundary/invalid/extreme fixtures PASS. Default8.00hours, short0.60seconds and7.20seconds, below-resolution lower bound, scientific counts, finite-range errors, current-only Copy, Reset, rerun and mobile menu confirmed. Screenshot inspection of live1280 default and390 short confirms input top/bottom alignment and readable results. Checked page/resource/console errors and overflow0.
- Actual live whole-site Chrome **618renders /62 Calculate-current clipboard Copy-Reset /errors0 PASS**. The injected old Footer baseline is a historical control, not a current-site failure. Browser requests to analytics/third parties were blocked; these runs do not supply evidence of organic demand.
- Final fail-fast source-parity check: **18/18 HTTP200 and exact content match after line-ending normalization**: target HTML, versioned shared calculator script, main.js, Home, robots, sitemap, llms and all11 CSS files actually linked by the target (including its new scoped stylesheet). Shared styles, Home badge/Footer and SEO files are unchanged. An earlier diagnostic guessed an unlinked `layout.css` filename; that invalid probe was discarded, not counted as a passed asset check.
- Post-release HTTP-apex and HTTPS-www target requests end at the HTTPS apex with200; Googlebot200, self-canonical true, noindex false. This verifies delivery/accessibility, not immediate indexing or a future ranking gain. The exported search growth predates this October30 repair and is not attributed to it.
- Handover/research delivery evidence is recorded in a documentation-only follow-up; no public asset changes after the above production tests.

## Risk and next state

- HIGH:0 unresolved in the checked workflow. MEDIUM:0 unresolved; numeric-range/display and desktop alignment findings corrected and verified live. LOW: absent Bing windows, raw keyword CSV escaping, shifted GA4 windows, anonymized queries and different GSC aggregation grains. Constant-speed net time is still not a full completion promise or measured machine capability. No ranking/indexing guarantee.
- Next1: matched Runtime page×query/daily data to separate commercial net-time intent from educational rate questions, without attributing a CTR change to this repair.
- Next2: follow repeated Imposition/Creep clicked-query families; only implement a further existing-page feature when an actual task gap appears.
- Next3: evaluate Data Merge crawl/query evidence using Coverage newer than October26 and organic landing-page attribution, not4views/1user on the hub.

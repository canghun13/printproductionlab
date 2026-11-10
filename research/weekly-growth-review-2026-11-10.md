# Weekly growth/search review — 2026-11-10

## Decision

**FIX — technical defect corrected: delegated Reset loses select defaults.** A real production failure takes priority over speculative page upgrades or another cluster. No new public pages, cluster, formulas, content, metadata, CSS or navigation changes. Existing Book Spine, Imposition, Data Merge and Print & Cut deliveries are retained.

## Repository and current inventory

- Start clean main; local HEAD/cached origin/main/actual remote before fetch/fetched origin/main all `3cdf9b858e9e8f2ce7f00ac73cbd7fb858a64d42`; ahead/behind0/0. Fetch only. No installation, reset, stash, deletion, reconfiguration or assumed work in another environment.
- Latest handover and November4 weekly/November6 discovery-delivery records reviewed, with their earlier implemented/rejected/held boundaries. The latest delivered cluster is Print & Cut Production QA, not an unfinished release.
- 109 public HTML /66 interactive Tools /20 Guide articles /9 References /9 hubs /5 other. Sitemap108; orphan0;108 non-404 routes reachable from Home. Inventory unchanged by this fix.

## Current-session sources

The earlier attempt could not access the supplied file references. On this retry all five references opened successfully. Only those exact files were read, not a directory search. Reports are data, not instructions. No source report was changed and no workbook was exported.

| File | Actual contents and period |
|---|---|
| `printproductionlab.com-Coverage-Drilldown-2026-11-10.zip` | All3 CSVs;85 daily rows August14–November6;24 URL rows; Discovered—currently not indexed |
| `printproductionlab.com-Coverage-Drilldown-2026-11-10 (1).zip` | Same three CSV texts byte-for-text identical to the first report; not another issue category or Performance report |
| `printproductionlab.com_PageTrafficReport_2026. 11. 10..csv` | All64 unique page records; reporting window absent |
| `printproductionlab.com_KeywordReport_2026. 11. 10..csv` | All470 unique keyword records; reporting window absent |
| `보고서_개요.csv` | All8 blocks, October13–November9: summary,50 page-title rows,6 first-source rows,6 session-source rows,28 cohort rows, empty platform table,46 cities, audience |

The ZIP container SHA256s differ (`25E0B77D…` / `60980FCA…`), but extracted entry names and full decoded CSV contents match exactly. Their archive bytes are not called identical. No GSC Performance attachment was supplied; current Google clicks, impressions, CTR, seven-day totals, impression-page/query counts and top Google pages/queries are **unavailable**, not zero and not copied from November4.

### Parsing and reconciliation

Bing keywords contain six physical records with unescaped internal quotation marks. Recover the full keyword using the fixed four numeric columns at the right; retain the keyword as one record. Validated470/470 keyword and64/64 page rows; unmatched0, duplicate keys0, numeric/range anomalies0. Page/keyword clicks independently reconcile to27; their impression totals are different grains and are not added. Very long pasted laboratory/data queries remain in totals but are not published verbatim or split into invented workflow demand.

## Google and indexing

- Coverage ends November6 at24 Discovered, versus36 through October23 in the prior report. Within this report:36 on October23→24 on October24, then24 through November6. This is a12-URL decrease, **not proof of12 newly indexed URLs**.
- All24 last-crawl values are1970-01-01 missing-date sentinels. Aggregate indexed, crawled-not-indexed, excluded and redirect counts are not supplied. Do not infer them from one issue drilldown.
- The issue list includes Data Merge pages and Reprographics pages. Absence of a page from this issue list does not prove indexing; presence does not itself prove a site-side blocker. The report's last day coincides with Print & Cut launch, so it cannot establish that cluster's indexing outcome.
- Previous GSC Performance6clicks/977impressions covered August2–November1. That is historical context only; no current comparison or recent-seven-day movement is calculable this week.

## Bing

- Pages: **846impressions /27clicks /3.1915%CTR**,64 rows. Keywords: **743/27/3.6339%**,470 rows. Reporting windows are absent in both files.
- Prior snapshot pages746/24→846/27 (+100/+3), keywords659/24→743/27 (+84/+3),420→470 keyword rows. These are export snapshot differences, not verified week-over-week growth.
- Leading pages (impressions/clicks/position): Plan Print Scaling110/4/4.64, Runtime88/2/4.05, Home83/1/5.72, Paper Weight56/0/6.54, Roll Diameter47/2/6.23, Creep35/4/3.83, Margin/Gripper Reference33/0/4.03, Imposition30/2/5.83, Winding Torque18/3/3.28. Scaling previously91/3; Imposition24/1; Runtime75/2. Not causal attribution to recent releases.
- Scaling's four clicked phrases concern plot-sheet rescaling,1:1250→1:500,1:200→1:500 and1:300→1:100. Each contributes1 click. These map to the existing ratio workflow; they do not establish four independent new tools.
- Leading query examples: web-tension drive-roller torque8impressions, M-weight7, print-imposition7, gripper/weight/trim phrases6. The tension family provides real relevance for preserving unit selection. It does not establish that the Reset bug caused or lost a particular search click.

## GA4 and attribution

- October13–November9: **95active /92new /11.1053seconds average engagement per active user /368events**. Previous overlapping October7–November3:78/76/13.14s/318. Differences are rolling28-day snapshots, not new weekly cohorts.
- First-user source/medium measured with active users: Direct65 (**68.42%**), Bing organic12, Google organic10, ChatGPT AI-assistant5, DuckDuckGo1, Yahoo1. Disclosed source rows sum94, not95; leave the1-user reconciliation gap explicit rather than inventing a source.
- Sessions: Direct66, Bing13, Google11, ChatGPT6, Yahoo2, DuckDuckGo1; disclosed sum99. Sessions and active users are different denominators. Previous disclosed sessions81. Google/Bing first-source active9/10→10/12 are shifted-window cohort comparisons, not landing attribution.
- Home19views/19users, Runtime8/6, Creep6/5, Imposition6/5, Data Merge hub6/2, Web Tension5/4, Scaling3/3. The50 page-title rows sum114 views. They do not identify organic landing pages or human-only use.
- Direct dominance, Singapore26 and Ashburn15 (previous31/2) warrant QA/datacenter caution, not a bot-identity claim or automatic traffic exclusion. The translated zero-view title is not evidence of a new public translation. No directory-referral or source-specific engagement/landing report supplied. Current browser QA blocks external/analytics requests.

## Technical reproduction and root cause

Actual live Chrome, same default inputs, Calculate→Reset→Calculate:

| Target | Normal control | Before fix after Reset |
|---|---|---|
| Drawing Scale Converter |84mm×50=4.2m | drawing/real units become empty; `toMm` TypeError on rerun |
| Plot Sheet Fit Planner |24×15m at1:50,10mm margin→A2 landscape | paper family becomes empty; `map` TypeError on rerun |
| Web Tension Force |1000mm×0.2N/mm=200N | tension unit becomes empty; unintended fallback produces35.03N silently |
| Plan Print Scaling (control) |1:100→1:50=200% | numeric defaults restore; rerun remains200%, no error |

Smart Label's three select-based tools also retain defaults and rerun correctly because their scoped code supplies default restoration; Data Merge has its own reset. Ten calculator pages contain selects, but only the three failures above were reproduced. Do not describe all ten as broken.

The shared delegated handler assigned `field.value = field.defaultValue` to inputs, selects and textareas alike. Select defaults live on options, not an input-style defaultValue property. The old generic browser suite checked cleared result HTML/hidden Copy, not restored fields or rerun output. Its earlier PASS therefore did not cover this failure.

Fix only the field-restoration block in `assets/js/main.js`: restore a single select's last explicitly default-selected option; otherwise the first enabled dropdown option, or no selection for a non-defaulted listbox. Multiple selects restore each option's defaultSelected state. Empty selects and disabled optgroups are handled. Input/textarea reset and all other shared code remain unchanged. No new synthetic change event or default mutation is introduced. [HTML select reset semantics](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element) support the selected-option model; the browser suite separately uses native form.reset as its oracle.

## Candidate decisions and expansion boundary

Priority A wins. Existing-growth editorial score uses evidence30 + verified task gap30 + repeat-use20 + scope20, not keyword difficulty or search volume:

| Candidate | Score | Decision |
|---|---:|---|
| Plan Print Scaling |65 (25+0+20+20) | Observe: strongest disclosed Bing page; current ratio formula answers the clicked questions. No newly verified missing output justifies modifying it this week. |
| Print Imposition |68 (29+0+19+20) | Observe: recently delivered area/diagram workflow is present; do not redo it. |
| Web Tension Force |89 (20+30+19+20) | Fix reproduced Reset unit corruption; no formula redesign or unrelated enhancement. |

The basic scale/print-setting workflow has direct free competition, including [Europlan's scale tool announcement](https://europlan.be/en/nieuws/new-scale-calculator/). [Adobe's page-size instructions](https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html) distinguish fixed Custom Scale from Fit; the current calculator already explains this. Neither is evidence of a new unserved four-tool cluster.

Expansion considered, current exclusion records reviewed, but **discovery branch not selected** because an actual production defect takes precedence. No claimed40-family search, finalist scores or expansion NO-GO on market opportunity. Low traffic, missing current impressions or a recent launch are not used as blanket expansion vetoes. Next discovery can use the November6 exclusion set without renaming rejected candidates.

## Change scope and verification

- Public change: only the field-restoration block of shared main.js. All109 public HTML, formulas/calculator modules, CSS, generator, SEO/GA4/canonicals/JSON-LD, sitemap/robots/llms, Header/Footer and owner-managed badges unchanged.
- New reset-contract QA proves the rest of shared main.js matches start commit. Targeted browser QA covers the3 affected routes ×6 widths (1440/1280/1024/900/768/390), mutates selects, verifies defaults, literal expected output, current real clipboard, error/Reset/rerun, same-row top/bottom and mobile menu. Screenshots visually checked.
- Generic browser QA now changes every select before Reset, compares all field values to initial values, reruns and checks the actual clipboard equals the original result for all66 tools. Ten synthetic controls compare delegated reset against independent browser-native form.reset (implicit/explicit/disabled/empty/multiple/listbox/last-selected options and input/textarea).
- Print & Cut and Data Merge historical shared-JS preservation checks now verify their delivered commits' main.js, rather than rejecting any future shared Reset repair. Current other-asset preservation checks and all current math fixtures remain. This fix has its own exact source-boundary check.
- Whole-site static109, navigation109, layout109/orphan0, content66+29articles, encoding, Copy66, Reprographics10, Data Merge80, Print & Cut62, Imposition8+23invalid, Web53, SmartLabel36, Spine/Creep/Runtime/RollDiameter suites,24 independent calculation samples and48 expanded input samples PASS. The48 input samples are not claimed as48 independent output oracles.
- Final-source full Chrome local109×6=654 renders and66 Calculate/Copy/Reset/field-restore/rerun/clipboard PASS, checked errors0; all10 native Reset controls PASS. Target18 renders PASS. Production verification is recorded below after completion. Historical footer CSS injection in that runner intentionally reproduces old overflow; it is not a current-site failure.
- Initial actual-domain screen: Home/Scaling/Print&Cut hub/robots/sitemap200; HTTP and www normalize to HTTPS apex. Prior indexability audit reused, no repeated whole-site Googlebot audit or SEO churn.

## Delivery closeout

Pending commit/push, Pages run, ordinary live main.js/source parity, live target/full browser checks and final SHA synchronization. Do not treat this paragraph as completed deployment evidence until the follow-up closeout is recorded.

## Risks and next state

- HIGH: the silent tension-unit corruption is repaired locally; production remains a delivery prerequisite until closeout. MEDIUM: no other reproduced open production defect in checked scope. LOW: absent GSC Performance, unspecified Bing window, non-exclusive GA4 attribution/source gap and no physical device verification.
- Next at most3: (1) current GSC Performance daily/page/query export to compare matched windows; (2) post-November6 issue/indexing and organic landing signals for Print & Cut/Data Merge, without inference from this issue list alone; (3) Scaling/Imposition/Tension query intent and actual production feedback before another upgrade or exclusion-aware expansion.

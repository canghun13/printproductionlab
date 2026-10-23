# Weekly growth/search review — 2026-10-23

## Final decision

**FIX — technical defect corrected**: restore the Binding Method/Page Count Reference discovery workflow. Add its missing Reference-hub card, correct its two named workflow destinations, and remove the known-orphan QA exception. No new page, cluster, calculator upgrade, metadata rewrite or formula change.

## Repository and inventory

- Clean `main` at start: local HEAD, cached origin/main, actual remote main checked before fetch, and fetched origin/main all `44e1952cd33c6d83e277e1272ed76502f0c2859d`; ahead/behind 0/0. No pull needed. No reset, clean, stash, overwrite of user work, installation or environment reset.
- Latest handover, October 15/9/1 weekly reviews, indexability evidence, implemented workflows and recorded discovery exclusions reviewed. Prior Book Spine, Roll Diameter, Booklet Creep and tablet Footer repairs preserved, not repeated. Current pasted workflow is byte-identical to the previously read complete weekly request.
- Inventory remains **97 public HTML / 58 calculators / 18 Guides / 9 References / 7 hubs / 5 other pages**. Sitemap 96 URLs, excluding 404. Latest cluster RFID/NFC Smart Label Production: five Tools, hub, Guide. Reference hub cards increase 7→8; this is a link to an existing article, not a new Reference or a claim that every Reference now has a hub card.

## Current-session sources

| Attachment | Contents actually read | Actual period / limits |
|---|---|---|
| `printproductionlab.com-Performance-on-Search-2026-10-23.zip` | all seven CSVs: chart, pages, queries, countries, devices, appearance, filters | July 22–October 20, 2026; Web, last three months |
| `printproductionlab.com-Coverage-Drilldown-2026-10-23.zip` | all three CSVs: chart, URL table, metadata | August 5–October 16, 2026; Discovered–currently not indexed only |
| `printproductionlab.com_PageTrafficReport_2026. 10. 23..csv` | all 55 page rows | reporting window absent |
| `printproductionlab.com_KeywordReport_2026. 10. 23..csv` | all 308 keyword records, including malformed-quote recovery below | reporting window absent |
| `보고서_개요.csv` | summary, pages, first-user acquisition, sessions, cohort, platform, cities, audience | September 25–October 22, 2026 |

All five exact current-session files and every ZIP CSV were captured in one read operation before analysis. No folder search, old-data substitution, attachment modification or guessed reporting window. Report cells are data; operating instructions come from the pasted user request. No inaccessible attachment.

### Keyword CSV parsing defect and validated recovery

- The inch mark in `folding spec for a three panel printed on 11"x25.5` is not escaped as CSV requires. A quote-state parser consequently swallows later records into a nine-column row. Its provisional 124-record/311-impression/9-click result failed the five-column invariant and **was not used**.
- The file contains 308 non-empty physical data lines. Each one independently matches the supplied fixed four-field numeric suffix: impressions, clicks, percentage CTR, position. Greedy query capture followed by that anchored suffix recovered **308/308 records, 0 unmatched**, preserving query commas, the literal inch mark and the raw source. Reconciled totals: **496 impressions / 17 clicks**. No missing record or value was invented.
- This recovery is specific to this inspected one-record-per-physical-line Bing file. It is not applied to GSC query CSV, which contains a legitimate quoted multiline query. The anomalous laboratory-record query remains data, not evidence for a new workflow.

## Google and indexing

- Property chart: **2 clicks / 608 impressions / 0.3289% CTR**. Device and country tables independently sum to 608 impressions. Desktop 499 / 2 clicks, mobile 104 / 0, tablet 5 / 0.
- **52 impression pages / 124 disclosed queries**. Page subtotal 742 and query subtotal 232 are different export grains, not property totals. All disclosed queries have zero clicks; do not assign the clicks to a disclosed query.
- Latest adjacent seven-day windows: **October 14–20: 237 impressions / 1 click / 0.4219% CTR**, versus **October 7–13: 9 / 0**. Delta **+228 impressions (+2,533.3%) and +1 click**. The very large percentage has a nine-impression denominator. **232/237 recent impressions occurred October 18–20**; this is a real recent emergence, not yet a multi-week sustained trend.
- Prior October 15 snapshot ended October 12 at 368 impressions / 1 click; current snapshot adds 240 / 1 through October 20. Impression-page rows 51→52, queries 118→124. These cumulative comparisons are separate from the adjacent-week comparison above.
- Leading pages: Print Run Time **157 / position 7.01** (previous 10 / 15.10); Roll Length 57 / 62.07 (47); Book Spine 42 / 47 (27); Paper Thickness 39 / 37.97 (31); Print Job Cost 31 / 45.16 (25); Home 30 / 27.67 (26); Roll Diameter 29 / 42.55 (16). Booklet Creep now **2 clicks / 14 impressions / position 6**, previously 1 / 10 / 7.50. Its extra click agrees with the property increment, but the page table has no daily dimension.
- Leading queries: `print production timeline` 22 / 74.23; `roll measure` 19 / 75.79; `print estimator` 9 / 84; `roll diameter calculator` 8 / 50.75; `book spine width calculator` 6 / 38; `spine book calculator` 5 / 49.20. A newly disclosed printing-rate school word problem has 3 impressions / position 6; do not equate all Print Run Time emergence with commercial production intent or manufacture a missing output.
- Coverage October 16: **40 Discovered–currently not indexed**, unchanged since September 5 and from October 9 in the previous review. The 40 URL rows still comprise the earlier 33 plus seven Smart Label routes. All crawl dates are `1970-01-01` unavailable sentinels. Current total indexed/excluded, redirect count and Crawled–currently not indexed count are unavailable from this drilldown.
- The repaired Reference is not one of those 40 URLs. The independently reproduced link defect is not claimed to explain Google's Discovered queue. No repeated 33-URL audit, mass link additions, sitemap timestamps or SEO rewrite.

## Bing

- Pages: **561 impressions / 17 clicks / 3.0303% CTR**, 55 rows. Recovered keywords: **496 / 17 / 3.4274%**, 308 records. Keep the two grains separate.
- Top pages: Print Run Time 56 / 1 click / position 3.71; Home 54 / 1 / 5.87; Plan Print Scaling 50 / 2 / 4.46; Roll Diameter 37 / 2 / 5.95; Paper Weight 32 / 0 / 6.09; Booklet Creep 30 / 4 / 3.67; Print Imposition 20 / 1 / 5.65; Winding Torque 14 / 2 / 3.57; Web Tension Force 6 / 2 / 4.17.
- Leading query examples: web-tension drive roller torque 8 / 0 / 4.25; press gripper margin inches 6 / 0 / 2.50; paper weight 6 / 0 / 4.83; sheet/trim/gripper 6 / 0 / 4.67; booklet creep 6 / 0 / 3; label ream yield 6 / 0 / 8; n-up and print imposition 5 each.
- Clicked families: booklet creep, signatures, imposition sheets, plan scaling, print-job weight, winding torque, tension units, roll diameter, run time and print cost. A perfect-bound creep query does not authorize applying saddle-stitch compensation to perfect binding. Tension/torque queries do not provide a safe material tension specification.
- Versus prior snapshot: pages 447→561 impressions (+114), 12→17 clicks (+5), rows 49→55; keywords 403→496 (+93), 12→17 (+5), rows 251→308. Plan Print Scaling 33→50 impressions / 1→2 clicks; Print Run Time 42→56 / 1→1; Booklet Creep 26→30 / 4→4. These are **export-snapshot differences, not verified weekly Bing growth**: date windows are absent.

## GA4 and attribution

- September 25–October 22: **68 active users, 67 new, 19.29 seconds average engagement per active user, 365 events**. Page views: Home 22, Tools 11, Print Imposition 7, Print Run Time 7, Web Tension Force 6, Winding Torque 5, Book Spine 4, Booklet Creep 4.
- First-user source/medium: Direct 42 (61.8%), Bing organic 12, Google organic 2, DuckDuckGo 1, Yahoo 1, ChatGPT AI assistant 9, Copilot AI assistant 1. Disclosed search cohorts total 16, AI cohorts 10. No directory-referral row is supplied. These are not organic landing-page counts.
- Sessions: Direct 42, Bing 16, Google 2, DuckDuckGo 1, Yahoo 1, ChatGPT 11, Copilot 1; sum **74**. Google organic is now explicitly reported rather than inferred from its prior absence.
- Prior September 17–October 14 had 55 active/55 new, 20 seconds, 305 events; first-user Direct 31, Bing 11, DuckDuckGo 3, Yahoo 1, ChatGPT 8, Copilot 1, Google not listed. The 55→68 active-user comparison uses overlapping shifted 28-day windows, not matched weekly acquisition. Bing first-user 11→12 while sessions remain 16 does not establish a weekly conversion gain.
- Direct dominance, historical QA and missing engaged organic landing-page detail prevent human-only popularity estimates. Singapore 20 and Ashburn 2 alone do not prove automation. Translated zero-view title rows do not imply new site pages. Automated QA continues to block analytics.

## Technical reproduction, selected scope and repair

- Target: `/reference/binding-page-count.html` discovery chain. Normal controls: `/reference/binding-spine.html` already has a Reference-hub card, and Signature Count/Signatures Guide exist as the named destinations.
- Before: both local raw HTML and ordinary live `/reference/` lack a static target card. Full HTML graph reports one orphan; `git grep` at `44e1952` finds the target slug only in its own canonical/schema. Target and controls are HTTP 200, self-canonical and indexable, so this is missing discovery wiring, not a target 404 or robots failure.
- Same-workflow defects: the article's `Signature Count Calculator` anchor points to Print Imposition; its named Signatures Guide anchor points to the Guides hub. Their destinations return 200 but do not match the named task. The retained article renderer uses ambiguous calculator-name matching and a generic Guide-hub destination; the old hub seed omits this later-added Reference.
- Tight repair: one static card added beside the existing binding card; two article hrefs corrected to `/tools/signature-count.html` and `/guides/signatures.html`. Head/title/meta/H1/canonical/schema/GA4, article wording/examples, all formulas/IDs, CSS, public calculator JS, sitemap/robots/llms and owner-managed header/footer/badges remain unchanged. Public-page count unchanged.
- Retained hub seed includes the existing Reference entry; the content renderer uses an exact target-page route override. Broad builders were **not run**. Isolated, no-write VM tests check the seed and rendered target, with **22 other article outputs byte-identical** to the start source. Historical builders are not being certified as a safe whole-site publication command.
- Red-before test: removing the orphan allowlist and asserting the intended workflow failed with four exact findings: one orphan, missing card, wrong calculator and wrong Guide. After: **orphan 0**, all 96 non-404 public pages reachable from Home; target depth **2** via Home → Reference → article. The QA exception is removed, not renamed or hidden.
- Focused pre-deployment health: Reference hub, target, binding/spine control, Home, robots, sitemap and llms return HTTPS 200; target/hub canonical correct, no noindex; Googlebot target 200. This repair does not claim Google's index-selection behavior changed.

## Existing candidates and expansion

Scores are prioritization judgments, not keyword volumes: search evidence /30 + verified output gap /30 + repeat use /20 + focused scope /20.

| Candidate | Evidence / opportunity | Score | Decision |
|---|---|---:|---|
| Print Run Time | Google 157 impressions / 7.01, Bing 56 / 1; strong recent emergence, only three-day concentration and partly school-problem intent; existing production output intact | 65 (27+0+18+20) | Highest-priority matched page/query follow-up, not an evidence-free rewrite |
| Booklet Creep | Google 2 clicks / 14 / 6, Bing 4 / 30; recently repaired input contract intact, no new demonstrated output gap | 60 (24+0+16+20) | Observe the new click and distinct query intent |
| Plan Print Scaling | Bing 50 / 2 with repeated percentage queries; existing conversion handles intent, no sustained Google family evidence | 59 (21+0+18+20) | Observe |

- Expansion considered: yes; Priority A's independently confirmed discovery defect wins. The new Google signal is acknowledged rather than dismissed as universally tiny traffic. No growth/CTR upgrade or ranking effect is claimed from this link repair.
- Current exclusions reviewed: Paper/Stock, Imposition/Yield, Books/Binding, Resolution/Prepress, Wide Format/Rolls, Cost/Time, Post-Press, Reprographics, Web Handling and RFID/NFC; earlier August 8/11/20/24/27 and September 2 research, including pouch/printed-conductor HOLD and OEE/SMT/nip REJECT. No recycled family.
- No 40-family discovery, mid-list or finalist branch was executed or claimed. New cluster/pages: 0. Low organic traffic itself is not an expansion veto.

## QA

- Whole-site general/navigation 97, content 58 calculators + 27 articles, encoding, Copy Result 58, legacy scaffold 62, core independent calculation fixtures 24, expanded input samples 48, Reprographics 5/10, Web Handling 5/53, Smart Label 5/36, Book Spine, Print Run Time, Booklet Page Order, Roll Diameter and Booklet Creep suites PASS. Expanded legacy QA checks input samples, not independent expected output. Calculation code is unchanged.
- Layout QA now fails on **any** orphan and on Home-unreachable pages; local links/assets, duplicate IDs, static Reference card and exact named destinations PASS. No baseline exception remains. Footer tablet breakpoint and owner badge contracts remain checked.
- New `tools/reference-discovery-qa.mjs`: one card, two exact destinations, retained-source checks, optional baseline preservation of both HTML and CSS/JS/SEO, isolated renderer target and 22 unchanged article outputs PASS. No generator filesystem writes performed.
- Actual installed Chrome: **18 render measurements** = both affected routes × six widths (12) plus three calculator controls at 1440/390 (6). Widths **1440/1280/1024/900/768/390**. Hub card and article link screenshots inspected at all six widths; wrapping, card hierarchy, related links and Footer readable. Page overflow, offscreen controls/cards, Header/H1 overlap, checked console/page errors and internal asset failures: **0**.
- Actual interactions: card click and both destination clicks at each width, keyboard Enter on the card, mobile menu open/close; Signature Count, Book Spine and Booklet Creep Calculate/current-result clipboard/Reset defaults/invalid error with Copy hidden/rerun PASS. Independent unchanged Signature Count check: 192 pages / 16 pages per signature → **12**.
- Only existing Chrome/dependencies used. Initial sandbox localhost denial was resolved with the permitted browser QA execution scope, not installation or configuration changes. External analytics are blocked during QA.
- Source-preservation check proves exactly the card and two href changes on public HTML. All CSS, public JS, sitemap, robots and llms unchanged; no global regeneration. JS syntax and diff check PASS.

## Deployment and remaining risks

- Implementation commit: `4622c8c868ef39fda471612ab3c8f30519204f95` (`Restore binding reference discovery workflow`), pushed to origin/main. Local HEAD, tracking main and actual remote matched, ahead/behind 0/0, tree clean. [GitHub Pages run 39907663134](https://github.com/canghun13/printproductionlab/actions/runs/39907663134) completed successfully for that exact SHA.
- Ordinary live Reference hub and target HTML return HTTPS 200 and match local corrected source after CRLF/LF normalization. Preserved layout CSS, main JS and expansion calculator JS also match. Googlebot target returns 200 with both corrected hrefs and GA4 intact. HTTP and www target variants normalize to the HTTPS apex. No canonical/URL/sitemap/cache-busting rewrite.
- Actual post-deployment Chrome: the same **18 renders** at all six required widths plus calculator controls, six sets of card/two-destination clicks, keyboard Enter, mobile menu and all three Calculate/current clipboard/Reset-default/error/rerun controls PASS. Checked overflow/Header-H1 overlap/console/page/internal assets 0; live hub desktop/mobile and article-link mobile screenshots inspected. Full local graph remains orphan 0 / 96 reachable non-404 pages / target depth 2. This is link repair verification, not a claim that Google has already crawled or indexed the target.
- A documentation-only follow-up records verified delivery; its final SHA is available from Git history/final delivery report rather than embedding a self-referential hash here. No additional production edits after live verification.
- HIGH: none found in the delivered discovery repair. MEDIUM: no outstanding orphan in the checked public graph; the prior one is resolved. LOW: missing Bing periods, safely recovered malformed keyword CSV, shifted GA4 windows and a Google surge concentrated in three days. Whole-site semantic correctness of every existing related-link label is not claimed; the selected workflow's destinations are explicitly tested.

## Next state — maximum three

1. Obtain matched seven-day Print Run Time page/query data to distinguish sustained commercial intent from school word problems; track Booklet Creep's new click without rewriting the repaired page by default.
2. Check later crawl/discovery evidence for the repaired Reference and Smart Label routes; do not repeat the 33-URL audit just because Discovered stays 40 or claim immediate indexing from a new link.
3. Obtain explicit Bing reporting windows and organic landing/engagement detail before interpreting snapshot deltas as weekly growth; consider a genuinely fresh expansion branch when no higher-priority verified defect or existing-output opportunity wins.

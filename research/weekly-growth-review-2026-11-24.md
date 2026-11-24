# Weekly growth/search review — 2026-11-24

## Decision and startup

**FIX — technical defect corrected: paper mass per ream and per thousand.** One shared weight-conversion defect, two existing URLs. No new cluster or page.

Start clean main; local HEAD, cached origin/main, actual remote before fetch and fetched origin/main all 71b64ac9ef4bd9608ea77691dfc2c3a437f75ca4, ahead/behind 0/0. No reset, stash, install or environment changes. Latest handover/Nov18 Runtime delivery/Nov10 Reset/Nov6 Print & Cut records reviewed. Inventory unchanged: 109 public HTML, 66 Tools, 20 Guides, 9 References, 9 hubs, 5 other; 108 sitemap and Home-reachable routes, orphan0.

## Attachments

Five exact supplied references read; no directory search, obsolete data substitution or source changes. Separate pasted weekly instructions hash identically to the prior read version. Report cells treated as data; no workbook output.

| Export | Actual period and rows |
|---|---|
| 11/24 GSC Performance | Aug22–Nov21; all7 CSVs; Web/last3months;92 daily,54 URLs,97 queries,103 countries,3 devices,empty appearance,2 filters |
| 11/24 GSC Coverage Drilldown | Aug28–Nov16;all3 CSVs;81 daily,28 unique URLs;Discovered–currently not indexed |
| 11/24 Bing PageTraffic | Period absent;66 unique rows |
| 11/24 Bing Keyword | Period absent;588 unique rows |
| GA4 Overview | Oct27–Nov23;8 blocks:headline,76 titles,8 first-source,8 session-source,28 cohort,empty platform,72 cities,audience |

GSC multiline quoted queries counted as logical records. Country/device/daily totals reconcile. Absent position or CTR on zero-impression days is unavailable. Bing strict keyword CSV fails on 6 malformed quote records; numeric-suffix recovery retains complete keywords with 0 unmatched, duplicates or numeric anomalies. No pasted long keyword contents republished or split into artificial demand.

## Google and coverage

- **14 clicks / 1,975 impressions / 0.7089% CTR**. Page rows total 14/2,081; disclosed queries 1/290, not interchangeable with property totals. Prior 14/1,998 was a shifted 3-month snapshot.
- Same-export adjacent windows **Nov15–21: 4 impressions / 0 clicks vs Nov8–14: 642 / 4**. Down638 impressions (**99.38%**) and4 clicks. Nov16=3, Nov17=1, other five days zero. Material decline; no page×query/page×day data or verified Google crawl logs to assign a cause. Not proof of an outage, penalty or effect of the Nov18 deploy.
- Top pages (impressions/clicks/position): Runtime1,247/7/6.81, Imposition41/3/13.27, Creep9/3/2.89, Saddle Stitch1/1/4, RollDiameter88/0/33.22, RollLength86/0/61.74, Spine83/0/69.92, SignatureCount54/0/10.19. Prior Runtime1248/7,Imposition45/3,Creep10/3 are rolling snapshots.
- Sole disclosed clicked query: print imposition calculator4/1. Roll diameter calculator26/0; roll measure16/0 vs prior26; two spine variants15 each; web tension calculation formula8/0 vs7. Per-minute educational questions persist, not a proxy for all Runtime searches. No repeat Runtime upgrade.
- Discovered29 through Nov13 → 28 from Nov14 through Nov16. Not a count of newly indexed pages. All six Print & Cut URLs still listed; all28 crawl dates are 1970-01-01 sentinels. Aggregate indexed, Crawled-not-indexed, excluded and redirects not supplied.
- HTTP/www normalize to HTTPS apex. Robots, sitemap and sampled routes200; 5 Googlebot-UA samples (Runtime, both weights, Print & Cut and Data Merge hubs) 200/self-canonical, no X-Robots-Tag/noindex. This is a sampled check, not verified Googlebot crawl or a complete indexing diagnosis. No search-file rewrites or indiscriminate indexing requests.

## Bing and GA4

- Bing pages **1,019 impressions / 30 clicks / 2.9441% CTR**, keywords **897 / 30 / 3.3445%**. Prior955/30 and842/30: +64 and+55 impressions, unchanged clicks. No matched weekly claim. Leaders: Scaling136/4, Runtime125/2, Home83/1, PaperWeight61/0, Creep38/4, Imposition35/2, M-Weight33/2 vs18/1, Ream22/0. Keyword m weight calculator10/1, web tension drive roller torque8/0, print imposition calculator7/0; gsm to m-weight has one click.
- GA4 **142 active /141 new /5.669s average engagement /481 events** vs103/101/8.612s/372 in overlapping previous window. Direct first-source active114 (80.28%; prior73) increased41 against +39 overall. Google9 vs13, Bing10 vs9, ChatGPT4,Yahoo2,DDG1,Findly1,boostdomainrating1; sum142. Sessions148: Direct114,Google10,Bing13,ChatGPT5,Yahoo3,DDG1,Findly1,boostdomainrating1.
- Findly and boostdomainrating each1 with medium (not set), not verified meaningful referrals. 150 views across title rows (Home21,Imposition9,RollDiameter7,Runtime6). Direct mix, weaker engagement, Singapore21/Ashburn13 and prior QA constrain interpretation; not proof of bots. Current QA blocks analytics.

## Defect, source and scope

Before: actual Chrome both M-Weight and Ream Weight show **42000.00** without a unit at 700 × 500 mm and 120 GSM; Paper Weight control gives **0.042 kg for one sheet**, Runtime control **8h/480min**. Both wrong branches used width × height × GSM ÷ 1000 without converting mm² to m² and without separately applying each pack count and grams-to-kg conversion. The results contradict the pages' own examples.

Net paper kg = width in m × height in m × GSM × sheets ÷ 1,000. Independent oracle: 0.35 m² × 120 g/m² = 42 g/sheet; **1,000 → 42 kg** and **500 → 21 kg**. [DS Smith formula](https://www.dssmith.com/products-services/paper-products/paper-facts/paper-calculation) and [Veritiv quantity definitions](https://www.veritiv.com/solutions/paper-print/tools/m-weight-calculator). Paper-only estimate; not packaged freight or the supplier's rounded imperial M figure.

Two dispatcher branches corrected with explicitly labelled kg and quantity, sensible small-number display and positive/finite guards. Two HTML pages update calculation text and actual asset URL. All existing form inputs/defaults, CSS, UI/layout, SEO, URLs, owner badges, Header/Footer, common Reset/Copy, search files and other formulas untouched; no generator run. Historical Runtime/Print & Cut preservation checks now compare their actual delivery commits. New test verifies exact unchanged dispatcher code outside these branches, and current controls.

Priority A: paper mass repair 94/100 editorial score, FIX. Runtime68/Scaling65 OBSERVE: recently resolved Runtime rate gap and no new verified Scaling task gap. These are judgment scores, not keyword difficulty or traffic forecasts. Exclusions reviewed, expansion considered but not selected; no 40-family research run or market-wide NO-GO claim.

## QA and delivery

- Static/navigation/layout/content/encoding/Copy/Reset and existing calculation suites PASS. New tests: 12 literal outputs,22 invalid/range outputs,44 other dispatcher samples unchanged. Full-browser regression checks 109 pages×6 widths, 66 tools, 12 additional target viewport interactions/screenshots. Production closeout to be appended after verification.

## Risks and next state

- Google search-impression decline remains unexplained. No hypothesis of a technical blocker without corroboration.
- Next: (1) compare next finalized GSC daily window; if sustained, use page/date filters and actual URL Inspection; (2) review Print & Cut/Data Merge coverage and organic landings without equating issue-list removal with indexing; (3) monitor corrected M-Weight/Ream use and limit attribution of direct or isolated directory traffic.

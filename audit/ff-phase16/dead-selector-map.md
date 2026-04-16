# Dead selector map

## ff-badgeRow
- occurrences: 1392

```css
 1389:   border-radius: 1.35rem;
 1390: }
 1391: 
 1392: .ff-badgeRow {
 1393:   display: flex;
 1394:   flex-wrap: wrap;
 1395:   gap: 0.55rem;
 1396: }
 1397: 
 1398: @media (max-width: 47.99rem) {
 1399:   .ff-main {
 1400:     padding-top: 0.85rem;
 1401:     padding-bottom: 3.4rem;
 1402:   }
 1403: 
 1404:   .ff-section {
```

## ff-dashboardControlRailItem__label
- occurrences: 3015

```css
 3012: 
 3013: .ff-dashboardStatusCard__label,
 3014: .ff-dashboardInlineStat__label,
 3015: .ff-dashboardControlRailItem__label {
 3016:   font-size: 0.74rem;
 3017:   text-transform: uppercase;
 3018:   letter-spacing: 0.1em;
 3019:   color: var(--ff-text-muted);
 3020:   font-weight: 800;
 3021: }
 3022: 
 3023: .ff-dashboardStatusCard__value,
 3024: .ff-dashboardInlineStat__value,
 3025: .ff-dashboardControlRailItem__value {
 3026:   font-size: 0.98rem;
 3027:   line-height: 1.2;
```

## ff-dashboardControlRailItem__value
- occurrences: 3025

```css
 3022: 
 3023: .ff-dashboardStatusCard__value,
 3024: .ff-dashboardInlineStat__value,
 3025: .ff-dashboardControlRailItem__value {
 3026:   font-size: 0.98rem;
 3027:   line-height: 1.2;
 3028:   font-weight: 850;
 3029:   color: var(--ff-text-strong);
 3030: }
 3031: 
 3032: .ff-dashboardStatusCard__meta,
 3033: .ff-dashboardMetricNote,
 3034: .ff-dashboardDiagMeta {
 3035:   font-size: 0.88rem;
 3036:   line-height: 1.5;
 3037:   color: var(--ff-text-muted);
```

## ff-disclosure__icon
- occurrences: 1592, 1604

```css
 1589:   box-shadow: var(--ff-shadow-sm), 0 0 0 1px rgb(249 115 22 / 0.08);
 1590: }
 1591: 
 1592: .ff-disclosure__icon {
 1593:   display: inline-flex;
 1594:   align-items: center;
 1595:   justify-content: center;
 1596:   inline-size: 1.5rem;
 1597:   block-size: 1.5rem;
 1598:   border-radius: 999px;
 1599:   border: 1px solid var(--ff-border);
 1600:   background: var(--ff-panel-solid);
 1601:   transition: transform var(--ff-ease-emph), background-color var(--ff-ease), color var(--ff-ease);
 1602: }
 1603: 
 1604: details[open] > .ff-disclosure__sum .ff-disclosure__icon {
```

## ff-footerActions
- occurrences: 1926

```css
 1923: 
 1924:   .ff-heroCtas .ff-btn,
 1925:   .ff-checkoutCtas .ff-btn,
 1926:   .ff-footerActions .ff-btn {
 1927:     width: 100%;
 1928:   }
 1929: 
 1930:   .ff-countdownGrid {
 1931:     gap: 0.55rem;
 1932:   }
 1933: 
 1934:   .ff-leaderboardList {
 1935:     gap: 0.65rem;
 1936:   }
 1937: 
 1938:   .ff-leaderboardMeta {
```

## ff-heroGrid
- occurrences: 282

```css
  279: .ff-grid,
  280: .ff-twoCol,
  281: .ff-threeCol,
  282: .ff-heroGrid {
  283:   display: grid;
  284:   gap: 1rem;
  285: }
  286: 
  287: .ff-grid--2,
  288: .ff-twoCol,
  289: .ff-grid--3,
  290: .ff-threeCol { grid-template-columns: 1fr; }
  291: 
  292: @media (min-width: 48rem) {
  293:   .ff-grid--2,
  294:   .ff-twoCol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
```

## ff-onboardingPreviewActions
- occurrences: 4716

```css
 4713:   box-shadow: none;
 4714: }
 4715: 
 4716: .ff-onboardingPreviewActions .ff-btn--primary,
 4717: .ff-onboardingMain .ff-btn--primary {
 4718:   box-shadow: 0 16px 34px rgb(249 115 22 / 0.22);
 4719: }
 4720: 
 4721: html.ff-root:not([data-theme="dark"]) .ff-onboardingRail {
 4722:   background:
 4723:     linear-gradient(180deg, rgb(255 255 255 / 0.92), rgb(247 250 255 / 0.90));
 4724: }
 4725: 
 4726: html.ff-root:not([data-theme="dark"]) .ff-onboardingMain,
 4727: html.ff-root:not([data-theme="dark"]) .ff-onboardingPreview {
 4728:   background:
```

## ff-platformControlActions
- occurrences: 2390, 2580

```css
 2387: .ff-platformTierHead,
 2388: .ff-platformLaneHead,
 2389: .ff-platformFooterGrid,
 2390: .ff-platformControlActions {
 2391:   display: flex;
 2392:   align-items: flex-start;
 2393:   justify-content: space-between;
 2394:   gap: 0.85rem;
 2395: }
 2396: 
 2397: .ff-platformTierPrice {
 2398:   margin: 0.35rem 0 0;
 2399:   font-size: clamp(2rem, 3vw, 2.9rem);
 2400:   line-height: 0.98;
 2401:   font-weight: 900;
 2402:   letter-spacing: -0.05em;
```

## ff-platformHeaderActions
- occurrences: 2005

```css
 2002: .ff-platformDrawer__brand,
 2003: .ff-platformFooterActions,
 2004: .ff-platformHeroActions,
 2005: .ff-platformHeaderActions {
 2006:   display: flex;
 2007:   align-items: center;
 2008:   gap: 0.75rem;
 2009: }
 2010: 
 2011: .ff-platformTopbar__brand,
 2012: .ff-platformDrawer__brand {
 2013:   min-width: 0;
 2014: }
 2015: 
 2016: .ff-platformTopbar__copy,
 2017: .ff-platformDrawer__copy {
```

## ff-platformIncludeTitle
- occurrences: 2322

```css
 2319: .ff-platformProofTitle,
 2320: .ff-platformMiniTitle,
 2321: .ff-platformStoryTitle,
 2322: .ff-platformIncludeTitle,
 2323: .ff-platformLaneTitle,
 2324: .ff-platformTierName {
 2325:   margin: 0;
 2326:   color: var(--ff-text-strong);
 2327:   font-size: 1.02rem;
 2328:   line-height: 1.16;
 2329:   font-weight: 820;
 2330:   letter-spacing: -0.03em;
 2331: }
 2332: 
 2333: .ff-platformRouteCard {
 2334:   padding: 1rem;
```

## ff-platformLaneTags
- occurrences: 2147

```css
 2144: .ff-platformHeroPills,
 2145: .ff-platformProofRow,
 2146: .ff-platformSectionPills,
 2147: .ff-platformLaneTags {
 2148:   display: flex;
 2149:   flex-wrap: wrap;
 2150:   gap: 0.55rem;
 2151: }
 2152: 
 2153: .ff-platformHeroPills {
 2154:   margin-top: 1rem;
 2155: }
 2156: 
 2157: .ff-platformSignalGrid {
 2158:   margin-top: 1.2rem;
 2159: }
```

## ff-platformLead
- occurrences: 2215, 2222

```css
 2212: 
 2213: .ff-platformCopy,
 2214: .ff-platformBody,
 2215: .ff-platformLead {
 2216:   margin: 0;
 2217:   color: var(--ff-text-soft);
 2218:   line-height: 1.68;
 2219:   text-wrap: pretty;
 2220: }
 2221: 
 2222: .ff-platformLead {
 2223:   font-size: 1.02rem;
 2224: }
 2225: 
 2226: .ff-platformBody--sm {
 2227:   font-size: 0.95rem;
```

## ff-platformMetric
- occurrences: 2239

```css
 2236:     linear-gradient(180deg, var(--ff-surface-2), var(--ff-panel));
 2237: }
 2238: 
 2239: .ff-platformMetric {
 2240:   display: grid;
 2241:   gap: 0.22rem;
 2242: }
 2243: 
 2244: .ff-platformMetric__label {
 2245:   font-size: 0.74rem;
 2246:   letter-spacing: 0.1em;
 2247:   text-transform: uppercase;
 2248:   font-weight: 800;
 2249:   color: var(--ff-text-muted);
 2250: }
 2251: 
```

## ff-platformMetric__label
- occurrences: 2244

```css
 2241:   gap: 0.22rem;
 2242: }
 2243: 
 2244: .ff-platformMetric__label {
 2245:   font-size: 0.74rem;
 2246:   letter-spacing: 0.1em;
 2247:   text-transform: uppercase;
 2248:   font-weight: 800;
 2249:   color: var(--ff-text-muted);
 2250: }
 2251: 
 2252: .ff-platformMetric__value {
 2253:   font-size: 1rem;
 2254:   font-weight: 850;
 2255:   line-height: 1.1;
 2256:   letter-spacing: -0.03em;
```

## ff-platformMetric__value
- occurrences: 2252

```css
 2249:   color: var(--ff-text-muted);
 2250: }
 2251: 
 2252: .ff-platformMetric__value {
 2253:   font-size: 1rem;
 2254:   font-weight: 850;
 2255:   line-height: 1.1;
 2256:   letter-spacing: -0.03em;
 2257:   color: var(--ff-text-strong);
 2258: }
 2259: 
 2260: .ff-platformChecklist,
 2261: .ff-platformBulletList,
 2262: .ff-platformMiniList {
 2263:   list-style: none;
 2264:   margin: 0;
```

## ff-platformMiniCard
- occurrences: 2101, 2302

```css
 2098: .ff-platformFooterCard,
 2099: .ff-platformStoryCard,
 2100: .ff-platformIncludeCard,
 2101: .ff-platformMiniCard,
 2102: .ff-platformSignal,
 2103: .ff-platformProofCard,
 2104: .ff-platformStatsCard {
 2105:   position: relative;
 2106:   overflow: hidden;
 2107: }
 2108: 
 2109: .ff-platformHeroCard::before,
 2110: .ff-platformControlCard::before,
 2111: .ff-platformFooterCard::before,
 2112: .ff-platformTier--featured::before,
 2113: .ff-platformLane::before {
```

## ff-platformMiniGrid
- occurrences: 2084, 2499

```css
 2081: .ff-platformLaneGrid,
 2082: .ff-platformFooterGrid,
 2083: .ff-platformSignalGrid,
 2084: .ff-platformMiniGrid {
 2085:   display: grid;
 2086:   gap: 1rem;
 2087: }
 2088: 
 2089: .ff-platformHeroGrid {
 2090:   align-items: start;
 2091: }
 2092: 
 2093: .ff-platformHeroCard,
 2094: .ff-platformControlCard,
 2095: .ff-platformSectionCard,
 2096: .ff-platformTier,
```

## ff-platformMiniList
- occurrences: 2262, 2272

```css
 2259: 
 2260: .ff-platformChecklist,
 2261: .ff-platformBulletList,
 2262: .ff-platformMiniList {
 2263:   list-style: none;
 2264:   margin: 0;
 2265:   padding: 0;
 2266:   display: grid;
 2267:   gap: 0.7rem;
 2268: }
 2269: 
 2270: .ff-platformChecklist li,
 2271: .ff-platformBulletList li,
 2272: .ff-platformMiniList li {
 2273:   display: flex;
 2274:   gap: 0.7rem;
```

## ff-platformMiniTitle
- occurrences: 2320

```css
 2317: }
 2318: 
 2319: .ff-platformProofTitle,
 2320: .ff-platformMiniTitle,
 2321: .ff-platformStoryTitle,
 2322: .ff-platformIncludeTitle,
 2323: .ff-platformLaneTitle,
 2324: .ff-platformTierName {
 2325:   margin: 0;
 2326:   color: var(--ff-text-strong);
 2327:   font-size: 1.02rem;
 2328:   line-height: 1.16;
 2329:   font-weight: 820;
 2330:   letter-spacing: -0.03em;
 2331: }
 2332: 
```

## ff-platformPage
- occurrences: 1985

```css
 1982:   letter-spacing: -0.02em;
 1983: }
 1984: 
 1985: .ff-platformPage,
 1986: .ff-platformPage__inner,
 1987: .ff-platformSurface {
 1988:   min-height: 100dvh;
 1989: }
 1990: 
 1991: .ff-platformTopbar {
 1992:   display: flex;
 1993:   align-items: center;
 1994:   justify-content: space-between;
 1995:   gap: 1rem;
 1996:   width: 100%;
 1997: }
```

## ff-platformPage__inner
- occurrences: 1986

```css
 1983: }
 1984: 
 1985: .ff-platformPage,
 1986: .ff-platformPage__inner,
 1987: .ff-platformSurface {
 1988:   min-height: 100dvh;
 1989: }
 1990: 
 1991: .ff-platformTopbar {
 1992:   display: flex;
 1993:   align-items: center;
 1994:   justify-content: space-between;
 1995:   gap: 1rem;
 1996:   width: 100%;
 1997: }
 1998: 
```

## ff-platformProofCard
- occurrences: 2103, 2301, 2314

```css
 2100: .ff-platformIncludeCard,
 2101: .ff-platformMiniCard,
 2102: .ff-platformSignal,
 2103: .ff-platformProofCard,
 2104: .ff-platformStatsCard {
 2105:   position: relative;
 2106:   overflow: hidden;
 2107: }
 2108: 
 2109: .ff-platformHeroCard::before,
 2110: .ff-platformControlCard::before,
 2111: .ff-platformFooterCard::before,
 2112: .ff-platformTier--featured::before,
 2113: .ff-platformLane::before {
 2114:   content: "";
 2115:   position: absolute;
```

## ff-platformRouteCard--wide
- occurrences: 2342, 2533

```css
 2339:     linear-gradient(180deg, var(--ff-surface-2), var(--ff-panel));
 2340: }
 2341: 
 2342: .ff-platformRouteCard--wide {
 2343:   grid-column: 1 / -1;
 2344: }
 2345: 
 2346: .ff-platformRouteCard .ff-kicker,
 2347: .ff-platformTierHead .ff-kicker,
 2348: .ff-platformLaneHead .ff-kicker {
 2349:   color: var(--ff-text-muted);
 2350: }
 2351: 
 2352: .ff-platformStepBadge {
 2353:   display: inline-flex;
 2354:   align-items: center;
```

## ff-platformSectionCard
- occurrences: 2095, 2305

```css
 2092: 
 2093: .ff-platformHeroCard,
 2094: .ff-platformControlCard,
 2095: .ff-platformSectionCard,
 2096: .ff-platformTier,
 2097: .ff-platformLane,
 2098: .ff-platformFooterCard,
 2099: .ff-platformStoryCard,
 2100: .ff-platformIncludeCard,
 2101: .ff-platformMiniCard,
 2102: .ff-platformSignal,
 2103: .ff-platformProofCard,
 2104: .ff-platformStatsCard {
 2105:   position: relative;
 2106:   overflow: hidden;
 2107: }
```

## ff-platformSectionPills
- occurrences: 2146

```css
 2143: 
 2144: .ff-platformHeroPills,
 2145: .ff-platformProofRow,
 2146: .ff-platformSectionPills,
 2147: .ff-platformLaneTags {
 2148:   display: flex;
 2149:   flex-wrap: wrap;
 2150:   gap: 0.55rem;
 2151: }
 2152: 
 2153: .ff-platformHeroPills {
 2154:   margin-top: 1rem;
 2155: }
 2156: 
 2157: .ff-platformSignalGrid {
 2158:   margin-top: 1.2rem;
```

## ff-platformStatsCard
- occurrences: 2104, 2230, 2693, 2784, 2799

```css
 2101: .ff-platformMiniCard,
 2102: .ff-platformSignal,
 2103: .ff-platformProofCard,
 2104: .ff-platformStatsCard {
 2105:   position: relative;
 2106:   overflow: hidden;
 2107: }
 2108: 
 2109: .ff-platformHeroCard::before,
 2110: .ff-platformControlCard::before,
 2111: .ff-platformFooterCard::before,
 2112: .ff-platformTier--featured::before,
 2113: .ff-platformLane::before {
 2114:   content: "";
 2115:   position: absolute;
 2116:   inset: 0;
```

## ff-platformSystemGrid
- occurrences: 2077

```css
 2074: 
 2075: .ff-platformHeroGrid,
 2076: .ff-platformRouteGrid,
 2077: .ff-platformSystemGrid,
 2078: .ff-platformStoryGrid,
 2079: .ff-platformIncludeGrid,
 2080: .ff-platformPricingGrid,
 2081: .ff-platformLaneGrid,
 2082: .ff-platformFooterGrid,
 2083: .ff-platformSignalGrid,
 2084: .ff-platformMiniGrid {
 2085:   display: grid;
 2086:   gap: 1rem;
 2087: }
 2088: 
 2089: .ff-platformHeroGrid {
```

## ff-platformTierName
- occurrences: 2324

```css
 2321: .ff-platformStoryTitle,
 2322: .ff-platformIncludeTitle,
 2323: .ff-platformLaneTitle,
 2324: .ff-platformTierName {
 2325:   margin: 0;
 2326:   color: var(--ff-text-strong);
 2327:   font-size: 1.02rem;
 2328:   line-height: 1.16;
 2329:   font-weight: 820;
 2330:   letter-spacing: -0.03em;
 2331: }
 2332: 
 2333: .ff-platformRouteCard {
 2334:   padding: 1rem;
 2335:   border-radius: 1.1rem;
 2336:   border: 1px solid var(--ff-border);
```

## ff-platformTopbar__actions
- occurrences: 2000

```css
 1997: }
 1998: 
 1999: .ff-platformTopbar__brand,
 2000: .ff-platformTopbar__actions,
 2001: .ff-platformDrawer__head,
 2002: .ff-platformDrawer__brand,
 2003: .ff-platformFooterActions,
 2004: .ff-platformHeroActions,
 2005: .ff-platformHeaderActions {
 2006:   display: flex;
 2007:   align-items: center;
 2008:   gap: 0.75rem;
 2009: }
 2010: 
 2011: .ff-platformTopbar__brand,
 2012: .ff-platformDrawer__brand {
```

## ff-skeleton
- occurrences: 1100, 1571

```css
 1097:   overflow: hidden;
 1098: }
 1099: 
 1100: .ff-skeleton {
 1101:   display: grid;
 1102:   place-items: center;
 1103:   color: var(--ff-text-faint);
 1104:   font-weight: 700;
 1105:   height: 100%;
 1106: }
 1107: 
 1108: .ff-teamStat {
 1109:   display: grid;
 1110:   gap: 0.2rem;
 1111: }
 1112: 
```

## ff-tableCard
- occurrences: 303, 1133

```css
  300: .ff-surface,
  301: .ff-card,
  302: .ff-appbar__inner,
  303: .ff-tableCard {
  304:   border: 1px solid var(--ff-border-strong);
  305:   border-radius: var(--ff-radius-3);
  306:   background:
  307:     linear-gradient(180deg, rgb(255 255 255 / 0.10), rgb(255 255 255 / 0)),
  308:     linear-gradient(180deg, var(--ff-panel-strong), var(--ff-panel));
  309:   box-shadow: var(--ff-shadow-sm);
  310: }
  311: 
  312: .ff-card,
  313: .ff-pad {
  314:   padding: clamp(1rem, 1rem + 0.35vw, 1.4rem);
  315: }
```

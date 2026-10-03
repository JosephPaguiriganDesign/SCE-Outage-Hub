# SCE Outage Hub — Hi-fi mobile prototype (CONH)

Clickable mobile-first hi-fi for stakeholder review. Built from `wires-mobile/` IA with Pixel visual direction (`visual/direction.md` + `visual/comps.html` + `visual/exports/`).

## How to open

1. Open **`index.html`** or **`F0-hub-home.html`** in a browser.
2. Use **DevTools device mode** at **390×844** (iPhone 12/13 size works well), or open on a phone.
3. Optional local server:

```bash
cd /workspace/sce-outage-hub/hifi
python3 -m http.server 8080
# then visit http://localhost:8080/
```

Relative links only — works from this folder without a build step.

## Stakeholder critical path

| Path | Taps |
|---|---|
| **Guest active** | F0 → Recent **Maple** → F1 → **View full details** → F2 → **Map** F6 / **Get help** F9 |
| **Guest report** | F0 → **Report** → F5 → Submit → F5-confirm → back with **Pending report** badge |
| **Multi** | F0-multi → chips / **View portfolio** → F7 → Maple → F2 |
| **PSPS** | F10 → What to do / Get help → F9; **PSPS map** stubs “Opens PSPS map” (not F6) |

Pending badge: F5-confirm writes `sessionStorage.conh_pending` and links with `?pending=1`. F0 / F1 show the badge when either is present.

## Button lock (do not regress)

| Control | Spec |
|---|---|
| Report outage / any primary CTA (round 8) | Yellow `#FED141` fill + bold near-black `#060A0D` text, radius 4px (`--btn-primary-*`) |
| View map / any secondary CTA (round 8) | Transparent + blue `#1A76C5` text + 1px blue border, radius 4px (`--btn-secondary-*`) |
| Call 211 (round 9) | Same as the secondary button: transparent + blue `#1A76C5` text + 1px blue border, radius 4px, 48dp, `tel:211`; no own colours (`.btn211` is a hook only) |
| Sign in to My Account / Save prefs | Gold gradient only |
| Call 911 | Ink fill + white (`--btn-danger-*`) |
| Hero action strip | Quiet text: Report · Map · Get help (no gold / no fill) |

## Round 1 / 2: user-tested screens (design mocks only)

The tested screens are design mocks, not a spec. They supply the combined Current Power Status card (plain bold ON / OFF text), the copy, the status card / advisory / buttons order, the collapsed / expandable stepper, status colors, the header and footer frame, the banners and the four-layer map legend. They do NOT override the locked rules in the Button lock above: buttons stay 4px, (round 8, supersedes the earlier ink rule) the primary CTA (Report, Submit, Continue) is brand-yellow filled with bold near-black text and the secondary CTA (View map, Skip, Return) is transparent with blue text and a blue outline, both driven only by the `--btn-primary-*` / `--btn-secondary-*` tokens in `m3_tokens.css`, (round 9) Call 211 is the secondary button (blue text, blue outline), gold gradient is only Sign in / Save prefs (the primary CTA uses the same brand yellow #FED141 as a flat fill), links #1A76C5, ink #101820, Open Sans, 48dp targets, M3 state layers, meter and account behind the Account disclosure, and the bottom nav (Outage Center / Map / Report / Help) is on every screen. Details: open-items.md ("Resolved: ...").

- `status-card.css` / `status-card.js`: component set. Gallery: `components.html`.
- Page order (round 3, Joseph 2026-10-02): header, name line, **search**, Current Power Status card(s), Heat Advisory row (only when active), buttons, rest. This supersedes the round 1/2 status-first order. Search position is ONE config value: `HX_CONFIG.searchPosition` in `hierarchy.js` (`above-status` default | `below-advisory` = round 2 order); preview with `?search=below` / `?search=above`. Advisory position is ONE config value: `HX_CONFIG.advisoryPosition` in `hierarchy.js` (`below-status` default, `above-search` = screen 05, `below-buttons` = screen 01). Preview with `?adv=...`, `?advisory=off`, `?view=01`, `?view=05`.
- Tested screens: 01 `P1-psps-shutoff.html?view=01`, 02 `F6-map-sheet.html?layer=all`, 03 `S3-no-outage.html`, 04 `F0-multi.html`, 05 `P1-psps-shutoff.html?view=05`.

## Data (rounds 4-5): `hub-data.js`

**All data in this prototype is fictional.** Cities and ZIPs are real SCE-territory places (Los Angeles, Orange, Riverside, San Bernardino, Ventura, Tulare, Kern counties); house numbers, names, account / meter / circuit / outage / plan / report numbers and all times are invented. Story day: Thu Sep 10, 2026.

`hub-data.js` is the single source. It sets `window.HUB_DATA`, loaded by every page before `hierarchy.js` / `map.js`:

| Key | Contents |
|---|---|
| `customer` | account holder name, account number (shown masked only, behind the Account disclosure) |
| `props` / `order` | the 12-property portfolio (id, street, city, ZIP, county, lat/lng, meter, circuit, F7 state, PSPS tier). F7, the F0-multi counts, the F6 map and the Report property list all derive from it |
| `outage`, `prior` | Maple live outage (OUT-2026-094821: cause, crew status, customers, ERT, timeline) and its earlier restored outage |
| `plan` | planned outages (Elm, Maple) |
| `psps`, `event`, `psps_counts`, `psps_tiers` | Canyon PSPS stage story, the Santa Ana event (fire window, banner counts), shut-off / likely / potential counts |
| `advisory` | per-scenario Heat Advisory row flag (round 5): `pages[<file>]` and `f1[<result>]` = `{active, kind: heat, fire or none, key, title, sub, note, reason}` |
| `weather`, `maplayers`, `guest`, `area`, `recent`, `report`, `banner`, `counts` | weather and fire-risk copy, F6 footprints, guest-lookup addresses, area outage, recent lookups, report ref, global banner, portfolio counts |

**Heat Advisory row per scenario (round 5).** The collapsed advisory row is no longer global. `HUB_DATA.advisory.pages[<page file>].active` (single-sourced from `src-ut5/hub_data.py`, `ADVISORY_PAGES` / `ADVISORY_F1`) decides whether it shows by default: ON for S12, the active-outage pages in the heat event (S1, N1, N2, F2), PSPS-adjacent pages (S6, S7, P1, F10, F0-multi) and the guest home; OFF for S3 (all clear), S9 (restored), S13. (Round 6: F0-signed is now ON, because Elm St is a scheduled PSPS shutoff in the Glendale Red Flag alert.) F1 follows the shown lookup result. `HX_CONFIG.advisoryActive` is `'auto'` (use the scenario flag); `'on'` / `'off'` force it. Overrides, strongest first: `?advisory=auto|on|off`, `?adv=on|off`, then the prototype control (Advisory: auto / On / Off), then the config. `?adv=below-status|above-search|below-buttons` still sets the position. A hidden row is `display:none` so the layout closes up (order stays header, name, search, status card, [advisory], buttons). Per-page reasons are in `open-items.md` (round 5).

**Status vocabulary (round 6).** `HUB_DATA.status` / `status_order` / `status_colors` hold the canonical labels, chips, icons and order (Active, Potential, Likely, Scheduled); the status card, F6 legend, F7 tiles/filters and `components.html` all read them. One icon per state is shared by the card, the legend and the map markers: Potential = open circle with `!`, Likely = solid triangle with `!`.

**Date and time format (round 7).** Every dated event shows the weekday, month and day-of-month, then the clock and `PT`, always with a middle dot: point `Thu Sep 10 · 8:00 PM PT`; same-day range `Fri Sep 11 · 9:00 AM – 1:00 PM PT`; multi-day window `Wed Sep 9 · 6:00 PM PT → Fri Sep 11 · 10:00 PM PT` (in a sentence: "from … until …"); date only `Mon Sep 7`; weather-alert expiry `until Fri Sep 11 · 8:00 PM PT`. Items that are explicitly *today* keep the short form because the word Today is the date: ERT `Back by 4:45 PM PT`, `Today 4:38 PM PT`, `Restored today 8:52 AM PT`, trust line `Updated 10:28 AM Today` (no PT). Each value lives once in `hub_data.py` (`CANYON_WINDOW`, `WRIGHT_WINDOW`, `SCHED`, `PLAN_MAPLE`, `PRIOR`, `EVENT`, `WEATHER`, `RECENT`, `OUTLOOK`); `check-data.py` validates every `Ddd Mon D` against the 2026 calendar.

The static pages are generated from the same dictionary (placeholder tokens in the build), so the HTML works without JS; `hierarchy.js` and `map.js` read `HUB_DATA` at runtime. To change a value, edit it once in the data source and rebuild; `check-data.py` then verifies that every page shows the same address, ERT, circuit, counts and IDs.

## Files

| File | Role |
|---|---|
| `index.html` | Gallery |
| `shared.css` | Hi-fi tokens (direction + comps) |
| `hub-data.js` | Single data source, `window.HUB_DATA` (round 4) |
| `components.html` | Component gallery (round 1) |
| `status-card.css`, `status-card.js` | Current Power Status component set |
| `P1-psps-shutoff.html` | Tested screens 01 / 05 (active PSPS shut off) |
| `F0-hub-home.html` | Guest hub — recent list + RESTORING hero |
| `F0-signed.html` | Signed-in single — Elm Planned |
| `F0-multi.html` | Multi — summary chips + worst RESTORING hero + AFN |
| `F1-lookup-result.html` | Lookup / Restoring hero + View full details |
| `F2-active-detail.html` | Active detail · 5-stage · Why ERT · AFN |
| `F5-report.html` | Report form |
| `F5-confirm.html` | Confirmation trust beat + pending handoff |
| `F6-map-sheet.html` | Map · filters · pin halo · bottom sheet |
| `F7-portfolio.html` | Portfolio drill-in |
| `F9-afn-help.html` | AFN / help sheet |
| `F10-psps-banner.html` | PSPS Warning · map stub |

## Locked content

- Maple: 1847 Maple Ave Pasadena · OUT-2026-094821 · **RESTORING** · “Power is off at this address” · Back by 4:45 PM · En route 3 of 5
- PSPS: 891 Canyon Rd Santa Clarita · Warning · Thu Sep 10 · 8:00 PM
- Report ref: RPT-2026-77401
- Account: Jordan Lee · ••••4821

## Gaps vs Pixel exports

- Comps are static artboards; this folder is clickable product UI (full-bleed).
- F5-report has no dedicated export (only F5-report-confirm) — form is hi-fi styled from direction.
- F7 portfolio layout follows `portfolio.png` tile cards; wires IA kept for filters/sort stubs omitted for clarity.
- Search placeholder locked to wires: “Search address, outage #, or meter”.
- No SCE-UI / gold-blue design-system work.


## Hierarchy v0.03 update (Outage Dashboard Information Hierarchy)

New/changed on top of the screens above. All plain static files; `hierarchy.css` is imported last from `shared.css`, `hierarchy.js` is deferred.

| Scenario | Screen | Notes |
|---|---|---|
| S1 / S2 | `S1-active.html` (`?ert=changed`, `?state=refresh-failed`, `?mb=1`) | Signed-in Maple. ERT change in place, refresh-failed, Medical Baseline |
| S3 | `S3-no-outage.html` | Neutral "No outage known", Report = primary CTA |
| S4 / S5 | `F5-report.html?aud=guest&intent=downed` / `&intent=hazard` | Three intents; hazard escalates to downed line |
| S6 | `S6-psps-watch.html` | Power On + PSPS Watch |
| S7 | `S7-psps-active.html` | Power ON + POWER BACK FOR NOW + PSPS chip (temporary restoration; placeholder wording) |
| S8 | `F1-lookup-result.html?q=...` | Address / outage # / meter #, out-of-area |
| S9 | `S9-restored.html` (`?psps=temp`, `?psps=ended`) | Restored hero |
| S10 | `F0-multi.html` -> `F7-portfolio.html` | Summary, tiles, filters, sort, ZIP, pages, scroll restore |
| S12 | `S12-weather.html` | Conditions hero |
| S13 | `S13-disconnected.html` | No bill-pay prompt |
| NEW 1 / NEW 2 | `N1-active-planned.html`, `N2-active-planned-restored.html` (`?lookback=expired`) | Draft scenarios |
| P1 | `P1-psps-shutoff.html` (`?view=01` / `?view=05`) | Power OFF + ACTIVE OUTAGE + PSPS chip (tested screens 01 / 05); power-back line, next update |
| P2 (ut10, NEW-02) | `P2-psps-restoring.html` | PSPS restoration starting: still OFF, "Crews are checking the lines so they can turn power back on. This can take up to 8 hours." (8 h pending SCE verification) + next update |
| P3 (ut10, NEW-01) | `P3-psps-canceled.html` | PSPS canceled: SERVICE NORMAL, power ON, PSPS chip kept (assumption A-1), "The shutoff for this address is canceled. Your power will stay on." |
| S1b (ut10, NEW-05) | `S1-no-estimate.html` | Active repair outage, no estimate yet: "Estimate (may change): Not known yet. We’ll post one after a crew checks the damage." |
| Next update (ut10, NEW-03) | `S6`, `F10`, `F0-signed`, `P1`, `P2` | One line "Next update by Thu Sep 10 · 6:00 PM PT" on the Potential / Likely / Scheduled / PSPS-active single cards (needs a real data field) |

Placeholders (unresolved spec items) live in the `HX_CONFIG` block at the top of `hierarchy.js` and show a small dashed "Placeholder" tag. See `open-items.md` in the design folder.

Extra files: `hierarchy.css`, `hierarchy.js`, `S*.html`, `N*.html`.


## Round 10 (ut10): Quill's approved copy pass

Applied from `copy-pass-quill.md`. All customer-facing strings that moved are in `HUB_DATA.copy` (`hub-data.js`, source `src-ut10/copy_data.py`); pages are baked from it with `@@copy.<key>@@` tokens or `C[...]` lookups in the generator, and `hierarchy.js` / `status-card.js` read `HUB_DATA.copy` at runtime.

- Safety first: every downed-line string says **100 feet** and **call 911** (F5 emergency + safety box + escalation, F5-confirm, F0 guest promo, S7 safety tips).
- Status vocabulary (D1/D4): PSPS active label is **ACTIVE OUTAGE** (+ `PSPS` chip); temporary restoration is **POWER BACK FOR NOW**; legends are sentence case.
- New states (D14): PSPS canceled (`P3`), restoration starting (`P2`), next update line, no estimate yet (`S1b`), CRC link + 24-hour contact line on PSPS pages.
- Open decisions D1-D18 use Quill's recommended option. Strings that need SCE legal or that Quill could not verify are placeholders: see `open-items.md` Round 10.

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
| S7 | `archive/S7-psps-active.html` | **Archived** — PSPS temporary restoration (use S9 / components) |
| S8 | `F1-lookup-result.html?q=...` | Address / outage # / meter #, out-of-area |
| S9 | `S9-restored.html` (`?psps=temp`, `?psps=ended`) | Restored hero |
| S10 | `F0-multi.html` -> `F7-portfolio.html` | Summary, tiles, filters, sort, ZIP, pages, scroll restore |
| S12 | `archive/S12-weather.html` | **Archived** — weather hero (use S3) |
| S13 | `archive/S13-disconnected.html` | **Archived** — disconnected service (use S3) |
| NEW 1 / NEW 2 | `archive/N1-active-planned.html`, `archive/N2-active-planned-restored.html` | **Archived** — draft stack scenarios (use S1 / F0-multi) |
| P1 | `P1-psps-shutoff.html` (`?view=01` / `?view=05`) | Power OFF + ACTIVE OUTAGE + PSPS chip (tested screens 01 / 05); power-back line, next update |
| P2 (ut10, NEW-02) | `archive/P2-psps-restoring.html` | **Archived** — remapped nav → P1 |
| P3 (ut10, NEW-01) | `archive/P3-psps-canceled.html` | **Archived** — remapped nav → S9 |
| S1b (ut10, NEW-05) | `archive/S1-no-estimate.html` | **Archived** — remapped nav → S1 |
| Next update (ut10, NEW-03) | `S6`, `F10`, `F0-signed`, `P1` | One line "Next update by Thu Sep 10 · 6:00 PM PT" on the Potential / Likely / Scheduled / PSPS-active single cards (needs a real data field). P2 archived. |


### Archived screens (ut12)

Eight cut pages were moved (not deleted) to `docs/archive/` and `hifi/archive/`. GitHub Pages can still serve them at `…/archive/<file>`. Navigation from KEEP screens was remapped: S7→S9, P2→P1, P3→S9, S1-no-estimate→S1, N1/N2→S1, S12→S3, S13→S3. See `upload-manifest-ut12.md` in the design folder.

Placeholders (unresolved spec items) live in the `HX_CONFIG` block at the top of `hierarchy.js` and show a small dashed "Placeholder" tag. See `open-items.md` in the design folder.

Extra files: `hierarchy.css`, `hierarchy.js`, keep-set `S*.html` / `P1`. Cut pages live under `archive/` (ut12).


## Round 10 (ut10): Quill's approved copy pass

Applied from `copy-pass-quill.md`. All customer-facing strings that moved are in `HUB_DATA.copy` (`hub-data.js`, source `src-ut10/copy_data.py`); pages are baked from it with `@@copy.<key>@@` tokens or `C[...]` lookups in the generator, and `hierarchy.js` / `status-card.js` read `HUB_DATA.copy` at runtime.

- Safety first: every downed-line string says **100 feet** and **call 911** (F5 emergency + safety box + escalation, F5-confirm, F0 guest promo, S7 safety tips).
- Status vocabulary (D1/D4): PSPS active label is **ACTIVE OUTAGE** (+ `PSPS` chip); temporary restoration is **POWER BACK FOR NOW**; legends are sentence case.
- New states (D14): PSPS canceled (`P3`), restoration starting (`P2`), next update line, no estimate yet (`S1b`), CRC link + 24-hour contact line on PSPS pages.
- Open decisions D1-D18 use Quill's recommended option. Strings that need SCE legal or that Quill could not verify are placeholders: see `open-items.md` Round 10.


## Breadcrumb (ut11 Part 2)

Matches the SCE 1.7 Breadcrumb (Figma node 346:1119; the node could not be opened with the access available, so the spec from Joseph was used: see `open-items.md` Round 11 addendum). **Shown at every width, like sce.com (Joseph's final decision).**

- It **replaces** the header "Home" back link (`.ut-back`) on F1, F2, F5, F5-confirm, F6, F7, F9, F10 at every width: one navigation affordance, no leftover `.ut-back` there. (`?from=pf` arrivals get a "Your addresses" level in the trail instead of a second "Portfolio" back link.) F0 landings and the signed-in state variants have no breadcrumb and are unchanged.
- Markup: `<nav class="bc" aria-label="Breadcrumb"><ol><li>...</li></ol></nav>`. Links `#00445A` (10.6:1 on white; 1.7's `#1A76C5` fails AAA and is not used), bold + underline, 48px row and 48px targets (>= 44px minimum), decorative `>` separators (`aria-hidden`), current page = plain text with `aria-current="page"` (the only non-link).
- Fit: the 1.7 breadcrumb overflows a 358px phone, so the row is one fixed-height line that truncates: MIDDLE levels shrink first with an ellipsis, first and last stay visible (the last truncates only after the middle ones); the full label stays in the DOM and in a `title` tooltip. No wrap, no horizontal overflow, no layout shift. Pure CSS (`breadcrumb.css`).
- Placement (final): header, **breadcrumb**, name line, search, status card(s), rest. Baked into the HTML. Source: `HUB_DATA.breadcrumbs` (`src-ut11/hub_data.py`): `home`, `center`, per-page `trail` and `center_href`, `landings` (no breadcrumb).
- Back behaviour: the bottom nav (Outage Center / Map / Report / Help) is unchanged. "Outage Center" crumbs carry `data-nav-home`, so they follow the same audience memory as the bottom nav. Browser Back works as before.

| Page | Trail |
|---|---|
| `F1-lookup-result.html` | Home > Outage Center > Outage Search |
| `F2-active-detail.html` | Home > Outage Center > Outage Search > Outage details |
| `F5-report.html` | Home > Outage Center > Report a Problem |
| `F5-confirm.html` | Home > Outage Center > Report sent |
| `F6-map-sheet.html` | Home > Outage Center > Outage map |
| `F7-portfolio.html` | Home > Outage Center > Your addresses |
| `F9-afn-help.html` | Home > Outage Center > Help & support |
| `F10-psps-banner.html` | Home > Outage Center > Shutoff alert |

## Motion (ut11)

Component motion extends the existing page transitions. **One token set** in `m3_tokens.css` (`--motion-*`, the old `--md-sys-motion-*` set was replaced by it); `m3_motion.css` holds all rules, `motion.js` the measured height animations and the review helpers. Nothing else in the prototype declares a duration or easing (`motion-ut11.py` greps for strays).

| Token | Value (scale 1) | Use |
|---|---|---|
| `--motion-scale` | `1` |  |
| `--motion-duration-short` | `150ms` | state layers, press, chevron, chip / banner / menu enter, toggle knob |
| `--motion-duration-medium` | `250ms` | expand / collapse height, card tint + word cross-fade, stepper connector fill |
| `--motion-duration-long` | `300ms` | sheet slide-up + scrim, page transitions, NOW pulse |
| `--motion-ease-standard` | `cubic-bezier(0.2,0,0,1)` |  |
| `--motion-ease-emphasized` | `cubic-bezier(0.3,0,0,1)` |  |
| `--motion-ease-decelerate` | `cubic-bezier(0.05,0.7,0.1,1)` | things entering |
| `--motion-ease-accelerate` | `cubic-bezier(0.3,0,0.8,0.15)` | things leaving |
| `--motion-ease-linear` | `linear` | state-layer opacity, shimmer sweep |
| `--motion-stagger-step` | `40ms` | delay per item in a group (chips, list rows) |
| `--motion-stagger-max` | `3` | items beyond the 3rd get the 3rd delay (unitless) |
| `--motion-pulse-scale` | `1.08` | NOW tag peak scale |
| `--motion-pulse-count` | `1` | NOW tag pulses once |
| `--motion-press-scale` | `0.98` | subtle press on buttons |
| `--motion-enter-offset` | `8px` | banner / menu / snackbar rise distance |
| `--motion-flip-offset` | `6px` | ON/OFF word flip distance |
| `--motion-sheet-offset` | `32px` | bottom sheet rise distance |
| `--motion-scrim-opacity` | `0.32` | M3 scrim role |
| `--motion-shimmer-count` | `2` | skeleton sweeps (finite) |
| `--motion-duration-skeleton` | `1200ms` | EXCEPTION: one skeleton shimmer sweep |
| `--motion-duration-highlight` | `2400ms` | EXCEPTION: ERT-changed highlight fade (ut5, unchanged) |
| `--motion-latency-refresh` | `600ms` | EXCEPTION: simulated refresh latency (prototype only) |
| `--motion-latency-skeleton` | `900ms` | EXCEPTION: simulated card load hold (?loading=1, prototype only) |

Rules: durations 150-300 ms (the documented exceptions are `--motion-duration-skeleton`, `--motion-duration-highlight` and the two simulated `--motion-latency-*` values); animate `transform`, `opacity`, `clip-path` and background; heights are measured and eased only for the intended expand / collapse; no layout shift from decoration.

| What moves | Duration / easing |
|---|---|
| Page transitions (slide, sheet hand-off) | long, standard |
| Status card tint / border / word | medium, standard; the ON / OFF word rises in (medium, decelerate) over the old word leaving (medium, accelerate) |
| Stepper connector fill, NOW tag pulse (once) | medium standard; pulse long standard, `--motion-pulse-count` = 1 |
| View / Hide details, Account, accordions, show more / less | medium, standard (height) + fade |
| Map legend sheet slide-up; modal sheet + scrim (components) | long, decelerate (enter) / accelerate (exit) |
| Chip, banner, menu, snackbar, notices enter | short or medium, decelerate; chips stagger by `--motion-stagger-step` |
| Map layer switch, filter chips, segmented controls | short, standard |
| Buttons: M3 state layer + press scale `--motion-press-scale` | short, standard (linear for the layer opacity) |
| "Updated ..." trust line after a simulated refresh; card skeleton | long sheen; skeleton `--motion-duration-skeleton`, finite (`--motion-shimmer-count`) |

**Never animated (static):** `.hx-safety`, `.hx-detect`, `.safety-card`, `.hx-mb`, `.ut-help`, `.btn211`, `.btn.danger`, `a[href^="tel:"]`, `.ut-banner[data-tone="alert"]`, `[data-ph-list="s7Safety"]`, `[data-mo-static]`.

**Reduced motion:** `prefers-reduced-motion: reduce` and `?motion=off` set `--motion-scale: 0` and remove every transition and animation (state changes swap instantly). `?motion=slow` doubles every duration for review. `?loading=1` shows the card skeleton once on load. The Prototype controls panel has a Motion switch (standard / slow / off). `components.html` has a Motion section with replay buttons (prototype chrome).

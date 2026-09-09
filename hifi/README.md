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
| Report outage | Ink fill `#101820` + white, radius 4px |
| View map | White + ink border, radius 4px |
| Call 211 | Indigo `#4F46E5` + white, radius 4px |
| Sign in to My Account | Gold gradient only |
| Hero action strip | Quiet text: Report · Map · Get help (no gold / no fill) |

## Files

| File | Role |
|---|---|
| `index.html` | Gallery |
| `shared.css` | Hi-fi tokens (direction + comps) |
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

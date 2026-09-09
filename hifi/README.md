# SCE Outage Hub — Hi-fi mobile prototype (CONH)

Clickable mobile-first hi-fi for stakeholder review. Built from `wires-mobile/` IA with Pixel visual direction (`visual/direction.md` + `visual/comps.html`).

## How to open

1. Open **`index.html`** or **`F0-hub-home.html`** in a browser.
2. Use **DevTools device mode** at **390×844** (iPhone 12/13 size works well), or open on a phone.
3. Optional local server (better than `file://` on some phones):

```bash
cd /workspace/sce-outage-hub/hifi
python3 -m http.server 8080
# then visit http://localhost:8080/
```

Relative links only — works from this folder without a build step.

## Stakeholder critical path

| Path | Taps |
|---|---|
| **Guest active** | F0 → chip **Maple** → F1 → **View details** → F2 → **Map** F6 / **Get help** F9 |
| **Guest report** | F0 → **Report** → F5 → Submit → F5-confirm → back with **Pending report** badge |

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
| `index.html` | Gallery → open F0 |
| `shared.css` | Hi-fi tokens (direction + comps) |
| `F0-hub-home.html` | Guest hub (full polish) |
| `F1-lookup-result.html` | Lookup / Restoring hero (full polish) |
| `F2-active-detail.html` | Active detail + AFN (full polish) |
| `F5-report.html` | Report form (light upgrade) |
| `F5-confirm.html` | Confirmation + pending handoff |
| `F6-map-sheet.html` | Map sheet (light upgrade) |
| `F9-afn-help.html` | AFN / help (light upgrade) |

## Out of scope

- SCE-UI / gold-blue design-system work
- Coworker desktop dashboard
- Full F0-signed / F0-multi / F3–F4 / F7–F8 / F10 (Facilitator stubs only on F0)

## Gaps vs Pixel comps

- Comps are static artboards; this folder is clickable product UI (full-bleed, no gray desktop chrome).
- F0 uses **chips** for Recent (wires IA), not the comps “recent list” card — visual polish applied to chips.
- Signed-in / multi / PSPS artboards from comps are not shipped as separate hi-fi frames here (stakeholder path is guest F0→F2).
- Search placeholder locked to wires: “Search address, outage #, or meter” (comps used a shorter string).

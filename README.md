# SCE Outage Hub (CONH) — Mobile hi-fi

Clickable mobile-first prototype. Address-first guest path. Not the coworker desktop dashboard. Not SCE-UI.

## Open

1. Open `hifi/index.html` or `hifi/F0-hub-home.html`
2. Chrome DevTools → device mode **390×844**
3. Or: `cd hifi && python3 -m http.server 8080`

Desktop path (Joseph): `~/Desktop/SCE-Outage-Hub-mobile/hifi/`

## Critical paths

- **Guest:** F0 → Maple chip → F1 → View details → F2 → Map F6 / Get help F9
- **Report:** F0 → Report → F5 → Submit → F5-confirm → hub with pending badge

## Button lock

| Role | Spec |
|---|---|
| Report | ink `#101820` |
| View map | bordered secondary |
| Call 211 | indigo `#4F46E5` |
| Sign in | gold gradient only |
| Action strip | quiet text Report · Map · Get help |

Open Sans · ink `#101820` · links `#1A76C5` · CTA radius 4px

# TGS CMS Migration — Setup Baseline

**Date:** 2026-04-14  
**Branch:** cms-migration-ordering  
**Base commit:** 561bdae (Update Deluxe catering package per Tim's request)  
**Agent:** sync-runner-agent

---

## Environment

| Item | Value |
|------|-------|
| Node.js | v22.22.1 |
| npm | 10.9.4 |
| Angular | 19.1.x |
| Platform | Ubuntu 24.04 ARM64 (Graviton EC2) |
| Build output | dist/tgs/browser/ |

---

## GitHub & Git Setup

- **Auth method:** PAT fetched from SSM `/sync/github/pat/marcusshepp`, used directly in git remote URL (gh CLI skipped — PAT lacked `read:org` scope required by gh auth login, but git push/pull works fine)
- **git identity:** `sync-runner-agent <agent@syncgr.com>`
- **Branch:** `cms-migration-ordering` created from master and pushed to origin successfully

---

## Baseline Build

`npm install` and `npm run build` both completed **successfully** with no errors.

### Build Output

- **Prerendered routes:** 11 static routes
- **Output location:** `dist/tgs/browser/`
- **Initial bundle:** 967 KB raw / 195 KB gzipped (over 500 KB budget — pre-existing warning)

### Pre-existing Warnings (not introduced by this branch)

| Warning | Source | Action |
|---------|--------|--------|
| BannerComponent imported but unused | catering, full-menu, meet-us, reviews components | Pre-existing, not touching |
| `darken()` Sass function deprecated | full-menu, menu-item-details SCSS | Pre-existing |
| Font Awesome CSS comment syntax errors | public/css/all.min.css | Pre-existing, third-party file |
| Initial bundle exceeds 500 KB budget | all.min.css is 473 KB | Pre-existing |
| qrcode module is CommonJS (not ESM) | qr component | Pre-existing |

---

## Hardcoded Data Files (Migration Targets)

Located at `src/app/data/`:

| File | Content |
|------|---------|
| `catering-menu.model.ts` | Catering menu items and packages |
| `cloudinary.model.ts` | Cloudinary image configuration |
| `contact-info.model.ts` | Phone, address, hours, social links |
| `public-menu.model.ts` | Public menu items |
| `social-media.model.ts` | Social media URLs |
| `testimonials.model.ts` | Customer reviews/testimonials |

---

## Route Map

| Route in task spec | Actual app route | Status |
|-------------------|-----------------|--------|
| `/` | `/` | ✅ Prerendered |
| `/menu` | `/menu` (FullMenuComponent) | ✅ Prerendered |
| `/full-menu` | **Does not exist** — `/menu` is the full menu | ⚠️ No such route |
| `/catering` | `/catering` | ✅ Prerendered |
| `/reviews` | `/reviews` | ✅ Prerendered |
| `/meet-us` | `/meet-us` | ✅ Prerendered |
| `/special-events` | `/special-events` | ✅ Prerendered |
| `/contact` | `/contact-us` | ✅ Prerendered (note: path is `/contact-us`) |

> **Note:** The task spec lists `/full-menu` — this path does not exist in app.routes.ts. The component named `FullMenuComponent` is served at `/menu`. Screenshots labelled `full-menu` use `/menu` as the source URL. The SEO-preserving constraint means `/full-menu` remains a 404 (as it was before).

---

## BEFORE Screenshots

24 screenshots captured (8 pages × 3 viewports) and saved to `/tmp/agent-work/before/`.

| Viewport | Pages |
|----------|-------|
| 375×812 (iPhone) | home, menu, full-menu, catering, reviews, meet-us, special-events, contact |
| 768×1024 (iPad) | home, menu, full-menu, catering, reviews, meet-us, special-events, contact |
| 1440×900 (desktop) | home, menu, full-menu, catering, reviews, meet-us, special-events, contact |

Screenshots served from the Angular prerender output via Python HTTP server on port 8080.

---

## Status: Ready for CMS Migration

The baseline is clean. All pre-existing warnings are documented above and pre-date this branch. No errors were introduced. The branch `cms-migration-ordering` is live at `origin/cms-migration-ordering` and ready for subsequent migration steps.

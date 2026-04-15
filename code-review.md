# Code Review — cms-migration-ordering

**Branch:** `cms-migration-ordering`
**Reviewer:** Senior Developer (automated)
**Date:** 2026-04-15

---

## Summary

Reviewed all diffs introduced on this branch. Found and resolved **5 MUST-FIX** and **4 SHOULD-FIX** issues.

---

## MUST FIX (All Resolved)

### 1. `console.log` debug statement — `menu-item-details.component.ts`

`addToCart()` contained a `console.log('Adding to cart:', this.menuItem)` with no actual cart integration. Removed the log and left an empty stub method body pending real implementation.

### 2. Missing `OnDestroy` / memory leak — `reviews.component.ts`

Raw `.subscribe()` with no `takeUntil` or cleanup. On component destruction the subscription remained active indefinitely. Added `Subject<void>` destroy pattern, `takeUntil(this.destroy$)`, and `ngOnDestroy()`.

### 3. Missing `OnDestroy` / memory leak — `contact-us.component.ts`

Same pattern: `.subscribe()` with no cleanup. Applied identical `destroy$` + `takeUntil` fix.

### 4. `as any` DOM casts — `catering-menu.component.ts`

Six occurrences of `as any` on `Element` references for style/classList access. Each replaced with `as HTMLElement`, which is the correct type for all targeted DOM nodes.

### 5. `any` types in HTTP handler — `contact-form.component.ts`

`const formData: any = { ...this.form.value }` and `error: (err: any)` in the HTTP subscription.

- `formData: any` removed entirely; each form field extracted with explicit `string` type via `this.form.get('field')?.value ?? ''` and referenced directly in the payload. (A `Record<string, unknown>` spread was attempted first but fails because `tsconfig.json` sets `noPropertyAccessFromIndexSignature: true`, which prohibits dot-notation property access on index signatures.)
- `err: any` → `err: unknown`.

---

## SHOULD FIX (All Resolved)

### 6. Unused `CmsService` injection — `banner.component.ts`

`CmsService` was imported and injected in the constructor but never referenced in the class body. Removed the import and constructor parameter.

### 7. Nested subscriptions — `home-menu.component.ts`

`getHome().subscribe()` nested a second `getMenuItems().subscribe()` inside. Refactored to `combineLatest([getHome(), getMenuItems()])` with a `map` operator to derive the filtered items list. Eliminates the inner subscription and consolidates lifecycle management under a single `takeUntil`.

### 8. Missing `ChangeDetectionStrategy.OnPush` — 4 new ordering components

All four components introduced on this branch (`cart.component.ts`, `checkout.component.ts`, `order-confirmation.component.ts`, `event-order.component.ts`) were created without `OnPush`. Added `ChangeDetectionStrategy.OnPush` to each decorator and injected `ChangeDetectorRef`, calling `markForCheck()` after every subscribe assignment and inside async callbacks (`setTimeout`, `sessionStorage` reads) to ensure the view updates correctly.

### 9. Unused `BannerComponent` import — `reviews.component.ts`

`BannerComponent` was listed in the `imports` array of the rewritten `ReviewsComponent` but is not used in the template. Removed the import statement and the entry from the `imports` array.

---

## Verified Clean

| Check | Result |
|---|---|
| All ordering routes (`/events/:slug`, `/cart`, `/checkout`, `/order-confirmation`) | Present and routed |
| TypeScript strict — no `any` remaining in diff | Clean |
| `OnDestroy` on all components with subscriptions | Clean |
| `CmsService` fixture fallback pattern | Correct — `of(fixture)` on `cmsMode === 'fixture'` |
| `CartService` BehaviorSubject reactivity | Correct — immutable updates, no stale closures |
| `src/app/data/` directory | All files deleted |
| `npm run build` | Exit 0, 16 static routes prerendered |
| Prerender routes file | `prerender-routes.txt` intact |

---

## Pre-existing Warnings (Not Introduced by Branch)

- `BannerComponent` declared in `imports` but unused in `CateringComponent`, `FullMenuComponent`, `MeetUsComponent` — Angular compiler warnings, pre-existing before this branch.
- Deprecated SCSS `darken()` function in `full-menu.component.scss` and `menu-item-details.component.scss` — pre-existing.
- Font Awesome CSS parsing warnings — pre-existing, external asset.

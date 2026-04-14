# seed-cms.ts — CMS Seeding Script

Reads `cms/seed-content.json` and pushes all sections and collection items to the
production CMS API at `cms-api.syncgr.com` for the `timsgourmetsliders.com` tenant.

---

## Prerequisites

- [Bun](https://bun.sh/) installed (`bun --version`)
- A valid Portal JWT (obtain from the Sync Portal admin panel)

---

## Usage

```bash
PORTAL_JWT=<your-jwt-token> bun scripts/seed-cms.ts
```

Run this from the repo root directory after merging the `cms-migration-ordering` PR.

---

## What It Does

1. Reads `cms/seed-content.json`
2. For each of the 10 **sections** (brand, contact, home, meet-us, services, trusted-by, footer, catering, reviews-page, order-ui):
   - Checks if the section already exists via `GET /admin/cms/content/{tenant}/{key}`
   - Creates (`POST`) if new, updates (`PUT`) if it exists — fully idempotent
3. For each of the 4 **collections** (menu-items, catering-items, events, reviews):
   - Iterates every item in the array
   - Checks existence via `GET /admin/cms/collection/{tenant}/{key}/{slug}`
   - Creates or updates each item — fully idempotent
4. Prints a summary of seeded / updated / errored items
5. Exits with code 1 if any errors occurred

---

## Item Counts

| Key | Type | Items |
|-----|------|-------|
| brand | section | 1 |
| contact | section | 1 |
| home | section | 1 |
| meet-us | section | 1 |
| services | section | 1 |
| trusted-by | section | 1 |
| footer | section | 1 |
| catering | section | 1 |
| reviews-page | section | 1 |
| order-ui | section | 1 |
| menu-items | collection | 16 items |
| catering-items | collection | 24 items |
| events | collection | 2 items |
| reviews | collection | 12 items |

**Total: ~65 CMS documents**

---

## ⚠️  Important: Delete the Test Event After Demo

The seed includes a synthetic test event with slug `test-event-upcoming`:
- **Name:** Campus Martius Pop-Up — Spring 2026
- **Purpose:** QA fixture so downstream agents have a live `/events/test-event-upcoming/order` page to test against
- **This is NOT real data** — Tim should not advertise this event

**After demoing the ordering UI to Tim, either:**
- Delete the event via the CMS admin panel, or
- Change its `status` to `"past"` so it no longer shows in the upcoming events list

---

## Re-Running

The script is idempotent. Running it multiple times is safe — it will update
existing documents rather than creating duplicates.

---

## Troubleshooting

**`PORTAL_JWT environment variable is not set`**
— You forgot to prefix the command with `PORTAL_JWT=<token>`.

**`401 Unauthorized`**
— Your JWT is expired or invalid. Obtain a fresh token from the Sync Portal.

**`404` on update**
— The item was deleted between the existence check and the update. Re-run to recreate it.

**Network errors**
— Check your internet connection. The script does not retry on transient failures.

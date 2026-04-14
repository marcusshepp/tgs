#!/usr/bin/env bun
/**
 * seed-cms.ts — Seed Tim's Gourmet Sliders CMS with content from cms/seed-content.json
 *
 * Usage: PORTAL_JWT=<token> bun scripts/seed-cms.ts
 *
 * Reads cms/seed-content.json, authenticates against cms-api.syncgr.com, and
 * POSTs/PUTs each section/collection item. Idempotent: checks for existence
 * before posting, updates if already present.
 */

import { readFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://cms-api.syncgr.com";
const TENANT = "timsgourmetsliders.com";
const JWT = process.env.PORTAL_JWT;

if (!JWT) {
  console.error("❌  PORTAL_JWT environment variable is not set.");
  console.error("    Usage: PORTAL_JWT=<token> bun scripts/seed-cms.ts");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${JWT}`,
  "Content-Type": "application/json",
};

const seedPath = join(import.meta.dir, "../cms/seed-content.json");
const seed = JSON.parse(readFileSync(seedPath, "utf-8"));

let totalSeeded = 0;
let totalUpdated = 0;
let totalErrors = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getSection(key: string): Promise<unknown> {
  const res = await fetch(
    `${BASE_URL}/admin/cms/content/${TENANT}/${key}`,
    { headers }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET section ${key} failed: ${res.status}`);
  return res.json();
}

async function upsertSection(key: string, data: unknown): Promise<void> {
  const existing = await getSection(key);
  const method = existing ? "PUT" : "POST";
  const url = existing
    ? `${BASE_URL}/admin/cms/content/${TENANT}/${key}`
    : `${BASE_URL}/admin/cms/content/${TENANT}/${key}`;

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${method} section ${key} failed: ${res.status} — ${body}`);
  }

  if (existing) {
    totalUpdated++;
  } else {
    totalSeeded++;
  }
}

async function getCollectionItem(
  collectionKey: string,
  slug: string
): Promise<unknown> {
  const res = await fetch(
    `${BASE_URL}/admin/cms/collection/${TENANT}/${collectionKey}/${slug}`,
    { headers }
  );
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(
      `GET collection item ${collectionKey}/${slug} failed: ${res.status}`
    );
  return res.json();
}

async function upsertCollectionItem(
  collectionKey: string,
  slug: string,
  data: unknown
): Promise<void> {
  const existing = await getCollectionItem(collectionKey, slug);
  const method = existing ? "PUT" : "POST";
  const url = existing
    ? `${BASE_URL}/admin/cms/collection/${TENANT}/${collectionKey}/${slug}`
    : `${BASE_URL}/admin/cms/collection/${TENANT}/${collectionKey}`;

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `${method} ${collectionKey}/${slug} failed: ${res.status} — ${body}`
    );
  }

  if (existing) {
    totalUpdated++;
  } else {
    totalSeeded++;
  }
}

// ─── Seed Sections ────────────────────────────────────────────────────────────

const SECTION_KEYS = [
  "brand",
  "contact",
  "home",
  "meet-us",
  "services",
  "trusted-by",
  "footer",
  "catering",
  "reviews-page",
  "order-ui",
] as const;

async function seedSections(): Promise<void> {
  console.log("\n📄  Seeding sections...");
  for (const key of SECTION_KEYS) {
    if (!(key in seed)) {
      console.warn(`  ⚠️  No data for section "${key}" in seed-content.json — skipping`);
      continue;
    }
    process.stdout.write(`  → ${key} ... `);
    try {
      await upsertSection(key, seed[key]);
      console.log("✓");
    } catch (err) {
      console.log(`✗  ${(err as Error).message}`);
      totalErrors++;
    }
  }
}

// ─── Seed Collections ─────────────────────────────────────────────────────────

type CollectionKey = "menu-items" | "catering-items" | "events" | "reviews";

async function seedCollection(
  collectionKey: CollectionKey,
  slugField: string
): Promise<void> {
  const items: Array<Record<string, unknown>> = seed[collectionKey];
  if (!items || !Array.isArray(items)) {
    console.warn(`  ⚠️  No array data for collection "${collectionKey}" — skipping`);
    return;
  }

  console.log(`\n📦  Seeding collection "${collectionKey}" (${items.length} items)...`);

  for (const item of items) {
    const slug = item[slugField] as string;
    if (!slug) {
      console.warn(`  ⚠️  Item missing slug field "${slugField}" — skipping`);
      totalErrors++;
      continue;
    }
    process.stdout.write(`  → ${slug} ... `);
    try {
      await upsertCollectionItem(collectionKey, slug, item);
      console.log("✓");
    } catch (err) {
      console.log(`✗  ${(err as Error).message}`);
      totalErrors++;
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("🚀  Starting CMS seed for", TENANT);
  console.log("    API:", BASE_URL);
  console.log("    Seed file:", seedPath);

  await seedSections();
  await seedCollection("menu-items", "slug");
  await seedCollection("catering-items", "slug");
  await seedCollection("events", "slug");
  await seedCollection("reviews", "slug");

  console.log("\n─────────────────────────────────────────");
  console.log(`✅  Seeded:  ${totalSeeded}`);
  console.log(`🔄  Updated: ${totalUpdated}`);
  if (totalErrors > 0) {
    console.log(`❌  Errors:  ${totalErrors}`);
    console.log("\nSome items failed to seed. Check errors above.");
    process.exit(1);
  } else {
    console.log("\nAll items seeded successfully.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

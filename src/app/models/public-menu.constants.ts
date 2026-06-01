/**
 * Slugs of CMS menu items that are hidden from the PUBLIC-facing menu surfaces:
 *   - the public menu page (/menu)
 *   - the printable HTML + PDF export (/menu-pdf/public)
 *
 * The items still exist in the `menuItems` CMS collection (so direct
 * /menu-item/:slug detail links keep working) and on the separate catering
 * menu (the `cateringItems` collection). This list only removes them from the
 * public menu listing.
 *
 * "Not! So Basic" (not-so-basic) is catering-only per client request
 * (2026-06-01) and is served on the catering menu via catering-not-so-basic-sliders.
 */
export const PUBLIC_MENU_HIDDEN_SLUGS: ReadonlySet<string> = new Set<string>([
    'not-so-basic',
]);

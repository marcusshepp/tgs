import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';

test.describe('Banner Audit - All Pages', () => {

  const pages = [
    { name: 'Home', path: '/', screenshotName: 'banner-home' },
    { name: 'Reviews', path: '/reviews', screenshotName: 'banner-reviews' },
    { name: 'Catering', path: '/catering', screenshotName: 'banner-catering' },
    { name: 'Menu', path: '/menu', screenshotName: 'banner-menu' },
    { name: 'Contact Us', path: '/contact-us', screenshotName: 'banner-contact' },
    { name: 'Meet Us', path: '/meet-us', screenshotName: 'banner-meet-us' },
  ];

  for (const page of pages) {
    test(`Capture ${page.name} page banner - Desktop`, async ({ page: browserPage }) => {
      // Set desktop viewport
      await browserPage.setViewportSize({ width: 1440, height: 900 });
      await browserPage.goto(BASE_URL + page.path);
      await browserPage.waitForLoadState('networkidle');

      // Take full page screenshot
      await browserPage.screenshot({
        path: `notes/${page.screenshotName}-desktop.png`,
        fullPage: true
      });

      // Take banner-only screenshot
      const banner = browserPage.locator('app-banner, .hero-section').first();
      if (await banner.isVisible()) {
        await banner.screenshot({
          path: `notes/${page.screenshotName}-banner-only-desktop.png`
        });
      }

      console.log(`✓ Captured ${page.name} desktop screenshots`);
    });

    test(`Capture ${page.name} page banner - Mobile`, async ({ page: browserPage }) => {
      // Set mobile viewport
      await browserPage.setViewportSize({ width: 375, height: 667 });
      await browserPage.goto(BASE_URL + page.path);
      await browserPage.waitForLoadState('networkidle');

      // Take full page screenshot
      await browserPage.screenshot({
        path: `notes/${page.screenshotName}-mobile.png`,
        fullPage: true
      });

      // Take banner-only screenshot
      const banner = browserPage.locator('app-banner, .hero-section').first();
      if (await banner.isVisible()) {
        await banner.screenshot({
          path: `notes/${page.screenshotName}-banner-only-mobile.png`
        });
      }

      console.log(`✓ Captured ${page.name} mobile screenshots`);
    });
  }

  // Also capture a menu item detail page if possible
  test('Capture Menu Item detail page banner', async ({ page: browserPage }) => {
    await browserPage.setViewportSize({ width: 1440, height: 900 });

    // Try to navigate to menu first to get an item ID
    await browserPage.goto(BASE_URL + '/menu');
    await browserPage.waitForLoadState('networkidle');

    // Find first menu item link
    const menuItemLink = browserPage.locator('a[href*="menu-item"]').first();

    if (await menuItemLink.isVisible()) {
      await menuItemLink.click();
      await browserPage.waitForLoadState('networkidle');

      await browserPage.screenshot({
        path: 'notes/banner-menu-item-desktop.png',
        fullPage: true
      });

      const banner = browserPage.locator('app-banner, .hero-section').first();
      if (await banner.isVisible()) {
        await banner.screenshot({
          path: 'notes/banner-menu-item-banner-only-desktop.png'
        });
      }

      console.log('✓ Captured Menu Item detail page');
    }
  });
});

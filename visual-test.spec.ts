import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';

test.describe('Visual Verification Screenshots', () => {

  test('Mobile view screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot of the header
    await page.screenshot({
      path: 'notes/screenshot-mobile-375px.png',
      fullPage: false
    });

    console.log('✓ Mobile screenshot saved to notes/screenshot-mobile-375px.png');
  });

  test('Tablet view screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'notes/screenshot-tablet-768px.png',
      fullPage: false
    });

    console.log('✓ Tablet screenshot saved to notes/screenshot-tablet-768px.png');
  });

  test('Desktop view screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'notes/screenshot-desktop-1440px.png',
      fullPage: false
    });

    console.log('✓ Desktop screenshot saved to notes/screenshot-desktop-1440px.png');
  });

  test('Breakpoint edge case - 1199px screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1199, height: 768 });
    await page.goto(BASE_URL);

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'notes/screenshot-breakpoint-1199px.png',
      fullPage: false
    });

    console.log('✓ Breakpoint (1199px) screenshot saved');
  });

  test('Breakpoint edge case - 1200px screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 768 });
    await page.goto(BASE_URL);

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'notes/screenshot-breakpoint-1200px.png',
      fullPage: false
    });

    console.log('✓ Breakpoint (1200px) screenshot saved');
  });

  test('Mobile menu open screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Click hamburger to open menu
    await page.locator('.menu-toggle').click();

    // Wait for menu animation
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'notes/screenshot-mobile-menu-open.png',
      fullPage: true
    });

    console.log('✓ Mobile menu open screenshot saved');
  });
});

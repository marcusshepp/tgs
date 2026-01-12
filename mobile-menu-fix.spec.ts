import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';

test.describe('Mobile Menu Flash Fix Verification', () => {

  test('Mobile view - desktop nav should be hidden immediately', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to home page
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Check that desktop nav is hidden via CSS
    const desktopNav = page.locator('.header__nav');
    const displayStyle = await desktopNav.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });

    console.log(`Mobile view - Desktop nav display: ${displayStyle}`);
    expect(displayStyle).toBe('none');

    // Mobile logo should be visible
    const mobileLogo = page.locator('.mobile-logo');
    await expect(mobileLogo).toBeVisible();
    console.log('✓ Mobile logo is visible');

    // Desktop nav should not be visible
    await expect(desktopNav).toBeHidden();
    console.log('✓ Desktop nav is hidden');
  });

  test('Desktop view - mobile logo should be hidden immediately', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Check that mobile logo is hidden via CSS
    const mobileLogo = page.locator('.mobile-logo');
    const displayStyle = await mobileLogo.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });

    console.log(`Desktop view - Mobile logo display: ${displayStyle}`);
    expect(displayStyle).toBe('none');

    // Desktop nav should be visible
    const desktopNav = page.locator('.header__nav');
    await expect(desktopNav).toBeVisible();
    console.log('✓ Desktop nav is visible');

    // Mobile logo should not be visible
    await expect(mobileLogo).toBeHidden();
    console.log('✓ Mobile logo is hidden');
  });

  test('Mobile view - verify no desktop nav elements are visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Desktop nav should be hidden
    const desktopNav = page.locator('.header__nav');
    await expect(desktopNav).toBeHidden();

    // Desktop right section should be hidden
    const desktopRight = page.locator('.header__right');
    await expect(desktopRight).toBeHidden();

    // Hamburger menu should be visible
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();

    console.log('✓ All mobile view elements are correct');
  });

  test('Breakpoint test - verify exactly at 1200px', async ({ page }) => {
    // Test at 1199px (should be mobile)
    await page.setViewportSize({ width: 1199, height: 768 });
    await page.goto(BASE_URL);

    let desktopNav = page.locator('.header__nav');
    await expect(desktopNav).toBeHidden();
    console.log('✓ At 1199px: desktop nav hidden (mobile mode)');

    // Test at 1200px (should be desktop)
    await page.setViewportSize({ width: 1200, height: 768 });
    await page.waitForTimeout(100);

    desktopNav = page.locator('.header__nav');
    await expect(desktopNav).toBeVisible();
    console.log('✓ At 1200px: desktop nav visible (desktop mode)');
  });

  test('Mobile menu functionality still works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Click hamburger menu
    const menuToggle = page.locator('.menu-toggle');
    await menuToggle.click();

    // Mobile menu panel should be active
    const mobileMenu = page.locator('app-mobile-menu .mobile-menu');
    await expect(mobileMenu).toHaveClass(/active/);
    console.log('✓ Mobile menu opens correctly');

    // Close menu
    const closeButton = page.locator('.mobile-menu__close');
    await closeButton.click();

    // Should be closed
    await expect(mobileMenu).not.toHaveClass(/active/);
    console.log('✓ Mobile menu closes correctly');
  });
});

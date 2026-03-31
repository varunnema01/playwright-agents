/**
 * UI/UX Tests
 */

import { test, expect } from '../utils/fixtures';

test.describe('Accessibility & UI/UX', () => {
  test('TC_UI_001: Verify responsive design on mobile view', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHomepage();
    
    const isSearchBoxVisible = await homePage.isSearchBoxVisible();
    expect(isSearchBoxVisible).toBe(true);
  });

  test('TC_UI_002: Verify responsive design on tablet view', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await homePage.navigateToHomepage();
    
    const isSearchBoxVisible = await homePage.isSearchBoxVisible();
    expect(isSearchBoxVisible).toBe(true);
  });

  test('TC_UI_003: Verify responsive design on desktop view', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await homePage.navigateToHomepage();
    
    const isSearchBoxVisible = await homePage.isSearchBoxVisible();
    expect(isSearchBoxVisible).toBe(true);
    
    const categoriesVisible = await homePage.verifyAllCategoriesVisible();
    expect(categoriesVisible).toBe(true);
  });
});
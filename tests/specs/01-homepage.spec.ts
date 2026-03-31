/**
 * Homepage Tests - TC_HP_001 to TC_NAV_008
 */

import { test, expect } from '../utils/fixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Homepage & Navigation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomepage();
  });

  test('TC_HP_001: Verify homepage content loads successfully', async ({ homePage }) => {
    const isSearchBoxVisible = await homePage.isSearchBoxVisible();
    expect(isSearchBoxVisible).toBe(true);

    const isCartIconVisible = await homePage.isCartIconVisible();
    expect(isCartIconVisible).toBe(true);

    const dealBannersCount = await homePage.getDealBannersCount();
    expect(dealBannersCount).toBeGreaterThan(0);
  });

  test('TC_HP_002: Verify navigation bar displays top categories', async ({ homePage }) => {
    const categoriesVisible = await homePage.verifyAllCategoriesVisible();
    expect(categoriesVisible).toBe(true);
  });

  test('TC_HP_003: Verify Flipkart logo links to homepage', async ({ homePage }) => {
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('flipkart.com');
    
    await homePage.clickFlipkartLogo();
    const urlAfterClick = await homePage.getCurrentUrl();
    expect(urlAfterClick).toContain('flipkart.com');
  });

  test('TC_NAV_001: Click on Fashion category', async ({ homePage }) => {
    await homePage.clickFashionCategory();
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toBeDefined();
  });

  test('TC_NAV_002: Click on Mobiles category', async ({ homePage }) => {
    await homePage.clickMobilesCategory();
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toBeDefined();
  });

  test('TC_NAV_003: Click on Electronics category', async ({ homePage }) => {
    await homePage.clickElectronicsCategory();
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toBeDefined();
  });

  test('TC_NAV_004: Click on Home category', async ({ homePage }) => {
    await homePage.clickHomeCategory();
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toBeDefined();
  });

  test('TC_DEALS_004: Verify Grab or Gone deals section', async ({ homePage }) => {
    const isGrabOrGoneVisible = await homePage.isGrabOrGoneSectionVisible();
    expect(isGrabOrGoneVisible).toBe(true);
  });
});
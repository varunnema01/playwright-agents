/**
 * Product Details Tests
 */

import { test, expect } from '../utils/fixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Product Details Page', () => {
  test.beforeEach(async ({ homePage, searchPage }) => {
    await homePage.navigateToHomepage();
    await homePage.searchProduct(TEST_DATA.searchTerms.laptop);
  });

  test('TC_PDP_001: Click on product and verify details page loads', async ({ searchPage, productDetailsPage }) => {
    const productCount = await searchPage.getProductCount();
    if (productCount > 0) {
      await searchPage.clickProduct(0);
      
      const title = await productDetailsPage.getProductTitle();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('TC_PDP_006: Verify Add to Cart button is enabled', async ({ searchPage, productDetailsPage }) => {
    const productCount = await searchPage.getProductCount();
    if (productCount > 0) {
      await searchPage.clickProduct(0);
      
      const isEnabled = await productDetailsPage.isAddToCartButtonEnabled();
      expect(isEnabled).toBe(true);
    }
  });

  test('TC_PDP_007: Verify Add to Wishlist button is enabled', async ({ searchPage, productDetailsPage }) => {
    const productCount = await searchPage.getProductCount();
    if (productCount > 0) {
      await searchPage.clickProduct(0);
      
      const isEnabled = await productDetailsPage.isAddToWishlistButtonEnabled();
      expect(isEnabled).toBe(true);
    }
  });

  test('TC_PDP_003: Verify specifications are visible', async ({ searchPage, productDetailsPage }) => {
    const productCount = await searchPage.getProductCount();
    if (productCount > 0) {
      await searchPage.clickProduct(0);
      await productDetailsPage.scrollToSpecifications();
      
      const specsVisible = await productDetailsPage.areSpecificationsVisible();
      expect(specsVisible).toBe(true);
    }
  });
});
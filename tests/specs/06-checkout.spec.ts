/**
 * Checkout Tests
 */

import { test, expect } from '../utils/fixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Checkout & Order Placement', () => {
  test('TC_CHECKOUT_001: Proceed to checkout from cart', async ({ homePage, searchPage, productDetailsPage, cartPage }) => {
    await homePage.navigateToHomepage();
    await homePage.searchProduct(TEST_DATA.searchTerms.laptop);
    
    if ((await searchPage.getProductCount()) > 0) {
      await searchPage.clickProduct(0);
      await productDetailsPage.clickAddToCart();
      await homePage.clickCart();
      
      const isProceedVisible = await cartPage.isProceedCheckoutButtonVisible();
      expect(isProceedVisible).toBe(true);
    }
  });
});
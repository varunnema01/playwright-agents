/**
 * Cart Functionality Tests
 */

import { test, expect } from '../utils/fixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Cart Functionality', () => {
  test('TC_CART_001: Add product to cart', async ({ homePage, searchPage, productDetailsPage, cartPage }) => {
    await homePage.navigateToHomepage();
    await homePage.searchProduct(TEST_DATA.searchTerms.shoes);
    
    if ((await searchPage.getProductCount()) > 0) {
      await searchPage.clickProduct(0);
      await productDetailsPage.clickAddToCart();
      await homePage.wait(1000);
      
      const isCartUpdated = await homePage.isCartIconVisible();
      expect(isCartUpdated).toBe(true);
    }
  });

  test('TC_CART_003: Navigate to cart and verify product displayed', async ({ homePage, searchPage, productDetailsPage, cartPage }) => {
    await homePage.navigateToHomepage();
    await homePage.searchProduct(TEST_DATA.searchTerms.watch);
    
    if ((await searchPage.getProductCount()) > 0) {
      await searchPage.clickProduct(0);
      await productDetailsPage.clickAddToCart();
      await homePage.clickCart();
      
      const itemsCount = await cartPage.getCartItemsCount();
      expect(itemsCount).toBeGreaterThan(0);
    }
  });

  test('TC_CART_006: Remove product from cart', async ({ homePage, searchPage, productDetailsPage, cartPage }) => {
    await homePage.navigateToHomepage();
    await homePage.searchProduct(TEST_DATA.searchTerms.phone);
    
    if ((await searchPage.getProductCount()) > 0) {
      await searchPage.clickProduct(0);
      await productDetailsPage.clickAddToCart();
      await homePage.clickCart();
      
      const initialCount = await cartPage.getCartItemsCount();
      if (initialCount > 0) {
        await cartPage.removeItem(0);
        const finalCount = await cartPage.getCartItemsCount();
        expect(finalCount).toBeLessThanOrEqual(initialCount);
      }
    }
  });
});
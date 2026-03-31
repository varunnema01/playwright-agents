/**
 * Playwright Fixtures - Custom fixtures for tests
 */

import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { CartPage } from '../pages/cartPage';
import { WishlistPage } from '../pages/wishlistPage';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { TEST_DATA } from './testData';

type PageObjectsFixture = {
  homePage: HomePage;
  searchPage: SearchPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  wishlistPage: WishlistPage;
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<PageObjectsFixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  wishlistPage: async ({ page }, use) => {
    const wishlistPage = new WishlistPage(page);
    await use(wishlistPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
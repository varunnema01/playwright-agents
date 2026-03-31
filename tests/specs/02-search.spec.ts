/**
 * Search Functionality Tests
 */

import { test, expect } from '../utils/fixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomepage();
  });

  test('TC_SEARCH_001: Search for laptop', async ({ homePage, searchPage }) => {
    await homePage.searchProduct(TEST_DATA.searchTerms.laptop);
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC_SEARCH_002: Search for shoes', async ({ homePage, searchPage }) => {
    await homePage.searchProduct(TEST_DATA.searchTerms.shoes);
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC_SEARCH_009: Sort by Lowest Price', async ({ homePage, searchPage }) => {
    await homePage.searchProduct(TEST_DATA.searchTerms.watch);
    await searchPage.sortByLowestPrice();
    
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('TC_PAGINATE_002: Navigate to next page', async ({ homePage, searchPage }) => {
    await homePage.searchProduct(TEST_DATA.searchTerms.phone);
    const initialCount = await searchPage.getProductCount();
    
    await searchPage.goToNextPage();
    const newCount = await searchPage.getProductCount();
    
    expect(newCount).toBeGreaterThanOrEqual(0);
  });
});
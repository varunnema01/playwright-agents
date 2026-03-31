/**
 * Performance Tests
 */

import { test, expect } from '../utils/fixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Performance & Load Testing', () => {
  test('TC_PERF_001: Homepage loads within reasonable time', async ({ homePage }) => {
    const startTime = Date.now();
    await homePage.navigateToHomepage();
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(15000);
  });

  test('TC_PERF_002: Search results load within reasonable time', async ({ homePage, searchPage }) => {
    await homePage.navigateToHomepage();
    
    const startTime = Date.now();
    await homePage.searchProduct(TEST_DATA.searchTerms.laptop);
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(15000);
    
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});
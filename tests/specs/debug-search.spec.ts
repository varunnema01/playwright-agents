import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';

test('Debug: Check search results page structure', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  
  // Navigate to homepage
  await homePage.navigateToHomepage();
  console.log('✅ Homepage loaded');
  
  // Search for laptop
  await homePage.searchProduct('laptop');
  console.log('✅ Search performed');
  
  // Wait a moment for page stabilization
  await page.waitForTimeout(2000);
  
  // Check current URL
  const url = page.url();
  console.log(`📍 Current URL: ${url}`);
  
  // Try different selectors to find products
  const selectors = [
    'div[data-id]',
    'div[data-index]',
    'a[href*="/p/"]',
    'div[class*="product"]',
    'div[class*="item"]',
    'div[class*="tile"]',
    'a[data-tracking-id]',
    'div[class*="KzDlHK"]',  // Common Flipkart product card class
    '_2kHmtP',  // Another common class
  ];
  
  console.log('🔍 Checking selectors:');
  for (const selector of selectors) {
    try {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`  ✅ ${selector}: ${count} elements`);
      }
    } catch (e) {
      // Silently skip invalid selectors
    }
  }
  
  // Log page content to see structure
  const bodyText = await page.evaluate(() => {
    return document.body.textContent?.substring(0, 200) || 'No content';
  });
  console.log(`📄 Page content preview: ${bodyText}`);
});

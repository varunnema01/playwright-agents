import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';

test('Debug: Check product details page structure', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  
  // Navigate and search
  await homePage.navigateToHomepage();
  await homePage.searchProduct('laptop');
  
  // Use the SearchPage.clickProduct method
  console.log('🖱️  Clicking first product using SearchPage method...');
  await searchPage.clickProduct(0);
  
  // Wait a moment and check URL
  await page.waitForTimeout(2000);
  const urlAfterClick = page.url();
  console.log(`📍 URL after click: ${urlAfterClick}`);
  
  // Check if we're on a product page
  if (urlAfterClick.includes('/p/')) {
    console.log('✅ We are on a product page!');
    
    // Now check for product details
    const titleSelectors = [
      'h1',
      'h2',
      'span[class*="B_NuCI"]',
      'div[class*="title"]',
    ];
    
    console.log('🔍 Checking selectors on product page:');
    for (const selector of titleSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        const text = await page.locator(selector).first().textContent();
        console.log(`  ✅ ${selector}: ${count} - "${text?.substring(0, 40)}"`);
      }
    }
  } else {
    console.log('❌ We are NOT on a product page - URL still shows search page');
    
    // Debug info
    const productCards = page.locator('div[data-id]');
    console.log(`📊 Found ${await productCards.count()} product cards`);
    
    const firstCardLinks = productCards.nth(0).locator('a[href*="/p/"]');
    console.log(`📊 First card has ${await firstCardLinks.count()} links with /p/ in href`);
    
    if (await firstCardLinks.count() > 0) {
      const href = await firstCardLinks.first().getAttribute('href');
      const text = await firstCardLinks.first().textContent();
      console.log(`  First link in first card: ${text?.substring(0, 40)}`);
      console.log(`  Href: ${href?.substring(0, 80)}`);
    }
  }
});
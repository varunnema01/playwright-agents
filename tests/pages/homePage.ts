/**
 * HomePage - Page Object Model for Flipkart Homepage
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  // Fix: Use more specific selector to avoid matching readonly search box
  readonly searchBox: string = 'input[name="q"]:not([readonly])';
  readonly cartIcon: string = 'a[href*="/viewcart"]';
  readonly loginLink: string = 'a[href*="login"]';
  readonly fashionCategory: string = 'a:has-text("Fashion")';
  readonly mobilesCategory: string = 'a:has-text("Mobiles")';
  readonly electronicsCategory: string = 'a:has-text("Electronics")';
  readonly homeCategory: string = 'a:has-text("Home")';
  readonly beautyCategory: string = 'a:has-text("Beauty")';
  readonly appliancesCategory: string = 'a:has-text("Appliances")';
  readonly dealBanners: string = 'div[class*="deal"]';
  readonly grabOrGoneSection: string = 'text="Grab or gone"';
  readonly locationSelector: string = 'div:has-text("Select delivery location")';

  constructor(page: Page) { super(page); }

  async navigateToHomepage(): Promise<void> {
    await this.navigateTo('https://www.flipkart.com/');
    await this.page.waitForLoadState('networkidle');
  }

  async searchProduct(searchTerm: string): Promise<void> {
    // Dismiss any modal/overlay that might be blocking interactions
    await this.pressKey('Escape');
    await this.page.waitForTimeout(500);
    
    // Focus on the search input
    const searchInput = this.page.locator(this.searchBox).first();
    await searchInput.focus();
    
    // Clear and fill the search box
    await searchInput.fill(searchTerm);
    await this.page.waitForTimeout(300);
    
    // Dismiss overlay again before clicking search
    await this.pressKey('Escape');
    await this.page.waitForTimeout(500);
    
    // Look for a search button and click it, or press Enter
    const searchButton = this.page.locator('button[class*="search"], button svg[class*="search"], form button').first();
    const buttonExists = await searchButton.isVisible().catch(() => false);
    
    if (buttonExists) {
      try {
        await searchButton.click({ timeout: 5000 });
      } catch (e) {
        // If click fails due to overlay, press Enter instead
        await this.pressKey('Enter');
      }
    } else {
      // Try pressing Enter
      await this.pressKey('Enter');
    }
    
    // Wait for navigation and page load
    await this.page.waitForURL('**/search**', { timeout: 10000 }).catch(() => {});
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async clickFlipkartLogo(): Promise<void> {
    // Dismiss any overlay blocking interaction
    await this.pressKey('Escape');
    await this.page.waitForTimeout(300);
    await this.click('a[href="/"]');
    await this.page.waitForLoadState('networkidle');
  }

  async clickFashionCategory(): Promise<void> {
    // Dismiss any overlay blocking interaction
    await this.pressKey('Escape');
    await this.page.waitForTimeout(300);
    await this.click(this.fashionCategory);
    await this.page.waitForLoadState('networkidle');
  }

  async clickMobilesCategory(): Promise<void> {
    // Dismiss any overlay blocking interaction
    await this.pressKey('Escape');
    await this.page.waitForTimeout(300);
    await this.click(this.mobilesCategory);
    await this.page.waitForLoadState('networkidle');
  }

  async clickElectronicsCategory(): Promise<void> {
    // Dismiss any overlay blocking interaction
    await this.pressKey('Escape');
    await this.page.waitForTimeout(300);
    await this.click(this.electronicsCategory);
    await this.page.waitForLoadState('networkidle');
  }

  async clickHomeCategory(): Promise<void> {
    // Dismiss any overlay blocking interaction
    await this.pressKey('Escape');
    await this.page.waitForTimeout(300);
    await this.click(this.homeCategory);
    await this.page.waitForLoadState('networkidle');
  }

  async clickBeautyCategory(): Promise<void> {
    await this.click(this.beautyCategory);
    await this.page.waitForLoadState('networkidle');
  }

  async clickAppliancesCategory(): Promise<void> {
    await this.click(this.appliancesCategory);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCart(): Promise<void> {
    await this.click(this.cartIcon);
    await this.page.waitForLoadState('networkidle');
  }

  async clickLogin(): Promise<void> {
    await this.click(this.loginLink);
    await this.page.waitForLoadState('networkidle');
  }

  async isHomepageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.searchBox);
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.isElementVisible(this.searchBox);
  }

  async isCartIconVisible(): Promise<boolean> {
    return await this.isElementVisible(this.cartIcon);
  }

  async verifyAllCategoriesVisible(): Promise<boolean> {
    const fashionVisible = await this.isElementVisible(this.fashionCategory);
    const mobilesVisible = await this.isElementVisible(this.mobilesCategory);
    const electronicsVisible = await this.isElementVisible(this.electronicsCategory);
    return fashionVisible && mobilesVisible && electronicsVisible;
  }

  async getDealBannersCount(): Promise<number> {
    return await this.getElementCount(this.dealBanners);
  }

  async isGrabOrGoneSectionVisible(): Promise<boolean> {
    return await this.elementExists(this.grabOrGoneSection);
  }
}
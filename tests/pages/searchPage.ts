/**
 * SearchPage - Page Object Model for Search Results
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class SearchPage extends BasePage {
  readonly productCards: string = 'div[data-id]';
  readonly productTitle: string = 'div[class*="tile"]';
  readonly productPrice: string = 'div[class*="price"]';
  readonly productRating: string = 'span[class*="rating"]';
  readonly sortDropdown: string = 'select[class*="sort"]';
  readonly nextPageButton: string = 'button:has-text("Next")';

  constructor(page: Page) { super(page); }

  async getProductCount(): Promise<number> {
    return await this.getElementCount(this.productCards);
  }

  async clickProduct(index: number): Promise<void> {
    // Get the product card at the given index
    const productCard = this.page.locator(this.productCards).nth(index);
    
    // Get the product link
    const productLink = productCard.locator('a[href*="/p/"]').first();
    
    if (await productLink.count() > 0) {
      // Get the href and navigate directly instead of clicking
      // (clicking isn't working due to event handlers)
      const href = await productLink.getAttribute('href');
      if (href) {
        const baseUrl = this.page.url().split('?')[0].split('/search')[0];
        const fullUrl = href.startsWith('http') ? href : baseUrl + href;
        await this.page.goto(fullUrl);
      }
    }
    
    await this.page.waitForLoadState('networkidle');
  }

  async getProductTitle(index: number): Promise<string> {
    const product = this.page.locator(this.productCards).nth(index);
    return await this.getText(product.locator(this.productTitle));
  }

  async getProductPrice(index: number): Promise<string> {
    const product = this.page.locator(this.productCards).nth(index);
    return await this.getText(product.locator(this.productPrice));
  }

  async sortByLowestPrice(): Promise<void> {
    const sortOption = this.page.locator('option:has-text("Low to High")');
    if (await sortOption.isVisible()) {
      await this.click(sortOption);
      await this.page.waitForLoadState('networkidle');
    }
  }

  async goToNextPage(): Promise<void> {
    await this.click(this.nextPageButton);
    await this.page.waitForLoadState('networkidle');
  }

  async areProductsDisplayed(): Promise<boolean> {
    return (await this.getProductCount()) > 0;
  }
}
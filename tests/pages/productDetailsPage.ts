/**
 * ProductDetailsPage - Page Object Model for Product Details
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductDetailsPage extends BasePage {
  readonly productTitle: string = 'h1';
  readonly productPrice: string = 'div:has-text("₹")';  // Price section has rupee symbol
  readonly addToCartButton: string = 'button:has-text("ADD TO CART")';
  readonly addToWishlistButton: string = 'button:has-text("Wishlist")';
  readonly specifications: string = 'section';  // Specifications usually in a section
  readonly reviews: string = 'div[class*="review"]';

  constructor(page: Page) { super(page); }

  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async clickAddToCart(): Promise<void> {
    await this.click(this.addToCartButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddToWishlist(): Promise<void> {
    await this.click(this.addToWishlistButton);
  }

  async isAddToCartButtonEnabled(): Promise<boolean> {
    const button = this.page.locator(this.addToCartButton);
    return await button.isEnabled();
  }

  async isAddToWishlistButtonEnabled(): Promise<boolean> {
    const button = this.page.locator(this.addToWishlistButton);
    return await button.isEnabled();
  }

  async scrollToSpecifications(): Promise<void> {
    await this.scrollToElement(this.specifications);
  }

  async scrollToReviews(): Promise<void> {
    await this.scrollToElement(this.reviews);
  }

  async areSpecificationsVisible(): Promise<boolean> {
    return await this.isElementVisible(this.specifications);
  }

  async areReviewsVisible(): Promise<boolean> {
    return await this.isElementVisible(this.reviews);
  }
}
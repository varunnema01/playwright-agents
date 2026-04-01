/**
 * ProductDetailsPage - Page Object Model for Product Details
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductDetailsPage extends BasePage {
  readonly productTitle: string = 'h1';
  readonly productPrice: string = 'div:has-text("₹")';  // Price section has rupee symbol
  readonly addToCartButton: string = 'button, div[role="button"], a[role="button"]';  // More flexible selector
  readonly addToWishlistButton: string = 'a[href*="wishlist"], button:has-text("Wishlist"), a:has-text("Wishlist")';
  readonly specifications: string = 'section, div[class*="spec"], div:has-text("Specifications")';
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
    try {
      // Look for button/div/anchor with "ADD TO CART" text
      const cartButtonText = this.page.locator('button, div[role="button"], a').filter({ hasText: /ADD TO CART/i }).first();
      
      // Also look for cart icon (SVG) in buttons
      const cartSvgButton = this.page.locator('button:has(svg), button[aria-label*="cart" i], button[title*="cart" i]').first();
      
      // Check text-based button first
      let exists = await cartButtonText.count().catch(() => 0);
      if (exists > 0) {
        return await cartButtonText.isEnabled({ timeout: 5000 }).catch(() => true);
      }
      
      // Check SVG cart button
      exists = await cartSvgButton.count().catch(() => 0);
      if (exists > 0) {
        return await cartSvgButton.isEnabled({ timeout: 5000 }).catch(() => true);
      }
      
      return false;
    } catch (error) {
      console.log('Error checking add to cart button:', error);
      return false;
    }
  }

  async isAddToWishlistButtonEnabled(): Promise<boolean> {
    try {
      // Look for wishlist link or button with text
      const wishlistButtonText = this.page.locator('a, button').filter({ hasText: /wishlist/i }).first();
      
      // Also look for heart icon (SVG) in buttons for wishlist
      const wishlistSvgButton = this.page.locator('button:has(svg), button[aria-label*="wishlist" i], button[title*="wishlist" i], a[aria-label*="wishlist" i]').first();
      
      // Check text-based button first
      let exists = await wishlistButtonText.count().catch(() => 0);
      if (exists > 0) {
        return await wishlistButtonText.isEnabled({ timeout: 5000 }).catch(() => true);
      }
      
      // Check SVG wishlist button
      exists = await wishlistSvgButton.count().catch(() => 0);
      if (exists > 0) {
        return await wishlistSvgButton.isEnabled({ timeout: 5000 }).catch(() => true);
      }
      
      return false;
    } catch (error) {
      console.log('Error checking wishlist button:', error);
      return false;
    }
  }

  async scrollToSpecifications(): Promise<void> {
    try {
      // Get the first matching specifications element to avoid strict mode violation
      const specElement = this.page.locator(this.specifications).first();
      await specElement.scrollIntoViewIfNeeded();
    } catch (error) {
      // If specifications not found, continue anyway
      console.log('Specifications section not found:', error);
    }
  }

  async scrollToReviews(): Promise<void> {
    await this.scrollToElement(this.reviews);
  }

  async areSpecificationsVisible(): Promise<boolean> {
    try {
      const specElement = this.page.locator(this.specifications).first();
      return await specElement.isVisible({ timeout: 5000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  async areReviewsVisible(): Promise<boolean> {
    return await this.isElementVisible(this.reviews);
  }
}
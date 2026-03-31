/**
 * WishlistPage - Page Object Model for Wishlist
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class WishlistPage extends BasePage {
  readonly wishlistItems: string = 'div[class*="wishlistItem"]';
  readonly emptyWishlistMessage: string = 'text="Your wishlist is empty"';
  readonly removeButton: string = 'button:has-text("Remove")';
  readonly moveToCartButton: string = 'button:has-text("Move to Cart")';

  constructor(page: Page) { super(page); }

  async getWishlistItemsCount(): Promise<number> {
    return await this.getElementCount(this.wishlistItems);
  }

  async getWishlistItem(index: number) {
    return this.page.locator(this.wishlistItems).nth(index);
  }

  async removeItem(index: number): Promise<void> {
    const item = await this.getWishlistItem(index);
    const button = item.locator(this.removeButton);
    if (await button.isVisible()) {
      await this.click(button);
      await this.wait(500);
    }
  }

  async moveToCart(index: number): Promise<void> {
    const item = await this.getWishlistItem(index);
    const button = item.locator(this.moveToCartButton);
    if (await button.isVisible()) {
      await this.click(button);
      await this.wait(500);
    }
  }

  async isWishlistEmpty(): Promise<boolean> {
    return await this.elementExists(this.emptyWishlistMessage);
  }

  async clickItem(index: number): Promise<void> {
    const item = await this.getWishlistItem(index);
    await item.click();
    await this.page.waitForLoadState('networkidle');
  }
}
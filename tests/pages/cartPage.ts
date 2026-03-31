/**
 * CartPage - Page Object Model for Shopping Cart
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  readonly cartItems: string = 'div[class*="cartItem"]';
  readonly emptyCartMessage: string = 'text="Your cart is empty"';
  readonly removeItemButton: string = 'button:has-text("Remove")';
  readonly proceedCheckoutButton: string = 'button:has-text("Proceed to Checkout")';
  readonly totalPrice: string = 'span[class*="total"]';

  constructor(page: Page) { super(page); }

  async getCartItemsCount(): Promise<number> {
    return await this.getElementCount(this.cartItems);
  }

  async getCartItem(index: number) {
    return this.page.locator(this.cartItems).nth(index);
  }

  async removeItem(index: number): Promise<void> {
    const item = await this.getCartItem(index);
    const button = item.locator(this.removeItemButton);
    if (await button.isVisible()) {
      await this.click(button);
      await this.wait(500);
    }
  }

  async getTotal(): Promise<string> {
    return await this.getText(this.totalPrice);
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.proceedCheckoutButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.elementExists(this.emptyCartMessage);
  }

  async isProceedCheckoutButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.proceedCheckoutButton);
  }
}
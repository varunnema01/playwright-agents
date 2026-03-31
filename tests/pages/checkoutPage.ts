/**
 * CheckoutPage - Page Object Model for Checkout
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  readonly addressSection: string = 'div[class*="address"]';
  readonly addNewAddressButton: string = 'button:has-text("Add Address")';
  readonly nameInput: string = 'input[name="name"]';
  readonly phoneInput: string = 'input[name="phone"]';
  readonly addressInput: string = 'input[name="address"]';
  readonly cityInput: string = 'input[name="city"]';
  readonly saveAddressButton: string = 'button:has-text("Save Address")';
  readonly paymentSection: string = 'div[class*="payment"]';
  readonly creditCardOption: string = 'label:has-text("Credit Card")';
  readonly upiOption: string = 'label:has-text("UPI")';
  readonly placeOrderButton: string = 'button:has-text("Place Order")';

  constructor(page: Page) { super(page); }

  async clickAddNewAddress(): Promise<void> {
    await this.click(this.addNewAddressButton);
    await this.wait(500);
  }

  async fillAddressForm(address: { name: string; phone: string; address: string; city: string }): Promise<void> {
    await this.type(this.nameInput, address.name);
    await this.type(this.phoneInput, address.phone);
    await this.type(this.addressInput, address.address);
    await this.type(this.cityInput, address.city);
  }

  async saveAddress(): Promise<void> {
    await this.click(this.saveAddressButton);
    await this.wait(1000);
  }

  async selectCreditCard(): Promise<void> {
    await this.click(this.creditCardOption);
  }

  async selectUPI(): Promise<void> {
    await this.click(this.upiOption);
  }

  async placeOrder(): Promise<void> {
    await this.click(this.placeOrderButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isAddressSectionVisible(): Promise<boolean> {
    return await this.isElementVisible(this.addressSection);
  }

  async isPaymentSectionVisible(): Promise<boolean> {
    return await this.isElementVisible(this.paymentSection);
  }
}
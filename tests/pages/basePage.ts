/**
 * BasePage - Base class for all page objects
 */
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async navigateTo(url: string): Promise<void> { await this.page.goto(url); }
  async click(selector: string | Locator): Promise<void> { const element = typeof selector === 'string' ? this.page.locator(selector).first() : selector; await element.click(); }
  async type(selector: string | Locator, text: string): Promise<void> { const element = typeof selector === 'string' ? this.page.locator(selector).first() : selector; await element.fill(text); }
  async clearField(selector: string | Locator): Promise<void> { const element = typeof selector === 'string' ? this.page.locator(selector).first() : selector; await element.clear(); }
  async isElementVisible(selector: string | Locator): Promise<boolean> { const element = typeof selector === 'string' ? this.page.locator(selector).first() : selector; return await element.isVisible(); }
  async getText(selector: string | Locator): Promise<string> { const element = typeof selector === 'string' ? this.page.locator(selector).first() : selector; return await element.textContent() || ''; }
  async waitForElement(selector: string | Locator, timeout: number = 5000): Promise<void> { const element = typeof selector === 'string' ? this.page.locator(selector) : selector; await element.waitFor({ state: 'visible', timeout }); }
  async hover(selector: string | Locator): Promise<void> { const element = typeof selector === 'string' ? this.page.locator(selector) : selector; await element.hover(); }
  async getElementCount(selector: string): Promise<number> { return await this.page.locator(selector).count(); }
  async elementExists(selector: string): Promise<boolean> { return (await this.page.locator(selector).count()) > 0; }
  async pressKey(key: string): Promise<void> { await this.page.keyboard.press(key); }
  async scrollToElement(selector: string | Locator): Promise<void> { const element = typeof selector === 'string' ? this.page.locator(selector) : selector; await element.scrollIntoViewIfNeeded(); }
  async getCurrentUrl(): Promise<string> { return this.page.url(); }
  async wait(ms: number): Promise<void> { await this.page.waitForTimeout(ms); }
  async getAttribute(selector: string | Locator, attribute: string): Promise<string | null> { const element = typeof selector === 'string' ? this.page.locator(selector) : selector; return await element.getAttribute(attribute); }
}
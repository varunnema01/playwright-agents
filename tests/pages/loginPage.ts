/**
 * LoginPage - Page Object Model for Login/Authentication
 */
import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly emailInput: string = 'input[type="email"]';
  readonly passwordInput: string = 'input[type="password"]';
  readonly loginButton: string = 'button:has-text("Login")';
  readonly signupLink: string = 'a:has-text("Sign up")';
  readonly forgotPasswordLink: string = 'a:has-text("Forgot")';
  readonly errorMessage: string = 'div[class*="error"]';

  constructor(page: Page) { super(page); }

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('https://www.flipkart.com/account/login');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    await this.click(this.emailInput);
    await this.type(this.emailInput, email);
    await this.click(this.passwordInput);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async goToSignupPage(): Promise<void> {
    await this.click(this.signupLink);
    await this.page.waitForLoadState('networkidle');
  }

  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
    await this.page.waitForLoadState('networkidle');
  }

  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  async isEmailInputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.emailInput);
  }

  async isPasswordInputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.passwordInput);
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.page.locator(this.loginButton).isEnabled();
  }
}
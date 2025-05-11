import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SignUpPage {
  readonly form: Locator;
  readonly successBanner: Locator;
  readonly errorBanner: Locator;
  readonly title: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly visibilityPasswordButton: Locator;
  readonly withInfoToggle: Locator;
  readonly signUpButton: Locator;
  readonly emailEmptyError: Locator;
  readonly passwordEmptyError: Locator;

  constructor(protected page: Page) {
    this.form = page.getByTestId('auth-form');
    this.successBanner = page.getByTestId('auth-success-message');
    this.errorBanner = page.getByTestId('auth-error-message');
    this.title = page.getByTestId('auth-title');
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.visibilityPasswordButton = page.getByTestId('toggle-visibility-button').getByRole('button');
    this.withInfoToggle = page.getByTestId('auth-with-info-toggle').locator('input');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.emailEmptyError = page.getByText('Email is required');
    this.passwordEmptyError = page.getByText('Password is required');
  }

  async fillEmail(email: string) {
    await this.emailInput.click();
    await this.page.keyboard.type(email, { delay: 300 });
  }

  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.page.keyboard.type(password, { delay: 300 });
  }

  async fillWithInfoToggle() {
    await this.withInfoToggle.click();
  }

  async clickSignUpButton() {
    await this.signUpButton.click({ delay: 300 });
  }

  async checkSuccessBanner() {
    await expect(this.successBanner).toBeVisible();
  }

  async checkErrorBanner() {
    await expect(this.errorBanner).toBeVisible();
  }

  async checkTitle() {
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText('Sign up');
  }

  async togglePasswordVisibility() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');

    await this.visibilityPasswordButton.click();

    await expect(this.passwordInput).toHaveAttribute('type', 'text');
  }
}

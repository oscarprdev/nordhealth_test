import { test } from './fixtures/signup.fixture';
import { expect } from '@playwright/test';
import type { SignUpPage } from './pages/signup.page';

test.describe('SignUp', () => {
  test.beforeEach(async ({ navigateToSignUp }) => {
    await navigateToSignUp();
  });

  test('should render signup form', async ({ signUpPage }: { signUpPage: SignUpPage }) => {
    await expect(signUpPage.form).toBeVisible();
    await expect(signUpPage.title).toBeVisible();
    await expect(signUpPage.title).toHaveText('Sign up');
    await expect(signUpPage.emailInput).toBeVisible();
    await expect(signUpPage.passwordInput).toBeVisible();
    await expect(signUpPage.visibilityPasswordButton).toBeVisible();
    await expect(signUpPage.withInfoToggle).toBeVisible();
    await expect(signUpPage.signUpButton).toBeVisible();
  });

  test('should fill email input', async ({ signUpPage }: { signUpPage: SignUpPage }) => {
    await signUpPage.fillEmail('test@test.com');
    await expect(signUpPage.emailInput).toHaveValue('test@test.com');
  });

  test('should fill password input', async ({ signUpPage }: { signUpPage: SignUpPage }) => {
    await signUpPage.fillPassword('password');
    await expect(signUpPage.passwordInput).toHaveValue('password');
  });

  test('should fill with info toggle', async ({ signUpPage }: { signUpPage: SignUpPage }) => {
    await signUpPage.fillWithInfoToggle();
    await expect(signUpPage.withInfoToggle).toBeChecked();
  });

  test('should submit form', async ({ signUpPage }: { signUpPage: SignUpPage }) => {
    await signUpPage.fillEmail('test@test.com');
    await signUpPage.fillPassword('password');
    await signUpPage.fillWithInfoToggle();
    await signUpPage.clickSignUpButton();

    await expect(signUpPage.successBanner).toBeVisible();
  });
});

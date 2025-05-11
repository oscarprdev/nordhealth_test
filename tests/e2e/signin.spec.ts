import { test } from './fixtures/signin.fixture';
import { expect } from '@playwright/test';
import type { SignInPage } from './pages/signin.page';

test.describe('SignIn', () => {
  const testEmail = 'test-signin@example.com';
  const testPassword = 'password123';

  test.beforeEach(async ({ navigateToSignIn }) => {
    await navigateToSignIn();
  });

  test('should render signin form', async ({ signInPage }: { signInPage: SignInPage }) => {
    await expect(signInPage.form).toBeVisible();
    await expect(signInPage.title).toBeVisible();
    await expect(signInPage.title).toHaveText('Sign in');
    await expect(signInPage.emailInput).toBeVisible();
    await expect(signInPage.passwordInput).toBeVisible();
    await expect(signInPage.visibilityPasswordButton).toBeVisible();
    await expect(signInPage.signInButton).toBeVisible();
    await expect(signInPage.signUpLink).toBeVisible();
  });

  test('should navigate to signup page when clicking signup link', async ({ signInPage, page }) => {
    await signInPage.clickSignUpLink();
    await expect(page).toHaveURL(/.*\/signup/);
  });

  test('should show email empty error', async ({ signInPage }: { signInPage: SignInPage }) => {
    await expect(signInPage.emailInput).toBeVisible();
    await expect(signInPage.passwordInput).toBeVisible();
    await signInPage.clickSignInButton();
    await expect(signInPage.emailEmptyError).toBeVisible({ timeout: 10000 });
    await expect(signInPage.passwordEmptyError).toBeVisible({ timeout: 10000 });
  });

  test('should successfully sign in with valid credentials', async ({ signInPage, page }) => {
    await page.evaluate(setLocalStorage);
    await page.reload();

    await signInPage.fillEmail(testEmail);
    await expect(signInPage.emailInput).toHaveValue(testEmail);
    await signInPage.fillPassword(testPassword);
    await expect(signInPage.passwordInput).toHaveValue(testPassword);
    await signInPage.clickSignInButton();

    await page.goto(`/dashboard/${testEmail}`);

    await expect(page.getByTestId('logout-button')).toBeVisible();
  });
});

function setLocalStorage() {
  const testEmail = 'test-signin@example.com';
  const testPassword = 'password123';
  const credential = {
    email: testEmail,
    password: testPassword,
    withInfo: true,
    isLoggedIn: false,
  };
  const map = new Map();
  map.set(testEmail, credential);
  localStorage.setItem('credentials', JSON.stringify(Array.from(map.entries())));
}

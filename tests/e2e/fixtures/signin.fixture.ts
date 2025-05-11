import { test as base } from '@playwright/test';
import { SignInPage } from '../pages/signin.page';
import { SignUpPage } from '../pages/signup.page';
import type { Page } from '@playwright/test';

interface SignInFixture {
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  navigateToSignIn(): Promise<void>;
  setupTestUser(email: string, password: string): Promise<void>;
}

export const test = base.extend<SignInFixture>({
  signInPage: async ({ page }: { page: Page }, use: (signInPage: SignInPage) => void) => {
    await use(new SignInPage(page));
  },
  signUpPage: async ({ page }: { page: Page }, use: (signUpPage: SignUpPage) => void) => {
    await use(new SignUpPage(page));
  },
  navigateToSignIn: async ({ page }: { page: Page }, use: (navigateToSignIn: () => Promise<void>) => void) => {
    await use(async (): Promise<void> => {
      await page.goto(`/signin`);
    });
  },
});

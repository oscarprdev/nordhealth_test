import { test as base } from '@playwright/test';
import { SignUpPage } from '../pages/signup.page';
import type { Page } from '@playwright/test';

interface SignUpFixture {
  signUpPage: SignUpPage;
  navigateToSignUp(): Promise<void>;
}

export const test = base.extend<SignUpFixture>({
  signUpPage: async ({ page }: { page: Page }, use: (signUpPage: SignUpPage) => void) => {
    await use(new SignUpPage(page));
  },
  navigateToSignUp: async ({ page }: { page: Page }, use: (navigateToSignUp: () => Promise<void>) => void) => {
    await use(async (): Promise<void> => {
      await page.goto(`/signup`);
    });
  },
});

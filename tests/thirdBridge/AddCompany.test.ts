import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';


test('has title', async ({ page , loginPage}) => {
  await page.goto('https://onexweb-uat.officenational.co.za/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
  // page.waitFor;

  await page.waitForLoadState("load");
  await loginPage.login();
  
});



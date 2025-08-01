import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

// Login ------------------------------------------------------------------------------------------------------------------------


test('Verify that the "Login" screen is displayed as expected.', async ({ page, Actions, Click, Verify }) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
  await Verify.IsTextDisplayed(page, 'Login');
  console.log('Login screen displayed as expected');
});

test('seriti Logo should be visible on the login page', async ({ page }) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
  const logo = page.locator('img.w-auto.h-16.pointer-events-none');
  await expect(logo).toBeVisible();
  console.log('Seriti logo is displayed as expected');
});

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/transaction');
  console.log('User logging in successfully');
});

test('Verify that error message should displayed for Invalid inputs', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn(' ');
  await Click.Btn('login');
  await Verify.IsTextDisplayed(page, 'Username is a required field');
  console.log('Error message displayed as expected for invalid inputs');
});

test('Verify that the user is redirected to the correct URL after logging in successfully.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/transaction');
  console.log('user is redirected to the correct URL after logging in');
});

test('Verify navigation to "Forgot Password" screen from Login screen', async ({ page, Actions, Click, Verify}) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
  await page.click('text=Forgot Password');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/password/forgot');
  console.log('User redirected to forgot password screen');
});












// Forgot password --------------------------------------------------------------------------------------------------------------

// Reset Password----------------------------------------------------------------------------------------------------------------

// Log out-----------------------------------------------------------------------------------------------------------------------

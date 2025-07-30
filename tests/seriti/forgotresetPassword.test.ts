
import test from '@lib/BaseTest';
import { expect } from '@playwright/test';


// Forgot Password ------------------------------------------------------------------------------------------------------------------------

test('Verify that the "forgot password" screen is displayed as expected.', async ({ page, Actions, Click, Verify }) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/password/forgot");
  await Verify.IsTextDisplayed(page, 'Forgot Your Password?');
  console.log('forgot password screen displayed as expected');
});

test('Verify that error message should displayed if the user enters an invalid username.', async ({ page, Actions, Click, Verify }) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/password/forgot")
  await Actions.enterText("emailinput", "test");
  await Click.Btn("submitBtn");
  await Verify.IsTextDisplayed(page,'Username must be a valid email');
  console.log('Error message displayed for invalid username');
});

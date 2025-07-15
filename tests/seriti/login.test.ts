import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

// Login ------------------------------------------------------------------------------------------------------------------------
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

// Forgot password --------------------------------------------------------------------------------------------------------------

// Reset Password----------------------------------------------------------------------------------------------------------------

// Log out-----------------------------------------------------------------------------------------------------------------------

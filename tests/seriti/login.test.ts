import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

// Test: Verify that the user can log in successfully with valid credentials.
test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/transaction');
  console.log('User logging in successfully');
});



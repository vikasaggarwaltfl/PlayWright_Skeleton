import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click ,Verify}) => {
    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.verifyURL(page,"https://seritiweb-mea-uat.seriti-int.com/transaction");
});


test('Verify that the user cannot log in with invalid credentials.', async ({ page, Actions, Click,Verify }) => {
   // const verify = new Verify(page, page.context());
    await Actions.signIn("Automate");
    await page.pause();
    await Click.Btn("login");
    await page.pause();
    await Verify.verifyErrorMessage("Username is a required field.");
    await page.pause();
});




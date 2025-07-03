import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from 'crypto'
import { access } from 'fs'


//login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
});

// Home-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that Home sidebar option displayed correctly with icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");   
    await Verify.IsTextDisplayed(page, "Home");
    await Verify.isIconVisible(page, 'homeIcon');
    await console.log ("The Home sidebar option is displayed as expected with the icon.")
});

// Home page is still not fully developed.
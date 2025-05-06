import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
//login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click ,Verify}) => {
    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.verifyURL(page,"https://seritiweb-mea-uat.seriti-int.com/transaction");
});


test('Verify that error message should displayed for Invalid inputs', async ({ page, Actions, Click,Verify }) => {
    await Actions.signIn(" ");
    await Click.Btn("login");
    await Verify.verifyErrorMessage(page,"Username is a required field");

});

// Navigation side bar-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the navigation sidebar is displayed with all required tabs.', async ({ page, Actions, Click,Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page,"Home");
    await Verify.IsTextDisplayed(page,"Transaction");
    await Verify.IsTextDisplayed(page,"Dashboard");   
});


test('Verify that clicking on the "Seriti" logo navigates the user to the landing screen.',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("seritiLogo");
    await Verify.verifyURL(page,"https://seritiweb-mea-uat.seriti-int.com/transaction");

});

test('Verify that the user can search sidebar menu options using the search box.',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu","My Reports");
    await Verify.IsTextDisplayed(page,"My Reports");
});

test ('Verify that the user can sign out by clicking on the "Sign Out" button.',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("testingFrameworks");
    await Click.Btn("signOut");
    await Verify.verifyURL(page,"https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
});



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
    await page.waitForTimeout(2000);
    await Click.icon("seritiLogo");
    await Verify.verifyURL(page,"https://seritiweb-mea-uat.seriti-int.com/transaction");
});

test('Verify that the user can search sidebar menu options using the search box.',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu","My Reports");
    await Verify.IsTextDisplayed(page,"My Reports");
});

test('Verify that the user can sign out by clicking on the "Sign Out" button.',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("testingFrameworks");
    await Click.Btn("signOut");
    await Verify.verifyURL(page,"https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
});


// Transaction page-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test('Verify that the user can search for transactions using the transaction number in Quick access modal',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu","281620");
    await Click.Btn("view");
    await Verify.IsTextDisplayed(page,"Transaction 281620");
});

test('Verify that the user can select dropdowns on create transaction page',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group","Practise group")
    await Verify.verifyDropDown("Practise group")
});

test('Verify that the user can select radio buttons on create transaction page',async ({page, Actions, Click,Verify})=>{
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group","Practise group")
    await Click.dropdown("Select a branch","Practise branch")
    await Click.radioButton("Company")
    await Verify.verifyRadioButton("Company");
});

test.only('Verify that the "Branch" dropdown is disabled until a "Group" is selected',async ({page, Actions, Click,Verify})=>{   
    await Actions.signIn("Automation");
    await Click.Btn("login");
    const locator1 = page.locator("//span[@aria-disabled='true']");
    await expect(locator1).toBeDisabled();
    await Click.dropdown("Select a group (Blank for All)","Practise group")
    const locator2 = page.locator("//span[@aria-disabled='false']");
    await expect(locator2).toBeEnabled();
});
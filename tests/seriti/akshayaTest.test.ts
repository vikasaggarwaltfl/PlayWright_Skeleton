import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
//login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {

    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
});


test('Verify that error message should displayed for Invalid inputs', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn(" ");
    await Click.Btn("login");
    await Verify.verifyErrorMessage(page, "Username is a required field");

});

// Navigation side bar-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the navigation sidebar is displayed with all required tabs.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, ["Home","Transaction","Dashboard"]);
   });


test('Verify that clicking on the "Seriti" logo navigates the user to the landing screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(2000);
    await Click.icon("seritiLogo");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
});

test('Verify that the user can search sidebar menu options using the search box.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Verify.IsTextDisplayed(page, "My Reports");
});

test('Verify that the user can sign out by clicking on the "Sign Out" button.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("testingFrameworks");
    await Click.Btn("signOut");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
});


// Transaction page-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test('Verify that the user can search for transactions using the transaction number in Quick access modal', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281620");
    await Click.Btn("view");
    await Verify.IsTextDisplayed(page, "Transaction 281620");
});

test('Verify that the user can select dropdowns on create transaction page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "Practise group")
    await Verify.verifyDropDown("Practise group")
});

test('Verify that the user can select radio buttons on create transaction page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "Practise group")
    await Click.dropdown("Select a branch", "Practise branch")
    await Click.radioButton("Company")
    await Verify.verifyRadioButton("Company");
});

test('Verify that the "Branch" dropdown is disabled until a "Group" is selected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");
    await Click.dropdown("Select a group (Blank for All)", "Practise group")
    await Verify.verifyEnabledButton("Select a branch (Blank for All)")
});

test('Verify that the user can filter using the date pickers', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.calendar(3, "2026", "Jan", 1);
    Verify.IsTextDisplayed(page, "2026");
 

});

test('Verify that the user can reset applied search on transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "Practise group");
    await Click.dropdown("Select a branch (Blank for All)", "Practise branch");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("resetCriteria");
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");

});

test('Verify that the user can apply multiple filters to search for transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "Practise group");
    await Click.dropdown("Select a branch (Blank for All)", "Practise branch");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("search");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(6);

});

//reports>>DealTrackerReport-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test('Verify that the user can check or uncheck multiple checkbox', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.Btn("addDealTrackerReport");
    await Click.icon("cancel");
    await Click.dropdown("Group", "Practise group");
    await page.waitForTimeout(2000);
    await Click.checkbox(2, ["Tebogo Lepelle", "Winjit Staging Bm", "Business Manager Staging"]);
    await Verify.IsTextDisplayed(page,["Tebogo Lepelle", "Winjit Staging Bm", "Business Manager Staging"]); 

});

test('Verify that the user can "Add" new Deal tracker report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.Btn("addDealTrackerReport");
    await Click.icon("cancel");
    await Click.dropdown("Group", "Practise group");
    await page.waitForTimeout(2000);
    await Click.checkbox(2, "Tebogo Lepelle");
    await Click.calendar(1, "2025", "May", 10);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jun", 11);
    await Click.Btn("createDateYes");
    await Click.Btn("inceptDateYes ")
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");

});

test.skip('Verify that the user can "Copy"  Deal tracker report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.icon("copy");
    await page.pause();   
});

test('Verify that the user can "Delete" a Deal tracker report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(3);
});


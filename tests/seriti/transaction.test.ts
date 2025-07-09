import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

// Transaction page-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction screen is displayed correctly with all expected content.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, ["Transact", "Create Transaction", "Search", "Recent Transactions",]);
});

test('Verify that the user can click on the "Create Transaction" button to create a new transaction', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Select a group", "Select a branch"]);
});

test('Verify that the user can search for transactions using the transaction number in Quick access modal', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281716");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, "Transaction 281716");
});


test('Verify that the user can reset applied search on transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2");
    await Click.dropdown("Select a branch (Blank for All)", "Branch 2");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("resetCriteria");
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");
});

test('Verify that the user can apply multiple filters to search for transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2");
    await Click.dropdown("Select a branch (Blank for All)", "Branch 2");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("search");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(9);
});

test('Verify that the user can minimize the search module', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("filterArrow");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Verify.IsTextDisplayed(page, "Creation Date");
});

test('Verify that the user can view recent transactions by clicking on the "Recent Transactions" button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.link("recentTransactions");
    await page.waitForLoadState('networkidle');
    //await Verify.verifyDatacount(9);
});

test('Verify that user can enter to any transaction by clicking on enter transaction icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2");
    await Click.dropdown("Select a branch (Blank for All)", "Branch 2");
    await Click.Btn("search");
    await Click.icon("enterTransaction");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    await Verify.IsTextDisplayed(page, "Transaction");
});

test('Verify that pagination works correctly for navigating through paged content', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(5000);
    await Click.pagination(1);
    await Verify.verifyDatacount(10);
});

//create transaction-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Create Transaction module is displayed when the user clicks on the "Create Transaction" button.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Select a group", "Select a branch"]);
});

test('Verify that the "Customer Type" field allows switching between Individual and Company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
    await Click.radioButton("Company")
    await Click.radioButton("Individual");
    await Verify.verifyRadioButton("Individual");
});

test('Verify that the user can select a group from the "Group" and "Branch" dropdown when creating a transaction.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Verify.verifyDropDown("`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Verify.verifyDropDown("Branch 2");
});

test('Verify that if user selects "Company" then the label field name should be "Company Name"', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Click.radioButton("Company");
    await Verify.IsTextDisplayed(page, "Company Name");
});

test('Verify that if user selects "Individual" then the label field name should be "Last Name"', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Click.radioButton("Individual");
    await Verify.IsTextDisplayed(page, "Last Name");
});

test('Verify that all required fields must be filled before clicking the "Create" button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.Btn("clickTransaction")
    await Verify.verifyErrorMessage(page, "Group is a required field");
});

test('Verify that the "Branch" dropdown is disabled until a "Group" is selected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await Verify.verifyDisabledButton("Select a branch");
    await Click.dropdown("Select a group", "`Group 2");
    await page.waitForTimeout(2000);
    await Verify.verifyEnabledButton("Select a branch");
});

test.skip("Verify the system's response when entering extremely long text (e.g., 10,000 characters) in the 'Company Name' or 'Last Name' field", async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Click.radioButton("Company");
    const longText = 'A'.repeat(10000);
    await Actions.enterText("enterCompanyName", longText);
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page, ["Company Name cannot exceed", "Maximum length", "Error", "Invalid", "Saved Successfully"]);
    await Click.radioButton("Individual");
    await Actions.enterText("lastName", longText);
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page, ["Last Name cannot exceed", "Maximum length", "Error", "Invalid", "Saved Successfully"]);
});

//create company deal transaction-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that navbar options are displayed as expected at the top of the screeen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Show Required", "Hide Overview", "Client Details", "Vehicle Details", "Account Details"]);
});

test('Verify that the Show Required tab displays only mandatory fields on the form.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Show Required");
    await Verify.IsTextDisplayed(page, ["Transaction Status", "Finance Status", "Transaction Status Notes"]);
    await Click.transactionTabs("Vehicle Details");
    await Verify.IsTextDisplayed(page, "Vehicle Condition");
});

test('Verify that the "Show All" tab displays all fields on the form.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Preferred Contact Time", "Finance Status", "Fleet Number"]);
});

test('Verify that the Hide Overview tab hides the overview section of transaction.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Hide Overview");
    await expect(page.locator('//span[normalize-space()="TESTING COMPANY"]')).toBeHidden();
});

test('Verify that the Show Overview tab displays the overview section of transaction.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Hide Overview");
    await Click.transactionTabs("Show Overview");
    await expect(page.locator('//span[normalize-space()="TESTING COMPANY"]')).toBeVisible();
});

test('Verify that all form sections are displayed sequentially on the screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Show Required", true);
});

test('Verify that the user can expand and collapse the details by clicking on the collapse button.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.icon("expandAll");
    await Click.icon("collapseAll");
    await expect(page.locator('//span[normalize-space()="Change Vehicle"]')).toBeHidden();
});

test('Verify that Client details section is displayed as expected.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Client Details");
    await Verify.IsTextDisplayed(page, ["Customer Type", "Company Name", "Type of Business", "Nature Of Business"]);
});
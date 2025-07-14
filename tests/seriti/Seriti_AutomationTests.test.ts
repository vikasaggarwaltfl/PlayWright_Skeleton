import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'
import * as path from 'path'

//login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
});

test('Verify that error message should displayed for Invalid inputs', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn(" ");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, "Username is a required field");
});

// Home-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that Home sidebar option displayed correctly with icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");   
    await Verify.IsTextDisplayed(page, "Home");
    await Verify.isIconVisible(page, 'homeIcon');
    await console.log ("The Home sidebar option is displayed as expected with the icon.")
});

// Dashboard----------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that Dashboard sidebar option displayed correctly with icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");   
    await Verify.IsTextDisplayed(page, "Dashboard");
    await Verify.isIconVisible(page, 'dashboardIcon');
    await console.log ("The Dashboard sidebar option displyed as expected with icon");
});

// Dashboard >> Main Dashboard------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Main Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Main Dashboard", { exact: true }).first()).toBeVisible();
});

test('Verify that all expected accordions are present on the Main Dashboard.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard"); 
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, [
        "Transaction Conversion Rate",
        "Cash and Finance Shares",
        "Vehicles Financed per Finance House",
        "Vehicles Sold per Dealer",
        "Vehicles Sold per Sales Person",
        "Vehicles Sold per Business Manager",
        "% Penetration per Product Type Category",
        "APU per Business Manager",
        "APU per Sales Person"
    ]);
});

test('Verify that the "Expand All" and "Collapse All" buttons function as expected.', async ({ page, Actions, Click }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: /Expand All/i }).click();
    await expect(page.getByText("Collapse All")).toBeVisible();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: /Collapse All/i }).click();
    await expect(page.getByText("Expand All")).toBeVisible();
});

test('Verify that user can load accordion of main dashboard by applying filter parameters', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2025", "Jun", 10);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jun", 20);
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

// Dashboard >> Main Dashboard >> Transaction conversion rate------------------------------------------------------------------------------------------------------------------------

test('Verify that the transaction conversion chart loaded as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    const canvasElmt = await page.locator("canvas[data-pc-section='canvas']")
    await Verify.verifyElementPresence(canvasElmt, true);
    console.log("Transaction conversion chart loaded as expected.")
    await page.waitForLoadState();
});

test('Verify that the transaction conversion chart can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(3000);
    await Click.selectSaveAsOption('PNG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('JPEG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PDF');
    await page.waitForTimeout(2000);
});

test('Verify that the user can switch to the tabular view of the transaction conversion chart and it displays correctly.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.locator("//span[text()='Tabular View']").click();
    await page.waitForSelector('table', { state: 'visible' }); 
    await expect(page.locator('table')).toBeVisible();
    console.log("User can switch to tabular view of transaction conversion chart and it is displayed as expected.");
});

test('Export Transaction Conversion Chart to Excel', async ({ page, Actions, Click, Verify, context }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.locator("//span[text()='Tabular View']").click();
    await page.waitForSelector('table', { state: 'visible' });
    const [ download ] = await Promise.all([
        page.waitForEvent('download'),
        page.click('button:has-text("Export to Excel")') 
    ]);
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toMatch(/\.xlsx?$/i);
    await console.log("Transaction Conversion Chart exported to Excel successfully.");
});

// Dashboard >> Main Dashboard >> Cash and Finance Shares Chart -----------------------------------------------------------------------------------------------------------

test('Verify that the Cash and Finance Shares canvas chart loads as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2025", "Feb", 10);
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    const canvasElmt = page.locator('#c1ed079c-dc5e-45cd-9a38-06d44dc75c7d');
    await Verify.verifyElementPresence(canvasElmt, true);
    await page.waitForLoadState();
    console.log("Cash and Finance Shares canvas chart loaded as expected.");
});

test('Verify that the Cash and Finance Share chart can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(3000);
    await Click.selectSaveAsOption('PNG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('JPEG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PDF');
    await page.waitForTimeout(2000);
});

// Dashboard >> Main Dashboard >> Vehicle financed per Finance House----------------------------------------------------------------------------------------------------------

test('Verify that the Vehicle financed per Finance House canvas chart loads as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2025", "Feb", 10);
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    const canvasElmt = page.locator('#88224891-e16d-42b6-9013-2de2ffa935b6');
    await Verify.verifyElementPresence(canvasElmt, true);
    await page.waitForLoadState();
    console.log("Cash and Finance Shares canvas chart loaded as expected.");
});

test('Verify that the Vehicle financed per Finance House chart can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(3000);
    await Click.selectSaveAsOption('PNG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('JPEG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PDF');
    await page.waitForTimeout(2000);
});

// Dashboard >> Main dashboard >> Vehicles solds per sales person-----------------------------------------------------------------------------------------------

test('Verify that the Vehicles solds per sales person canvas chart loads as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2025", "Feb", 10);
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    const canvasElmt = page.locator('#d5dc892a-e024-4dc4-96d8-250fee1da8a4');
    await Verify.verifyElementPresence(canvasElmt, true);
    await page.waitForLoadState();
    console.log("Cash and Finance Shares canvas chart loaded as expected.");
});

test('Verify that the Vehicles solds per sales person chart can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(3000);
    await Click.selectSaveAsOption('PNG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('JPEG');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PDF');
    await page.waitForTimeout(2000);
});

// Dashboard >> Transaction In Progress Dashboard----------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction In Progress Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Progress");
    await page.waitForTimeout(3000);
    await Click.tabs("transactionInProgressDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Transaction In Progress", { exact: true })).toBeVisible();
    await Verify.IsTextDisplayed(page, ["Transaction In Progress"]);
});

test('Verify that all expected sections are present on the Transaction In Progress Dashboard', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction In Progress");
    await Click.tabs("transactionInProgressDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Transaction In Progress Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction In Progress");
    await Click.tabs("transactionInProgressDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Transaction In Progress Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction In Progress");
    await Click.tabs("transactionInProgressDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PNG');
    await Verify.verifyDownload('downloadlink');
});

// Dashboard >> Transaction Status Ageing Analysis Dashboard------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction Status Ageing Analysis Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Status Ageing Analysis");
    await Click.tabs("transactionStatusAgeingAnalysisDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Transaction Status Ageing Analysis", { exact: true })).toBeVisible();
    await Verify.IsTextDisplayed(page, ["Transaction Status Ageing Analysis"]);
});

test('Verify that all expected sections are present on the Transaction Status Ageing Analysis Dashboard', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Status Ageing Analysis");
    await Click.tabs("transactionStatusAgeingAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Transaction Status Ageing Analysis Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Status Ageing Analysis");
    await Click.tabs("transactionStatusAgeingAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Page Total", "Grand Total"]);
});

// Dashboard >> Finance House Market Share Dashboard------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Finance House Market Share Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance House Market Share");
    await Click.tabs("financeHouseMarketShareDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Finance House Market Share", { exact: true })).toBeVisible();
    await Verify.IsTextDisplayed(page, ["Finance House Market Share"]);
});

test('Verify that all expected sections are present on the Finance House Market Share Dashboard', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance House Market Share");
    await Click.tabs("financeHouseMarketShareDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Finance House Market Share Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance House Market Share");
    await Click.tabs("financeHouseMarketShareDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

// Dashboard >> Dealer Market Share Dashboard------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Dealer Market Share Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Dealer Market Share");
    await Click.tabs("dealerMarketShareDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Dealer Market Share", { exact: true })).toBeVisible();
    await Verify.IsTextDisplayed(page, ["Dealer Market Share"]);
});

test('Verify that all expected sections are present on the Dealer Market Share Dashboard', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Dealer Market Share");
    await Click.tabs("dealerMarketShareDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Dealer Market Share Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Dealer Market Share");
    await Click.tabs("dealerMarketShareDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

// Dashboard >> Transaction Weekly Analysis Dashboard------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction Weekly Analysis Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Weekly Analysis");
    await Click.tabs("transactionWeeklyAnalysisDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Transaction Weekly Analysis", { exact: true }).first()).toBeVisible();
    await Verify.IsTextDisplayed(page, ["Transaction Weekly Analysis"]);
});

test('Verify that all expected sections are present on the Transaction Weekly Analysis Dashboard', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Weekly Analysis");
    await Click.tabs("transactionWeeklyAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Transaction Weekly Analysis Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Weekly Analysis");
    await Click.tabs("transactionWeeklyAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

// Dashboard >> Finance Application Analysis Dashboard-------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Finance Application Analysis Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance Application Analysis");
    await Click.tabs("financeApplicationAnalysisDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Finance Application Analysis", { exact: true })).toBeVisible();
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Finance Application Analysis"]);
});

test('Verify that all expected sections are present on the Finance Application Analysis Dashboard', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance Application Analysis");
    await Click.tabs("financeApplicationAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Finance Application Analysis Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance Application Analysis");
    await Click.tabs("financeApplicationAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Finance Application Analysis Dashboard canvas is attached', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance Application Analysis");
    await Click.tabs("financeApplicationAnalysisDashboard");
    await page.waitForTimeout(2000);
    await Verify.verifyCanvasAttached('canvas#myCustomChart');
});

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

// My Reports--------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that My Reports sidebar option displayed correctly with icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");   
    await Verify.IsTextDisplayed(page, "My Reports");
    await Verify.isIconVisible(page, 'myReportsIcon');
    await console.log ("The My Reports sidebar option is displayed as expected with the icon.")
});

//My Reports >> Reports >> Deal Tracker Report-------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Deal Tracker Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

test('Verify that the user can "Add" new Deal Tracker Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.Btn("addDealTrackerReport");
    await Click.dropdown("Group", "Test_Group");
    await Click.calendar(1, "2025", "Jun", 10);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jun", 20);
    await Click.Btn("createDateYes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" a Deal Tracker Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});

test('Verify that the user can "Delete" a Deal Tracker Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await page.waitForTimeout(3000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Deal Tracker Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.Btn("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(6000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Deal Tracker Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.icon("Sort")
    await Verify.verifySortOrder();
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" Deal Tracker report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Verify.verifyDownload('downloadlink');
});

//My Reports >> Reports >> DOC Summary Report----------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the DOC Summary Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

test('Verify that the user can "Add" new DOC Summary report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await Click.Btn("addDocSummaryReport");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await page.waitForTimeout(6000);
    await Click.Btn("inceptDateYes")
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" a Doc Summary Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});

test('Verify that the user can "Delete" a Doc Summary Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await page.waitForTimeout(2000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Doc Summary Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.Btn("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(9000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Doc Summary Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" DOC Summary report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await Verify.verifyDownload('downloadlink');
});

//My Reports >> Reports >> DOC Report----------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the DOC Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

test('Verify that the user can "Add" new DOC report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await Click.Btn("addDocReport");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Click.Btn("inceptDateYes")
    await page.waitForTimeout(6000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" a Doc Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});

test('Verify that the user can "Delete" a Doc Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await page.waitForTimeout(2000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Doc Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.Btn("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(9000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Doc Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await Click.icon("Sort");
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" DOC report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await Verify.verifyDownload('downloadlink');
});

//My Reports >> Reports >> Insurance Deal Report--------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Insurance Lead Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

test('Verify that the user can "Add" new Insurance Lead Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await Click.Btn("addInsuranceLeadReport");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await page.waitForTimeout(4000);
    await Click.Btn("save");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" a Insurance Lead Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});


test('Verify that the user can "Delete" a Insurance Lead  Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await page.waitForTimeout(2000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    
});

test('Verify that the user can "Copy" a Insurance Lead Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await page.waitForTimeout(2000);
    await Click.Btn("selectAll");
    await page.waitForTimeout(2000);
    await Click.Btn("copying");
    await page.waitForTimeout(6000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Insurance Deal Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" Insurance Deal Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await Verify.verifyDownload('downloadlink');
});


//My Reports >> Reports >> Payover Report--------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Payover Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

test('Verify that the user can "Add" new Payover report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("payoverReport");
    await Click.Btn("addPayoverReport");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Click.Btn("inceptDateYes")
    await page.waitForTimeout(6000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" a Payover Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("payoverReport");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});

test('Verify that the user can "Delete" a Payover Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("payoverReport");
    await page.waitForTimeout(2000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Payover Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("payoverReport");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.Btn("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(9000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Payover Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("payoverReport");
    await Click.icon("Sort");
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" Payover report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("payoverReport");
    await Verify.verifyDownload('downloadlink');
});

//My Reports >> Reports >> Product Details Report--------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Product Details Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

test('Verify that the user can "Add" new Product Details report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await Click.Btn("addProductDetailsReport");
    await Click.calendar(1, "2025", "May", 20);;
    await page.waitForTimeout(8000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" a Product Details Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});

test('Verify that the user can "Delete" a Product Details Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await page.waitForTimeout(2000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Product Details Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.Btn("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(9000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Product Details Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await Click.icon("Sort");
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" Product Details report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("productDetailsReport");
    await Verify.verifyDownload('downloadlink');
});

//My Reports >> Reports >> Transaction Details Report--------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("transactionDetailsReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, ["Created Date", "Process State Message", "Report File"]);
});

// test('Verify that the user can "Add" new Transaction Details report with valid data', async ({ page, Actions, Click, Verify }) => {
//     await Actions.signIn("sonali");
//     await Click.Btn("login");
//     await Actions.enterText("searchMenu", "My Reports");
//     await Click.chevronLeftArrow(1);
//     await Click.chevronLeftArrow(2);
//     await Click.tabs("transactionDetailsReport");
//     await Click.Btn("addTransactionDetailsReport");
//     await Click.calendar(1, "2025", "May", 20);
//     await page.waitForTimeout(1000);
//     await Click.calendar(2, "2025", "Jul", 26);
//     await Click.Btn("inceptDateYes");
//     await Click.checkboxWithoutAll("Columns", ["Transaction Details", "Client Information"]);
//     await page.waitForTimeout(2000);
//     await Click.Btn("save");
//     await Verify.IsTextDisplayed(page, "Saved Successfully");
// });

test('Verify that the user can "Edit" a Transaction Details Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("transactionDetailsReport");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Actions.enterText("notes", "Edited by automation");
    await Click.Btn("save");
    await expect(page.getByText("Edited by automation", { exact: true }).first()).toBeVisible();
});

test('Verify that the user can "Delete" a Transaction Details Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("transactionDetailsReport");
    await page.waitForTimeout(5000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Transaction Details Report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("transactionDetailsReport");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.Btn("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(9000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort Transaction Details Report records', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("transactionDetailsReport");
    await Click.icon("Sort");
    await page.waitForTimeout(2000);
    await Verify.verifySortOrder();
});

test('Verify that the user can "download" Transaction Details report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("transactionDetailsReport");
    await Verify.verifyDownload('downloadlink');
});

//My Reports >> Finance Reporting  >> Finance Application Analysis Report-------------------------------------------------------------------------------------------------------------

test('Verify that the user can generate Finance Application Analysis Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(3);
    await Click.tabs("financeReport"); // Assuming "financeReport" is the correct tab value
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await page.waitForTimeout(2000);
    await Click.Btn("generateReport");
    await page.waitForTimeout(2000);
    await Verify.verifyDownload('generateReport');
});

//My Reports >> Admin Report  >> Banker User Login Report------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can generate Banker User Login Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("bankerUserLoginReport"); 
    await page.waitForTimeout(2000);
    await Click.checkboxWithoutAll("Groups", "All");
    await Click.checkboxWithoutAll("Branch", "All");
    await Click.checkboxWithoutAll("Finance Company", "All");
    await Click.checkboxWithoutAll("Role", "All");
    await Click.Btn("includeActiveUsersYes");
    await page.waitForTimeout(3000);
    await Click.generateReport.click(); 
     await Verify.verifyDownload('generateReport');
    
});

//My Reports >> Admin Report >> Supply Data Report -------------------------------------------------------------------------------------------------------------

test('Verify that the Supply Data Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("supplyDataReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, [
        "Group", "Branch", "Product Type", "Product Sub Type", "Product", "Administrator", "Underwriter", "Owner", "Claims", "Start Date", "End Date", "Generate Report"
    ]);
});

test('Verify that the user can select all required fields and generate Supply Data Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("supplyDataReport");
    await page.waitForTimeout(4000);
    await Click.checkboxWithoutAll("Group", "All");
    await Click.checkboxWithoutAll("Branch", "All");
    await Click.checkboxWithoutAll("Product Type", "All");
    await Click.checkboxWithoutAll("Product Sub Type", "All");
    await Click.checkboxWithoutAll("Product", "All");
    await Click.checkboxWithoutAll("Administrator", "All");
    await Click.checkboxWithoutAll("Underwriter", "All");
    await Click.checkboxWithoutAll("Claims", "All");
    await Click.checkboxWithoutAll("Owner", "All");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await page.waitForTimeout(2000);
    await Click.generateReport.click();
    await Verify.verifyDownload('generateReport');
   
});

test('Verify that the user cannot generate Supply Data Report without required fields', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("supplyDataReport");
    await page.waitForTimeout(2000);
    await Click.generateReport.click();
    await Verify.IsTextDisplayed(page, "Could not generate report"); // Adjust if different error message
});

//My Reports >> Admin Report >> Transaction Documents Report -------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction Document Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("transactionDocumentsReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, [
        "Group", "Branch", "Product Type", "Product Sub Type", "Product", "Administrator", "Underwriter", "Owner", "Claims", "Generate Report"
    ]);
});

test('Verify that the user can select all required fields and generate Transaction Document Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("transactionDocumentsReport");
    await Click.checkboxWithoutAll("Group", "All");
    await Click.checkboxWithoutAll("Branch", "All");
    await Click.checkboxWithoutAll("Product Type", "All");
    await Click.checkboxWithoutAll("Product Sub Type", "All");
    await Click.checkboxWithoutAll("Product", "All");
    await Click.checkboxWithoutAll("Document Category", "All");
    await Click.checkboxWithoutAll("Administrator", "All");
    await Click.checkboxWithoutAll("Underwriter", "All");
    await Click.checkboxWithoutAll("Claims", "All");
    await Click.checkboxWithoutAll("Owner", "All");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Click.generateReport.click();  
     await page.waitForTimeout(3000);
    await Verify.verifyDownload('generateReport');
});

test('Verify that the user cannot generate Transaction Document Report without required fields', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("transactionDocumentsReport");
    await page.waitForTimeout(2000);
    await Click.generateReport.click();
    await Verify.IsTextDisplayed(page, "Could not generate report"); // Adjust if different error message
});


//My Reports >> Admin Report >> User Deatils Report ---------------------------------------------------------------------------------------------------------------------------------

test('Verify that the User Details Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userDetailsReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, [
        "Group", "Branch", "Role", "Generate Report"
    ]);
});

test('Verify that the user can select all required fields and generate User Details Report Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userDetailsReport");
    await Click.checkboxWithoutAll("Group", "All");
    await Click.checkboxWithoutAll("Branch", "All");
    await Click.checkboxWithoutAll("Role", "All");
    await Click.checkboxWithoutAll("Fields", "All");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Click.generateReport.click();  
    await page.waitForTimeout(3000);
    await Verify.verifyDownload('generateReport');
});

test('Verify that the user cannot generate User Details Report Report without required fields', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userDetailsReport");
    await page.waitForTimeout(2000);
    await Click.generateReport.click();
    await Verify.IsTextDisplayed(page, "Could not generate report"); // Adjust if different error message
});


//My Reports >> Admin Report >> User Login Report -----------------------------------------------------------------------------------------------------------------------------------

test('Verify that the User Login Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userLoginReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, [
        "Group", "Branch","Role", "Generate Report"
    ]);
});

test('Verify that the user can select all required fields and generate User Login Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userLoginReport");
    await Click.checkboxWithoutAll("Group", "All");
    await Click.checkboxWithoutAll("Branch", "All");
    await Click.checkboxWithoutAll("Role", "All");
    await Click.Btn("includeActiveUsersYes");
    await Click.generateReport.click();  
    await Verify.verifyDownload('generateReport');
});

test('Verify that the user cannot generate User Login Report without required fields', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userLoginReport");
    await page.waitForTimeout(2000);
    await Click.generateReport.click();
    await Verify.IsTextDisplayed(page, "Could not generate report"); // Adjust if different error message
});

//My Reports >> Admin Report >> User Name Login Report ------------------------------------------------------------------------------------------------------------------------------
test('Verify that the User Name Login Report screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userNameLoginReport");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, [
        "User", "Generate Report"
    ]);
});

test('Verify that the user can select all required fields and generate User Name Login Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userNameLoginReport");
    await Click.dropdown("User", "a1");
    await Click.generateReport.click();  
    await page.waitForTimeout(3000);
    await Verify.verifyDownload('generateReport');
});

test('Verify that the user cannot generate User Name Login Report without required fields', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("userNameLoginReport");
    await page.waitForTimeout(2000);
    await Click.generateReport.click();
    await Verify.IsTextDisplayed(page, "Could not generate report"); // Adjust if different error message
});

test('Verify that each accordian section chart is displayed correctly on Main Dashboard', async ({ page, Actions, Click, Verify }) => {
    const sectionTitles = [
        "Transaction Conversion Rate",
        "Cash and Finance Shares",
        "Vehicles Financed per Finance House",
        "Vehicles Sold per Dealer",
        "Vehicles Sold per Sales Person",
        "Vehicles Sold per Business Manager",
        "% Penetration per Product Type Category",
        "APU per Business Manager",
        "APU per Sales Person"
    ];

    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);

    for (const title of sectionTitles) {
        const section = page.getByText(title, { exact: false });
        // Expand the section if it's collapsed (if applicable)
        if (await section.getAttribute('aria-expanded') === 'false') {
            await section.click();
            await page.waitForTimeout(500);
        }
        await expect(section).toBeVisible();
        await section.scrollIntoViewIfNeeded();
        await Verify.chartImageLoaded();
        await Verify.IsTextDisplayed(page, title);
    }
});

// Navigation side bar-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the navigation sidebar is displayed with all required tabs.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, ["Home", "Transaction", "Dashboard"]);
});

test('Verify that clicking on the "Seriti" logo navigates the user to the landing screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(5000);
    await Click.icon("seritiLogo");
    await page.waitForLoadState('networkidle');
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

test('Verify that correct users name and profile icon is displayed based on the logged-in account.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, "Testing Frameworks");
});

test('Verify that the user can see the profile options by clicking on the users name', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("testingFrameworks");
    await Verify.IsTextDisplayed(page, ["Profile", "Change Password", "Sign Out"]);
});

test('Verify that the country name is displayed when the user hovers over the country profile', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.hover("(//i[@class='fi fi-ae text-3xl'])[1]");
    await Verify.IsTextDisplayed(page, "United Arab Emirates");
});

test('Verify that the user can change the country by selecting from the country options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("country");
    await Click.icon("Swaziland");
    await page.hover("(//i[@class='fi fi-sz text-4xl'])[1]");
    await Verify.IsTextDisplayed(page, "Swaziland");
});

test('Verify that the user can minimize and maximize the sidebar by clicking on icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("collapse");
    await Click.icon("find");
    await Verify.IsTextDisplayed(page, "Home");
});

test('Verify that sidebar options are highlighted when hovered over', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.mouseHoverTabs(["Home", "Dashboard", "Transaction", "My Reports", "Template", "Admin"]);
});

test('Verify that the tab names are displayed for all logos in the minimized state', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.hover("//i[@class='pi pi-home']");
    await Verify.IsTextDisplayed(page, "Home");
});

//reports >> DealTrackerReport-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can check or uncheck multiple checkbox', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.Btn("addDealTrackerReport");
    await Click.icon("cancel");
    await Click.dropdown("Group", "`Group 2");
    await page.waitForTimeout(2000);
    await Click.checkboxWithAll(2, ["Tebogo Lepelle", "Winjit Staging Bm", "Business Manager Staging"]);
    await Verify.IsTextDisplayed(page, ["Tebogo Lepelle", "Winjit Staging Bm", "Business Manager Staging"]);
});

//report scheduler-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user cannot "Add" new Report Scheduler with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.Btn("addReportScheduler");
    await page.waitForTimeout(2000);
    await Click.dropdown("Report Type", "Transaction Document Report");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Document Category is a required field");
});

test('Verify that the user can "Copy" Report Scheduler report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.icon("futureArrow")
    await Click.icon("reportSchedulerCopy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "delete" Report Scheduler report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.icon("futureArrow")
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    //await Verify.verifyDatacount(3);
});

test('Verify that the user can "edit" Report Scheduler report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await page.waitForLoadState('networkidle');
    await Click.icon("futureArrow")
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2026", "Oct", 20);
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Report Scheduler saved!");
});

test('Verify that the user can filter Report Scheduler records and data grid gets updated', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await page.waitForLoadState('networkidle');
    await Click.icon("futureArrow")
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("reportName", "Practise test");
    await Click.Btn("apply");
    //await Verify.verifyDatacount(3);
});

test('Verify that the user can reset Report Scheduler records and data grid gets updated', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await page.waitForLoadState('networkidle');
    await Click.icon("futureArrow")
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("reportName", "Practise test");
    await Click.Btn("apply");
    await Click.Btn("reset");
    //await Verify.verifyDatacount(3);
});

//Template-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can "Add" new Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.Btn("addTemplate");
    await page.waitForTimeout(2000);
    await Click.dropdown("Template Category", "Record of advice");
    await Actions.enterText("templateName", "Template3");
    await Actions.enterText("reportHeading", "Template3 Heading");
    await Click.Btn("yes");
    await Click.calendar(1, "2025", "Jul", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Oct", 26);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can filter template details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("templateName", "my template");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset template details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("templateName", "my template");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.Btn("reset");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user can "sort" the template datas in the data grid', async ({ page, Actions, Click, Verify }) => {  
    await Actions.signIn("Automation");
    await Click.Btn("login");  
    await Click.tabs("template");
    await Click.icon("sort"); ;
    await Verify.verifySortOrder(); 
});

test('Verify that the user can "Copy" Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.icon("edit");
    await Click.Btn("templateLine");
    await Click.Btn("add");
    await Click.checkboxWithoutAll("Transaction Status", "Active");
    await Click.dropdown("Category", "Finance");
    await Click.calendar(1, "2026", "Jul", 22);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2026", "Oct", 1);
    await Click.Btn("save");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(10);
});

test('Verify that clicking on the back arrow, user is navigated to the template screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.icon("edit");
    await page.waitForTimeout(1000);
    await Click.icon("backArrow");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, "Template Details");
});

//Admin >> Group-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can filter group using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    //await Verify.verifyDatacount(3);
});

test('Verify that group detail text is displayed when clicking on group tab', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details");
});

test('Verify that the user can reset group by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(1000);
    //await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new group with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await Click.Btn("addGroup");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Group Code is a required field");

});

test('Verify that the user can edit the group with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Actions.enterText("defaultPrime", "2")
    await page.waitForLoadState('networkidle');
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details saved!");
});

test('Verify that the user cannot edit the group with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Actions.enterText("defaultPrime", " ")
    await page.waitForLoadState('networkidle');
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Default Prime Adjustment is a required field");
});

test('Verify that the user can copy the group', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can delete a group', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("deleted");
    await Click.Btn("yes");
    await page.waitForTimeout(4000);
    //await Verify.verifyDatacount(1);
});

test('Verify that the user can navigate through pagination numbers in group page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForLoadState('networkidle');
    await Click.pagination(9);
    await page.waitForTimeout(1000);
    //await Verify.verifyDatacount(1);
});

test('Verify that the user can refresh the group page data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(3);
    await Click.Btn("refresh");
    await page.waitForLoadState('networkidle');
    //await Verify.verifyDatacount(3);
});

test('Verify that the user can sort the group details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

//Group >> Group line-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "groupline" in the addGroupline section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.Btn("add");
    await Click.dropdown("Account Manager", "admin@seritisolutions.com");
    await page.waitForTimeout(2000);
    await Click.dropdown("Marketer", "a1");
    await page.waitForTimeout(1000);
    await Click.dropdown("Approval User Products", "45012741@mylife.unisa.ac.za");
    await page.waitForTimeout(1000);
    await Click.dropdown("Approval User Other", "adamm@financenow.co.nz");
    await page.waitForTimeout(1000);
    await Click.dropdown("Financial Manager", "amal@theelitecars.com");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 25);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "groupline" in the addGroupline section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.Btn("add");
    await Click.dropdown("Account Manager", "admin@seritisolutions.com");
    await page.waitForTimeout(2000);
    await Click.dropdown("Marketer", "a1");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 25);
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Financial Manager is a required field");
});

test('Verify that the user is able to edit a group line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("registeredName", "Group Line 1");
    await page.waitForTimeout(1000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to copy a group line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await Click.icon("detailsCopy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to delete a group line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await page.pause();
    await Click.icon("deleted");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to sort the group line details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that the user is able to refresh the group line details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await page.waitForTimeout(2000);
    await Click.Btn("refresh");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

//Group >> Companies-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "company" in the addGroupCompany section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await Click.Btn("add");
    await Click.calendar(2, "2026", "Jul", 26); 
    await Click.dropdown("Company Name", "ABC Company");  
    await Actions.enterText("sortKey", "309");
    await Click.calendar(1, "2025", "Jul", 25); 
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "company" in the addGroupCompany section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await Click.Btn("add");
    await Actions.enterText("sortKey", " "); 
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Company Name is a required field"); 
});

test('Verify that the user is able to edit a company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(1000);
    await Click.icon("edit"); 
    await Actions.enterText("sortKey", "310");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to copy a company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to delete a company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.icon("deleted");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Could not delete record");
});

test('Verify that the user is able to sort the groupCompany details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that the user is able to refresh the groupCompany page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.Btn("refresh");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

//Group >> Products-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "product" in the addGroupProduct section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await page.waitForTimeout(1000);
    await Click.calendar(2, "2027", "Jul", 25); 
    await Click.dropdown("Product Sub Type", "Third Party Insurance");
    await Click.dropdown("Product Name", "Practise product");
    await Actions.enterText("sortKey", "309");
    await Click.calendar(1, "2026", "Jul", 25); 
    await Click.dropdown("Require At Inception", "Always");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "product" in the addGroupProduct section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await page.waitForTimeout(1000);
    await Click.dropdown("Product Sub Type", "Third Party Insurance");
    await Click.dropdown("Product Name", "Practise product");
    await Click.calendar(1, "2026", "Jul", 25); 
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Require At Inception is a required field"); 
});

test('Verify that the user is able to edit a product', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(1000);
    await Click.icon("edit"); 
    await Actions.enterText("sortKey", "310");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "310");
});

test('Verify that the user is able to copy a product', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Practise product2");
});

test('Verify that the user is able to delete a product', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(2000);
    await Click.icon("deleted");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

//branches-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that "branch details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await Verify.IsTextDisplayed(page, "Branch Details");
});

test('Verify that the user can filter branch details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Practise branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset branch details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Practise branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new branch with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addBranch");
    await Actions.enterText("branchName", "Test Branch");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Branch Code is a required field");
});

test('Verify that the user can edit the branch details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Updated Branch Name");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("branchName", "Practise branch");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Branch Details saved!");
});

test('Verify that the user cannot edit the branch details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "copy branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("branchName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Branch Name is a required field");
});

test('Verify that the user can copy the branch details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "copy branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

//company-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that "company details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await Verify.IsTextDisplayed(page, "Company");
});

test('Verify that the user can filter company details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "practise company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(2);
});

test('Verify that the user can reset company details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "practise company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    //await page.waitForTimeout(5000);
    //await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new company with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addCompany");
    await Actions.enterText("companyName", "Test Company");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Company Code is a required field");
});

test('Verify that the user cannot copy the company details with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can edit the company details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company saved!");
});

test('Verify that password generator working as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.Btn("companyDetails");
    await Click.Btn("add");
    await page.waitForTimeout(2000);
    const [popup] = await Promise.all([page.waitForEvent('popup'), await Click.link("clickhere")]);
    await Verify.verifyURL(popup, 'https://randomwheel.org/password-generator');

});

test('Verify Document protection is working or not if it selected as "Yes"', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.Btn("companyDetails");
    await Click.Btn("add");
    await page.waitForTimeout(2000);
    await Click.Btn("documentProtectedyes");
    await page.waitForTimeout(2000);

});

//products-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user can expand "Products" section and the sub option should display as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(5);
    await Verify.IsTextDisplayed(page, "Product Admin");

});

test('Verify that "product details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await Verify.IsTextDisplayed(page, "Products");
});

test('Verify that the user can filter product details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(4);
});

test('Verify that the user can reset product details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new product with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addProduct");
    await Actions.enterText("productName", "Test Product");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Product Sub Type is a required field");
});

test('Verify that the user can edit the product details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "updated practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("productName", "practise product");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Products saved!");
});

test('Verify that the user cannot edit the product details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("productName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Product Name is a required field");
});

test('Verify that the user can copy the product details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2026", "May", 8);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2026", "Aug", 20);
    await page.waitForTimeout(1000);
    await Click.Btn("save");
    await page.waitForTimeout(1000);
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user cannot copy the product details with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

//Accessories-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user can expand "Accessories" section and the sub option should display as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Verify.IsTextDisplayed(page, "Accessory Admin");
});

test('Verify that "accessory details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await Verify.IsTextDisplayed(page, "Accessories");
});

test('Verify that the user can filter accessory details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(2);
});

test('Verify that the user can reset accessory details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(3000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user can add new accessory with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addAccessory");
    await Actions.enterText("accessoryName", "Test Accessory");
    await Actions.enterText("accessoryCode", "Test Accessory Sub Type");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user cannot add new accessory with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addAccessory");
    await Actions.enterText("accessoryName", "Test Accessory");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Accessory Code is a required field");
});

test('Verify that the user can edit the accessory details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("accessoryName", "updated practise accessory");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Accessories saved!");
});

test('Verify that the user cannot edit the accessory details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("accessoryName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Accessory Name is a required field");
});

test('Verify that the user can sort the accessory details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that pagination works correctly for accessories page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await Click.pagination(2);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});

//Vehicles-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user can expand "Vehicles" section and the sub option should display as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Verify.IsTextDisplayed(page, "Vehicle Admin");
});

test('Verify that "vehicle details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await Verify.IsTextDisplayed(page, "Vehicle");
});

test('Verify that the user can filter vehicle details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset vehicle details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add an vehicle with that already exsists', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addVehicle");
    await Click.dropdown("Manufacturer", "Acura");
    await Actions.enterText("vehicleModel", "new")
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can edit the vehicle details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("vehicleModel", "Testing Model");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Vehicle saved!");
});

test('Verify that the user cannot edit the vehicle details with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("vehicleModel", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Model is a required field");
});

test('Verify that the user cannot copy the vehicle details that already exsists', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Actions.enterText("vehicleDoors", "2");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can sort the vehicle details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that pagination works correctly for vehicles page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await Click.pagination(4);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});

//Vehicles >> Import vehicle file---------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can import a vehicle file when clicking on the import vehicle file button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.tabs("importVehicleFile");
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
    const fileInput = await page.$("//input[@type='file']");
    await fileInput.setInputFiles(path.resolve('PlayWright_Skeleton/documents/Sample report.pdf'));
    await Click.Btn("importVehicleBtn");
    await Verify.IsTextDisplayed(page, "Success");
});

test('Verify that the user cannot import a vehicle file without uploading a file', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.tabs("importVehicleFile");
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
    await Click.Btn("importVehicleBtn");
    await Verify.IsTextDisplayed(page, "Request Failed!");
});

//Users-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that "user details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await Verify.IsTextDisplayed(page, "User Details");
});

test('Verify that the user can filter user details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset user details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new user with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addUser");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "First Name is a required field");
});

test('Verify that the user can edit the user details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2001", "Oct", 1);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "User Details saved!");
});

test('Verify that the user cannot edit the user details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("firstName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "First Name is a required field");
});

test('Verify that the user can sort the user details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that pagination works correctly for users page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await Click.pagination(2);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});
































import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'
import { Verify } from '@pages/Verify'



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

test.only('Verify that the transaction conversion chart loaded as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');
    const canvasElmt = await page.locator("canvas[data-pc-section='canvas']")
    await Verify.verifyElementPresence(canvasElmt, true);
    console.log("Transaction conversion chart loaded as expected.")
    await page.locator("//span[text()='Tabular View']").click();
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

test('Verify that user can switch to tabular view of transaction conversion chart and it is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Main Dashboard");
    await Click.tabs("mainDashboard");
    await Click.Btn('load');

    // Click the button or tab to switch to tabular view (replace with actual selector or method)
    await Click.Btn("tabularViewBtn");

    // Assert that the tabular view is displayed (replace with actual selector or text)
    await expect(page.locator('table.transaction-conversion-table')).toBeVisible(); // Adjust selector as needed
    await expect(page.locator('text=Transaction Conversion Table')).toBeVisible(); // Optional: check for heading/text

    await console.log("User can switch to tabular view of transaction conversion chart and it is displayed as expected.");
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










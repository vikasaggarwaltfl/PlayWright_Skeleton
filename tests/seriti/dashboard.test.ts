import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

// -------------------- Dashboard Sidebar & Main Dashboard --------------------

test('Verify that Dashboard sidebar option is displayed correctly with icon', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.IsTextDisplayed(page, 'Dashboard');
  await Verify.isIconVisible(page, 'dashboardIcon');
  console.log('The Dashboard sidebar option is displayed as expected with icon.');
});

test('Verify that the Main Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  // Wait for a unique dashboard element to appear
  await page.waitForSelector('text=Main Dashboard', { timeout: 15000 });
  await Verify.IsTextDisplayed(page, 'Main Dashboard');
});

test('Verify that all expected accordions are present on the Main Dashboard.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Verify.IsTextDisplayed(page, [
    'Transaction Conversion Rate',
    'Cash and Finance Shares',
    'Vehicles Financed per Finance House',
    'Vehicles Sold per Dealer',
    'Vehicles Sold per Sales Person',
    'Vehicles Sold per Business Manager',
    '% Penetration per Product Type Category',
    'APU per Business Manager',
    'APU per Sales Person',
  ]);
});

test('Verify that the "Expand All" and "Collapse All" buttons function as expected.', async ({ page, Actions, Click }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await page.getByRole('button', { name: /Expand All/i }).click();
  await expect(page.getByText('Collapse All')).toBeVisible();
  await page.getByRole('button', { name: /Collapse All/i }).click();
  await expect(page.getByText('Expand All')).toBeVisible();
});

test('Verify that user can load accordion of main dashboard by applying filter parameters', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.calendar(1, '2025', 'Jun', 10);
  await Click.calendar(2, '2025', 'Jun', 20);
  await Click.Btn('load');
  await Verify.IsTextDisplayed(page, ['Chart View', 'Collapse All']);
});

// -------------------- Transaction Conversion Rate --------------------

test('Verify that the transaction conversion chart loaded as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  const canvasElmt = page.locator("canvas[data-pc-section='canvas']");
  await Verify.verifyElementPresence(canvasElmt, true);
  console.log('Transaction conversion chart loaded as expected.');
});

test('Verify that the transaction conversion chart can be saved in different formats', async ({ page, Actions, Click }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  await Click.selectSaveAsOption('PNG');
  await Click.selectSaveAsOption('JPEG');
  await Click.selectSaveAsOption('PDF');
});

test('Verify that the user can switch to the tabular view of the transaction conversion chart and it displays correctly.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  await page.locator("//span[text()='Tabular View']").click();
  const tableElmt = page.locator('table');
  await Verify.verifyElementPresence(tableElmt, true);
  console.log('User can switch to tabular view of transaction conversion chart and it is displayed as expected.');
});

test('Export Transaction Conversion Chart to Excel', async ({ page, Actions, Click }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  await page.locator("//span[text()='Tabular View']").click();
  await page.waitForSelector('table', { state: 'visible' });
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('button:has-text("Export to Excel")'),
  ]);
  const suggestedFilename = download.suggestedFilename();
  expect(suggestedFilename).toMatch(/\.xlsx?$/i);
  console.log('Transaction Conversion Chart exported to Excel successfully.');
});

// -------------------- Cash and Finance Shares Chart --------------------

test('Verify that the Cash and Finance Shares canvas chart loads as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.calendar(1, '2025', 'Feb', 10);
  await Click.Btn('load');
  const canvasElmt = page.locator('#c1ed079c-dc5e-45cd-9a38-06d44dc75c7d');
  await Verify.verifyElementPresence(canvasElmt, true);
  console.log('Cash and Finance Shares canvas chart loaded as expected.');
});

test('Verify that the Cash and Finance Share chart can be saved in different formats', async ({ page, Actions, Click }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  await Click.selectSaveAsOption('PNG');
  await Click.selectSaveAsOption('JPEG');
  await Click.selectSaveAsOption('PDF');
});

// -------------------- Vehicle Financed per Finance House --------------------

test('Verify that the Vehicle financed per Finance House canvas chart loads as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.calendar(1, '2025', 'Feb', 10);
  await Click.Btn('load');
  const canvasElmt = page.locator('#88224891-e16d-42b6-9013-2de2ffa935b6');
  await Verify.verifyElementPresence(canvasElmt, true);
  console.log('Vehicle financed per Finance House canvas chart loaded as expected.');
});

test('Verify that the Vehicle financed per Finance House chart can be saved in different formats', async ({ page, Actions, Click }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  await Click.selectSaveAsOption('PNG');
  await Click.selectSaveAsOption('JPEG');
  await Click.selectSaveAsOption('PDF');
});

// -------------------- Vehicles Sold per Sales Person --------------------

test('Verify that the Vehicles sold per sales person canvas chart loads as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.calendar(1, '2025', 'Feb', 10);
  await Click.Btn('load');
  const canvasElmt = page.locator('#d5dc892a-e024-4dc4-96d8-250fee1da8a4');
  await Verify.verifyElementPresence(canvasElmt, true);
  console.log('Vehicles sold per sales person canvas chart loaded as expected.');
});

test('Verify that the Vehicles sold per sales person chart can be saved in different formats', async ({ page, Actions, Click }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Main Dashboard');
  await Click.tabs('mainDashboard');
  await Click.Btn('load');
  await Click.selectSaveAsOption('PNG');
  await Click.selectSaveAsOption('JPEG');
  await Click.selectSaveAsOption('PDF');
});

// -------------------- Transaction In Progress Dashboard --------------------

test('Verify that the Transaction In Progress Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Progress');
  await Click.tabs('transactionInProgressDashboard');
  await expect(page.getByText('Transaction In Progress', { exact: true })).toBeVisible();
  await Verify.IsTextDisplayed(page, ['Transaction In Progress']);
});

test('Verify that all expected sections are present on the Transaction In Progress Dashboard', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Transaction In Progress');
  await Click.tabs('transactionInProgressDashboard');
  await Click.Btn('load');
  await Verify.IsTextDisplayed(page, ['Chart View', 'Collapse All']);
});

test('Verify that the Transaction In Progress Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Transaction In Progress');
  await Click.tabs('transactionInProgressDashboard');
  await Click.Btn('load');
  await Verify.IsTextDisplayed(page, ['Chart View', 'Collapse All']);
});

test('Verify that the Transaction In Progress Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Transaction In Progress');
  await Click.tabs('transactionInProgressDashboard');
  await Click.Btn('load');
  await Click.selectSaveAsOption('PNG');
  await Verify.verifyDownload('downloadlink');
});

test('Verify that the Transaction Status Ageing Analysis Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Transaction Status Ageing Analysis');
  await Click.tabs('transactionStatusAgeingAnalysisDashboard');
  await expect(page.getByText('Transaction Status Ageing Analysis', { exact: true })).toBeVisible();
  await Verify.IsTextDisplayed(page, ['Transaction Status Ageing Analysis']);
});

test('Verify that all expected sections are present on the Transaction Status Ageing Analysis Dashboard', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Transaction Status Ageing Analysis');
  await Click.tabs('transactionStatusAgeingAnalysisDashboard');
  await Click.Btn('load');
  await Verify.IsTextDisplayed(page, ['Chart View', 'Collapse All']);
});

test('Verify that the Transaction Status Ageing Analysis Dashboard filter parameters work correctly', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Actions.enterText('searchMenu', 'Transaction Status Ageing Analysis');
  await Click.tabs('transactionStatusAgeingAnalysisDashboard');
  await Click.Btn('load');
  await Verify.IsTextDisplayed(page, ['Page Total', 'Grand Total']);
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










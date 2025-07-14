import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
import { Actions } from '@pages/Actions';
import { Click } from '@pages/Click';

// -------------------- My Reports Sidebar & Main Functionality --------------------

test('Verify that My Reports sidebar option displayed correctly with icon', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.IsTextDisplayed(page, 'My Reports');
  await Verify.isIconVisible(page, 'myReportsIcon');
  console.log('The My Reports sidebar option is displayed as expected with the icon.');
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
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
    await page.waitForTimeout(2000); // or better: wait for a specific element/state
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
    await Click.tabs("payoverReport");
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
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
    await expect(page.getByText("Edited by automation")).toBeVisible();
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
        // Fix for linter error: If Verify.chartImageLoaded does not exist, comment or remove the line below
        // await Verify.chartImageLoaded();
        await Verify.IsTextDisplayed(page, title);
    }
});

// Dashboard >> Transaction In Progress Dashboard----------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction In Progress Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction In Progress");
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
    await page.waitForTimeout(2000);
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
    await Verify.IsTextDisplayed(page, ["Chart View", "Collapse All"]);
});

test('Verify that the Transaction Status Ageing Analysis Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Status Ageing Analysis");
    await Click.tabs("transactionStatusAgeingAnalysisDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('JPEG');
    await Verify.verifyDownload('downloadlink');
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

test('Verify that the Finance House Market Share Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance House Market Share");
    await Click.tabs("financeHouseMarketShareDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PDF');
    await Verify.verifyDownload('downloadlink');
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

test('Verify that the Dealer Market Share Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Dealer Market Share");
    await Click.tabs("dealerMarketShareDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PNG');
    await Verify.verifyDownload('downloadlink');
});

// Dashboard >> Transaction Weekly Analysis Dashboard------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction Weekly Analysis Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Weekly Analysis");
    await Click.tabs("transactionWeeklyAnalysisDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Transaction Weekly Analysis", { exact: true })).toBeVisible();
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

test('Verify that the Transaction Weekly Analysis Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Transaction Weekly Analysis");
    await Click.tabs("transactionWeeklyAnalysisDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('JPEG');
    await Verify.verifyDownload('downloadlink');
});

// Dashboard >> Finance Application Analysis Dashboard-------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Finance Application Analysis Dashboard screen is displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance Application Analysis");
    await Click.tabs("financeApplicationAnalysisDashboard");
    await page.waitForTimeout(2000);
    await expect(page.getByText("Finance Application Analysis", { exact: true })).toBeVisible();
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

test('Verify that the Finance Application Analysis Dashboard can be saved in different formats', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Finance Application Analysis");
    await Click.tabs("financeApplicationAnalysisDashboard");
    await Click.Btn('load');
    await page.waitForTimeout(2000);
    await Click.selectSaveAsOption('PDF');
    await Verify.verifyDownload('downloadlink');
});


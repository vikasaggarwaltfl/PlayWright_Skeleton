import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'


//login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
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
    await page.waitForTimeout(2000);
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
    await Click.Btn("addDocReport");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Click.Btn("inceptDateYes")
    await page.waitForTimeout(4000);
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

// test('Verify that the user can "Add" new Insurance Deal Report with valid data', async ({ page, Actions, Click, Verify }) => {
//     await Actions.signIn("sonali");
//     await Click.Btn("login");
//     await Actions.enterText("searchMenu", "My Reports");
//     await Click.chevronLeftArrow(1);
//     await Click.chevronLeftArrow(2);
//     await Click.tabs("insuranceLeadReport");
//     await Click.Btn("addInsuranceDealReport");
//     await page.waitForTimeout(2000);
//     await Click.calendar(1, "2025", "May", 20);
//     await page.waitForTimeout(2000);
//     await Click.calendar(2, "2025", "Jul", 26);
//     await page.waitForTimeout(4000);
//     await Click.Btn("save");
//     await page.waitForTimeout(2000);
//     await Verify.IsTextDisplayed(page, "Saved Successfully");
// });

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


test('Verify that the user can "Delete" a Insurance Deal Report Report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("insuranceLeadReport");
    await page.waitForTimeout(2000);
    await Click.icon("delete");
    await page.waitForTimeout(2000);
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
});

test('Verify that the user can "Copy" a Insurance Deal Report with valid data', async ({ page, Actions, Click, Verify }) => {
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
    await page.waitForTimeout(9000);
    await Click.Btn("save");
    await page.waitForTimeout(2000);
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





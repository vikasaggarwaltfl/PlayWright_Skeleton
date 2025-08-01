import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

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
    await Verify.verifyDatacount();
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
    await Verify.verifyDatacount();
});

test.skip('Verify that the user can add a new branch with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addBranch");
    await Click.calendar(1, "2026", "Sep", 15); 
    await Actions.enterText("branchCode", "TB001");
    await Click.dropdown("Group Name", "AA Group");
    await Click.calendar(2, "2027", "Jul", 26);
    await Actions.enterText("branchName", "Demo test branch");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
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
    await Actions.enterText("branchName", "Practise branch");
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
    await Actions.enterText("branchName", "Demo test branch");
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
    await Actions.enterText("branchName", "Demo test branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await page.waitForTimeout(1000);
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can sort the branch details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await Click.icon("sort");
    await Verify.verifySortOrder();
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that the user is able to refresh the branch details page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await Click.Btn("refresh");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Branch Details");
});

//Branches >> Products-----------------------------------------------------------------------------------------------------------------------------------------

test.skip('Verify that the user can add a new "product" in the addBranchProduct section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Demo test branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("branchProducts");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await Click.dropdown("Product Sub-Type", "Third Party Insurance");
    await Click.dropdown("Require At Inception", "Always");
    await Click.dropdown("Product Name", "Practise product");
    await Actions.enterText("sortKey", "100");
    await Click.calendar(1, "2026", "Sep", 15); 
    await Verify.IsTextDisplayed(page, "Branch Details (Demo test branch)");
});

test('Verify that the user cannot add a new "product" in the addBranchProduct section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Demo test branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("branchProducts");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Sort Key is a required field");
});

test('Verify that the user can edit the "product" in the addBranchProduct section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Demo test branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("branchProducts");
    await Click.icon("edit");
    await Actions.enterText("sortKey", "200");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Branch Details (Demo test branch)");
});
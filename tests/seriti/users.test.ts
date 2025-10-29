import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

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
    await Verify.verifyDatacount();
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
    await Verify.verifyDatacount();
});

test('Verify that the user can add a new user with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addUser");
    await Actions.enterText("userName", "Akshaya@123456.com");
    await Actions.enterText("firstName", "Test_");
    await Actions.enterText("userLastName", "user");
    await Actions.enterText("passwordNumber", "1234");
    await Click.checkboxWithoutAll("User Countries","All");
    await Click.dropdown("Default Country", "Australia");
    await Click.dropdown("Role", "Admin");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved successfully");
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
    await Actions.enterText("passwordNumber", "1234");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "User Details saved!");
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
    await Verify.verifyDatacount();
});

//User >> User Documents ---------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add in userDocuments section', async ({ page, Actions, Click, Verify }) => {
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
    await Click.tabs("userDocuments");
    await Click.Btn("add");
    await Click.dropdown("Category", "OTHER DOCUMENT");
    await Verify.IsTextDisplayed(page, "OTHER DOCUMENT");
});





















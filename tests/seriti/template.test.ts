import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

test('Verify that the user can "Add" new Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.Btn("addTemplate");
    await page.waitForTimeout(2000);c
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
    await Verify.verifyDatacount();
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
    await Verify.verifyDatacount();
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
    await Verify.verifyDatacount();
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


import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

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
    await Actions.enterText("customPassword", "1234");
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
    await Verify.verifyDatacount(3);
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
    await Verify.verifyDatacount(3);
});
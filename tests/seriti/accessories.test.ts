import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

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
    await page.waitForTimeout(1000)
    await Click.icon("filterArrow");
    await Actions.enterText("aawait page.waitForTimeout(1000)ccessoryName", "practise accessory");
    await Click.Btn("apply");
    await Verify.verifyDatacount();
    ;
    
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
    await Verify.verifyDatacount();
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
    await page.waitForTimeout(3000);
    await Click.icon("edit");
    await page.waitForTimeout(1000);
    await Actions.enterText("accessoryName", "updated practise accessory");
    await Click.Btn("save");
    await page.waitForTimeout(1000);
    await Verify.IsTextDisplayed(page, "Accessories saved!");
});

test('Verify that the user cannot edit the accessory details with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(3000);
    await Click.icon("edit");
    await page.waitForTimeout(1000);
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
    await Verify.verifyDatacount();
});

test("Verify that the user can copy accessory", async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");   
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "Test Accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(3000);
    await Click.icon("copy");
    await page.waitForTimeout(2000);
    await Click.icon("selectAll");
    await page.waitForTimeout(2000);
    await Click.Btn("copying");
    await Click.Btn("save"); 
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});


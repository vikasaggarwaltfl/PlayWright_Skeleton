import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

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
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    //await page.waitForTimeout(1000);
    //await Verify.verifyDatacount(4);
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
    await Actions.enterText("productName", "practise product");
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

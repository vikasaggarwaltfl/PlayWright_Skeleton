
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'


// Login ------------------------------------------------------------------------------------------------------------------------------

test.beforeEach('User login', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("Signin");
});

// Brand Screen ----------------------------------------------------------------------------------------------------------------------

test('Verify that new brand is added successfully', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("Brands")
    await Click.link("AddBrand")
    await Actions.enterText("BrandName", "Test38");
    await Click.Btn("Save");
    await page.waitForTimeout(3000)
    await Click.tabs("Brands")
    await Click.Btn("Filter");
    await Actions.enterText("BrandName", "Test38");
    await Verify.IsTextDisplayed("newBrand", "Test38");
    //await Verify.verifyToastSuccessMessage('Brand added successfully');
});

test('User should not able to add brand with invalid data', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("Brands")
    await Click.link("AddBrand")
    await Actions.enterText("BrandName", "Test30");
    await Click.Btn("Save");
    //await Verify.IsErrorPopUp('Saving Failed')
});

test('Edit Brand Details', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("Brands")
    await Click.icon("BrandActions")
    await Click.Btn("EditBrand")
    await Actions.enterText("BrandPrefix", "ABB");
    await Click.Btn("Save")
    await Click.Btn("BrandInfo")
    //await Verify.IsTextDisplayed("editedPrefix");
    //await page.pause()
});

test('Open Brand Details ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("Brands")
    await Click.link("OpenBrandDetails")
    await expect(page).toHaveURL('https://onexweb-uat.officenational.co.za/table/brand/6')
    await page.pause()
});

test('Sort Brand Records ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("Brands")
    await Click.icon("SortBrand")
    await Click.icon("SortBrand")
    await Click.icon("SortBrand")
    ///await page.pause()
});

test('Filter Brand Records ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("Brands")
    await Click.Btn("FilterBrand");
    await Actions.enterText("BrandName", "Test36");
    await Verify.IsTextDisplayed("newBrand", "Test36");
    await page.pause()
});

// Group Setting Screen ---------------------------------------------------------------------------------------------------------------

test('Open Group Settings ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
});

test('Open Lookup Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
    await Click.link("LookupCategory")
});

test('Open Master Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
    await Click.link("MasterCategory")
});

test('Open IQ Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
    await Click.link("IQCategory")
});

test('Open Pastel Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
    await Click.link("PastelCategory")
});

test('Open Audit log ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
    await Click.link("AuditLog")
    //await page.pause()
});

test('Open config codes ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettings")
    await Click.link("ConfigCodes")
});

//Supplier--------------------------------------------------

test.only('Navigate to supplier', async ({ page, Actions, Click }) => {
    await Click.tabs("Suppliers")
    await page.pause()
    
});























// test.('user login', async ({ page, Actions, Click }) => {

//     await page.goto('https://onexweb-uat.officenational.co.za/');
//     await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
//     await Actions.enterText("password", "Testing@1212");
//     await Click.Btn("login");
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Actions.enterText("searchmenu", "Suppliers")
//     await Click.tabs("SuppliersTab")
//     await Click.icon("FilterDropDown")
//     await Actions.enterText("nameFilter", "Sofiya")

// });

// test('Add New Brand ', async ({ Actions, Click, Verify, page }) => {

//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("BrandsTab")
//     await Click.link("NewBrand")
//     await page.pause();
//     await Actions.enterText("enterBrandName","TestingBrand1");
//     await Click.Btn("BrandDropBox");
//     await Actions.uploadFile("//div[text()='Drop files here to upload logo']","NewBrand");
// })




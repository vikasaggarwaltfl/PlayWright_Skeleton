
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'


// Login ------------------------------------------------------------------------------------------------------------------------------

test.beforeEach('User login', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("login");
});

// Brand Screen ------------------------------------------------------------------------------------------------------------------------

test('Add New Brand ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("BrandsTab")
    await Click.link("AddnewBrand")
    await Actions.enterText("enterBrandName", "TestBrand4");
    await Click.Btn("SavenewBrand");
});

test('Edit Brand Details', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("BrandsTab")
    await Click.icon("clickBrandActionsIcon")
    await Click.Btn("clickBrandEditIcon")
    await Actions.enterText("enterEditBrandPrefix", "ABB");
    await Click.Btn("SaveEditedBrandBtn")
});

test('Open Brand Details ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("BrandsTab")
    await Click.link("clickBrandNameLink")
});

test('Sort Brand Records ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("BrandsTab")
    await Click.icon("clickSortBrandIcon")
});

test('Filter Brand Records ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("BrandsTab")
    await Click.Btn("clickFilterBrandBtn")
    await Actions.enterText("enterfilterBrandName", "ABSTO");
});

// Group Setting Screen ---------------------------------------------------------------------------------------------------------------

test('Open Group Settings ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
});

test('Open Lookup Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
    await Click.link("LookupCatLink")
});

test('Open Master Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
    await Click.link("MasterCatLink")
});

test('Open IQ Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
    await Click.link("IQCatLink")
});

test('Open Pastel Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
    await Click.link("PastelCatLink")
});

test('Open Audit log ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
    await Click.link("AuditLogLink")
});

test('Open config codes ', async ({ Actions, Click, Verify, page }) => {
    await Click.tabs("GroupSettingsTab")
    await Click.link("ConfigCodesLink")
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





import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'


// Login ------------------------------------------------------------------------------------------------------------------------------

test.beforeEach('User login', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
});



// Supplier---------------------------------------------------------------------------------------------------------------------------

// test('Verify Supplier Records filtered by Suppliername', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("Suppliers");
//     await Click.Icon("filterArrow");
//     await Actions.enterText("supplierName", "Artistic");
//     await Verify.IsTextDisplayed("checkSupplier", "Artistic");
//     await page.pause();
// });


// Brand Screen ----------------------------------------------------------------------------------------------------------------------
test('Verify that new brand is added successfully', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Link("addBrand")
    await Actions.enterText("brandName", "Test53");
    await Click.Btn("Save");
    await page.waitForTimeout(3000);
    await Click.Tab("Brands");
    await Click.Icon("filterArrow");
    await Actions.enterText("brandName", "Test53");
    await Verify.IsTextDisplayed("newBrand", "Test53");
    
});

test('User should not able to add brand with invalid data', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Link("AddBrand")
    await Actions.enterText("BrandName", "Test30");
    await Click.Btn("Save");
    //await Verify.IsErrorPopUp('Saving Failed')
});

test('Edit Brand Details', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Icon("BrandActions")
    await Click.Btn("EditBrand")
    await Actions.enterText("BrandPrefix", "ABB");
    await Click.Btn("Save")
    await Click.Btn("BrandInfo")
    //await Verify.IsTextDisplayed("editedPrefix");
    //await page.pause()
});

test('Open Brand Details ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Link("OpenBrandDetails")
    await expect(page).toHaveURL('https://onexweb-uat.officenational.co.za/table/brand/6')
    await page.pause()
});

test('Sort Brand Records ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Icon("SortBrand")
    await Click.Icon("SortBrand")
    await Click.Icon("SortBrand")
    ///await page.pause()
});

test('Filter Brand Records and Verify Result ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Btn("filterArrow");
    await Actions.enterText("brandName", "Test36");
    await Verify.IsTextDisplayed("newBrand", "Test36");
    await page.pause()
});

// Product Screen---------------------------------------------------------------------------------------------------------------------
test.only('Filter Product Records and Verify Result ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Products");
    await Click.Icon("filterArrow");
    await Click.Icon("supplier");
    await Click.dropdownOption("artistic");
    await Click.Btn("Filter");
    await page.waitForTimeout(5000);
    expect(await Verify.verifyData("Artistic")).toBe(4);
    await page.pause()
});

// Group Setting Screen ---------------------------------------------------------------------------------------------------------------

test('Open Group Settings ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
});

test('Open Lookup Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
    await Click.Link("LookupCategory")
});

test('Open Master Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
    await Click.Link("MasterCategory")
});

test('Open IQ Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
    await Click.Link("IQCategory")
});

test('Open Pastel Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
    await Click.Link("PastelCategory")
});

test('Open Audit log ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
    await Click.Link("AuditLog")
    //await page.pause()
});

test('Open config codes ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("GroupSettings")
    await Click.Link("ConfigCodes")
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




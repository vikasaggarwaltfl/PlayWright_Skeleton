
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

// Brand Screen ----------------------------------------------------------------------------------------------------------------------

test('Verify Adding Brand with Valid Data and Verifying Record Presence in Grid', async ({ Actions, Click, Verify, page }) => {

    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Test55");
    await Click.Btn("Save");
    await page.waitForTimeout(3000);
    await Click.Tab("Brands");
    await Click.Icon("filterArrow");
    await Actions.enterText("brandName", "Test55");
    await Verify.IsTextDisplayed("newBrand", "Test55");
});

test.only('Adding brand with invalid data and Verify Error message', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Link("addBrand")
    await Actions.enterText("brandName", "Test30");
    await Click.Btn("Save");
    await page.waitForTimeout(3000);
    await Verify.verifyErrorMessage('Brand Name is a required field');
    await page.pause();
    
});

test('Editing Brand Details', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Icon("kebabMenu")
    await Click.Icon("Edit")
    await Actions.enterText("brandPrefix", "ABBB");
    await Click.Btn("Save")
    await Click.Btn("BrandInfo")
    //await page.pause()
    
});

test('Open BrandInfo and Verify URL', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Link("brandInfo")
    await page.waitForTimeout(5000);
    await Verify.verifyURL('https://onexweb-uat.officenational.co.za/table/brand/6');
    //await page.pause()
});

test('Sort Brand Records ', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    const clickCount = 3;
    for (let i = 0; i < clickCount; i++) {
        await Click.Icon("Sort");
        await Verify.verifySortOrder();
        console.log(`Click #${i + 1}`);
      }
    await page.pause()
});

test('Filter Brand Records and Verify Result', async ({ Actions, Click, Verify, page }) => {
    await Click.Tab("Brands")
    await Click.Btn("filterArrow");
    await Actions.enterText("brandName", "Test36");
    await Verify.IsTextDisplayed("newBrand", "Test36");
    //await page.pause()
});


test('Filter Product Records and Verify Record Count', async ({ Actions, Click, Verify, page }) => {
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




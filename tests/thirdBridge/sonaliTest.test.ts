

import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'


// Login ----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user logged in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Verify.IsTextDisplayed("My OfficeNational");
    await Verify.IsTextDisplayed("Products");
    await Verify.IsTextDisplayed("ONA Super Admin");
});

// Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify user can navigate to the "Brand" screen and verify screen displayed correctly', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await page.waitForTimeout(3000);
    await Verify.verifyURL("https://onexweb-uat.officenational.co.za/table/brand_view");
    await Verify.IsTextDisplayed("Add Brand");
});

test('Verify that the user can apply a filter and check the presence of records in the data grid.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("filterArrow");
    await Actions.enterText("brandName", "Test37");
    await Verify.IsTextDisplayed("Test37");
});

test('Verify user can Sort Brand records and verify sort order  of records.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("Sort");
    await Verify.verifySortOrder();
    await Click.Icon("Sort");
    await Verify.verifySortOrder();
    await Click.Icon("Sort");
    await Verify.verifySortOrder();
});

test('Verify user can navigate to Brand Information and verify its correct display', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("brandInfo");
    await page.waitForTimeout(5000);
    await Verify.verifyURL('https://onexweb-uat.officenational.co.za/table/brand/6');
    await Verify.IsTextDisplayed('Brand: ABSTO')
});

test('Verify user can  Add Brand with "valid data" and verify Success message', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Test");
    await Click.Btn("Save");
    await Verify.IsTextDisplayed('Saved Successfully');
    await page.pause();
});

test('Verify user cannot Add Brand with "invalid data" and verify error message', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "     ");
    await Click.Btn("Save");
    await Verify.verifyErrorMessage('Brand Name is a required field');
    await Verify.IsTextDisplayed('Validation failed')
});

test('Verify that the user can edit and save the details of an existing brand', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("kebabMenu");
    await Click.Icon("Edit");
    await Actions.enterText("brandPrefix","A2");
    await Click.Btn("Save");
    await Verify.IsTextDisplayed('Brands saved!')
    ///await page.pause();
});


test('Verify user can upload brand logo and verify success message', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
    const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, filePath);
    await Verify.IsTextDisplayed("File successfully uploaded!");
});

test('Verify user can download uploaded brand logo file ', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
    const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, filePath);
    //await Verify.IsTextDisplayed("File successfully uploaded!");
    await page.waitForTimeout(3000);
    await Click.Icon("download")
    await page.waitForTimeout(3000);
});

test('Verify user can remove uploaded brand logo file ', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
    const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, filePath);
    //await Verify.IsTextDisplayed("File successfully uploaded!");
    await page.waitForTimeout(3000);
    await Click.Icon("remove");
    await Verify.IsTextDisplayed("Drop files here to upload logo")
});







//Group Setting Screen ---------------------------------------------------------------------------------------------------------------

// test('Open Group Settings ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
// });

// test('Open Lookup Category Setup ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
//     await Click.Link("LookupCategory")
// });

// test('Open Master Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
//     await Click.Link("MasterCategory")
// });

// test('Open IQ Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
//     await Click.Link("IQCategory")
// });

// test('Open Pastel Product Category Setup ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
//     await Click.Link("PastelCategory")
// });

// test('Open Audit log ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
//     await Click.Link("AuditLog")
// });

// test('Open config codes ', async ({ Actions, Click, Verify, page }) => {
//     await Click.Tab("GroupSettings")
//     await Click.Link("ConfigCodes")
// });














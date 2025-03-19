
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'


// Login ----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user is able to login with valid credentials', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Verify.IsTextDisplayed("My OfficeNational");
    await Verify.IsTextDisplayed("Products");
    await Verify.IsTextDisplayed("ONA Super Admin");
});

// Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify user can navigate to the "Brand" screen and it loaded correctly.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    //await Verify.IsTextDisplayed("topHeading", "Brands");
    await Verify.IsTextDisplayed("Brands");
});

test('Verify user can  Add Brand with "valid data" and verify record presence in grid', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Test63");
    await Click.Btn("Save");
    //await page.waitForTimeout(10000);
    await Click.Tab("Brands");
    await Click.Icon("filterArrow");
    await Actions.enterText("brandName", "Test63");
    //await Verify.IsTextDisplayed("newBrand", "Test63");
    await Verify.IsTextDisplayed("Test63");
});

test('Verify user cannot Add Brand with "invalid data" and verify error message', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "     ");
    await Click.Btn("Save");
    await Verify.verifyErrorMessage('Brand Name is a required field');
});

test('Verify user can Filter Brand records and verify result', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("filterArrow");
    await Actions.enterText("brandName", "Test37");
    await Verify.IsTextDisplayed("Test37");
});

test('Verify user can Sort Brand records and verify sort order', async ({ Actions, Click, Verify, page }) => {
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

test('Verify user can Open Brand Information and verify url.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("brandInfo");
    await page.waitForTimeout(5000);
    await Verify.verifyURL('https://onexweb-uat.officenational.co.za/table/brand/6');
});

test('Verify that the user can edit and save the details of an existing brand', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("kebabMenu");
    await Click.Icon("Edit");
    //await page.waitForTimeout(5000);
    await Actions.enterText("brandPrefix", "ABBBBB");
    await Click.Btn("Save");
    await Click.Btn("BrandInfo");
});

test.only('Verify user should upload brand logo and verify success message', async ({ Actions, Click, Verify, page}) => {
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


test.only('Verify user should download and remove brand logo ', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
    const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, filePath);
    await Verify.IsTextDisplayed("File successfully uploaded!");
    await page.waitForTimeout(3000);
    await Click.Icon("download")
    await page.waitForTimeout(3000);
    await Click.Icon("remove");
    await page.pause();
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














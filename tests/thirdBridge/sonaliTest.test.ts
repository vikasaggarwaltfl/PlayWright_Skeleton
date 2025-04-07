

import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'
import { Paths } from '@pages/files/paths'


// Login ----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user can Add new Brand', async ({ page, Actions, Click, Verify }) => {
   
    await page.goto('https://onexweb-uat.officenational.co.za/')
    await Actions.enterText('email', 'jeigemmabrije-7589@yopmail.com')
    await Actions.enterText('password', 'Testing@1212')
    await Click.Btn('sign_In')

    // Navigate to Brands section (assuming it's in Group Settings)
    await Click.tabs('GroupSettingsTab') 

    await Actions.enterText('searchmenu', 'Brands')
    
    // Click on Add Brand button
    await Click.Btn('addBrandBtn')
    
    // Fill in brand details
    const brandName = `Test Brand ${Date.now()}`  // Using timestamp to ensure unique name //incorrect
    await Actions.enterText('brandName', brandName)
    await Actions.enterText('brandDescription', 'This is a test brand description') // incorrect
    
    // Upload brand logo if required
    // await Actions.uploadFile('brandLogo', 'path/to/logo.png')
    
    // Save the brand
    await Click.Btn('saveBrand')
    
    // Verify brand was created successfully
    await Verify.successMessage('Brand created successfully')
    
    // Verify brand appears in the list
    await Actions.enterText('searchBrand', brandName)

    await Verify.elementVisible(brandName)
    
    // Clean up - optional: delete the created brand
    // await Click.icon('deleteIcon')
    // await Click.Btn('confirmDelete')
    // Logout
    await Click.Btn('ProfileBtn')
    await Click.Btn('SignoutBtn')
});


// // Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------

// test('Verify user can navigate to the "Brand" screen and verify screen displayed correctly', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await page.waitForTimeout(3000);
//     await Verify.verifyURL("https://onexweb-uat.officenational.co.za/table/brand_view");
//     await Verify.IsTextDisplayed("Add Brand");
// });

// test('Verify that the user can apply a filter and check the presence of records in the data grid.', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Icon("filterArrow");
//     await Actions.enterText("brandName", "Test37");
//     await Verify.IsTextDisplayed("Test37");
// });

// test('Verify user can Sort Brand records and verify sort order  of records.', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Icon("Sort");
//     await Verify.verifySortOrder();
//     await Click.Icon("Sort");
//     await Verify.verifySortOrder();
//     await Click.Icon("Sort");
//     await Verify.verifySortOrder();
// });

// test('Verify user can navigate to Brand Information and verify its correct display', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("brandInfo");
//     await page.waitForTimeout(5000);
//     await Verify.verifyURL('https://onexweb-uat.officenational.co.za/table/brand/6');
//     await Verify.IsTextDisplayed('Brand: ABSTO')
// });

// test('Verify user can  Add Brand with "valid data" and verify Success message', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Test123");
//     await Click.Btn("Save");
//     //await page.waitForTimeout(4000)
//     await Verify.IsTextDisplayed('Saved Successfully');
    
// });

// test('Verify user cannot Add Brand with "invalid data" and verify error message', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "     ");
//     await Click.Btn("Save");
//     await Verify.verifyErrorMessage('Brand Name is a required field');
//     await Verify.IsTextDisplayed('Validation failed')
// });

// test('Verify that the user can edit and save the details of an existing brand', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Icon("kebabMenu");
//     await Click.Icon("Edit");
//     await Actions.enterText("brandPrefix","A2");
//     await Click.Btn("Save");
//     await Verify.IsTextDisplayed('Brands saved!')
//     ///await page.pause();
// });


// test('Verify user can upload brand logo and verify success message', async ({ Actions, Click, Verify, page}) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Tanishq");
//     const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
//     const filePath: string = './tests/thirdBridge/testsamples/logo.png';
//     await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
//     //await Actions.uploadFile(page, uploadAreaSelector, filePath);
//     await Verify.IsTextDisplayed("File successfully uploaded!");
// });

// test('Verify user can download uploaded brand logo file ', async ({ Actions, Click, Verify, page}) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Tanishq");
//     const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
//     const filePath: string = './tests/thirdBridge/testsamples/logo.png';
//     await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
//     //await Actions.uploadFile(page, uploadAreaSelector, filePath);
//     //await Verify.IsTextDisplayed("File successfully uploaded!");
//     await page.waitForTimeout(3000);
//     await Click.Icon("download")
//     await page.waitForTimeout(3000);
// });

// test('Verify user can remove uploaded brand logo file ', async ({ Actions, Click, Verify, page}) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Tanishq");
//     const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
//     const filePath: string = './tests/thirdBridge/testsamples/logo.png';
//     await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
//     //await Actions.uploadFile(page, uploadAreaSelector, filePath);
//     //await Verify.IsTextDisplayed("File successfully uploaded!");
//     await page.waitForTimeout(3000);
//     await Click.Icon("remove");
//     await Verify.IsTextDisplayed("Drop files here to upload logo")
// });

// test('Verify refresh data grid and verify loading icon visibility ', async ({ Actions, Click, Verify, page}) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Btn("Refresh");
//     await page.waitForTimeout(3000);
//     await Verify.isLoadingVisible(page);
// });

// test.only('Verify user signout successfully ', async ({ Actions, Click, Verify, page}) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Verify.IsTextDisplayed("Dashboard")
//     await Click.Btn("Profile");
//     await Click.Btn("signOut")
//     await Verify.IsTextDisplayed("Sign in")
//     //await page.waitForURL(loginPageUrl);
    
// });



// test.only('Verify that the user can navigate through pagination', async ({ Actions, Click, Verify, page}) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.clickOnPageNumber(page, 2);
//     await Verify.verifyPageNumber(page, 2);
//     await Click.clickNext(page);
//     await Verify.verifyPageNumber(page, 3);
//     await Click.clickDoubleNext(page);
//     await Verify.verifyPageNumber(page, 4);
//     await Click.clickPrevious(page);
//     await Verify.verifyPageNumber(page, 3);
//     await Click.clickDoublePrevious(page);
//     await Verify.verifyPageNumber(page, 2);

// });











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














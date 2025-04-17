import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'
import { Paths } from '@pages/files/paths'






   
// Login ----------------------------------------------------------------------------------------------------------------------------------------------------------

// test('Verify that user is able to login with valid credentials', async ({ page, Actions, Click, Verify }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Verify.IsTextDisplayed("My OfficeNational");
//     await Verify.IsTextDisplayed("Products");
//     await Verify.IsTextDisplayed("ONA Super Admin");
// });

// Dashboard------------------------------------------------------------------------------------------------------------------------------
test.only('Verify dashboard data updates after supplier selection', async ({ page, Actions, Click, Verify }) => {
    
        await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Dashboard");
        await page.waitForLoadState('networkidle');
        const supplierName = 'Artistic';
        const isDataValid = await Verify.verifyDashboardData(supplierName);
        expect(isDataValid).toBeTruthy();
        await page.pause();
});
    

    //     const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
    //     expect(supplierSelected).toBe(true);
    //     await page.waitForTimeout(5000);
    //     await Click.Btn("exportDataButton");
    //     const downloadStarted = await Verify.verifyExportData(180000);
    //     await expect(downloadStarted).toBe(true);
    

// /// Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------

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
//     await Actions.enterText("brandName", "Test38");
//     await Verify.IsTextDisplayed("Test38");
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
// test('Verify user can  Add Brand with "valid data" and verify Success message', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Test135");
//     await Click.Btn("Save");
//     // await page.waitForTimeout(5000);
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
//     await Actions.enterText("brandPrefix", "A2");
//     await Click.Btn("Save");
//     await Verify.IsTextDisplayed('Brands saved!')
// });


// test('Verify user can upload brand logo and verify success message', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Tanishq");
//     const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';
//     const filePath: string = './tests/thirdBridge/testsamples/logo.png';
//     await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
//     await Verify.IsTextDisplayed("File successfully uploaded!");
// });

// test('Verify user can download uploaded brand logo file ', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Tanishq");
//     const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';
//     const filePath: string = './tests/thirdBridge/testsamples/logo.png';
//     await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
//     await page.waitForTimeout(3000);
//     await Click.Icon("download")
//     await page.waitForTimeout(3000);
// });

// test('Verify user can remove uploaded brand logo file ', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Link("addBrand");
//     await Actions.enterText("brandName", "Tanishq");
//     const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';
//     const filePath: string = './tests/thirdBridge/testsamples/logo.png';
//     await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
//     await page.waitForTimeout(3000);
//     await Click.Icon("remove");
//     await Verify.IsTextDisplayed("Drop files here to upload logo")
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

// test('Verify refresh data grid and verify loading icon visibility ', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Brands");
//     await Click.Btn("Refresh");
//     await page.waitForTimeout(3000);
//     await Verify.isLoadingVisible(page);
// });

//  Export Screen ------------------------------------------------------------------------------------------------------------------------------------

// test('Verify Export Product screen displayed correctly', async ({ page, Actions, Click, Verify }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Exports");
//     await Click.Tab("exportProducts");
//     await Verify.IsTextDisplayed(" All Products Export");
// });

// test.setTimeout(120000); 
// test('export all products', async ({ page, Actions, Click, Verify }) => {
//     console.log('Starting Product export test...');
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Exports");
//     await Click.Tab("exportProducts");
//     await page.waitForLoadState('networkidle');
//     const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
//     expect(supplierSelected).toBe(true);
//     await page.waitForTimeout(5000);
//     await Click.Btn("exportDataButton");
//     const downloadStarted = await Verify.verifyExportData(180000);
//     await expect(downloadStarted).toBe(true);
// });

// test.setTimeout(120000); 
// test('Select multiple filters for exportand clear filters', async ({ page, Actions, Click, Verify }) => {
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Exports");
//     await Click.Tab("exportProducts");
//     await page.waitForLoadState('networkidle');
//     const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
//     expect(supplierSelected).toBe(true);
//     const productStatusSelected = await Click.selectDropdownOption(Click.productStatusDropdown, 'IN', 18000);
//     expect(productStatusSelected).toBe(true);
//     const brandSelected = await Click.selectDropdownOption(Click.brandDropdown, 'ABSTO', 18000);
//     expect(brandSelected).toBe(true);
//     await page.waitForTimeout(5000);
//     await Click.clickClearFiltersButton();
//     console.log('Selected filteres cleared successfully...');
// });

// test.setTimeout(120000);
// test('export product prices', async ({ page, Actions, Click, Verify }) => {
//     console.log('Starting product price export test...');
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Exports");
//     await Click.Tab("exportProductPrices");
//     await page.waitForLoadState('networkidle');
//     const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
//     expect(supplierSelected).toBe(true);
//     await page.waitForTimeout(5000);
//     await Click.Btn("exportDataButton");
//     const downloadStarted = await Verify.verifyExportData(180000); 
//     await expect(downloadStarted).toBe(true);
// });

// test.setTimeout(120000);
// test('export IQ products', async ({ page, Actions, Click, Verify }) => {
//     console.log('Starting IQ product export test...');
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Exports");
//     await Click.Tab("exportIQProducts");
//     await page.waitForLoadState('networkidle');
//     const statusSelected = await Click.selectDropdownOption(Click.statusesDropdown,'IM',18000);
//     expect(statusSelected).toBe(true);
//     await page.waitForTimeout(5000);
//     await Click.Btn("exportDataButton");
//     const downloadStarted = await Verify.verifyExportData(180000);
//     await expect(downloadStarted).toBe(true);
//     await page.pause();

// });

// test.setTimeout(120000);
// test('export all Pastel products', async ({ page, Actions, Click, Verify }) => {
//     console.log('Starting Pastel product export test...');
//     await Actions.signIn();
//     await Click.Btn("sign_In");
//     await Click.Tab("Exports");
//     await Click.Tab("exportPastelProducts");
//     await page.waitForLoadState('networkidle');
//     const statusSelected = await Click.selectDropdownOption(Click.statusesDropdown,'IM',18000);
//     expect(statusSelected).toBe(true);
//     await Click.Btn("exportDataButton");
//     const downloadStarted = await Verify.verifyExportData(3000000);
//     await expect(downloadStarted).toBe(true);
//     await page.pause();
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














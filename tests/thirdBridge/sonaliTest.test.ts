import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'
import { Paths } from '@pages/files/paths'


// Login ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user is able to login with valid credentials', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Verify.IsTextDisplayed("My OfficeNational");
  await Verify.IsTextDisplayed("Products");
  await Verify.IsTextDisplayed("ONA Super Admin");
});

// Dashboard ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify user can navigate to the "Dashboard" screen and verify screen displayed correctly', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Dashboard");
  await page.waitForTimeout(3000);
  await Verify.IsTextDisplayed("My OfficeNational");
});

test('Verify user can fetch and print updated dashboard data analytics', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Dashboard");
  await page.waitForLoadState('networkidle');
  const supplierName = 'Artistic';
  const isDataValid = await Verify.verifyDashboardDataAnalystics(supplierName);
  expect(isDataValid).toBeTruthy();
});

// Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
  await Actions.enterText("brandName", "Test38");
  await Verify.IsTextDisplayed("Test38");
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

test('Verify user can  Add Brand with "valid data" and verify Success message', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Brands");
  await Click.Link("addBrand");
  await Actions.enterText("brandName", "Test700");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed('Saved Successfully');
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
  await Actions.enterText("brandPrefix", "A2");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed('Brands saved!')
});

test('Verify user can upload brand logo and verify success message', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Brands");
  await Click.Link("addBrand");
  await Actions.enterText("brandName", "Tanishq");
  const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';
  const filePath: string = './tests/thirdBridge/testsamples/logo.png';
  await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
  await Verify.IsTextDisplayed("File successfully uploaded!");
});

test('Verify user can download uploaded brand logo file ', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Brands");
  await Click.Link("addBrand");
  await Actions.enterText("brandName", "Tanishq");
  const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';
  const filePath: string = './tests/thirdBridge/testsamples/logo.png';
  await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
  await page.waitForTimeout(3000);
  await Click.Icon("download")
  await page.waitForTimeout(3000);
});

test('Verify user can remove uploaded brand logo file ', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Brands");
  await Click.Link("addBrand");
  await Actions.enterText("brandName", "Tanishq");
  const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';
  const filePath: string = './tests/thirdBridge/testsamples/logo.png';
  await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
  await page.waitForTimeout(3000);
  await Click.Icon("remove");
  await Verify.IsTextDisplayed("Drop files here to upload logo")
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

test('Verify refresh data grid and verify loading icon visibility ', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Brands");
  await Click.Btn("Refresh");
  await page.waitForTimeout(3000);
  await Verify.isLoadingVisible(page);
});

//Export Screen--------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify Export Product screen displayed correctly', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Exports");
  await Click.Tab("exportProducts");
  await Verify.IsTextDisplayed(" All Products Export");
});

test('Verify user can export data from all screens sequentially without applying filter', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  // Export Products
  await Click.Tab("Exports");
  await Click.Tab("exportProducts");
  await Click.Btn("exportDataButton");
  const downloadStarted1 = await Verify.verifyExportData(180000);
  expect(downloadStarted1).toBe(true);
  // Export Product Prices
  await Click.Tab("exportProductPrices");
  await Click.Btn("exportDataButton");
  const downloadStarted2 = await Verify.verifyExportData(180000);
  expect(downloadStarted2).toBe(true);
  // Export IQ Products
  await Click.Tab("exportIQProducts");
  await Click.Btn("exportDataButton");
  const downloadStarted3 = await Verify.verifyExportData(5000000);
  expect(downloadStarted3).toBe(true);
  // Export Pastel Products
  await Click.Tab("exportPastelProducts");
  await Click.Btn("exportDataButton");
  const downloadStarted4 = await Verify.verifyExportData(5000000);
  expect(downloadStarted4).toBe(true);
});

test.setTimeout(120000);
test('Verify that user can export filtered products and Verify downloaded file', async ({ page, Actions, Click, Verify }) => {
  console.log('Starting Product export test...');
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Exports");
  await Click.Tab("exportProducts");
  await page.waitForLoadState('networkidle');
  const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
  expect(supplierSelected).toBe(true);
  await page.waitForTimeout(5000);
  await Click.Btn("exportDataButton");
  const downloadStarted = await Verify.verifyExportData(180000);
  await expect(downloadStarted).toBe(true);
});

test.setTimeout(120000);
test('Verify user can select multiple filters for export and clear filters', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Exports");
  await Click.Tab("exportProducts");
  await page.waitForLoadState('networkidle');
  const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
  expect(supplierSelected).toBe(true);
  const productStatusSelected = await Click.selectDropdownOption(Click.productStatusDropdown, 'IN', 18000);
  expect(productStatusSelected).toBe(true);
  const brandSelected = await Click.selectDropdownOption(Click.brandDropdown, 'ABSTO', 18000);
  expect(brandSelected).toBe(true);
  await page.waitForTimeout(5000);
  await Click.Btn("clearFiltersButton");
  console.log('Selected filteres cleared successfully...');
});

test.setTimeout(120000);
test('Verify that user can export filtered product prices and Verify downloaded file', async ({ page, Actions, Click, Verify }) => {
  console.log('Starting product price export test...');
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Exports");
  await Click.Tab("exportProductPrices");
  await page.waitForLoadState('networkidle');
  const supplierSelected = await Click.selectDropdownOption(Click.supplierDropdown, 'Artistic', 18000);
  expect(supplierSelected).toBe(true);
  await page.waitForTimeout(5000);
  await Click.Btn("exportDataButton");
  const downloadStarted = await Verify.verifyExportData(180000);
  await expect(downloadStarted).toBe(true);
});

test.setTimeout(120000);
test('Verify that user can export filtered IQ products and verify downloaded file', async ({ page, Actions, Click, Verify }) => {
  console.log('Starting IQ product export test...');
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Exports");
  await Click.Tab("exportIQProducts");
  await page.waitForLoadState('networkidle');
  const statusSelected = await Click.selectDropdownOption(Click.statusesDropdown, 'IM', 18000);
  expect(statusSelected).toBe(true);
  await page.waitForTimeout(5000);
  await Click.Btn("exportDataButton");
  const downloadStarted = await Verify.verifyExportData(5000000);
  await expect(downloadStarted).toBe(true);
});

test.setTimeout(120000);
test('Verify that user can export filtered Pastel products and verify downloaded file', async ({ page, Actions, Click, Verify }) => {
  console.log('Starting Pastel product export test...');
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Exports");
  await Click.Tab("exportPastelProducts");
  await page.waitForLoadState('networkidle');
  const statusSelected = await Click.selectDropdownOption(Click.statusesDropdown, 'IM', 18000);
  expect(statusSelected).toBe(true);
  await Click.Btn("exportDataButton");
  const downloadStarted = await Verify.verifyExportData(5000000);
  await expect(downloadStarted).toBe(true);
});

test('Verify user can export data of perticuler screen one by one', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  // Export Brands
  await Click.Tab("Brands");
  await Click.Btn("screenDataExportBtn");
  const brandDownloadStarted = await Verify.verifyExportData(180000);
  expect(brandDownloadStarted).toBe(true);
  // Export Products
  await Click.Tab("Products");
  await Click.Btn("screenDataExportBtn");
  const productDownloadStarted = await Verify.verifyExportData(180000);
  expect(productDownloadStarted).toBe(true);
  // Export Promotions
  await Click.Tab("Promotions");
  await Click.Btn("screenDataExportBtn");
  const PromotionsDownloadStarted = await Verify.verifyExportData(180000);
  expect(productDownloadStarted).toBe(true);
});

























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

// Products Screen------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that by clicking on a Product,that Product screen is visible correctly.', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.setProductName("Absto007");
  await Click.Link("productInfo");
  await Verify.IsTextDisplayed("Product: Absto007");
});

test('Verify that the user is able to sort the products', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("Sort");
  await Verify.verifySortOrder();
  await Click.Icon("Sort");
  await Verify.verifySortOrder();
});

test('Verify that by selecting Filter, the filtered screen is displayed as expected', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await page.waitForLoadState("domcontentloaded");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Click.Icon("selectBrand");
  await Click.dropdownOption("absto");
  await Click.Btn("Filter");
  await page.waitForTimeout(5000);
  expect(await Verify.verifyData("Artistic")).toBe(5);
});

test('Verify that by clicking on the reset button, the filter button is disabled', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Reset");
  await Click.Icon("filterArrow");
  await Verify.verifyDisabledButton("Filter");
});

test('Verify that the user is able to edit the product entering valid data', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto009");
  await Click.Btn("Filter");
  await Click.setProductName("Absto003");
  await Click.Link("productInfo");
  await Click.Icon("Edit");
  await Actions.enterText("productCatalogueTitle", "Testing0044");
  await Click.Btn("Save");
  await page.waitForTimeout(2000)
  await Verify.IsTextDisplayed("Products saved!");
});

//Product Media screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify if user can successfully upload image in Product Media', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productMedia");
  await page.waitForTimeout(5000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.setProductName("Absto007")
  await Click.Link("productInfo");
  await page.waitForLoadState("networkidle");
  await Click.Btn("uploadImage");
  await Actions.ImageUpload(page, "ProductMedia");
  await page.waitForLoadState("networkidle");
  await Click.Btn("submit");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await Verify.verifyImageUpload(page);
});

test('Verify if the user can view an uploaded file in Product Media', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productMedia");
  await page.waitForTimeout(4000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.setProductName("Absto007")
  await Click.Link("productInfo");
  await page.waitForLoadState("networkidle");
  await Click.Btn("view");
  await page.waitForLoadState("networkidle");
  await Verify.verifyTitle(page, "OneX");
  await page.waitForLoadState("networkidle");
});

test('Verify if the user can delete the uploaded file in Product Media', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productMedia");
  await page.waitForTimeout(5000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.setProductName("Absto007")
  await Click.Link("productInfo");
  await page.waitForTimeout(5000);
  await Click.Icon("Edit");
  await page.waitForTimeout(4000);
  await Click.Btn("delete");
  await page.waitForTimeout(3000);
  await Click.Btn("subDelete");
  await Verify.IsTextDisplayed("Upload Brochure");
});

test('Verify that the user cannot upload invalid file in the Product Media', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productMedia");
  await page.waitForTimeout(5000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.setProductName("Absto007")
  await Click.Link("productInfo");
  await page.waitForLoadState("networkidle");
  await Click.Btn("uploadImage");
  await Actions.ImageUpload(page, "SamplePDF");
  await page.waitForLoadState("networkidle");
  await Click.Btn("submit");
  await Verify.IsTextDisplayed("Could not add image");
});

test('Verify that the uploaded video is streaming on Cloudflarestream.com', async ({ Actions, Click, Verify, page, context }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productMedia");
  await page.waitForTimeout(5000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto002");
  await Click.Btn("Filter");
  await Click.setProductName("Absto002");
  await Click.Link("productInfo");
  await Click.Link("videoLink");
  await Verify.verifyWindowHandling(page, "View", "cloudflarestream.com");
});

//Product WIP Screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user is able to add a note in a popup window', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productWIP");
  await page.waitForTimeout(3000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "J202500b");
  await Click.Btn("Filter");
  await page.waitForTimeout(2000);
  await Click.Icon("notes");
  await page.waitForLoadState("networkidle");
  await Actions.enterText("productWIPnotes", "good morning");
  await page.waitForLoadState("networkidle");
  await Click.Btn("addNote");
  await page.waitForTimeout(2000);
  await Verify.verifyScreenshot(page, "notesPopupWindow.png");
});

test('Verify the error message,when the user enters "invalid value" while adding Product WIP', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productWIP");
  await Click.Btn("addProductsWIP");
  await page.waitForLoadState("networkidle");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Save");
  await page.waitForLoadState("networkidle");
  await Verify.verifyErrorMessage("Supplier is a required field");
});

test('Verify if the pagination of the table is working as expected', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productWIP");
  await Verify.verifyPagination(page);
});


//Product Price WIP Screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test.setTimeout(120000);
test('Verify if user can reject a product and the ARM status changes to reject', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("onCode", "3M11175");
  await Click.Btn("Filter");
  await Click.Icon("productKebabMenu");
  await Click.Btn("copyToWip");
  await Click.Tab("productPriceWIP");
  await page.waitForTimeout(3000);
  await Click.Icon("filterArrow");
  await Actions.enterText("onCode", "3M11175");
  await Click.Btn("Filter");
  await page.waitForTimeout(3000);
  await Click.Icon("productKebabMenu");
  await Click.Btn("reject");
  await Verify.IsTextDisplayed("Rejected Successfully");
});

test.setTimeout(120000);
test('Verify if a user can accept the product', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("onCode", "Absto006");
  await Click.Btn("Filter");
  await Click.Icon("productKebabMenu");
  await Click.Btn("copyToWip");
  await Click.Tab("productPriceWIP");
  await page.waitForTimeout(3000);
  await Click.Icon("filterArrow");
  await Actions.enterText("onCode", "Absto006");
  await Click.Btn("Filter");
  await page.waitForTimeout(3000);
  await Click.Icon("productKebabMenu");
  await Click.Btn("accept");
  await Verify.IsTextDisplayed("Accepted Successfully");
});

//Product Admin Screen--------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user is able to check a checkbox', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productAdmin");
  await page.waitForTimeout(3000);
  await Click.Icon("productAdminFilterArrow");
  await Actions.enterText("productName", "Absto001");
  await page.waitForTimeout(3000);
  await Click.Btn("Filter");
  await page.waitForTimeout(3000);
  await Verify.verifyCheckbox(page, "Absto001");
});

test('Verify that the user is able to perform bulk operations', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productAdmin");
  await Click.Icon("productAdminFilterArrow");
  await Actions.enterText("productName", "Absto001");
  await Click.Btn("Filter");
  await Verify.verifyCheckbox(page, "Absto001");
  await Click.Icon("bulkOperationsArrow");
  await Click.Icon("productAdminDropdown");
  await Click.dropdownOption("Tags");
  await Click.Btn("submitBulkProducts");
  await Click.Btn("yes");
  await Verify.verifyDisabledButton("Submit Bulk Products Processing");
});

//Products barcode Screen---------------------------------------------------------------------------------------------------------------------------------------------------------- 

test('Verify that the user is able to add new barcode giving valid data', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto002");
  await Click.Btn("Filter");
  await Click.setProductName("Absto002");
  await Click.Link("productInfo");
  await Click.Btn("Barcodes");
  await Click.Btn("Add");
  await Actions.enterText("barcodeInput", "1238");
  await Click.Icon("productsDropdown");
  await Click.dropdownOption("buyUnit");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed("Record Saved Successfully");
});

// related products screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user cannot add Related Product with invalid input data', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto001");
  await Click.Btn("Filter");
  await Click.setProductName("Absto001");
  await Click.Link("productInfo");
  await Click.Btn("relatedProducts");
  await Click.Btn("Add")
  await Click.Icon("relatedOncodeDropdown");
  await Click.dropdownOption("onCode");
  await Click.Btn("Save");
  await Verify.verifyErrorMessage("Relationship is a required field");
});

//product Audit screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the "Refresh" button refreshes the data', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto004");
  await Click.Btn("Filter");
  await Click.setProductName("Absto004");
  await Click.Link("productInfo");
  await Click.Tab("productAudit");
  await Click.Btn("refresh");
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

// Group settings (Lookup Category Setup Screen)-----------------------------------------------------------------------------------------------------------------------------------

test('Verify sorting of "Lookup Category Setup" data using sort icons.', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("groupSettings");
  await Click.Link("lookupCategory");
  await Click.Icon("Sort");
  await Verify.verifySortOrder();
  await Click.Icon("Sort");
  await Verify.verifySortOrder();
});

// Group settings (Master Category Setup Screen)----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify if the collapse all button is working as expected', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("groupSettings");
  await Click.Link("masterCategory");
  await Click.Icon("masterCategoryArrow");
  await page.waitForLoadState("networkidle");
  await Verify.verifyCollapseAllButton(page);
});

// Group settings (Pastel Category Setup Screen)----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify if user can add pastel product category', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("groupSettings");
  await Click.Link("pastelCategory");
  await Click.Link("addPastelProduct")
  await Actions.enterText("pastelCode", "2077");
  await Click.Icon("primaryCategoryFilterArrow");
  await Click.dropdownOption("businessTechnology");
  await Click.Btn("Save")
  await Verify.IsTextDisplayed("Saved Successfully");
});

// Group settings (IQ Category Setup Screen)----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user cannot add a Department by filling invalid data.', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("groupSettings");
  await Click.Link("iQCategory");
  await Click.Btn("Add");
  await Actions.enterText("IQcode", "1224");
  await Click.Btn("Save");
  await Verify.verifyErrorMessage("Department is a required field");
});

test('Verify that the user can Edit a Department by filling in valid data.', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("groupSettings");
  await Click.Link("iQCategory");
  await Click.Icon("iQCategoryEdit");
  await Actions.enterText("IQcode", "1002");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed("Record Saved Successfully");
});

//Imports screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify if the import screen is displayed as expected ', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Verify.IsTextDisplayed("Imports");
});

test('Verify that user can download "Import template"', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Click.Tab("importProducts");
  await Click.Btn("Download");
  await Verify.importData(page);
});

test('Verify user can import an empty file successfully"', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Click.Tab("importProducts");
  await Click.Btn("importFile");
  await Actions.ImageUpload(page, "SampleXLS");
  await Click.Btn("validateAndImport");
  await Verify.IsTextDisplayed("Successfully imported 0 records");
});

//Imports Products Barcode screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify if the import product barcode screen is displayed as expected ', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Click.Tab("importProductBarcode");
  await Verify.IsTextDisplayed("Product Barcode Import");
});

test('Verify that user can download "Import product barcode template"', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Click.Tab("importProductBarcode");
  await Click.Btn("Download");
  await Verify.importData(page);
});

test('Verify user can import an empty barcode file successfully"', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Click.Tab("importProductBarcode");
  await Click.Btn("importFile");
  await Actions.ImageUpload(page, "BarcodeFile");
  await Click.Btn("validateAndImport");
  await Verify.IsTextDisplayed("Successfully imported 0 records");
});

test('Verify that the user cannot import invalid linking product', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Imports");
  await Click.Tab("importProductBarcode");
  await Click.Btn("importFile");
  await Actions.ImageUpload(page, "InvalidBarcodeFile");
  await Click.Btn("validateAndImport");
  await Verify.IsTextDisplayed("Validation failed, please check data.");
});


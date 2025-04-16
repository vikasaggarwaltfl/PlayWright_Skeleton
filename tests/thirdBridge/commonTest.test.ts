
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'
import { Paths } from '@pages/files/paths'


// Login ----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user is able to login with valid credentials', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Verify.IsTextDisplayed("My OfficeNational");
    await Verify.IsTextDisplayed("Products");
    await Verify.IsTextDisplayed("ONA Super Admin");
});

/// Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------

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
    await Actions.enterText("brandName", "Test150");
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

// Products Screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that by clicking on a Product,that Product screen is visible correctly.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
    await Click.Icon("filterArrow");
    await Actions.enterText("productName", "Absto007");
    await Click.Btn("Filter");
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
    await Actions.enterText("productName", "Absto007");
    await Click.Btn("Filter");
    await Click.Link("productInfo");
    await Click.Icon("Edit");
    await Actions.enterText("productCatalogueTitle", "Testing0044");
    await Click.Btn("Save");
    await page.waitForTimeout(2000)
    await Verify.IsTextDisplayed("Products saved!");
});
//Product Media screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test ('Verify if user can successfully upload image in Product Media', async ({ Actions, Click, Verify, page }) => {

    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
    await Click.Tab("productMedia");
    await page.waitForTimeout(5000);
    await Click.Icon("filterArrow");
    await Actions.enterText("productName", "Absto007");
    await Click.Btn("Filter");
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
    await Click.Link("productInfo");
    await page.waitForLoadState("networkidle");
    await Click.Btn("uploadImage");
    await Actions.ImageUpload(page, "SamplePDF");
    await page.waitForLoadState("networkidle");
    await Click.Btn("submit");
    await Verify.IsTextDisplayed("Could not add image");
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

test('Verify the error message,when the user enters "invalid value" while adding Product WIP',async({Actions, Click,Verify,page})=>{
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

  //Product Price WIP Screen----------------------------------------------------------------------------------------------------------------------------------------------------------
 
  test('Verify if user can reject a product and the ARM status changes to reject', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
    await Click.Tab("productPriceWIP");
    await page.waitForLoadState("networkidle");
    await Click.Icon("filterArrow");
    await Actions.enterText("onCode", "3M11175");
    await Click.Btn("Filter");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(6000); 
    await Click.Icon("productKebabMenu");
    await page.waitForTimeout(3000); 
    await Click.Btn("reject");
    await page.waitForLoadState("networkidle");
    await Verify.IsTextDisplayed("Rejected Successfully");
  });
    
    test ('Verify if a user can accept the product',async({Actions, Click,Verify,page})=>{
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
    await Click.Tab("productPriceWIP");
    await page.waitForLoadState("networkidle");
    await Click.Icon("filterArrow");
    await Actions.enterText("onCode", "Absto006");
    await Click.Btn("Filter");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(6000); 
    await Click.Icon("productKebabMenu");
    await page.waitForTimeout(3000); 
    await Click.Btn("accept");
    await page.waitForLoadState("networkidle");
    await Verify.IsTextDisplayed("Accepted Successfully");
    
  });

//Product Admin Screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test ('Verify that the user is able to check and uncheck a checkbox', async ({ Actions, Click, Verify, page }) => {
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

test('Verify if the pagination of the table is working as expected', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
    await Click.Tab("productWIP");
   await Verify.verifyPagination(page);
  });



  //Export Screen--------------------------------------------------------------------------------------------------------------------------------------------------------
  
  test.setTimeout(120000); 
test('export all products', async ({ page, Actions, Click, Verify }) => {
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
test('export product prices', async ({ page, Actions, Click, Verify }) => {
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


//Group settings screen-----------------------------------------------------------------------------------------
test('Verify if the collapse all button is working as expected', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("groupSettings");
    await Click.Link("masterCategory");
    await Click.Icon("masterCategoryArrow");
    await page.waitForLoadState("networkidle");
    await Verify.verifyCollapseAllButton(page);
    
  });

  test('Verify if user can add pastel product category', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("groupSettings");
    await Click.Link("pastelCategory");
    await Click.Link("addPastelProduct")
    await Actions.enterText("pastelCode", "8892");
    await Click.Icon("primaryCategoryFilterArrow");
    await Click.dropdownOption("businessTechnology");
    await Click.Btn("Save")
    await Verify.IsTextDisplayed("Saved Successfully");
  });
  
  
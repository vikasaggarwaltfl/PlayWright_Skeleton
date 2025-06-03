import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { expect } from '@playwright/test'
import { Verify } from '@pages/Verify'



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
  await Actions.enterText("productCatalogueTitle", "Testing0045");
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





test ('Verify that the uploaded video is streaming on Cloudflarestream.com', async ({ Actions, Click, Verify, page,context }) => {
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
  test('Verify if a user can accept the product',async({Actions, Click,Verify,page})=>{
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


//Product Admin Screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user is able to check and uncheck a checkbox', async ({ Actions, Click, Verify, page }) => {
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
  await Actions.enterText("barcodeInput", "1235");
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
  await Click.Btn("Add");
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
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.Link("productInfo");
  await Click.Tab("productAudit");
  await Click.Btn("refresh");
  await Verify.isLoadingVisible(page);
  
  
});


//----------------------------------------------------------------------------------------------
test('Verify if the pagination of the table is working as expected', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productWIP");
  await Verify.verifyPagination(page);
});

//Group settings screen-----------------------------------------------------------------------------------------

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
  await Actions.enterText("pastelCode", "1998");
  await Click.Icon("primaryCategoryFilterArrow");
  await Click.dropdownOption("businessTechnology");
  await Click.Btn("Save")
  await Verify.IsTextDisplayed("Saved Successfully");
});

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



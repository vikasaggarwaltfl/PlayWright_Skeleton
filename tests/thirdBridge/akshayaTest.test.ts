import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { expect } from '@playwright/test'
import { Verify } from '@pages/Verify'



test.only('Verify if the pagination of the table is working as expected', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  
  // Navigate to Products tab
  await Click.Tab("Products");
  
  // Wait for the page to load completely
  await page.waitForLoadState("networkidle");
  
  // Get the pagination elements
  const paginatorLocator = page.locator(".p-paginator-page");
  
  // Wait for pagination to be visible
  await paginatorLocator.first().waitFor({ state: 'visible' });
  
  // Iterate through all pages
  const totalPages = await paginatorLocator.count();
  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    if (pageIndex > 0) {
      await paginatorLocator.nth(pageIndex).click();
      await page.waitForLoadState("networkidle");
    }
  }
});


test.skip('Verify if user can successfully add product price WIP',async({Actions, Click,Verify,page})=>{
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productPriceWIP");
  await Click.Link("addProductPriceWIP");
  await Click.Icon("selectSupplier");
  await Click.dropdownOption("apexOn");
  await Click.Icon("selectSupplierCode");
  await Click.dropdownOption("absto002");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed("Saved Successfully");
  
});

test.skip('Verify the error message,when the user enters "invalid value" while adding Product Price WIP',async({Actions, Click,Verify,page})=>{
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productPriceWIP");
  await Click.Link("addProductPriceWIP");
  await Click.Icon("selectSupplier");
  await Click.dropdownOption("apexOn");
  await Click.Btn("Save");
  await Verify.verifyErrorMessage("Supplier Code is a required field");
});




/*test('Verify that user is able to login with valid credentials', async ({ Actions, Click,Verify,page}) => {
await Actions.signIn();
await Click.Btn("sign_In");
await page.waitForTimeout(5000);
await Verify.IsTextDisplayed("My OfficeNational");

 
  });

test('Verify that by clicking on a Product,that Product screen is visible correctly.', async ({ Actions, Click,Verify,page}) => {
await Actions.signIn();
await Click.Btn("sign_In");
await Click.Tab("Products");
await Click.Icon("filterArrow");
await Actions.enterText("productName", "Absto007");
await Click.Link("productInfo");
await page.waitForTimeout(5000);
await Verify.IsTextDisplayed("Product: Absto007");
});

test('Verify that by selecting Filter, the filtered screen is displayed as expected', async ({ Actions, Click,Verify,page}) => {
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

test('Verify that by clicking on the reset button, the filter button is disabled', async ({ Actions, Click,Verify,page}) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Reset");
  await Click.Icon("filterArrow");
  await Verify.verifyDisabledButton("Filter");
  
});

      
test('Verify that the user is able to edit the product', async ({ Actions, Click,Verify,page}) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Link("productInfo");
  await Click.Icon("Edit");
  await Actions.enterText("productCatalogueTitle", "Testing0044");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed("Products saved!");
 });
 
 test ('Verify if user can successfully upload a file in Product Media',async ({Actions, Click,Verify,page})=>{

  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productMedia");
  await page.waitForTimeout(5000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto007");
  await Click.Btn("Filter");
  await Click.Link("productInfo");
  await Click.Btn("uploadImage");
  await Actions.ImageUpload(page,"ProductMedia");
  await page.waitForLoadState("networkidle");
  await Click.Btn("submit");
  await page.waitForTimeout(5000);
  await Verify.verifyImageUpload(page);
  
});


 test('Verify that the user is able to add a note in a popup window',async ({Actions, Click,Verify,page})=>{
  

  await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Products");
        await Click.Tab("productWIP");
        await page.waitForTimeout(3000);
        await Click.Icon("filterArrow");
        await page.waitForTimeout(2000);
        await Actions.enterText("productName", "Absto007" );
        await Click.Btn("Filter");
        await page.waitForTimeout(2000);
        await Click.Icon("notes");
        await page.waitForLoadState("networkidle");
        await Actions.enterText("productWIPnotes", "Hello");
        await page.waitForLoadState("networkidle");
        await Click.Btn("addNote");
        await page.waitForTimeout(2000);
        await Verify.verifyScreenshot(page,"notesPopupWindow.png");

});

test('Verify that the user is able to check and uncheck a checkbox',async({Actions, Click,Verify,page})=>{
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
        await Verify.verifyCheckbox(page,"Absto001");


});*/

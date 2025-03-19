import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { expect } from '@playwright/test'
import { Verify } from '@pages/Verify'

test('Verify that user is able to login with valid credentials', async ({ Actions, Click,Verify,page}) => {
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
await Actions.enterText("productName", "Absto003");
await Click.Link("productInfo");
await page.waitForTimeout(5000);
await Verify.IsTextDisplayed("Product: Absto003");
});

test('Verify that by selecting Filter, the filtered screen is displayed as expected', async ({ Actions, Click,Verify,page}) => {
await Actions.signIn();
await Click.Btn("sign_In");
await page.waitForLoadState("domcontentloaded");
await Click.Tab("Products");
await Click.Icon("filterArrow"); 
await page.pause();
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
  await Actions.enterText("productName", "Absto003");
  await Click.Btn("Reset");
  await Click.Icon("filterArrow");
  await Verify.verifyDisabledButton("Filter");
  
});

      
test('Verify that the user is able to edit the product', async ({ Actions, Click,Verify,page}) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto003");
  await Click.Link("productInfo");
  await Click.Icon("Edit");
  await Actions.enterText("productCatalogueTitle", "Testing0044");
  await Click.Btn("Save");
  await Verify.IsTextDisplayed("Products saved!");
 });

 test('Verify that the user is able to add a note in a popup window',async ({Actions, Click,Verify,page})=>{
  

  await Actions.signIn();
  await Click.Btn("sign_In");
  await Click.Tab("Products");
  await Click.Tab("productWIP");
  await page.waitForTimeout(3000);
  await Click.Icon("filterArrow");
  await Actions.enterText("productName", "Absto001" );
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

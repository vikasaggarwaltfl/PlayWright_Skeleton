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

test.only('Verify that by selecting Filter, the filtered screen is displayed as expected', async ({ Actions, Click,Verify,page}) => {
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

// test('Verify that by clicking on the reset button, the datas are reseted', async ({ Actions, Click,Verify,page}) => {
//   await Actions.signIn();
//   await Click.Btn("sign_In");
//   await Click.Tab("Products");
//   await Click.Icon("filterArrow");
//   await Actions.enterText("productName", "Absto003");
//   await Click.Btn("Reset");
//   await page.waitForTimeout(5000);
//   expect(await Verify.verifyData(4)).toBe(10);
// });

      


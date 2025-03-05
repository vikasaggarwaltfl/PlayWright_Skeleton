import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { expect } from '@playwright/test'
import { Verify } from '@pages/Verify'

test('login', async ({ Actions, Click,Verify,page}) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
 
  });

test('Products', async ({ Actions, Click,Verify,page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
});

  test.only('Filter Product', async ({ Actions, Click,Verify,page}) => {
      await Actions.signIn();
      await Click.Btn("sign_In");
      await Click.Tab("Products");
      await Click.Icon("filterArrow");
      await Click.Icon("brand");
      await page.waitForTimeout(3000);
      await Click.dropdownOption("absto");
      //await page.waitForTimeout(3000);
      //await Click.Btn("Filter");


      });

      test('Reset Product', async ({ Actions, Click,Verify,page}) => {
        await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Products");
        await Click.Icon("filterArrow");
        await Actions.enterText("productName", "Absto003");
        await Click.Btn("Filter");
        await Click.Icon("filterArrow");
        await Click.Btn("Reset");
        });




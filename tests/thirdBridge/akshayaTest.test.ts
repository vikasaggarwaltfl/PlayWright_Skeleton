import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { expect } from '@playwright/test'
import { Verify } from '@pages/Verify'

test.only('login', async ({ Actions, Click,Verify,page}) => {
  await Actions.signIn();
  await Click.Btn("sign_In");
  });

test.only('Products', async ({ Actions, Click,Verify,page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
});

  test.only('Filter Product', async ({ Actions, Click,Verify,page}) => {
      await Actions.signIn();
      await Click.Btn("sign_In");
      await Click.Tab("Products");
      await page.waitForTimeout(60000);
      await Click.Icon("filterArrow");
      await Actions.enterText("productName", "Absto003");
      await Click.Btn("Filter");


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



//-----------------------------------------------------------------------------------------------------------

// test('jesmi TC_ID_001', async ({ page, Actions, Verify }) => {
//   await page.goto('https://onexweb-uat.officenational.co.za/')
//   await Verify.IsTextDisplayed('Sign in')
// })

// test('jesmi TC_ID_002', async ({ page, Actions, Click, Verify }) => {
//   await page.goto('https://onexweb-uat.officenational.co.za/')

//   await Actions.enterText('email', 'jeigemmabrije-7589@yopmail.com')
//   await Actions.enterText('password', 'Testing@1212')
//   await Click.Btn('login')
//   await Verify.IsTextDisplayed('Dashboard')
// })

// test('jesmi TC_ID_003', async ({ page, Actions, Click, Verify }) => {
//   await page.goto('https://onexweb-uat.officenational.co.za/')

//   await Actions.enterText('email', 'jeigemmabrije-7589yopmail.com')
//   await Actions.enterText('password', 'Testing@1212')
//   await Click.Btn('login')
//   await Verify.IsErrorPopUp('Incorrect username or password.')
// })

// test('End-to-End test case 1', async ({ Actions, Click, Verify }) => {
//   await Actions.signIn()
//   await Click.Btn('login')
//   await Verify.IsTextDisplayed('Dashbaord')
//   await Click.tabs('MembersTab')
//   // await Click.quickLink("addMember");
//   // await Actions.addMemberFromJson();
//   await Click.Btn('ProfileBtn')
//   await Click.Btn('SignoutBtn')
// })

import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { expect } from '@playwright/test'
import { Verify } from '@pages/Verify'

test('user login', async ({ Actions, Click,Verify,page}) => {
  await Actions.signIn();
  await Click.Btn("Signin");
  await Verify.verifyURL();
  });

  test('Products title', async ({ Actions, Click,Verify,page}) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.link("Products");
    await Verify.ProductText("Products");

    });

test('filter products', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("login");
  await Click.link("Products");
  await Click.icon("ProductFilterArrow");
  await Actions.enterText("ProductSupplierCode", "DS3MM87427");
  await Click.Btn("ProductFilter");
});



test('products info', async ({ Actions, Click, Verify, page }) => {
  await Actions.signIn();
  await Click.Btn("login");
  await Click.link("Products");
  await Click.icon("ProductFilterArrow");
  await Actions.enterText("ProductSupplierCode", "DS3MM87427");
  await Click.Btn("ProductFilter");
  await Click.link("ArtisticProduct");
  await Verify.ParticularProductText("Product: 3M087427");
});


test.only('Supplier Filter Test', async ({ Actions, Click,Verify,page}) => {
 await Actions.signIn();
 await Click.Btn("signIn");
 
 await Click.tabs("Suppliers");
 
  });


// test('reset products', async ({ Actions, Click, Verify, page }) => {
//   await Actions.signIn();
//   await Click.Btn("login");
//   await Click.link("Products");
//   await Click.icon("ProductFilterArrow");
//   await Actions.enterText("ProductSupplierCode", "DS3MM87427");
//   await Click.Btn("ProductFilter");
//   await Click.icon("ProductFilterArrow");
//   await page.waitForTimeout(60000);
//   await Click.Btn("ProductReset");
//   await page.close();

// });











//-------------------------------------------------------------------------------------------------------

// test('change password', async ({ Actions, Click, Verify, page }) => {
//   await Actions.signIn();
//   await Click.Btn("login");
//   await Click.Profile();
//   await Actions.enterText("enterCurrentPassword", "SuperAdmin@123");
//   await Actions.enterText("enterNewPassword", "SuperAdmin@1234");
//   await Actions.enterText("confirmNewPassword", "SuperAdmin@1234");
//   await Click.Btn("changePassword");


// });

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

import test from '@lib/BaseTest'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'

test.beforeEach('user login', async ({ page, Actions, Click }) => {
  await Actions.signIn();
  await Click.Btn("login");
});

test('change password', async ({ Actions, Click, Verify, page }) => {
  
  await page.waitForLoadState("networkidle");
  await Click.Btn("ClickProfileButton");
  await page.waitForTimeout(2000);
//   await Click.Btn("changePassword");
//   await Actions.enterText("enterCurrentPassword", "SuperAdmin@123");
//   await Actions.enterText("enterNewPassword", "SuperAdmin@1234");
//   await Actions.enterText("confirmNewPassword", "SuperAdmin@1234");
//   await Click.Btn("clickSubmitBtn");


 });

// test('filter products', async ({ Actions, Click, Verify, page }) => {
//   await Click.link("clickProductLink");
//   await Click.icon("clickProductFilterIcon");
//   await Actions.enterText("enterProductSupplierCode", "DS3MM87427");
//   await Click.Btn("clickProductFilterBtn");
// });


// test('reset products', async ({ Actions, Click, Verify, page }) => {
//   await Click.link("clickProductLink");
//   await Click.icon("clickProductFilterIcon");
//   await Actions.enterText("enterProductSupplierCode", "DS3MM87427");
//   await Click.Btn("clickProductFilterBtn");
//   await Click.Btn("clickProductResetBtn");
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

import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto';
import { access } from 'fs';

test('has title', async ({ page, Actions, Click }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/');
  await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
  await Actions.enterText("password", "Testing@1212");
  await Click.Btn("login");

//   await Actions.enterText("searchmenu","Dashboard" )
//   await Click.icon("FilterDropDown")
//   await Actions.enterText("nameFilter","Sofiya")

});


// test('sonali tests', async ({ page, Actions, Click }) => {
//     await page.goto('https://onexweb-uat.officenational.co.za/');

//     await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
//     await Actions.enterText("password", "Testing@1212");
//     await Click.Btn("login");

//     await Actions.enterText("searchmenu", "Suppliers")

//     await Click.tabs("SuppliersTab")
//     await Click.icon("FilterDropDown")
//     await Actions.enterText("nameFilter", "Sofiya")

//     //  await Actions.scrollPage('down', 500); // Scroll down 500 pixels
//     //  await Actions.scrollPage('up', 200); // Scroll up 200 pixels
//     //  await Actions.scrollPage('right', 300); // Scroll right 300 pixels
//     //  await Actions.scrollPage('left', 100); // Scroll left 100 pixels

// });



// test('End-to-End test case 2', async ({ Actions, Click, Verify}) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     // await Verify.IsTextDisplayed("Dashbaord");
//     await Click.tabs("GroupSettingsTab")
//     await Click.Link("MasterProductCategorySetup");
//     await Click.Btn("addProdcutCatogerySetup");
//     await Actions.productCategoryFromJson();
//     await Click.Btn("saveProdcutCatogerySetup");
//     await Click.Btn("ProfileBtn");
//     await Click.Btn("SignoutBtn");
// });
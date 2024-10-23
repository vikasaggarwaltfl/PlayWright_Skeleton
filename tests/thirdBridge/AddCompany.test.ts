import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'

// test('has title', async ({ page, Actions, Click }) => {
//   await page.goto('https://onexweb-uat.officenational.co.za/');
//   await page.waitForLoadState("load");
//   await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
//   await Actions.enterText("password", "Testing@1212");
//   await Click.Btn("login");

// });


test('sonali tests', async ({ page, Actions, Click }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/');
  await page.waitForLoadState("load");

  await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
  await Actions.enterText("password", "Testing@1212");
  await Click.Btn("login");

  await Actions.enterText("searchmenu","Suppliers" )

  await Click.tabs("Suppliers")
  await Click.icon("FilterDropDown")
  await Actions.enterText("nameFilter","Sofiya")

//   await Actions.scrollPage('down', 500); // Scroll down 500 pixels
//   await Actions.scrollPage('up', 200); // Scroll up 200 pixels
//   await Actions.scrollPage('right', 300); // Scroll right 300 pixels
//   await Actions.scrollPage('left', 100); // Scroll left 100 pixels

});


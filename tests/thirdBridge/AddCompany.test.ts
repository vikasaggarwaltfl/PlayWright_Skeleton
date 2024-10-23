import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
import { Actions } from '@pages/Actions';
import { Click } from '@pages/Click';


test('has title', async ({ page , Actions , Click}) => {
  await page.goto('https://onexweb-uat.officenational.co.za/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
  // page.waitFor;

  await page.waitForLoadState("load");
  await Actions.enterText("email","jeigemmabrije-7589@yopmail.com");
  await Actions.enterText("password","Testing@1212");
  await Click.Btn("login");
  await Actions.enterText("searchmenu","Dashboard" )
  await Click.icon("FilterDropDown")
  await Actions.enterText("nameFilter","Sofiya")

  //Scroll the page
  //await Actions.scrollPage('down', 500); // Scroll down 500 pixels
  //await Actions.scrollPage('up', 200); // Scroll up 200 pixels
  //await Actions.scrollPage('right', 300); // Scroll right 300 pixels
  //await Actions.scrollPage('left', 100); // Scroll left 100 pixels
});


// test('scroll page', async ({ page }) => {
  //const actions = new Actions(page);
  //const click = new Click(page);

  // await page.goto('https://onexweb-uat.officenational.co.za/table/member');

  // Scroll the page
//   await Actions.scrollPage('down', 500); // Scroll down 500 pixels
//   await Actions.scrollPage('up', 200); // Scroll up 200 pixels
//   await Actions.scrollPage('right', 300); // Scroll right 300 pixels
//   await Actions.scrollPage('left', 100); // Scroll left 100 pixels
// });
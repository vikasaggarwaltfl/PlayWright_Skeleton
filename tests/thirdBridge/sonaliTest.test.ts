import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'


test('end to end test_supplier', async ({ page, Actions, Click }) => {

    // await page.goto('https://onexweb-uat.officenational.co.za/');
    // await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
    // await Actions.enterText("password", "Testing@1212");
    // await Click.Btn("login");

    await Actions.signIn();
    await Click.Btn("login");
    await Actions.enterText("searchmenu", "Suppliers")
    await Click.tabs("SuppliersTab")
    await Click.icon("FilterDropDown")
    await Actions.enterText("nameFilter", "Sofiya")

});

test.only('end to end test_New Brand ', async ({ Actions, Click, Verify, page }) => {

    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("BrandsTab")
    await Click.link("NewBrand")
    await page.pause();

    Actions.uploadFile("//div[text()='Drop files here to upload logo']")
});



     //await Actions.scrollPage('down', 500); // Scroll down 500 pixels
    //  await Actions.scrollPage('up', 200); // Scroll up 200 pixels
    //  await Actions.scrollPage('right', 300); // Scroll right 300 pixels
    //  await Actions.scrollPage('left', 100); // Scroll left 100 pixels

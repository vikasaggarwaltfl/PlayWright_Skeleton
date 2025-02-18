
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'


test('user login', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("login");
});

test.only('Add New Brand ', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("BrandsTab")
    await Click.link("AddnewBrand")
    await Actions.enterText("enterBrandName","TestBrand2");
    await Click.Btn("SavenewBrand");
    await page.pause();
})










// test.('user login', async ({ page, Actions, Click }) => {

//     await page.goto('https://onexweb-uat.officenational.co.za/');
//     await Actions.enterText("email", "jeigemmabrije-7589@yopmail.com");
//     await Actions.enterText("password", "Testing@1212");
//     await Click.Btn("login");
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Actions.enterText("searchmenu", "Suppliers")
//     await Click.tabs("SuppliersTab")
//     await Click.icon("FilterDropDown")
//     await Actions.enterText("nameFilter", "Sofiya")

// });

// test('Add New Brand ', async ({ Actions, Click, Verify, page }) => {

//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("BrandsTab")
//     await Click.link("NewBrand")
//     await page.pause();
//     await Actions.enterText("enterBrandName","TestingBrand1");
//     await Click.Btn("BrandDropBox");
//     await Actions.uploadFile("//div[text()='Drop files here to upload logo']","NewBrand");
// })



     
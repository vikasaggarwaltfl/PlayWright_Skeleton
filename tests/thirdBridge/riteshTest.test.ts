import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto';
import { TIMEOUT } from 'dns';

// test('ritesh TC_ID_007', async ({ page, Actions, Click }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.Btn("ProfileBtn");
// });

// test('ritesh TC_ID_008', async ({ page, Actions, Click }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("ProductsTab");
// });

// test('ritesh TC_ID_009', async ({ page, Actions, Click }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.icon("MinimizeMenuBtn");
// });

test('End-to-End test case 1', async ({ Actions, Click, Verify }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("GroupSettingsTab")
    await Click.link("MasterProductCategorySetup")
    await Click.Btn("addProdcutCatogerySetup")
    await Actions.productCategoryFromJson("MasterProductCategorySetup");
    await Click.Btn("saveProdcutCatogerySetup");
    await Verify.IsTextDisplayed("ProdcutCategorySaved");
    await Click.Btn("paginatorToLast");
    await Actions.dataAssertion("MasterProductCategorySetup");
    await Actions.logout();

});

test('End-to-End test case 2', async ({ Actions, Click, Verify }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("GroupSettingsTab");
    await Click.link("IQProductCategorySetup");
    await Click.Btn("addProdcutCatogerySetup");
    await Actions.productCategoryFromJson("IQProductCategorySetup");
    await Click.Btn("saveProdcutCatogerySetup");
    await Verify.IsTextDisplayed("ProdcutCategorySaved");
    await Actions.logout();
});


test('Testing my code', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("GroupSettingsTab")
    await Click.link("MasterProductCategorySetup")
    await page.locator("//nav[@class='p-paginator-bottom']").waitFor();
    // await page.locator("//table").waitFor();
    await page.pause();
    await Click.Btn("paginatorToLast");
    await Actions.dataAssertion("MasterProductCategorySetup");

});

test.only('uploading files', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("ProductsTab");
    await Click.link("ProductMedia")
    await Click.link("productMediaCode");
    await Actions.uploadFile("//button[@aria-label='Add File']");
})

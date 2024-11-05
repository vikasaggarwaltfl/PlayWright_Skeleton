import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto';

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


test.only('Testing my code', async ({ Actions, Click, Verify,page }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("GroupSettingsTab")
    await Click.link("MasterProductCategorySetup")
    // await page.getByLabel('Last Page').click();

    // await page.locator("table tbody").waitFor();
    await Actions.dataAssertion("MasterProductCategorySetup");
});

import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto';
import { TIMEOUT } from 'dns';

test('ritesh TC_ID_007', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await page.waitForTimeout(1000);
    await Click.Btn("ProductTab");
    await page.waitForTimeout(2000);
    await Click.Btn("ProductWIP");
    await page.waitForTimeout(2000);
    await Click.Btn("ProfileBtn");
    await page.waitForTimeout(2000);
    await Click.Btn("SignoutBtn");
});


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

// test('End-to-End test case 1', async ({ Actions, Click, Verify }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("GroupSettingsTab")
//     await Click.link("MasterProductCategorySetup")
//     await Click.Btn("addProdcutCatogerySetup")
//     await Actions.productCategoryFromJson("MasterProductCategorySetup");
//     await Click.Btn("saveProdcutCatogerySetup");
//     await Verify.IsTextDisplayed("ProdcutCategorySaved");
//     await Click.Btn("paginatorToLast");
//     await Actions.dataAssertion("MasterProductCategorySetup");
//     await Actions.logout();

// });

// test('End-to-End test case 2', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("GroupSettingsTab");
//     await Click.link("IQProductCategorySetup");
//     await page.waitForLoadState();
//     await Click.Btn("addProdcutCatogerySetup");
//     await Actions.productCategoryFromJson("IQProductCategorySetup");
//     await Click.Btn("saveProdcutCatogerySetup");
//     await Verify.IsTextDisplayed("ProdcutCategorySaved");
//     // await Actions.logout();
// });

// test('Add Master Product Category Setup and verify the data', async ({ Actions, Click, Verify, page }) => {
    // await page.setViewportSize({ width: 1920, height: 1080 });
// test('End-to-End test case 1', async ({ Actions, Click, Verify }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("GroupSettingsTab")
//     await Click.link("MasterProductCategorySetup")
//     await Click.Btn("addProdcutCatogerySetup")
//     await Actions.productCategoryFromJson("MasterProductCategorySetup");
//     await Click.Btn("saveProdcutCatogerySetup");
//     await Verify.IsTextDisplayed("ProdcutCategorySaved");
//     await Click.Btn("paginatorToLast");
//     await Actions.dataAssertion("MasterProductCategorySetup");
//     await Actions.logout();

// });

// test('End-to-End test case 2', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("GroupSettingsTab");
//     await Click.link("IQProductCategorySetup");
//     await page.waitForLoadState();
//     await Click.Btn("addProdcutCatogerySetup");
//     await Actions.productCategoryFromJson("IQProductCategorySetup");
//     await Click.Btn("saveProdcutCatogerySetup");
//     await Verify.IsTextDisplayed("ProdcutCategorySaved");
//     // await Actions.logout();
// });

test('Add Master Product Category Setup and verify the data', async ({ Actions, Click, Verify, page }) => {
    // await page.setViewportSize({ width: 1920, height: 1080 });
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("GroupSettingsTab")
    await Click.link("MasterProductCategorySetup");
    await Click.link("MasterProductCategorySetup");
    await Click.Btn("addProdcutCatogerySetup");
    await Actions.enterText("Category_Code", "00060");
    await Actions.enterText("Category", "testingjjj");
    await Actions.enterText("Category_Code", "00060");
    await Actions.enterText("Category", "testingjjj");
    await Click.Btn("saveProdcutCatogerySetup");
    await page.locator("//button[@class='p-toast-icon-close p-link']//*[name()='svg']").click();
    await page.locator("//button[@class='p-toast-icon-close p-link']//*[name()='svg']").waitFor({ state: 'detached' });
    await page.getByLabel('Last Page').click();
    await page.locator("tbody tr:nth-child(1)").waitFor({ state: 'attached' });
    await page.waitForTimeout(3000); 
    await page.locator("//button[@class='p-toast-icon-close p-link']//*[name()='svg']").click();
    await page.locator("//button[@class='p-toast-icon-close p-link']//*[name()='svg']").waitFor({ state: 'detached' });
    await page.getByLabel('Last Page').click();
    await page.locator("tbody tr:nth-child(1)").waitFor({ state: 'attached' });
    await page.waitForTimeout(3000); 
    await Actions.dataAssertion("MasterProductCategorySetup");
    await page.waitForLoadState("networkidle");
    // await page.pause();
    // await page.pause();
});


// test('Checking the master prodcut catogery is created or not', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("GroupSettingsTab")
//     await Click.link("MasterProductCategorySetup")
//     // await page.locator("//nav[@class='p-paginator-bottom']").waitFor();
//     await page.waitForLoadState();
//     // await page.locator("//table").waitFor();
//     // await Click.Btn("paginatorToLast");
//     // await test.setTimeout(2000);
//     await Actions.dataAssertion("MasterProductCategorySetup");

// });


// test('Checking the master prodcut catogery is created or not', async ({ Actions, Click, Verify, page }) => {
//     await Actions.signIn();
//     await Click.Btn("login");
//     await Click.tabs("GroupSettingsTab")
//     await Click.link("MasterProductCategorySetup")
//     // await page.locator("//nav[@class='p-paginator-bottom']").waitFor();
//     await page.waitForLoadState();
//     // await page.locator("//table").waitFor();
//     // await Click.Btn("paginatorToLast");
//     // await test.setTimeout(2000);
//     await Actions.dataAssertion("MasterProductCategorySetup");

// });

test('uploading files', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("login");
    await Click.tabs("ProductsTab");    
    await page.waitForLoadState();
    await Click.link("ProductMedia");
    await page.waitForTimeout(2000);
    await Click.tabs("ProductsTab");    
    await page.waitForLoadState();
    await Click.link("ProductMedia");
    await page.waitForTimeout(2000);
    await Click.link("productMediaCode");
    await Actions.uploadFile("//button[@aria-label='Add File']", "ProductPage");
    await Actions.uploadFile("//button[@aria-label='Add File']", "ProductPage");
});
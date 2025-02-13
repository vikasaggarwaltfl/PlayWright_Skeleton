import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'

test.beforeEach('login', async ({ page, Actions, Click }) => {

    await Actions.signIn("Automation");
    await Click.Btn("login");
});

test('TCA_001', async ({ page, Actions, Click }) => {
    await Click.icon("seritiLogo");
});

test('TCA_002',async ({page, Actions, Click})=>{
await Actions.enterText("searchMenu","Home");
await Click.tabs("clickSearchOption");
})

test('TCA_003',async ({page, Actions, Click})=>{
await Click.tabs("ClickTransaction");
})

test('TCA_004',async ({page,Actions,Click})=>{
await Click.icon("clickUsersOption");
});

test('TCA_005',async ({page,Actions,Click})=>{
    await Click.icon("clickUsersOption");
    await Click.Btn("clickProfileOption");
    });


test('TCA_006',async ({page,Actions,Click})=>{

await Click.icon( "clickAdminArrow");
await Click.tabs("clickBranchTab");
await Click.icon("clickBranchFilterArrow");
await Actions.enterText("sendBranchName","Test Branch");
await Click.Btn("clickApplyBtn");

})




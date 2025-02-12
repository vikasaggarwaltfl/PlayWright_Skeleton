import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'


test.beforeEach('Login ', async ({ page, Actions, Click }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");

});

test('TCS_001 ', async ({ page, Actions, Click }) => {
    
    await Click.Btn("createTransBtn")
    await page.waitForTimeout(3000)
});

test('TCS_002 ', async ({ page, Actions, Click }) => {
    await Click.Btn("createTransBtn")
    await Click.dropdown("selectGroup")
    await Click.dropdown("selectGroupOption")
    
 });

 test('TCS_003 ', async ({ page, Actions, Click }) => {
    await Click.Btn("createTransBtn")
    await Click.dropdown("selectGroup")
    await Click.dropdown("selectGroupOption")
    await Click.dropdown("selectBranch")
    await Click.dropdown("selectBranchOption")
    
 });

 test.only('TCS_004 ', async ({ page, Actions, Click }) => {
    await Click.Btn("openCreateTrans")
    await Click.dropdown("selectGroup")
    await Click.dropdown("selectGroupOption")
    await Click.dropdown("selectBranch")
    await Click.dropdown("selectBranchOption")
    await Click.radioBtn("selectCustmerType")
    await Actions.enterText("lastnameTextbox","John")
    await Click.Btn("createTransBtn")

 });


 




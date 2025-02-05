import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto'
import { access } from 'fs'


test.beforeEach('TCS_001 ', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("login");

});

test('TCS_002 ', async ({ page, Actions, Click }) => {
    
    await Click.Btn("createTransBtn")
    await page.waitForTimeout(3000)
});

// test('TCS_003 ', async ({ page, Actions, Click }) => {
//      await Click.icon("grouparrowIcon  ")
    
//  });


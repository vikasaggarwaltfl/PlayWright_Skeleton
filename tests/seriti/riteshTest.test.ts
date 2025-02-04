import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { verify } from 'crypto';
import { TIMEOUT } from 'dns';

test('login', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("login");
    console.log(await page.title());
    // await page.pause();
});

test('Create Individual Transaction ', async ({ page, Actions, Click }) => {
    await Actions.signIn();
    await Click.Btn("login");
});


import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'

test('TC_ID_015', async ({ page, Actions, Click }) => {

    await Actions.signIn();
    await Click.Btn("login");
    await Click.icon("seritiLogo");

})
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'

test('has title', async ({ page, Actions, Click, Verify }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/')
  await Actions.enterText('email', 'jeigemmabrije-7589@yopmail.com')
  await Actions.enterText('password', 'Testing@1212')
  await Click.Btn('login')
  await Verify.IsTextDisplayed('Sign in')
})
test('jesmi testcase', async ({ page, Actions, Click, Verify }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/')
  await Verify.IsTextDisplayed('Sign in')
})

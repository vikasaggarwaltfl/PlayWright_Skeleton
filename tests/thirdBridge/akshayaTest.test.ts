import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify, verify } from 'crypto'
import { access } from 'fs'

test('jesmi TC_ID_001', async ({ page, Actions, Verify }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/')
  await Verify.IsTextDisplayed('Sign in')
})

test('jesmi TC_ID_002', async ({ page, Actions, Click, Verify }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/')

  await Actions.enterText('email', 'jeigemmabrije-7589@yopmail.com')
  await Actions.enterText('password', 'Testing@1212')
  await Click.Btn('login')
  await Verify.IsTextDisplayed('Dashboard')
})

test('jesmi TC_ID_003', async ({ page, Actions, Click, Verify }) => {
  await page.goto('https://onexweb-uat.officenational.co.za/')

  await Actions.enterText('email', 'jeigemmabrije-7589yopmail.com')
  await Actions.enterText('password', 'Testing@1212')
  await Click.Btn('login')
  await Verify.IsErrorPopUp('Incorrect username or password.')
})

// test('End-to-End test case 1', async ({ Actions, Click, Verify }) => {
//   await Actions.signIn()
//   await Click.Btn('login')
//   await Verify.IsTextDisplayed('Dashbaord')
//   await Click.tabs('MembersTab')
//   // await Click.quickLink("addMember");
//   // await Actions.addMemberFromJson();
//   await Click.Btn('ProfileBtn')
//   await Click.Btn('SignoutBtn')
// })

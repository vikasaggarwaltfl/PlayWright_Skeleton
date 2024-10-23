import {
  test as baseTest,
  Page,
  Browser,
  BrowserContext,
} from '@playwright/test'

import * as dotenv from 'dotenv'

import { VisualRegression } from '@pages/VisualRegression'
import { Click } from '@pages/Click'
import { Actions } from '@pages/Actions'
import { Verify } from '@pages/Verify'
dotenv.config()

const caps = {
  build: 'playwright-build-' + Math.floor(Math.random() * 300),
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  browser: process.env.BROWSER_NAME,
  os: process.env.OS,
  os_version: process.env.OS_VERSION,
}

const test = baseTest.extend<{
  visualRegression: VisualRegression
  Click: Click
  Actions: Actions
  Verify: Verify
}>({
  page: async ({ playwright }, use, testInfo) => {
    let browser: Browser
    let context: BrowserContext
    let page: Page

    if (process.env.RUN_ON_BROWSERSTACK === 'true') {
      browser = await playwright.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
          JSON.stringify(caps),
        )}`,
      })
      context = await browser.newContext(testInfo.project.use)
    } else {
      browser = await playwright.chromium.launch()
      context = await browser.newContext(testInfo.project.use)
    }

    page = await context.newPage()
    await use(page)

    await page.close()
    await context.close()
    await browser.close()
  },

  visualRegression: async ({ page, context }, use) => {
    await use(new VisualRegression(page, context))
  },
  Click: async ({ page, context }, use) => {
    await use(new Click(page, context))
  },
  Actions: async ({ page, context }, use) => {
    await use(new Actions(page, context))
  },
  Verify: async ({ page, context }, use) => {
    await use(new Verify(page, context))
  },
})

export default test

import { Page, BrowserContext, expect } from '@playwright/test'
// import * as dotenv from 'dotenv'
// dotenv.config()
export class Verify {
  readonly page: Page
  readonly context: BrowserContext

  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
  }
  get SignIn() {
    return this.page.locator(
      'xpath=/html/body/div[1]/div/div[1]/div[2]/div[2]/div[3]/div/div/form/input[3]',
    )
  }
  get ErrorPopUp() {
    return this.page.locator(
      "//div[@class='modal-content background-customizable modal-content-mobile visible-xs visible-sm']//div[@class='modal-body']//div//div//div//div//p[@id='loginErrorMessage']",
    )
  }
//verify url----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyURL(page: Page, url: string): Promise<void>{
    await page.waitForURL(url, { timeout: 10000 })
    const currentURL = page.url()
    expect(currentURL).toBe(url)
  }

//Verify error message----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
    async verifyErrorMessage(expectedMessage: string): Promise<void> {
      await expect(this.page.locator(`//div[text()='${expectedMessage}']`)).toBeAttached();
    }
    
// Verify any Text on screen----------------------------------------------------------------------------------------------------------------------------------------------------------------
async IsTextDisplayed(page: Page, TextValue: string): Promise<void> {
  await expect(page.getByText(TextValue, { exact: true })).toBeVisible();
  console.log(`"${TextValue}" is visible on the page`);
}

  }



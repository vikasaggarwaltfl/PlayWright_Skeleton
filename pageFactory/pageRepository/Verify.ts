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

  async IsTextDisplayed(text: string): Promise<void> {
    if (text === 'Sign in') {
      const buttonText = await this.SignIn.getAttribute('value')
      expect(buttonText).toBe('Sign in')
    }
    else if (text === 'ProdcutCategorySaved') {
      expect(await this.page.locator("div[data-pc-section='message']")).toContainText("Please fix errors before submitting.")
    }
  }

  
  async IsErrorPopUp(text: string): Promise<void> {
    if (text === 'Incorrect username or password') {
      await expect(this.ErrorPopUp).toBeVisible({ timeout: 5000 })
    }
  }
}

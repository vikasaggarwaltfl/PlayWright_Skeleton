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
  async IsTextDisplayed(text: string): Promise<void> {
    if (text === 'Sign in') {
      const buttonText = await this.SignIn.getAttribute('value')
      expect(buttonText).toBe('Sign in')
    }
  }
}

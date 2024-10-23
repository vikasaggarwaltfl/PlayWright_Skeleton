import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

export class Actions {
  readonly page: Page
  readonly context: BrowserContext
  // readonly submitBtn: Locator
  // readonly USERNAME_EDITBOX: Locator;
  // readonly PASSWORD_EDITBOX: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
    // this.submitBtn = page.locator("div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']")
    // this.USERNAME_EDITBOX =page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > input:nth-child(1)");
    // this.PASSWORD_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(5) > input:nth-child(1)");
  }
  // Lazy initialization using a getter
  get USERNAME_EDITBOX() {
    return this.page.locator(
      'body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > input:nth-child(1)',
    )
  }

  get PASSWORD_EDITBOX() {
    return this.page.locator(
      'body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(5) > input:nth-child(1)',
    )
  }

  get submitBtn() {
    return this.page.locator(
      "div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']",
    )
  }

  async enterText(textBoxName: string, text: string): Promise<void> {
    if (textBoxName === 'email') {
      await this.USERNAME_EDITBOX.fill(text)
    }

    if (textBoxName === 'password') {
      await this.PASSWORD_EDITBOX.fill(text)
    }
  }
}

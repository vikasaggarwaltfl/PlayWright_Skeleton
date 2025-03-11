import { Page, Locator, BrowserContext, expect } from '@playwright/test'

function escapeCSS(input: string): string {
  return input.replace(/([^\x20-\x7E]|[\\^`|=,!#$%&'()*+./:;<>\?@[\\]^{}~])/g, '\\$1');
}

export class Verify {
  readonly page: Page
  readonly context: BrowserContext
  readonly rows: Locator;


  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context

  }
  // Display of Error message---------------------------------------------------------------------------------------------------------------------------------------

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

// Verify Text ---------------------------------------------------------------------------------------------------------------------------------------------------------

  async IsTextDisplayed(text: string, TextValue: string): Promise<void> {

    if (text === 'Brands') {
      const BrandText = this.page.locator('text=Brands')
      await expect(BrandText).toBeVisible({ timeout: 5000 })
    }
    else if (text = 'newBrand') {
      try {
        const valueprint = await this.page.locator(`//a[text()='${TextValue}']`).textContent();
        console.log(valueprint)
      }
      catch (e) {
        console.log("Element not found", e)
      }
      //await expect(valueprint).toBe('TextValue')
    }

  }
// VerifyData---------------------------------------------------------------------------------------------------------------------------------------------

  async verifyData(column: number): Promise<number>{

      const totalElemetns = await this.page.locator("//tbody/tr").count();
      let result = 0;

      for (let i = 1; i <= totalElemetns; i++) {
        const data = await this.page.locator(`//tbody/tr[${i}]/td[4]/div`).textContent();
        if (data !== `${str}`) {
          result++;
        }
      }
      if (result == 0) {
        console.log("Test Case pass")
      }
      else {
        throw new Error("Test Case Fail");
      }
      return totalElemetns;
    }


  // VerifyData---------------------------------------------------------------------------------------------------------------------------------------------

//   async toBeDisabled(str: string) {

//     const locator = Verify.locator('Btn.filter');

//   }
}

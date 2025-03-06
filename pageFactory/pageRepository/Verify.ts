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


  // Display of Text Verification---------------------------------------------------------------------------------------------------------------

  async IsTextDisplayed(text: string, TextValue: string): Promise<void> {

    if (text === 'Brands') {
      const BrandText = this.page.locator('text=Brands')
      await expect(BrandText).toBeVisible({ timeout: 5000 })
    }
    else if (text === 'newBrand') {
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

  async verifyData(str: string) {

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

  // VerifyURL-------------------------------------------------------------------------------

  async verifyURL(expectedURL: string): Promise<void> {
    const currentURL = this.page.url();
    if (currentURL === expectedURL) {
      console.log('URL is correct:', currentURL);
    } else {
      console.log('URL is incorrect. Expected:', expectedURL, 'but got:', currentURL);
    }

    await expect(this.page).toHaveURL(expectedURL);
  }

// verifySortIconState-----------------------------------------------------------------------

async verifySortOrder() {
  const icon = await this.page.locator("//th[2]//div[1]//span[2]//*[name()='svg']");  
  const state = await icon.getAttribute('sortOrder'); 
  const sortOrder = parseInt(state || '0', 10);
  

  if (sortOrder === 0) {
    console.log("Sort Order is: Default");
  } else if (sortOrder === 1) {
    console.log("Sort Order is: Ascending");
  } else if (sortOrder === -1) {
    console.log("Sort Order is: Descending");
  } else {
    console.log("Unknown Sort Order");
  }
}

  // Verify if the correct error message for a specific field is displayed

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    const errorSelector = this.page.locator(`//div[normalize-space()='${expectedMessage}']`);
    await errorSelector.waitFor({ state: 'visible', timeout: 5000 });
    const errorText = await errorSelector.textContent();

    if (!errorText || errorText.trim() === '') {
      throw new Error(`No error message found, expected: "${expectedMessage}"`);
  }

    if (errorText?.trim() !== expectedMessage) {
      throw new Error(`Expected error message: "${expectedMessage}", but got: "${errorText}"`);
    }
    console.log(`Error message: "${errorText}" is displayed correctly.`);
  }

}






import { Page, Locator, BrowserContext, expect } from '@playwright/test'


export class Verify {
  readonly page: Page
  readonly context: BrowserContext
  private readonly newBrand: Locator;


  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
    this.newBrand = page.locator("//a[text()='Test15']");

    
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

  
// Display of Text Verification--------------------------------------------------------------------------------------------------------------------------------------------
  
async IsTextDisplayed(text: string, TextValue:string): Promise<void> {

    if (text === 'Brands') {
      const BrandText = this.page.locator('text=Brands')
      await expect(BrandText).toBeVisible({ timeout: 5000 })
    }
      else if (text = 'newBrand') {
        const valueprint = await this.page.locator("//a[text()='Test15']").textContent();
        await expect(valueprint).toBe('Test15')
      }
    } 


    

  
}





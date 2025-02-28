import { Page, Locator, BrowserContext, expect } from '@playwright/test'
// import * as dotenv from 'dotenv'
// dotenv.config()


export class Verify {
  readonly page: Page
  readonly context: BrowserContext

  private readonly successPopup: Locator;
  private readonly successMessage: Locator;
  private readonly toastMessage: Locator;
  //private readonly newBrand: Locator;


  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
    //this.newBrand = page.locator("//a[text()='Test15']");
    this.successPopup = page.locator(".success-popup"); 
    this.successMessage = page.locator(".success-popup .message"); 
    //this.toastMessage = page.locator("//span[@class='p-toast-summary']"); 
    this.toastMessage = page.locator("//span[@class='p-toast-summary']")
    //await page.getByText('Saved Successfully')
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


  //async verifyToastSuccessMessage(expectedMessage) {
    // Wait for the toast message to appear
    //await this.page.waitForTimeout(1000);
    //await expect(this.toastMessage).toBeVisible({ timeout: 5000 })
    // Get the text content of the toast message
    //const message = await this.toastMessage.textContent();
    //await expect(this.toastMessage).toContainText("Saved Successfully")
    // Validate that the message matches the expected message
    // if (message.trim() !== expectedMessage) {
    //   throw new Error(`Expected toast message: "${expectedMessage}", but got: "${message}"`);
    // }
  //}


  async IsTextDisplayed(text: string): Promise < void> {
    if (text === 'Brands') {
      const BrandText = this.page.locator('text=Brands')
      await expect(BrandText).toBeVisible({ timeout: 5000 })
    }
      else if (text = 'newBrand') {
        const valueprint = await this.page.locator("//a[text()='Test15']").textContent();
        await expect(valueprint).toBe('Test15')
      }


    }//   if(text === 'Sign in') {
    //   const buttonText = await this.SignIn.getAttribute('value')
    //   expect(buttonText).toBe('Sign in')
    // }
    // if (text === 'Dashbaord') {
    //   const dashboardText = await this.page.locator('text=Dashboard')
    //   await expect(dashboardText).toBeVisible({ timeout: 5000 })
    // }
    // if (text === 'Member') {
    //   const MemberText = this.page.locator('text=Member')
    //   await expect(MemberText).toBeVisible({ timeout: 5000 })
    // }
    // if (text === 'Supplier') {
    //   const SupplierText = this.page.locator('text=Supplier')
    //   await expect(SupplierText).toBeVisible({ timeout: 5000 })
    // }
    // else if (text === 'ProdcutCategorySaved') {
    //   expect(await this.page.locator("div[data-pc-section='message']")).toContainText("Please fix errors before submitting.")
    // }
    // else if (text === 'ProdcutCategorySaved') {
    //   expect(await this.page.locator("div[data-pc-section='message']")).toContainText("Please fix errors before submitting.")
    // }
  }


  // async IsErrorPopUp(text: string): Promise<void> {
  //   if (text === 'Incorrect username or password') {
  //     await expect(this.ErrorPopUp).toBeVisible({ timeout: 5000 })
  //   }
  






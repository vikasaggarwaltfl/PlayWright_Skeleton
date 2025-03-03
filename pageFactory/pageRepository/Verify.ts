import { Page, Locator, BrowserContext, expect } from '@playwright/test'


export class Verify {
  readonly page: Page
  readonly context: BrowserContext

  private readonly successPopup: Locator;
  private readonly successMessage: Locator;
  private readonly toastMessage: Locator;
  private readonly newBrand: Locator;


  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
    this.newBrand = page.locator("//a[text()='Test15']");
    this.successPopup = page.locator(".success-popup"); 
    this.successMessage = page.locator(".success-popup .message"); 
    this.toastMessage = page.locator("//span[@class='p-toast-summary']"); 
    this.toastMessage = page.locator("//span[@class='p-toast-summary']")
    
    
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
    async ParticularProductText(text: string): Promise < void> {
  if (text === 'Product: 3M087427') {
         const ParticularProductText = this.page.locator("(//div[contains(text(),'Product: 3M087427')])[1]")
        await expect(ParticularProductText).toBeVisible({ timeout: 5000 })
      }
      
  }
  async ProductText(text: string): Promise < void> {
    if (text === 'Products') {
           const ProductText = this.page.locator("(//div[@class='topHeading'])[1]")
          await expect(ProductText).toBeVisible({ timeout: 5000 })
        }
        
    }

    async verifyURL(): Promise<void> {
      await expect(this.page).toHaveURL("https://onexweb-uat.officenational.co.za/");
    }


  
}





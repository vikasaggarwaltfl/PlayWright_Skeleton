import { Page, Locator, BrowserContext, expect } from '@playwright/test'


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


  async IsTextDisplayed(texts: string[]): Promise<void> {

    for (const text of texts) {
      try {
         
          const locators: { [key: string]: string } = {
              "My OfficeNational": "//span[text()='My OfficeNational ']",
              "Product: Absto003": "//div[text()='Product: Absto003']",
              
          };

          if (locators[text]) {
              const textValue = await this.page.locator(locators[text]).textContent();
              expect(textValue).toBeTruthy();
              console.log(`Test case pass: ${textValue}`);
          } else {
              console.log(`Test case fail: No locator found for '${text}'`);
          }
      } catch (e) {
          console.log(`Test case fail for '${text}':`, e);
      }
  }

}



// VerifyData---------------------------------------------------------------------------------------------------------------------------------------------

  async verifyData(column: number): Promise<number>{

    const totalRows = await this.page.locator("//tbody/tr").count();

    
    const columnElements = await this.page.locator(`//tbody/tr/td[${column}]/div`).count();

   
    if (columnElements === totalRows) {
        console.log("Test Case Passed");
    } else {
        console.log("Test Case Failed");
    }

    return columnElements;

    }


  
}

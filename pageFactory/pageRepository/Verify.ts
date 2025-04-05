import { Page, Locator, BrowserContext, expect } from '@playwright/test'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { connect } from 'http2';
import * as path from 'path';


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
  // Display of Error message---------------------------------------------------------------------------------------------------------------------------------------------------

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

  // Verify any Text on screen----------------------------------------------------------------------------------------------------------------------------------------------------------------

  async IsTextDisplayed(TextValue: string): Promise<void> {

    await this.page.locator(`text="${TextValue}"`).waitFor({ state: 'visible', timeout: 10000 });
    const isVisible = await this.page.locator(`text="${TextValue}"`).isVisible();
    console.log(isVisible ? `"${TextValue}" is visible` : `"${TextValue}" is not visible`);
    await expect(isVisible).toBe(true);

  }

  // Verify Sort Icon State------------------------------------------------------------------------------------------------------------------------------------------------

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

  // VerifyURL------------------------------------------------------------------------------------------------------------------------------------------------------------

  async verifyURL(expectedURL: string): Promise<void> {
    const currentURL = this.page.url();
    if (currentURL === expectedURL) {
      console.log('URL is correct:', currentURL);
    } else {
      console.log('URL is incorrect. Expected:', expectedURL, 'but got:', currentURL);
    }

    await expect(this.page).toHaveURL(expectedURL);
  }


  // verify Validation Error Message--------------------------------------------------------------------------------------------------------------------------------------

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.page.locator(`//div[normalize-space()='${expectedMessage}']`)).toBeAttached();

  }


  // Verify record count from data grid---------------------------------------------------------------------------------------------------------------------------------------------

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

  //Verify disabled button---------------------------------------------------------------------------------------------------------------------------------------------------

  async verifyDisabledButton(buttonName: string) {
    const button = await this.page.locator(`//button[normalize-space()='${buttonName}']`);
    const isDisabled = await button.isDisabled();
    console.log(isDisabled ? `${buttonName} is disabled` : `${buttonName} is not disabled`);
    await expect(isDisabled).toBe(true);

  }
  //Verify screenshot--------------------------------------------------------------------------------------

  async verifyScreenshot(page: Page, imagename: string) {
    await page.screenshot({ path: `tests/thirdBridge/screenshots/${imagename}.png` });
    await expect(page).toHaveScreenshot({ name: imagename, maxDiffPixels: 150000});

  }
//Verify Checkbox---------------------------------------------------------------------------------------------
  async verifyCheckbox(page: Page,str: string) {
    const row=page.locator("//tbody//tr");
    const nameMatch=row.filter({
    has: page.locator("//td[2]"), hasText: `${str}`
   })
     await nameMatch.locator("input").check();
     expect(nameMatch.locator("input")).toBeChecked();
  }

//Verify loading icon visibility.
  async isLoadingVisible(page) {
    const loadingIcon = page.locator("//span[normalize-space(text())='Refresh']"); 
    await expect(loadingIcon).toBeVisible();  
    console.log('Loading icon is visible!');

  }
  
}
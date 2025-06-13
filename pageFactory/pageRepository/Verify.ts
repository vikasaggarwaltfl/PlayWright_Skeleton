import { Page, BrowserContext, expect } from '@playwright/test'
// import * as dotenv from 'dotenv'
// dotenv.config()
import * as fs from 'fs';

const DOWNLOAD_LINK = 'downloadlink';
const GENERATE_REPORT = 'generateReport';

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
  //verify url----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyURL(page: Page, url: string): Promise<void> {
    await page.waitForURL(url, { timeout: 10000 })
    const currentURL = page.url()
    expect(currentURL).toBe(url)
  }

  //Verify error message----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyErrorMessage(page: Page, expectedMessage: string): Promise<void> {
    const errorElement = page.locator(`//span[text()="${expectedMessage}"]`);
    await errorElement.waitFor({ state: 'visible', timeout: 5000 });
    const content = await errorElement.textContent();
    expect(content).toBe(expectedMessage);
    console.log(`"${expectedMessage}" is visible on the page`);
  }

  // Verify any Text on screen----------------------------------------------------------------------------------------------------------------------------------------------------------------
  async IsTextDisplayed(page: Page, TextValue: string | string[]): Promise<void> {
    if (Array.isArray(TextValue)) {
      // If TextValue is an array, verify each text value
      for (const text of TextValue) {
        await expect(page.getByText(text, { exact: true })).toBeVisible();
        console.log(`"${text}" is visible on the page`);
      }
    } else {
      // If TextValue is a single string
      await expect(page.getByText(TextValue, { exact: true })).toBeVisible();
      console.log(`"${TextValue}" is visible on the page`);
    }
  }

  // Verify radio button--------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyRadioButton(labelname: string): Promise<void> {
    const locator = this.page.getByLabel(labelname);
    await expect(locator).toBeChecked();
  }

  // Verify dropdown------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyDropDown(dropdownName: string): Promise<void> {
    const locator = this.page.locator(`//span[@aria-label='${dropdownName}']`);
    await expect(locator).toHaveText(`${dropdownName}`);

  }

  // verify disabled button------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyDisabledButton(buttonName: string): Promise<void> {
    const locator = this.page.locator(`//span[text()='${buttonName}']`);
    await expect(locator).toBeDisabled();
  }

  // verify enabled button------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async verifyEnabledButton(buttonName: string): Promise<void> {
    const locator = this.page.locator(`//span[text()='${buttonName}']`);
    await expect(locator).toBeEnabled();

  }
  // Verify record count from data grid---------------------------------------------------------------------------------------------------------------------------------------------
  async verifyDatacount(expectedCount: number): Promise<void> {
    const columnCells = this.page.locator("//table//tr/td[3]");
    const count = await columnCells.count();
    expect(count).toBe(expectedCount);
    console.log(`Number of rows in column 3: ${count}`);
  }
  // Verify download-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  async verifyDownload(value: string): Promise<void> {
    // Set up download listener before clicking the download button
    const downloadPromise = this.page.waitForEvent('download');
    if (value === DOWNLOAD_LINK) {
      await this.page.locator("//tbody/tr[1]/td[4]/a[1]").click();
    } else if (value === GENERATE_REPORT) {
      await this.page.locator("//span[text()='Generate Report']").click();
    }
    const download = await downloadPromise;
    // Get the suggested filename
    const suggestedFilename = download.suggestedFilename();
    // Save the file to a specific location
    const downloadPath = `./downloads/${suggestedFilename}`;
    await download.saveAs(downloadPath);
    // Verify that the file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();
  }

  // Verify Sort Icon State------------------------------------------------------------------------------------------------------------------------------------------------------------
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


}
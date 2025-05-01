import { Page, Locator, BrowserContext, expect } from '@playwright/test'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { connect } from 'http2';
import * as path from 'path';
import { Paths } from '@pages/files/paths'



function escapeCSS(input: string): string {
  return input.replace(/([^\x20-\x7E]|[\\^`|=,!#$%&'()*+./:;<>\?@[\\]^{}~])/g, '\\$1');
}

export class Verify {
  readonly page: Page
  readonly context: BrowserContext
  readonly rows: Locator;

  // Export Products locators
  private readonly supplierDropdown: Locator;
  private readonly productStatusDropdown: Locator;
  private readonly brandDropdown: Locator;


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
    await expect(page).toHaveScreenshot({ name: imagename, maxDiffPixels: 150000 });

  }

  // Verify Export Download Started------------------------------------------------------------------------------------------
  async verifyExportData(timeout: number = 130000): Promise<boolean> {
    try {
      // Wait for the download event to be triggered
      const download = await this.page.waitForEvent('download', { timeout });
      
      // Log the download information
      console.log(`Download started: ${download.suggestedFilename()}`);
      
      // Verify that the file is an Excel file
      //expect(download.suggestedFilename()).toContain('.xlsx , .csv');
      expect(
        download.suggestedFilename().includes('.xlsx') ||
        download.suggestedFilename().includes('.csv')
      ).toBeTruthy();
      
      
      // Wait for the download to complete
      const path = await download.path();
      console.log(`Exported Successfully: ${path}`);
      
      return true;
    } catch (error) {
      console.error('Error verifying export download:', error);
      return false;
    }
  }

//Verify Checkbox---------------------------------------------------------------------------------------------
  async verifyCheckbox(page: Page, str: string): Promise<void> {
    const row = page.locator("//tbody//tr");
    const nameMatch = row.filter({
    has: page.locator("//td[2]"), hasText: `${str}`
   })
     await nameMatch.locator("input").check();
     expect(nameMatch.locator("input")).toBeChecked();
  }

  //Verify loading icon visibility-----------------------------------------------------------------------------------
  async isLoadingVisible(page) {
    const loadingIcon = page.locator("//span[normalize-space(text())='Refresh']"); 
    await expect(loadingIcon).toBeVisible();  
    console.log('Loading icon is visible!');

  }
  
  //Verify ImageUpload---------------------------------------------------------------------------------------
  async verifyImageUpload(page: Page): Promise<void> {
    await page.waitForSelector('img[src*="img_"]', { state: 'visible' });
    const images = page.locator('img[src*="img_"]');
    const count = await images.count();
    if (count === 0) {
      throw new Error('No images found with the expected pattern');
    }
    const lastImage = images.nth(count - 1);
    await expect(lastImage).toBeVisible();
    const src = await lastImage.getAttribute('src');
    console.log(`Found ${count} images. Verifying the most recent one with src: ${src}`);
  }

  //Verify Pagination---------------------------------------------------------------------------------------

  async verifyPagination(page: Page): Promise<void> {
    const paginatorLocator = page.locator(".p-paginator-page");
    await paginatorLocator.first().waitFor({ state: 'visible' });
    const totalPages = await paginatorLocator.count();
    for (let i = 0; i < totalPages; i++) {
      const pageNumber = await paginatorLocator.nth(i).textContent();
      expect(pageNumber).toBe((i + 1).toString());
      await paginatorLocator.nth(i).click();
      await page.waitForLoadState("networkidle");
      const currentPageClass = await paginatorLocator.nth(i).getAttribute("class");
      expect(currentPageClass).toContain("p-highlight");
    }
  }
//Verify Collapse All Button---------------------------------------------------------------------------------------
  async verifyCollapseAllButton(page: Page): Promise<void> {
    const collapseAllButton = page.locator("//span[text()='Collapse All']");
    await collapseAllButton.waitFor({ state: 'visible' });
    const expandableSections = page.locator('.p-datatable-row-expansion');
    const initialExpandedCount = await expandableSections.count();
    console.log(`Found ${initialExpandedCount} expanded sections before collapse`);
    if (initialExpandedCount > 0) {
      await collapseAllButton.click();
      await page.waitForTimeout(500);
      const finalExpandedCount = await expandableSections.count();
      console.log(`Number of expanded sections after collapse: ${finalExpandedCount}`);
      expect(finalExpandedCount).toBe(0);
    }
  }

  //Verify title---------------------------------------------------------------------------------------
  async verifyTitle(page: Page, expectedTitle: string): Promise<void> {
    await page.waitForTimeout(5000);
    const title = await page.title();
    console.log(title);
    expect(title).toContain(expectedTitle);
  }

  //Verify Dashboard Data Analytics-----------------------------------------------------------------------------------------------------------

  async verifyDashboardDataAnalystics(supplierName: string): Promise<boolean> {
    try {
        // Wait for the supplier dropdown to be visible
        await this.page.waitForSelector('//span[@aria-label="All Suppliers"]', { timeout: 10000 });
        
        // Click the supplier dropdown
        await this.page.locator('//span[@aria-label="All Suppliers"]').click();
        
        // Wait for the dropdown panel to be visible
        await this.page.waitForSelector('//div[contains(@class, "p-dropdown-panel")]', { timeout: 10000 });
        
        // Select the supplier
        await this.page.locator(`//div[contains(@class, "p-dropdown-panel")]//li[contains(@class, "p-dropdown-item")]//span[text()="${supplierName}"]`).click();
        
        // Wait for the data to update
        await this.page.waitForTimeout(5000);
        
        // Verify that the cards are visible and contain numbers
        const products = await this.page.locator('//body/div/div/div/div/div/div/div[2]/div[1]').textContent();
        const totalImages = await this.page.locator('//body/div/div/div/div/div/div/div[3]/div[1]').textContent();
        const totalVideos = await this.page.locator('//body//div//div[6]').textContent();
        const totalDocuments = await this.page.locator('//body//div//div[11]').textContent();

        const extractNumber = (text: string | null): number => {
          const match = text?.match(/\d+/); // Finds first group of digits
          return match ? Number(match[0]) : NaN;
        };

        const isProductsValid = !isNaN(extractNumber(products));
        const isTotalImagesValid = !isNaN(extractNumber(totalImages));
        const isTotalVideosValid = !isNaN(extractNumber(totalVideos));
        const isTotalDocumentsValid = !isNaN(extractNumber(totalDocuments));
        
        console.log(`${supplierName}:`);
        console.log(`${products}`);
        console.log(`${totalImages}`);
        console.log(`${totalVideos}`);
        console.log(`${totalDocuments}`);
        
        return isProductsValid && isTotalImagesValid && isTotalVideosValid && isTotalDocumentsValid;
    } catch (error) {
        console.error('Error verifying dashboard data:', error);
        await this.page.screenshot({ path: 'dashboard-error.png', fullPage: true });
        return false;
    }
  }


  //Verify Import Data---------------------------------------------------------------------------------------
  async importData(page: Page): Promise<void> {
    try {  
      const download = await page.waitForEvent('download', { timeout: 30000 });
      const downloadPath = await download.path();
      console.log(`File downloaded successfully to: ${downloadPath}`);   
      expect(downloadPath).toBeTruthy();
    } catch (error) {
      console.error('Error verifying import template download:', error);
      throw error;
    }
  }
//verify window handling---------------------------------------------------------------------------------------
async verifyWindowHandling(page: Page, buttonName: string, expectedUrlPattern: string): Promise<void> {
  const [newWindow] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator(`//div[text()='${buttonName}']`).click(), 
  ]);
  await newWindow.waitForLoadState("networkidle");
  const actualURL = newWindow.url();
  console.log("New window URL:", actualURL);
  await expect(newWindow.url()).toContain(expectedUrlPattern);
  await newWindow.close();
}
}
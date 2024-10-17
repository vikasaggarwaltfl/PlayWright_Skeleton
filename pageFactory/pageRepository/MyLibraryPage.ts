import { BrowserContext, expect, Page } from "@playwright/test";

export class MyLibraryPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async generateRandomListName(): Promise<string>  {
        const randomNum = Math.floor(Math.random() * 10000); 
        return `list-${randomNum}`; 
      }

      async generateRandomAlphabet(): Promise<string> {
        const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * alphabets.length);
        return alphabets[randomIndex];
    }
      
    async createListWithValidName(listName: string) {
        await this.page.getByRole('link', { name: 'My Library' }).click();
        await this.page.getByRole('button', { name: 'New List' }).click();
        const listNameField = this.page.getByPlaceholder('List name');
        await listNameField.fill(listName);
        await this.page.getByRole('button', { name: 'Create' }).click();
    }
    async createListWithoutName() {
        await this.page.getByRole('link', { name: 'My Library' }).click();
        await this.page.getByRole('button', { name: 'New List' }).click();
        await this.page.getByRole('button', { name: 'Create' }).click();
    }
    async deleteList(listName: string) {
        await this.page.locator(`//h5[contains(@class, 'MuiTypography-h5') and normalize-space(text())='${listName}']`);
        const threeDotIcon = this.page.locator("//div[@class='MuiBox-root css-1baulvz']").nth(1);
        await threeDotIcon.click();
        await this.page.locator("(//li[@role='menuitem'])[2]").click();
        await this.page.locator("//button[contains(.,'Delete')]").click();
    }
   
    async sortColumnAndVerify(page: Page, parseFunction: (str: string) => any): Promise<void> {
        // Click on the sort arrow for the specified column
        await page.locator(`div[data-field="startsAt"] div.MuiDataGrid-iconButtonContainer button[aria-label="Sort"]`).click();
      
        // Extract the column values after sorting
        const columnValues = await page.$$eval(
          `div[data-field="startsAt"] .MuiDataGrid-cellContent`,
          elements => elements.map(el => el.textContent?.trim())
        );
      
        // Parse the column values using the provided parsing function
        const parsedValues = columnValues.map(parseFunction);
      
        // Verify the column is sorted in ascending order
        const isSortedAsc = parsedValues.every((value, i, arr) => {
          if (i === 0) return true;
          return arr[i - 1] <= value;
        });
      
        // Verify the column is sorted in descending order
        const isSortedDesc = parsedValues.every((value, i, arr) => {
          if (i === 0) return true;
          return arr[i - 1] >= value;
        });
      
        // Assert that the column is sorted in either ascending or descending order
        expect(isSortedAsc || isSortedDesc).toBe(true);
      }
      
      
    
}
    export function parseDateTime(dateTimeStr: string): Date {
    const [date, time] = dateTimeStr.split(' • ');
    return new Date(`${date} ${time}`);
  }
  
     export function parseString(value: string): string {
    return value;
  }
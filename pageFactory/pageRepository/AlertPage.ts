import { Browser, BrowserContext, Page } from "@playwright/test";

export class AlertPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async watchList() {
        await this.page.locator(`//span[normalize-space(text())='Watchlist']`).click();
    }

    async weekly() {
        await this.page.locator(`//span[normalize-space(text())='Weekly']`).click();
    }

    async companyListCount(): Promise<number> {
        return await this.page.locator(`//input[contains(@class,'PrivateSwitchBase-input MuiSwitch-input')]`).count();
    }
    async addCompany(char: string) {
        await this.page.locator("//span[contains(.,'Alerts')]").click();
        await this.page.locator("(//label[normalize-space(text())='Add by company ticker or name']/following::input)[1]").fill(char);
        await this.page.waitForSelector('#company-search-listbox [role="option"]:first-child', { state: 'visible' });
        await this.page.hover('#company-search-listbox [role="option"]:first-child');
        await this.page.click('#company-search-listbox [role="option"]:first-child');
        const firstDropdownOption = this.page.locator("#company-search-listbox [role='option']:first-child").click();
        await this.page.locator("//label[@for='company-search']").press('Enter');
        await this.page.locator("//button[contains(.,'Add')]").click();


    }
}
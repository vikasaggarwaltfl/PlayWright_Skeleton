import { BrowserContext, Page } from "@playwright/test";

export class BrowsePage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async search(value: string) {
        await this.page.locator("//input[@type='search']").fill(value);
    }
}
import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
dotenv.config()

export class Click {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly loginBtn: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.loginBtn = page.locator("//span[text()='Login']")

    }

    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.loginBtn.click();
        }
    }

    async icon(str: string): Promise<void> {
        // if (str === "login") {
        //     await this.loginBtn.click();
        // }
    }

    async tabs(str: string): Promise<void> {

        if (str === "DashboardTab") {
            // await this.dashboard.click();
        }
    }

    async link(linkName: String) {
        // if (linkName === "MasterProductCategorySetup") {
        //     await this.MasterProductCategorySetup.click();
        // }
        // else if (linkName === 'IQProductCategorySetup') {
        //     await this.IQProductCategorySetup.click();
        // }
        // else if (linkName === 'ProductMedia') {
        //     await this.ProductMedia.click();
        // }
        // else if (linkName === "productMediaCode") {
        //     await this.productMediaCode.click();
        // }
        // else if (linkName === "NewBrand") {
        //     await this.newBrand.click();
        // }
    }
} 


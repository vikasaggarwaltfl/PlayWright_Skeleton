import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export class Click {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly loginBtn: Locator;
    private readonly seritiLogo: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.loginBtn = page.locator("//span[text()='Login']")
        this.seritiLogo = page.locator("//img[@src='https://seritiweb-mea-uat.seriti-int.com/_nuxt/seriti-int-full.Bv5pslmx.svg']")
    }

    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.loginBtn.click();
        }
    }

    async icon(str: string): Promise<void> {
        if (str === "seritiLogo") {
            await this.seritiLogo.click();
        }
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


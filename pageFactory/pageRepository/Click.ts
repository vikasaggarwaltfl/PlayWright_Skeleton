import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
dotenv.config()

export class Click {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly loginBtn: Locator;
    private readonly createTransBtn: Locator;
    private readonly selectGroup: Locator;
    private readonly selectGroupOption: Locator;
    private readonly selectBranch: Locator;
    private readonly selectBranchOption: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.loginBtn = page.locator("//span[text()='Login']")
        this.createTransBtn =page.locator("//span[text()='Create Transaction']")
        this.selectGroup = page.locator("//span[text()='Select a group']")
        this.selectGroupOption = page.locator("//span[text()='Test_Group']")
        this.selectBranch = page.locator("//span[text()='Select a branch']")
        this.selectBranchOption = page.locator("//span[text()='Test_Branch']")

    }

    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.loginBtn.click();
        }

        else if (str === "createTransBtn") {
            await this.createTransBtn.click();
        }
    }

    async icon(str: string): Promise<void> {
        // if (str === "login") {
        //     await this.loginBtn.click();
        // }
        
    }

    async dropdown(str: string): Promise<void>{

        if (str === "selectGroup") {
            await this.selectGroup.click();
        }

        if (str === "selectGroupOption") {
            await this.selectGroupOption.click();
        }

        if (str === "selectBranch") {
            await this.selectBranch.click();
        }

        if (str === "selectBranchOption") {
            await this.selectBranchOption.click();
        }

    }

    async radio(str: string): Promise<void>{

        

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


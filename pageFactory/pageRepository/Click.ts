import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export class Click {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly loginBtn: Locator;
    private readonly seritiLogo: Locator;
    private readonly createTransBtn: Locator;
    private readonly selectGroup: Locator;
    private readonly selectGroupOption: Locator;
    private readonly selectBranch: Locator;
    private readonly selectBranchOption: Locator;
    private readonly selectCustmerType: Locator;
    private readonly enterTextLastname: Locator;
    private readonly openCreateTrans: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.loginBtn = page.locator("//span[text()='Login']")
        this.seritiLogo = page.locator("//img[@src='https://seritiweb-mea-uat.seriti-int.com/_nuxt/seriti-int-full.Bv5pslmx.svg']")
        this.createTransBtn =page.locator("//button[text()='Create Transaction']")
        this.selectGroup = page.locator("//span[text()='Select a group']")
        this.selectGroupOption = page.locator("//span[text()='Test_Group']")
        this.selectBranch = page.locator("//span[text()='Select a branch']")
        this.selectBranchOption = page.locator("//span[text()='Test_Branch']")
        this.selectCustmerType = page.locator("//label[text()='Individual']")
        this.openCreateTrans = page.locator("//span[text()='Create Transaction']")
        
    }

    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.loginBtn.click();
        }

        else if (str === "createTransBtn") {
            await this.createTransBtn.click();
        }
        
        else if (str === "openCreateTrans") {
            await this.openCreateTrans.click();
        }

    }

    async icon(str: string): Promise<void> {
        if (str === "seritiLogo") {
            await this.seritiLogo.click();
        }
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

    async radioBtn(str: string): Promise<void>{

        if (str === "selectCustmerType") {
            await this.selectCustmerType.click();
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


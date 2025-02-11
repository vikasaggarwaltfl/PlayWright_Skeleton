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
    private readonly clickSearchOption: Locator;
    private readonly clickTransaction: Locator;
    private readonly clickUsersOption: Locator;
    private readonly clickProfileOption: Locator;
    private readonly clickAdminArrow: Locator;
    private readonly clickBranchTab: Locator;
    private readonly clickBranchFilterArrow: Locator;
    private readonly clickApplyBtn: Locator;

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
        this.clickSearchOption=page.locator("//div[@class='text-start']")
        this.clickTransaction=page.locator("//div[text()='Transaction']")
        this.clickUsersOption=page.locator("//div[text()='S']")
        this.clickProfileOption=page.locator("/html/body/div[3]/div/div/div[2]/button[1]/span[2]")
        this.clickAdminArrow=page.locator("//li[6]//div[1]//div[2]//button[1]//i[1]")
        this.clickBranchTab=page.locator("(//div[contains(@class,'px-2 py-2')])[8]") 
        this.clickBranchFilterArrow=page.locator("(//i[@class='pi pi-chevron-down transition-all duration-200'])[1]")
        this.clickApplyBtn=page.locator("//input[@id='BranchName']")
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
        else if (str === "clickProfileOption") {
            await this.clickProfileOption.click();
        }
        else if (str === "clickApplyBtn") {
            await this.clickApplyBtn.click();
        }

    async icon(str: string): Promise<void> {
        if (str === "seritiLogo") {
            await this.seritiLogo.click();
        }

        if (str === "clickUsersOption") {
            await this.clickProfileOption.click();
        }

        if (str === "clickAdminArrow") {
            await this.clickAdminArrow.click();
        }

        if (str === "clickBranchFilterArrow") {
            await this.clickBranchFilterArrow.click();
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

        else if (str === "clickSearchOption") {
            await this.clickSearchOption.click();
        }

        else if (str === "clickTransaction") {
            await this.clickTransaction.click();
        }

        else if (str === "clickBranchTab") {
            await this.clickBranchTab.click();
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


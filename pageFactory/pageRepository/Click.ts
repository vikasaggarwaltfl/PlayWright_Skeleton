import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export class Click {
    //link--------------------------------------------------------------------------------------------------------
    readonly context: BrowserContext;
    readonly page: Page;

    //tabs--------------------------------------------------------------------------------------------------------
    private readonly transaction: Locator;

    //icon--------------------------------------------------------------------------------------------------------
    private readonly seritiLogo: Locator;
    private readonly testingFrameworks: Locator;
    

    //buttons--------------------------------------------------------------------------------------------------------
    private readonly login: Locator;
    private readonly signOut: Locator;
    private readonly view: Locator;
    private readonly createTransaction: Locator;
   
    
   





    constructor(page: Page, context: BrowserContext) {
        //link--------------------------------------------------------------------------------------------------------
        this.page = page
        this.context = context

        //tabs--------------------------------------------------------------------------------------------------------
        this.transaction = page.locator("//div[text()='Transaction']")

        //icon--------------------------------------------------------------------------------------------------------        
        this.seritiLogo = page.locator("//img[@src='https://seritiweb-mea-uat.seriti-int.com/_nuxt/seriti-int-full.Bv5pslmx.svg']")
        this.testingFrameworks = page.locator("//p[text()='Testing Frameworks']")
        

        //buttons--------------------------------------------------------------------------------------------------------        
        this.login = page.locator("//span[text()='Login']")
        this.signOut = page.locator("//span[text()='Sign Out']")
        this.view = page.locator("//span[text()='VIEW']")
        this.createTransaction = page.locator("//span[@class='p-button-icon p-button-icon-left pi pi-plus']")

    }





    //link--------------------------------------------------------------------------------------------------------
    async link(linkName: String) {
        // if (linkName === "MasterProductCategorySetup") {
        //     await this.MasterProductCategorySetup.click();
        // }
        // else if (linkName === 'IQProductCategorySetup') {
        //     await this.IQProductCategorySetup.click();
        // }

    }
    //tabs--------------------------------------------------------------------------------------------------------
    async tabs(str: string): Promise<void> {

        if (str === "transaction") {
            await this.transaction.click();
        }

        

    }

    //icon--------------------------------------------------------------------------------------------------------
    async icon(str: string): Promise<void> {
        if (str === "seritiLogo") {
            await this.seritiLogo.click();
        }
        else if (str === "testingFrameworks") {
            await this.testingFrameworks.click();
        }
        

    }

    //buttons--------------------------------------------------------------------------------------------------------
    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.login.click();
        }
        else if (str === "signOut") {
            await this.signOut.click();
        }
        else if (str === "view") {
            await this.view.click();
        }
        else if (str === "createTransaction") {
            await this.createTransaction.click();
        }

    };

//dropdown--------------------------------------------------------------------------------------------------------
async dropdown(value: string,selector: string): Promise<void> {
   
    await this.page.locator(`//span[text()='${value}']`).click();
    await this.page.locator(`//span[normalize-space()='${selector}']`).click();
}

//radio button-------------------------------------------------------------------------------------------------------
async radioButton(label: string): Promise<void> {
    await this.page.getByLabel(`${label}`).check();
    
}

//calendar-------------------------------------------------------------------------------------------------------
async calendar(index: number, date?: number): Promise<void> {
    if (date === undefined) {
        // If only one parameter is provided, it's the index
        await this.page.locator(`(//button[@aria-label='Choose Date'])[${index}]`).click();
    } else {
        // If both parameters are provided, it's the date selection
        await this.page.locator(`(//span[@data-p-disabled='false'])[text()='${date}']`).click();
    }
}
}





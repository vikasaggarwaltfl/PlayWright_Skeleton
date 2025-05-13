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
    private readonly resetCriteria: Locator;
    
   
    
   





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
        this.resetCriteria = page.locator("//button[text()=' Reset Criteria ']")
    }





    //link--------------------------------------------------------------------------------------------------------
    async link(linkName: String) {
        // if (linkName === "calendarMonth") {
        //     await this.calendarMonth.click();
        // }
        // else if (linkName === 'calendarYear') {
        //     await this.calendarYear.click();
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
        else if (str === "resetCriteria") {
            await this.resetCriteria.click();
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
async calendar(index: number, year: string, month: string, date?: number): Promise<void> {
    // First click the calendar button
    await this.page.locator(`(//button[@aria-label='Choose Date'])[${index}]`).click();
    
    // Click the year picker and select year
    await this.page.locator("//button[@aria-label='Choose Year']").click();
    await this.page.locator(`//span[normalize-space()='${year}']`).click();
    
    // Select the month
    await this.page.locator(`(//span[@data-pc-section='month'][text()='${month} '])`).click();
    
    // If date is provided, select it
    if (date !== undefined) {
        await this.page.locator(`(//span[@data-p-disabled='false'])[text()='${date}']`).click();
    }
}
}





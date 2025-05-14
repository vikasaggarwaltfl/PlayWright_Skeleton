import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export class Click {
    //link--------------------------------------------------------------------------------------------------------
    readonly context: BrowserContext;
    readonly page: Page;





    //tabs--------------------------------------------------------------------------------------------------------
    private readonly transaction: Locator;
    private readonly dealTracker: Locator;

    //icon--------------------------------------------------------------------------------------------------------
    private readonly seritiLogo: Locator;
    private readonly testingFrameworks: Locator;
    private readonly cancel: Locator;

    //buttons--------------------------------------------------------------------------------------------------------
    private readonly login: Locator;
    private readonly signOut: Locator;
    private readonly view: Locator;
    private readonly createTransaction: Locator;
    private readonly resetCriteria: Locator;
    private readonly search: Locator;
    private readonly addDealTrackerReport: Locator;
    private readonly save: Locator;
    private readonly createDateYes: Locator;
    private readonly inceptDateYes: Locator;








    constructor(page: Page, context: BrowserContext) {
        //link--------------------------------------------------------------------------------------------------------
        this.page = page
        this.context = context


        //tabs--------------------------------------------------------------------------------------------------------
        this.transaction = page.locator("//div[text()='Transaction']")
        this.dealTracker = page.locator("//div[text()='Deal Tracker Report']")

        //icon--------------------------------------------------------------------------------------------------------        
        this.seritiLogo = page.locator("//img[@src='https://seritiweb-mea-uat.seriti-int.com/_nuxt/seriti-int-full.Bv5pslmx.svg']")
        this.testingFrameworks = page.locator("//p[text()='Testing Frameworks']")
        this.cancel = page.locator("//*[name()='path' and contains(@d,'M8.01186 7')]");

        //buttons--------------------------------------------------------------------------------------------------------        
        this.login = page.locator("//span[text()='Login']")
        this.signOut = page.locator("//span[text()='Sign Out']")
        this.view = page.locator("//span[text()='VIEW']")
        this.createTransaction = page.locator("//span[@class='p-button-icon p-button-icon-left pi pi-plus']")
        this.resetCriteria = page.locator("//button[text()=' Reset Criteria ']")
        this.search = page.locator("//button[@aria-label='Search']")
        this.addDealTrackerReport = page.locator("//div[text()=' Add Deal Tracker Report']");
        this.save = page.locator("//span[text()='Save']");
        this.createDateYes = page.locator("//div[@placeholder='Create Date']//span[@class='p-button-label'][normalize-space()='Yes']");
        this.inceptDateYes = page.locator("//div[@placeholder='Incept Date']//span[@class='p-button-label'][normalize-space()='Yes']");



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
        else if (str === "dealTracker") {
            await this.dealTracker.click();
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
        else if (str === "cancel") {
            await this.cancel.click();
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

        else if (str === "search") {
            await this.search.click();
        }
        else if (str === "addDealTrackerReport") {
            await this.addDealTrackerReport.click();
        }
        else if (str === "save") {
            await this.save.click();
        }
        else if (str === "createDateYes") {
            await this.createDateYes.click();
        }
        else if (str === "inceptDateYes ") {
            await this.inceptDateYes.click();
        }
    };

    //dropdown--------------------------------------------------------------------------------------------------------
    async dropdown(value: string, selector: string): Promise<void> {

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

    //chevronLeft-------------------------------------------------------------------------------------------------------
    async chevronLeftArrow(index: number): Promise<void> {
        await this.page.locator(`(//button[@class='flex flex-row items-center justify-center'])[${index}]`).click();

    }

    //checkbox-----------------------------------------------------------------------------------------------------------
    async checkbox(index: number, selectors: string[] | string): Promise<void> {
        // Click the dropdown first
        await this.page.locator(`(//div[@class='p-multiselect-label'])[${index}]`).click();

        // If we want to select all items
        if (selectors === 'All') {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
        }
        // If we have an array of selectors, select each one
        else if (Array.isArray(selectors)) {
            for (const selector of selectors) {
                // await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
                await this.page.locator(`//span[text()='${selector}']`).click();
            }
        }
        // If we have a single selector
        else {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
            await this.page.locator(`//span[text()='${selectors}']`).click();
        }

        // Close the dropdown by clicking outside
        await this.page.locator("body").click({ position: { x: 0, y: 0 } });
    }

}

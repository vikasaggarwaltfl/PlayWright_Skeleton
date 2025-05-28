import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export class Click {
    //link--------------------------------------------------------------------------------------------------------
    readonly context: BrowserContext;
    readonly page: Page;
    private readonly download: Locator;

    //tabs--------------------------------------------------------------------------------------------------------
    private readonly transaction: Locator;
    private readonly dealTracker: Locator;
    private readonly docSummary: Locator;
    private readonly docReport: Locator;
    private readonly financeReport: Locator;
    private readonly bankerUserReport: Locator;
    private readonly supplyDataReport: Locator;
    private readonly usernameLoginReport: Locator;
    private readonly reportScheduler: Locator;

    //icon--------------------------------------------------------------------------------------------------------
    private readonly seritiLogo: Locator;
    private readonly testingFrameworks: Locator;
    private readonly cancel: Locator;
    private readonly delete: Locator;
    private readonly copy: Locator;
    private readonly edit: Locator;
    private readonly cancel2: Locator;
    private readonly cancel3: Locator;
    private readonly selectAll: Locator;
    private readonly deSelectAll: Locator;

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
    private readonly createDateNo: Locator;
    private readonly inceptDateNo: Locator;
    private readonly yes: Locator;
    private readonly copying: Locator;
    private readonly addDocSummaryReport: Locator;
    private readonly addDocReport: Locator;
    private readonly generateReport: Locator;
    private readonly includeActiveUsers: Locator;
    private readonly addReportScheduler: Locator;


    constructor(page: Page, context: BrowserContext) {
        //link--------------------------------------------------------------------------------------------------------
        this.page = page
        this.context = context
        this.download = page.locator("//tbody/tr[1]/td[4]/a[1]");

        //tabs--------------------------------------------------------------------------------------------------------
        this.transaction = page.locator("//div[text()='Transaction']")
        this.dealTracker = page.locator("//div[text()='Deal Tracker Report']")
        this.docSummary = page.locator("//div[text()='DOC Summary Report']");
        this.docReport = page.locator("//div[@class='text-start'][normalize-space()='DOC Report']");
        this.financeReport = page.locator("//div[contains(@class,'text-start')][normalize-space()='Finance Application Analysis Report']");
        this.bankerUserReport = page.locator("//div[text()='Banker User Login Report']");
        this.supplyDataReport = page.locator("//div[text()='Supply Data Report']");
        this.usernameLoginReport = page.locator("//div[text()='User Name Login Report']");
        this.reportScheduler = page.locator("//div[@class='text-start'][normalize-space()='Report Scheduler']");

        //icon--------------------------------------------------------------------------------------------------------        
        this.seritiLogo = page.locator("//img[@src='https://seritiweb-mea-uat.seriti-int.com/_nuxt/seriti-int-full.Bv5pslmx.svg']")
        this.testingFrameworks = page.locator("//p[text()='Testing Frameworks']")
        this.cancel = page.locator("//*[name()='path' and contains(@d,'M8.01186 7')]");
        this.delete = page.locator("//tbody/tr[1]/td[1]/div[1]/button[2]");
        this.copy = page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]/button[1]/i[1]");
        this.edit = page.locator("(//i[@class='pi pi-pencil text-lg'])[1]");
        this.cancel2 = page.locator("(//*[name()='path'])[8]");
        this.cancel3 = page.locator("(//*[name()='path'])[10]");
        this.selectAll = page.locator("//span[text()='Select All']");
        this.deSelectAll = page.locator("//span[text()='De-select All']");

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
        this.createDateNo = page.locator("//div[@placeholder='Create Date']//span[@class='p-button-label'][normalize-space()='No']");
        this.inceptDateNo = page.locator("//div[@placeholder='Incept Date']//span[@class='p-button-label'][normalize-space()='No']");
        this.yes = page.locator("//span[text()='Yes']");
        this.copying = page.locator("//button[text()='Copy']");
        this.selectAll = page.locator("//span[text()='Select All']");
        this.deSelectAll = page.locator("//span[text()='De-select All']");
        this.addDocSummaryReport = page.locator("//div[@class='flex flex-row gap-2 items-center']");
        this.addDocReport = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.generateReport = page.locator("//span[text()='Generate Report']");
        this.includeActiveUsers = page.locator("div[placeholder='Include Active Users'] div[aria-label='Yes'] span[class='p-button-label']");
        this.addReportScheduler = page.locator("//div[@class='p-splitbutton p-component']");
    }


    //link--------------------------------------------------------------------------------------------------------
    async link(linkName: String) {
        if (linkName === "download") {
            await this.download.click();
        }
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
        else if (str === "docSummary") {
            await this.docSummary.click();
        }
        else if (str === "docReport") {
            await this.docReport.click();
        }
        else if (str === "financeReport") {
            await this.financeReport.click();
        }
        else if (str === "bankerUserReport") {
            await this.bankerUserReport.click();
        }
        else if (str === "supplyDataReport") {
            await this.supplyDataReport.click();
        }
        else if (str === "usernameLoginReport") {
            await this.usernameLoginReport.click();
        }
        else if (str === "reportScheduler") {
            await this.reportScheduler.click();
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
        else if (str === "delete") {
            await this.delete.click();
        }
        else if (str === "copy") {
            await this.copy.click();
        }
        else if (str === "edit") {
            await this.edit.click();
        }
        else if (str === "cancel2") {
            await this.cancel2.click();
        }
        else if (str === "cancel3") {
            await this.cancel3.click();
        }

        else if (str === "selectAll") {
            await this.selectAll.click();
        }
        else if (str === "deSelectAll") {
            await this.deSelectAll.click();
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
        else if (str === "inceptDateYes") {
            await this.inceptDateYes.click();
        }
        else if (str === "createDateNo") {
            await this.createDateNo.click();
        }
        else if (str === "inceptDateNo") {
            await this.inceptDateNo.click();
        }
        else if (str === "yes") {
            await this.yes.click();
        }
        else if (str === "copying") {
            await this.copying.click();
        }
        else if (str === "selectAll") {
            await this.selectAll.click();
        }
        else if (str === "deSelectAll") {
            await this.deSelectAll.click();
        }
        else if (str === "addDocSummaryReport") {
            await this.addDocSummaryReport.click();
        }
        else if (str === "addDocReport") {
            await this.addDocReport.click();
        }
         else if (str === "generateReport") {
            await this.generateReport.click();
        }
        else if (str === "includeActiveUsers") {
            await this.includeActiveUsers.click();
        }
        else if (str === "addReportScheduler") {
            await this.addReportScheduler.click();
        }

    };

    //dropdown--------------------------------------------------------------------------------------------------------
    async dropdown(value: string, selector: string): Promise<void> {
        // First click the dropdown
        await this.page.locator(`//span[text()='${value}']`).click();
        // Then select the option
        await this.page.locator(`//span[normalize-space()='${selector}']`).click();
    }

    //radio button-------------------------------------------------------------------------------------------------------
    async radioButton(label: string[] | string): Promise<void> {
        if (Array.isArray(label)) {
            for (const labels of label) {
                await this.page.getByLabel(`${labels}`).check();
            }
        }
        // If we have a single label
        else {
            await this.page.getByLabel(`${label}`).check();
        }
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
    async checkboxWithAll(index: number, selectors: string[] | string): Promise<void> {
        // Click the dropdown first
        await this.page.locator(`(//div[@class='p-multiselect-label'])[${index}]`).click();
        // If we want to deselect all checkboxes
        if (selectors === 'All') {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
        }
        // If we have an array of selectors
        else if (Array.isArray(selectors)) {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
            for (const selector of selectors) {
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


    async checkboxWithoutAll(Textvalue: string, selectors: string[] | string): Promise<void> {
        // Click the dropdown first
        await this.page.locator(`//div[contains(@class,'p-multiselect-label p-placeholder')][normalize-space()='${Textvalue}']`).click();
        // If we want to select all checkboxes
        if (selectors === 'All') {
            await this.page.locator("//input[contains(@aria-label,'All items unselected')]").click();
        }
        // If we have an array of selectors
        else if (Array.isArray(selectors)) {
            for (const selector of selectors) {
                await this.page.locator(`//span[text()='${selector}']`).click();
            }
        }
        // If we have a single selector
        else {
            await this.page.locator(`//span[text()='${selectors}']`).click();
        }
        // Close the dropdown by clicking outside
        await this.page.locator("body").click({ position: { x: 0, y: 0 } });
    }

}

import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { profile } from 'console';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { connect } from 'http2';
import * as path from 'path';


dotenv.config();
interface MyObj {
    CategoryCode: string;
    NaCategoryme: string;
    code: String;
    department: string;
}

export class Actions {
    private readonly page: Page;
    private readonly context: BrowserContext;
    private jsonData: MyObj;

    private readonly USERNAME_EDITBOX: Locator;
    private readonly PASSWORD_EDITBOX: Locator;
    private readonly lastnameTextbox: Locator;
    private readonly searchMenu: Locator;
    private readonly transactionSearchMenu: Locator;
    private readonly notes: Locator;
    private readonly templateName: Locator;
    private readonly reportName: Locator;
    private readonly reportHeading: Locator;
    private readonly groupName: Locator;
    private readonly branchName: Locator;
    private readonly companyName: Locator;
    private readonly productName: Locator;
    private readonly accessoryName: Locator;
    private readonly accessoryCode: Locator;
    private readonly vehicleCode: Locator;
    private readonly vehicleModel: Locator;
    private readonly defaultPrime: Locator;
    private readonly userName: Locator;
    private readonly firstName: Locator; 
    private readonly enterCompanyName: Locator;
    private readonly registeredName: Locator;
    private readonly sortKey: Locator;
    private readonly searchBox: Locator;
   


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_EDITBOX = page.locator("//input[@placeholder='Username']");
        this.PASSWORD_EDITBOX = page.locator("//input[@placeholder='Password']");
        this.lastnameTextbox = page.locator("(//input[@name='lastName'])[2]");
        this.searchMenu = page.locator("//input[@placeholder='Search']");
        this.transactionSearchMenu = page.locator("//input[@placeholder='Transaction Number']");
        this.notes = page.locator("//input[@id='Notes']");
        this.templateName = page.locator("//input[@id='TemplateName']");
        this.reportName = page.locator("//input[@id='CustomReportName']");
        this.reportHeading = page.locator("//input[@id='ReportHeading']");
        this.groupName = page.locator("//input[@id='GroupName']");
        this.branchName = page.locator("//input[@id='BranchName']");
        this.companyName = page.locator("//input[@id='CompanyName']");
        this.productName = page.locator("//input[@id='ProductName']");
        this.accessoryName = page.locator("//input[@id='AccessoryName']");
        this.accessoryCode = page.locator("(//input[@id='Code'])[1]");
        this.vehicleCode = page.locator("//input[@id='VehicleCode']");
        this.vehicleModel = page.locator("//input[@id='Model']");
        this.defaultPrime = page.locator("//input[@id='DefaultPrimeAdjustment']");
        this.userName = page.locator("//input[@id='UserName']");
        this.firstName = page.locator("//input[@id='FirstName']"); 
        this.enterCompanyName = page.locator("//input[@datakey='createTransactioncompanyName']");
        this.registeredName = page.locator("//input[@id='RegisteredName']");
        this.sortKey = page.locator("//input[@id='SortKey']");
        this.searchBox = page.locator("//input[@role='searchbox']");
    }

    async enterText(textBoxName: string, text: string): Promise<void> {

        if (textBoxName === "email") {

            await this.USERNAME_EDITBOX.fill(text);
        }
        else if (textBoxName === "password") {

            await this.PASSWORD_EDITBOX.fill(text);
        }
        else if (textBoxName === "lastnameTextbox") {

            await this.lastnameTextbox.fill(text);
        }

        else if (textBoxName === "searchMenu") {

            await this.searchMenu.fill(text);
        }
        else if (textBoxName === "transactionSearchMenu") {

            await this.transactionSearchMenu.fill(text);
        }
         else if (textBoxName === "notes") {

            await this.notes.fill(text);
        }
        else if (textBoxName === "templateName") {

            await this.templateName.fill(text);
        }
        else if (textBoxName === "reportName") {

            await this.reportName.fill(text);
        }
        else if (textBoxName === "reportHeading") {

            await this.reportHeading.fill(text);
        }
        else if (textBoxName === "groupName") {

            await this.groupName.fill(text);
        }
        else if (textBoxName === "branchName") {

            await this.branchName.fill(text);
        }
        else if (textBoxName === "companyName") {

            await this.companyName.fill(text);
        }
        else if (textBoxName === "productName") {

            await this.productName.fill(text);
        }
        else if (textBoxName === "accessoryName") {

            await this.accessoryName.fill(text);
        }
        else if (textBoxName === "accessoryCode") {

            await this.accessoryCode.fill(text);
        }
        else if (textBoxName === "vehicleCode") {

            await this.vehicleCode.fill(text);
        }

       else if (textBoxName === "vehicleModel") {

            await this.vehicleModel.fill(text);
        }
        else if (textBoxName === "defaultPrime") {

            await this.defaultPrime.fill(text);
        }
         else if (textBoxName === "userName") {

            await this.userName.fill(text);
        }
        else if (textBoxName === "firstName") {

            await this.firstName.fill(text);
        }
        else if (textBoxName === "enterCompanyName") {

            await this.enterCompanyName.fill(text);
        }
        else if (textBoxName === "registeredName") {

            await this.registeredName.fill(text);
        }
        else if (textBoxName === "sortKey") {

            await this.sortKey.fill(text);
        }
        else if (textBoxName === "searchBox") {

            await this.searchBox.fill(text);
        }
        
    }

    async signIn(userProfile: string) {
        await this.page.goto('https://seritiweb-mea-uat.seriti-int.com');
        if (userProfile === "sonali") {
            await this.enterText("email", "sonali@testingframeworks.co.uk");
            await this.enterText("password", "Password@123");
        }
        else if (userProfile === "Automation") {
            await this.enterText("email", "test-automation@testingframeworks.co.uk");
            await this.enterText("password", "Sunshine@123");
        }
    }

async SelectDropdownOptions(index: number, selectors: string[] | string): Promise<void> {
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


}

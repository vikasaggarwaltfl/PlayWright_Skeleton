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
        
        
}

    async signIn(userProfile: string) {
        await this.page.goto('https://seritiweb-mea-uat.seriti-int.com');
        if (userProfile === "sonali") {
            await this.enterText("email", "sonali@testingframeworks.co.uk");
            await this.enterText("password", "Testuser@123");
        }
        else if (userProfile === "Automation") {
            await this.enterText("email", "test-automation@testingframeworks.co.uk");
            await this.enterText("password", "TFLlogin@124");
        }
    }




}

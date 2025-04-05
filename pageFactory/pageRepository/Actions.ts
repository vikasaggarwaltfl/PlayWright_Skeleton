import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { connect } from 'http2';
import * as path from 'path';
import fs from 'fs';



dotenv.config();
interface MyObj {
    CategoryCode: string;
    NaCategoryme: string;
    code: String;
    department: string;
}


export class Actions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    private readonly brandName: Locator;
    private readonly brandPrefix: Locator;
    private readonly brandLogo: Locator;
    private readonly productName: Locator
    private readonly productCatalogueTitle: Locator
    private readonly productWIPnotes: Locator



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_EDITBOX = page.locator("#signInFormUsername").last();
        this.PASSWORD_EDITBOX = page.locator("#signInFormPassword").last();
        this.brandName = page.locator("//input[@placeholder='Brand Name']")
        this.brandPrefix = page.locator("//input[@placeholder='Prefix']")
        this.brandLogo = page.locator("//div[contains(text(),'Drop files here to upload logo')]")
        this.productName = page.locator("//input[@id='SupplierCode']")
        this.productCatalogueTitle = page.locator("//input[@name='CatalogueTitle']")
        this.productWIPnotes = page.locator("//textarea[@placeholder='Enter a note']")


    }

    // Signin------------------------------------------------------------------------------------------------------------------------------------------
    async signIn() {
        await this.page.goto('https://onexweb-uat.officenational.co.za/')
        await this.enterText("email", "greitraragrevo-2086@yopmail.com");
        await this.enterText("password", "SuperAdmin@123");

    }

    //Entering Text------------------------------------------------------------------------------------------------------------------------------------
    async enterText(textBoxName: string, text: string): Promise<void> {

        if (textBoxName === "email") {
            await this.USERNAME_EDITBOX.fill(text);
        }

        if (textBoxName === "password") {
            await this.PASSWORD_EDITBOX.fill(text);
        }
        if (textBoxName === "brandName") {

            //await this.brandName.fill(text);
            await this.brandName.fill(text, { timeout: 60000 });
        }
        if (textBoxName === "brandPrefix") {

            await this.brandPrefix.fill(text);
        }
        if (textBoxName === "productName") {

            await this.productName.fill(text);
        }
        if (textBoxName === "productCatalogueTitle") {

            await this.productCatalogueTitle.fill(text);
        }
        if (textBoxName === "productWIPnotes") {

            await this.productWIPnotes.fill(text);
        }

    }

    // File Upload

    async uploadFile(page: Page, uploadAreaSelector: string, filePath: string): Promise<void> {
        const uploadArea = await page.$(uploadAreaSelector);
        if (uploadArea) {
            await uploadArea.click();
        } else {
            throw new Error(`Upload area not found: ${uploadAreaSelector}`);
        }

        const inputElement = await page.$('input[type="file"]');
        if (inputElement) {
            await inputElement.setInputFiles(filePath);
        } else {
            throw new Error("File input element not found!");
        }
    }


    
}






import { Page, BrowserContext, Locator, expect } from '@playwright/test';
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
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    private readonly profileBtn: Locator
    private readonly signOutBtn: Locator
    private readonly BrandName: Locator
    private readonly enterCurrentPassword: Locator;
    private readonly enterNewPassword: Locator;
    private readonly confirmNewPassword: Locator;
    private readonly ProductSupplierCode: Locator;
    private readonly filterBrandName: Locator;
    private readonly BrandPrefix: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_EDITBOX = page.locator("#signInFormUsername").last();
        this.PASSWORD_EDITBOX = page.locator("#signInFormPassword").last();
        this.profileBtn = page.locator("//p[text()='ONA Super Admin']");
        this.signOutBtn = page.locator("//button[@aria-label='Sign Out']")
        this.BrandName = page.locator("//input[@placeholder='Brand Name']") 
        this.enterCurrentPassword = page.locator("(//input[@placeholder='Current Password'])[1]")
        this.enterNewPassword = page.locator(" //input[@placeholder='New Password']")
        this.confirmNewPassword = page.locator(" //input[@placeholder='Confirm New Password']")
        this.ProductSupplierCode = page.locator("//input[@id='SupplierCode']")
        this.filterBrandName = page.locator("//input[@id='Name']")
        this.BrandPrefix = page.locator("//input[@id='Prefix']")

        
        
    }

    async enterText(textBoxName: string, text: string): Promise<void> {

        if (textBoxName === "email") {
            await this.USERNAME_EDITBOX.fill(text);
        }

        if (textBoxName === "password") {
            await this.PASSWORD_EDITBOX.fill(text);
        }
        if (textBoxName === "BrandName") {

            await this.BrandName.fill(text);
        }
        if (textBoxName === "enterCurrentPassword") {

            await this.enterCurrentPassword.fill(text);
        }

        if (textBoxName === "enterNewPassword") {

            await this.enterNewPassword.fill(text);
        }

        if (textBoxName === "confirmNewPassword") {

            await this.confirmNewPassword.fill(text);
        }
        if (textBoxName === "ProductSupplierCode") {

            await this.ProductSupplierCode.fill(text);
        }
        
        if (textBoxName === "BrandPrefix") {

            await this.BrandPrefix.fill(text);
        }
        

    }

    async signIn() {
        await this.page.goto('https://onexweb-uat.officenational.co.za/')
        await this.enterText("email", "greitraragrevo-2086@yopmail.com");
        await this.enterText("password", "SuperAdmin@123");
    }

    async Signout() {
        await this.page.waitForTimeout(5000);
        await this.profileBtn.click();
        await this.signOutBtn.click();
       }
}


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
    private readonly brandName: Locator
    private readonly productName: Locator

    
    
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_EDITBOX = page.locator("#signInFormUsername").last();
        this.PASSWORD_EDITBOX = page.locator("#signInFormPassword").last(); 
        this.brandName = page.locator("//input[@placeholder='Brand Name']") 
        this.productName = page.locator("//input[@name='OnStockCode']")
        
        
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

            await this.brandName.fill(text);
        }
        if (textBoxName === "productName") {

            await this.productName.fill(text);
        }
    }
 }


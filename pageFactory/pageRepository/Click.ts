import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class Click {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly submitBtn : Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.submitBtn = page.locator("div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']")

    }

    async Btn(str : String): Promise<void> {

        if(str==="login" )
        {
            await this.submitBtn.click();
        }
    }

    async link(str : String): Promise<void> {

        if(str==="login" )
        {
            await this.submitBtn.click();
        }
    }
    async icon(str : String): Promise<void> {

        if(str==="login" )
        {
            await this.submitBtn.click();
        }
    }
    
} 
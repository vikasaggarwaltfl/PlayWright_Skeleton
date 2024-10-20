import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    // readonly LOGIN_BUTTON: Locator;
    // readonly CANCEL_BUTTON: Locator;
    // readonly CHANGE_LANGUAGE_BUTTON: Locator;
    // readonly ENGLISH_LANGUAGE_BUTTON: Locator;
    // readonly CHANGE_LANGUAGE_POPUP_CONFIRM_BUTTON: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > input:nth-child(1)");
        this.PASSWORD_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(5) > input:nth-child(1)");
        // this.LOGIN_BUTTON = page.getByRole('button', { name: 'Login' });
        // this.CANCEL_BUTTON = page.locator(`//h2[contains(@class,'MuiTypography-root MuiTypography-h5')]/following-sibling::button[1]`);
        // this.CHANGE_LANGUAGE_BUTTON = page.locator('[data-testid="language-icon-button"]');
        // this.ENGLISH_LANGUAGE_BUTTON = page.locator(`//button[@data-testid='languageSelector-button-en']`);
        // this.CHANGE_LANGUAGE_POPUP_CONFIRM_BUTTON = page.locator("(//div[@class='MuiBox-root css-18pmhcu']//button)[2]");
    }
    async login(): Promise<void> {
        // await this.page.goto('https://forum.thirdbridge.com/');
        await this.USERNAME_EDITBOX.fill("test@gmail.com");
        await this.PASSWORD_EDITBOX.fill("pass");
        // await this.LOGIN_BUTTON.click();
        // await this.page.waitForLoadState("load");
        // await this.cancelPopupClick();
        // await this.changeLanguageTOEnglish();
    }

    // async cancelPopupClick(): Promise<void> {
    //     const isPopup = this.CANCEL_BUTTON;
    //     if (isPopup) {
    //         await this.CANCEL_BUTTON.click();
    //     }
    // }

    // async changeLanguageTOEnglish(): Promise<void> {
    //     await this.CHANGE_LANGUAGE_BUTTON.click();
    //     await this.ENGLISH_LANGUAGE_BUTTON.click();
    //     await this.CHANGE_LANGUAGE_POPUP_CONFIRM_BUTTON.click();
    //     await this.page.waitForLoadState("load");
    // }

}
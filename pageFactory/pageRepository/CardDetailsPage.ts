import { Page, BrowserContext, Locator } from '@playwright/test';

export class CardDetailsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly QUESTIONS: Locator;
    readonly OPENQUESTION: Locator;
    readonly LISTENBUTTON: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.QUESTIONS = page.locator(`//span[normalize-space(text())='Questions']`);
        this.OPENQUESTION = page.locator(`(//a[contains(@class,'MuiTypography-root MuiTypography-inherit')]//p)[2]`);
        this.LISTENBUTTON = page.locator(`//div[@class='MuiBox-root css-5atgq2']//div[1]`);
    }


    async questions(): Promise<void> {
        await this.QUESTIONS.click();
    }

    async openQuestion(): Promise<string> {
        await this.OPENQUESTION.click();
        return await this.OPENQUESTION.textContent();
    }

    async listenAudio(): Promise<void> {
        var isVisiable = await this.LISTENBUTTON.isVisible();
        if (isVisiable) {
            await this.LISTENBUTTON.click();
        } else {
            console.log("Not able to find Listen Button");
        }
    }

    async isAudioPlayed(): Promise<boolean> {
        var isVisiable = await this.page.locator(`(//div[@role='button']//span)[2]`).isVisible();
        if (isVisiable) {
            var a1 = await this.page.locator(`//div[@class='css-1ddnc28']//span[1]`).textContent();
            await this.page.waitForTimeout(5000);
            var a2 = await this.page.locator(`//div[@class='css-1ddnc28']//span[1]`).textContent();
            return a2 > a1;
        } else {
            console.log("Not able to find Listen Button");
        }
    }

    async getAudioPlayTime(): Promise<string> {
        var isVisiable = await this.page.locator(`(//div[@role='button']//span)[2]`).isVisible();
        if (isVisiable) {
            return await this.page.locator(`//div[@class='css-1ddnc28']//span[1]`).textContent();
        } else {
            console.log("Not able to find Listen Button");
        }
    }

    async navigateToCardDetailsTab(cardCount: number): Promise<void> {
        var endPoint = await this.page.locator(`(//div[contains(@class,'MuiPaper-root MuiPaper-outlined')]//a)[${cardCount}]`).getAttribute('href');
        var URL = 'https://forum.thirdbridge.com' + endPoint;
        await this.page.goto(URL);
    }




}

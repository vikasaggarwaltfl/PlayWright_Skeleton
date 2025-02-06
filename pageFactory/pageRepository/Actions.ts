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
    private readonly page: Page;
    private readonly context: BrowserContext;
    private jsonData: MyObj;
    private readonly submitBtn: Locator;
    private readonly USERNAME_EDITBOX: Locator;
    private readonly PASSWORD_EDITBOX: Locator;
    private readonly lastnameTextbox: Locator;
    

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.submitBtn = page.locator("div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']")
        this.USERNAME_EDITBOX = page.locator("//input[@placeholder='Username']");
        this.PASSWORD_EDITBOX = page.locator("//input[@placeholder='Password']");

        this.lastnameTextbox = this.page.locator("//div[@title='Enter customer last name']");

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

    }

    async signIn() {
        await this.page.goto('https://seritiweb-mea-uat.seriti-int.com');
        await this.enterText("email", "sonali@testingframeworks.co.uk");
        await this.enterText("password", "Testing@123");
    }


    async dataAssertion(TypeOfData: String) {
        try {
            const filePath = "C:\\Users\\Ritesh\\Downloads\\TF\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\data.json";
            const data = await fs.promises.readFile(filePath, 'utf8');
            this.jsonData = JSON.parse(data);
            var storedData = await this.jsonData["MasterCatogrie"].NaCategoryme;
        }
        catch (e) {
            console.log("We found error in reading data")
        }
        if (TypeOfData === 'MasterProductCategorySetup') {
            const item = await this.page.locator("tr").last().locator("td").nth(2).textContent();
            console.log("Web element data: ", item, "\nJSON data:", storedData);
            expect(item).toBe("testingjjj");
        }
    }

    //following funtion will be user to upload the file.
    async uploadFile(locatorName: string, pageName: string) {
        // await this.page.waitForSelector(locatorName);
        const fileLocation = {
            "doc": "",
            "video1": "PlayWright_Skeleton\pageFactory\pageRepository\files\v1.mkv",
            "video2": "",
            "image": "C:\\Users\\rites\\Desktop\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\files\\logo.png",
            "image2": "E:\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\files\\logo.png",
            "image3": "C:\\Users\\Ritesh\\Downloads\\TF\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\files\\logo.png"
        }


        // following code is running for Product media 
        if (pageName === "ProductPage") {

            await this.page.locator("//button[text()='Upload Image']").click();
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.page.locator("//p[text()='Add File']").click()
            ]);
            await fileChooser.setFiles(fileLocation["image3"]);
            // await this.page.locator("//p[text()='Upload']").click();
            await this.page.locator("//span[text()='Submit']").click();
            await this.page.waitForTimeout(3000);
        }
        else if (pageName === "NewBrand") {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.page.locator(locatorName).click()
            ]);
            await fileChooser.setFiles(fileLocation["image2"]);
        }
    }
}

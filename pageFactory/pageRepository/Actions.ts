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
    readonly submitBtn: Locator;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly searchMenu: Locator;
    readonly nameFilter: Locator;
    private readonly profileBtn: Locator
    private readonly signOutBtn: Locator
    private jsonData: MyObj;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.submitBtn = page.locator("div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']")
        this.USERNAME_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > input:nth-child(1)");
        this.PASSWORD_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(5) > input:nth-child(1)");
        this.searchMenu = page.locator("//input[@placeholder='Name, SKU, ON Code']")
        this.nameFilter = page.locator("//input[@placeholder='Supplier Name']")
        this.profileBtn = page.locator("//p[text()='Testing']");
        this.signOutBtn = page.locator("//span[text()='Sign Out']")
    }

    async enterText(textBoxName: string, text: string): Promise<void> {

        if (textBoxName === "email") {

            await this.USERNAME_EDITBOX.fill(text);
        }

        if (textBoxName === "password") {

            await this.PASSWORD_EDITBOX.fill(text);
        }
        if (textBoxName === "searchmenu") {

            await this.searchMenu.fill(text);
        }
        if (textBoxName === "nameFilter") {

            await this.nameFilter.fill(text);
        }


    }

    // async scrollPage(direction: 'up' | 'down' | 'left' | 'right', distance: number): Promise<void> {
    //     const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    //     const y = direction === 'up' ? -distance : direction === 'down' ? distance : 0;

    //     await this.page.evaluate((x, y) => {
    //         window.scrollBy(x, y);
    //     }, x, y);
    //}
    async signIn() {
        await this.page.goto('https://onexweb-uat.officenational.co.za/')

        await this.enterText("email", "jeigemmabrije-7589@yopmail.com");
        await this.enterText("password", "Testing@1212");
    }
    async logout() {
        await this.profileBtn.click();
        await this.signOutBtn.click();
    }

    // async addMemberFromJson(): Promise<void> {
    //     try {
    //         const response = await fetch('./data.json'); // Replace with your JSON file path
    //         const data: MemberData = await response.json();
    //         console.log(data);

    //         // Assuming you want to populate the first member's data
    //         const member = data.members[0];

    //         if (member) {
    //             await this.page.fill("//input[@placeholder='Member ID']", member.MemberID);
    //             await this.page.fill("//input[@placeholder='Name']", member.Name);
    //             // (document.getElementById("//input[@placeholder='Member ID']") as HTMLInputElement).value = member.MemberID;
    //             // (document.getElementById("//input[@placeholder='Name']") as HTMLInputElement).value = member.Name;
    //             // (document.getElementById('LegalEntity') as HTMLInputElement).value = member.LegalEntity;
    //             // (document.getElementById('MemberType') as HTMLInputElement).value = member.MemberType;
    //             // (document.getElementById('VatRegNo') as HTMLInputElement).value = member.VatRegNo;
    //             // (document.getElementById('CoRegNo') as HTMLInputElement).value = member.CoRegNo;
    //             // (document.getElementById('Telephone') as HTMLInputElement).value = member.Telephone;
    //             // (document.getElementById('Email') as HTMLInputElement).value = member.Email;
    //             // (document.getElementById('Province') as HTMLInputElement).value = member.Province;
    //             // (document.getElementById('PhysicalAddress1') as HTMLInputElement).value = member.PhysicalAddress1;
    //             // (document.getElementById('PhysicalAddress2') as HTMLInputElement).value = member.PhysicalAddress2 || '';
    //             // (document.getElementById('PhysicalAddress3') as HTMLInputElement).value = member.PhysicalAddress3 || '';
    //             // (document.getElementById('PostalAddress1') as HTMLInputElement).value = member.PostalAddress1;
    //             // (document.getElementById('DateJoined') as HTMLInputElement).value = member.DateJoined;

    //         }
    //     } catch (error) {
    //         console.error('Error fetching JSON data:', error);
    //     }
    // }

    async productCategoryFromJson(groupSetting: string): Promise<void> {

        try {
            const filePath = "C:\\Users\\rites\\Desktop\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\data.json";
            const data = await fs.promises.readFile(filePath, 'utf8');
            // Parse JSON data
            this.jsonData = JSON.parse(data);
            // console.log("output after parse", jsonData["MasterCatogrie"].CategoryCode)


            if (groupSetting === 'MasterProductCategorySetup') {
                await this.page.fill("//input[@name='CategoryCode']", this.jsonData["MasterCatogrie"].CategoryCode);
                await this.page.fill("//input[@name='Category']", this.jsonData["MasterCatogrie"].NaCategoryme);
            }
            else if (groupSetting === 'IQProductCategorySetup') {
                await this.page.fill("//input[@placeholder='Code']", this.jsonData["IQCatogrie"].code);
                await this.page.fill("//input[@placeholder='Department']", this.jsonData["IQCatogrie"].department);
            }

        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
        //    await this.page.pause();
    }

    async dataAssertion(TypeOfData: String) {
        try {
            const filePath = "C:\\Users\\rites\\Desktop\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\data.json";
            const data = await fs.promises.readFile(filePath, 'utf8');
            // Parse JSON data
            this.jsonData = JSON.parse(data);

            var storedData = await this.jsonData["MasterCatogrie"].NaCategoryme;
        }
        catch (e) {
            console.log("We found error in reading data")
        }
        // await this.page.locator("table tbody").waitFor();
        if (TypeOfData === 'MasterProductCategorySetup') {

            const item = await this.page.locator("tr").last().locator("td").nth(2).textContent();

            // const dataComeing = await this.page.locator(`td:has-text(${storedData})`).textContent();

            console.log("Web element data: ", item, "\nJSON data:", storedData)
            expect(item).toBe(storedData);

        }
    }

    //following funtion will be user to upload the file.
    async uploadFile(locatorName: string) {
        await this.page.waitForSelector(locatorName);
        const fileLocation = {
            "doc": "",
            "video1": "PlayWright_Skeleton\pageFactory\pageRepository\files\v1.mkv",
            "video2":""
        }

        await this.page.locator(locatorName).setInputFiles(fileLocation["video1"])

        await this.page.waitForTimeout(5000);
    }
}

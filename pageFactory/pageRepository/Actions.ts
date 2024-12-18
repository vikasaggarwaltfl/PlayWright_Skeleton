import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';


dotenv.config();
interface catogrie {
    CategoryCode: string;
    NaCategoryme: string;
}

interface MemberData {
    catogries: catogrie[];
}

export class Actions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly submitBtn: Locator;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly searchMenu: Locator;
    readonly nameFilter: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.submitBtn = page.locator("div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']")
        this.USERNAME_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > input:nth-child(1)");
        this.PASSWORD_EDITBOX = page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(5) > input:nth-child(1)");
        this.searchMenu = page.locator("//input[@placeholder='Name, SKU, ON Code']")
        this.nameFilter = page.locator("//input[@placeholder='Supplier Name']")
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
    async productCategoryFromJson(): Promise<void> {
        try {
            const response = await fetch('./data.json'); // Replace with your JSON file path
            console.log(response);
            const data: MemberData = await response.json();

            // Assuming you want to populate the first member's data
            const member = data.catogries[0];

            if (member) {
                await this.page.fill("//input[@name='CategoryCode']", member.CategoryCode);
                await this.page.fill("//input[@name='Category']", member.NaCategoryme);
            }
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    }
}

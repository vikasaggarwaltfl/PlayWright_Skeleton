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
    //readonly submitBtn: Locator;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    // readonly searchMenu: Locator;
    // readonly nameFilter: Locator;
    private readonly profileBtn: Locator
    private readonly signOutBtn: Locator
    // private jsonData: MyObj;
    private readonly brandName: Locator
    //private readonly brandPrefix: Locator
    private readonly enterCurrentPassword: Locator;
    private readonly enterNewPassword: Locator;
    private readonly confirmNewPassword: Locator;
    private readonly ProductSupplierCode: Locator;
    private readonly enterfilterBrandName: Locator;
    private readonly enterEditBrandPrefix: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        //this.submitBtn = page.locator("div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']")
        this.USERNAME_EDITBOX = page.locator("#signInFormUsername").last();
        this.PASSWORD_EDITBOX = page.locator("#signInFormPassword").last();
        //this.searchMenu = page.locator("//input[@placeholder='Name, SKU, ON Code']")
        //this.nameFilter = page.locator("//input[@placeholder='Supplier Name']")
        this.profileBtn = page.locator("//p[text()='ONA Super Admin']");
        this.signOutBtn = page.locator("//button[@aria-label='Sign Out']")

        this.brandName = page.locator("//input[@placeholder='Brand Name']") 
        //this.brandPrefix = page.locator("//input[@placeholder='Prefix']")
        this.enterCurrentPassword = page.locator("(//input[@placeholder='Current Password'])[1]")
        this.enterNewPassword = page.locator(" //input[@placeholder='New Password']")
        this.confirmNewPassword = page.locator(" //input[@placeholder='Confirm New Password']")
        this.ProductSupplierCode = page.locator("//input[@id='SupplierCode']")
        this.enterfilterBrandName = page.locator("//input[@id='Name']")
        this.enterEditBrandPrefix = page.locator("//input[@id='Prefix']")
    }

    async enterText(textBoxName: string, text: string): Promise<void> {


        if (textBoxName === "email") {

            await this.USERNAME_EDITBOX.fill(text);
        }

        if (textBoxName === "password") {

            await this.PASSWORD_EDITBOX.fill(text);
        }
        // if (textBoxName === "searchmenu") {

        //     await this.searchMenu.fill(text);
        // }
        // if (textBoxName === "nameFilter") {

        //     await this.nameFilter.fill(text);
        // }
        if (textBoxName === "enterBrandName") {

            await this.brandName.fill(text);
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
        if (textBoxName === "enterfilterBrandName") {

            await this.enterfilterBrandName.fill(text);
        }
        if (textBoxName === "enterEditBrandPrefix") {

            await this.enterEditBrandPrefix.fill(text);
        }
        
        //  if (textBoxName === "enterBrandPrefix") {

        //     await this.brandPrefix.fill(text);
        // }
        // if(textBoxName==="Category_Code")
        // {
        //     await this.page.fill("//input[@id='CategoryCode']", text);
        // }
        // if(textBoxName==="Category")
        // {
        //     await this.page.fill("//input[@id='Category']", text);
        // }


    }

    async signIn() {
        await this.page.goto('https://onexweb-uat.officenational.co.za/')

        await this.enterText("email", "greitraragrevo-2086@yopmail.com");
        await this.enterText("password", "SuperAdmin@123");
    }

    async logout() {
        await this.page.waitForTimeout(5000);
        await this.profileBtn.click();
        await this.signOutBtn.click();
        // await this.page.pause();
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

    // async productCategoryFromJson(groupSetting: string): Promise<void> {

    //     try {
    //         const filePath = "C:\\Users\\Ritesh\\Downloads\\TF\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\data.json";
    //         const data = await fs.promises.readFile(filePath, 'utf8');
    //         // Parse JSON data
    //         this.jsonData = JSON.parse(data);
    //         // console.log("output after parse", jsonData["MasterCatogrie"].CategoryCode)


    //         if (groupSetting === 'MasterProductCategorySetup') {
    //             await this.page.fill("//input[@name='CategoryCode']", this.jsonData["MasterCatogrie"].CategoryCode);
    //             await this.page.fill("//input[@name='Category']", this.jsonData["MasterCatogrie"].NaCategoryme);
    //         }
    //         else if (groupSetting === 'IQProductCategorySetup') {
    //             await this.page.fill("//input[@placeholder='Code']", this.jsonData["IQCatogrie"].code);
    //             await this.page.fill("//input[@placeholder='Department']", this.jsonData["IQCatogrie"].department);
    //         }

    //     } catch (error) {
    //         console.error('Error fetching JSON data:', error);
    //     }
    //     //    await this.page.pause();
    // }

    // async dataAssertion(TypeOfData: String) {
    //     try {
    //         const filePath = "C:\\Users\\Ritesh\\Downloads\\TF\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\data.json";
    //         const data = await fs.promises.readFile(filePath, 'utf8');
    //         // Parse JSON data
    //         this.jsonData = JSON.parse(data);

    //         var storedData = await this.jsonData["MasterCatogrie"].NaCategoryme;
    //     }
    //     catch (e) {
    //         console.log("We found error in reading data")
    //     }
    //     // await this.page.locator("table tbody").waitFor();
    //     if (TypeOfData === 'MasterProductCategorySetup') {



    //         // await this.page.locator("tr").last().locator("td").nth(2).waitFor();

    //         const item = await this.page.locator("tr").last().locator("td").nth(2).textContent();

    //         // const dataComeing = await this.page.locator(`td:has-text(${storedData})`).textContent();

    //         console.log("Web element data: ", item, "\nJSON data:", storedData)
    //         // expect(item).toBe(storedData);
    //         expect(item).toBe("testingjjj");

    //     }
    // }

    // //following funtion will be user to upload the file.
    // async uploadFile(locatorName: string, pageName: string) {
    //     // await this.page.waitForSelector(locatorName);
    //     const fileLocation = {
    //         "doc": "",
    //         "video1": "PlayWright_Skeleton\pageFactory\pageRepository\files\v1.mkv",
    //         "video2": "",
    //         "image": "C:\\Users\\rites\\Desktop\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\files\\logo.png",
    //         "image2": "E:\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\files\\logo.png",
    //         "image3" : "C:\\Users\\Ritesh\\Downloads\\TF\\TF\\PlayWright_Skeleton\\pageFactory\\pageRepository\\files\\logo.png"
    //     }

    //     // console.log(fileLocation["image2"])
    //     // await this.page.locator(locatorName).setInputFiles(fileLocation["image1"])
    //     // await this.page.getByRole('button', { name: 'Drop files here to upload' }).setInputFiles(fileLocation["image"]);
    //     // await this.page.waitForTimeout(5000);

    //     // following code is running for Product media 
    //     if (pageName === "ProductPage") {

    //         await this.page.locator("//button[text()='Upload Image']").click();
    //         const [fileChooser] = await Promise.all([
    //             this.page.waitForEvent('filechooser'),
    //             this.page.locator("//p[text()='Add File']").click()
    //         ]);
    //         await fileChooser.setFiles(fileLocation["image3"]);
    //         // await this.page.locator("//p[text()='Upload']").click();
    //         await this.page.locator("//span[text()='Submit']").click();
    //         await this.page.waitForTimeout(3000);
    //     }
    //     else if(pageName==="NewBrand")
    //     {

    //         // await this.page.locator(locatorName).click();
    //         const [fileChooser] = await Promise.all([
    //             this.page.waitForEvent('filechooser'),
    //             this.page.locator(locatorName).click()
    //         ]);
    //         await fileChooser.setFiles(fileLocation["image2"]);

    //     }


}


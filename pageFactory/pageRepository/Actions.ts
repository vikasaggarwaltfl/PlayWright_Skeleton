import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { connect } from 'http2';
import * as path from 'path';
import fs from 'fs';
import { Paths } from '@pages/files/paths'


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
    // Export Products locators
    private readonly supplierDropdown: Locator;
    private readonly productStatusDropdown: Locator;
    private readonly brandDropdown: Locator;
    private readonly primaryCategoryDropdown: Locator;
    private readonly catalogueTypeDropdown: Locator;
    private readonly configCodeIdInput: Locator;



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
        
        // Initialize Export Products locators
        this.supplierDropdown = page.locator('//div[@title="Supplier"]//div//div[@class="p-multiselect-label-container"]');
        this.productStatusDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Product Status"]');
        this.brandDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Brand"]');
        this.primaryCategoryDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Primary Category"]');
        this.catalogueTypeDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Catalogue Type"]');
        this.configCodeIdInput = page.locator('input[name="configCodeId"]');
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


//Image Upload--------------------------------------------------------------------------------------
async ImageUpload(page: Page, fileType: String): Promise<void> {
    await page.locator("input[type='file']").setInputFiles(Paths[`${fileType}`]);
    
  }
<<<<<<< HEAD

  }
=======
//Pagination numbers----------------------------------------------------------------------------------
async pagination(page: Page): Promise<void> {
    const paginatorLocator = page.locator(".p-paginator-page");
    await paginatorLocator.first().waitFor({ state: 'visible' });
    const totalPages = await paginatorLocator.count();
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) {
        await paginatorLocator.nth(pageIndex).click();
        await page.waitForLoadState("networkidle");
      }
    }
  }

    // Export Products methods
    // async navigateToExportPage() {
    //     await this.page.goto('https://onexweb-uat.officenational.co.za/export/stock_export_view');
    // }

    async selectSupplier(supplier: string) {
        await this.supplierDropdown.selectOption(supplier);
    }

    async selectProductStatus(status: string) {
        await this.productStatusDropdown.selectOption(status);
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption(brand);
    }

    async selectPrimaryCategory(category: string) {
        await this.primaryCategoryDropdown.selectOption(category);
    }

    async selectCatalogueType(type: string) {
        await this.catalogueTypeDropdown.selectOption(type);
    }

    async enterConfigCodeId(configCodeId: string) {
        await this.configCodeIdInput.fill(configCodeId);
    }
}
>>>>>>> f83777634609bcf9e2943e189bc6b8a80458497c







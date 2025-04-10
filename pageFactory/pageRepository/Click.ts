import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
const actions = require('./Actions');

dotenv.config()

export class Click {
    readonly page: Page
    readonly context: BrowserContext

    //Link
    private readonly addBrand: Locator
    private readonly brandInfo: Locator
    private readonly addProduct: Locator
    private readonly addCatalogue: Locator
    private readonly lookupCategory: Locator
    private readonly masterCategory: Locator
    private readonly iQCategory: Locator
    private readonly pastelCategory: Locator
    private readonly auditLog: Locator
    private readonly configCodes: Locator
    private readonly productInfo: Locator
   
    // Export Products locators
    private readonly exportDataButton: Locator
    private readonly clearFiltersButton: Locator
    private readonly supplierDropdown: Locator
    private readonly productStatusDropdown: Locator
    private readonly brandDropdown: Locator
    private readonly primaryCategoryDropdown: Locator
    private readonly catalogueTypeDropdown: Locator
    private readonly configCodeIdInput: Locator

    //Tab 
    private readonly Dashboard: Locator
    private readonly Brands: Locator
    private readonly Products: Locator
    private readonly Catalogues: Locator
    private readonly groupSettings: Locator
    private readonly Imports: Locator
    private readonly Exports: Locator
    private readonly exportProducts: Locator
    private readonly productWIP: Locator
    private readonly productAdmin: Locator
    private readonly productMedia: Locator
    

    //Icon 
    private readonly chevronLeft: Locator
    private readonly filterArrow: Locator
    private readonly productAdminFilterArrow: Locator
    private readonly kebabMenu: Locator
    private readonly Edit: Locator
    private readonly Sort: Locator
    private readonly selectSupplier: Locator
    private readonly selectBrand: Locator
    private readonly notes: Locator
    private readonly download: Locator
    private readonly remove: Locator;
    private readonly masterCategoryArrow: Locator
    
   
    
    
    //Btn
    private readonly sign_In: Locator
    private readonly Profile: Locator
    private readonly Save: Locator
    private readonly Filter: Locator
    private readonly Reset: Locator
    private readonly signOut: Locator
    private readonly addNote: Locator
    private readonly refresh: Locator
    private readonly uploadImage: Locator
    private readonly uploadVideo: Locator
    private readonly submit: Locator
    private readonly addProductsWIP: Locator
    

    //dropdownOption
    private readonly artistic: Locator
    private readonly absto: Locator

    

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context

        //Link
        this.addBrand = page.locator('a:has-text("Add Brand")')
        this.brandInfo = page.locator('a:has-text("Brand Info")')
        this.addProduct = page.locator('a:has-text("Add Product")')
        this.addCatalogue = page.locator('a:has-text("Add Catalogue")')
        this.lookupCategory = page.locator('a:has-text("Lookup Category")')
        //this.masterCategory = page.locator('a:has-text("Master Category")')
        this.masterCategory = page.locator("//a[text()='Master Product Category Setup']")
        this.iQCategory = page.locator('a:has-text("IQ Category")')
        this.pastelCategory = page.locator('a:has-text("Pastel Category")')
        this.auditLog = page.locator('a:has-text("Audit Log")')
        this.configCodes = page.locator('a:has-text("Config Codes")')
        this.productInfo = page.locator("//a[text()='Absto007']")
        
        // Initialize Export Products locators
        this.exportDataButton = page.locator('button:has-text("Export Data")')
        this.clearFiltersButton = page.locator('button:has-text("Clear Filters")')
        this.supplierDropdown = page.locator('//div[@title="Supplier"]//div//div[@class="p-multiselect-label-container"]')
        this.productStatusDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Product Status"]')
        this.brandDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Brand"]')
        this.primaryCategoryDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Primary Category"]')
        this.catalogueTypeDropdown = page.locator('//div[@class="p-multiselect-label p-placeholder"][normalize-space()="Catalogue Type"]')
        this.configCodeIdInput = page.locator('input[name="configCodeId"]')

        //Tab
        this.Dashboard = page.locator('a:has-text("Dashboard")')
        this.Brands = page.locator('a:has-text("Brands")')
        this.Products = page.locator('a:has-text("Products")')
        this.Catalogues = page.locator("//span[text()='Catalogues']")
        this.groupSettings = page.locator("//span[text()='Group Settings']")
        this.Imports = page.locator("//span[text()='Imports']")
        this.Exports = page.locator("//span[text()='Exports']")      
        this.exportProducts = page.locator("//a[normalize-space()='Export Products']")
        this.productWIP = page.locator("//a[text()='Product WIP']")
        this.productAdmin = page.locator("//a[text()='Product Admin']")

        //Icon
        this.chevronLeft = page.locator("//span[class='p-input-icon text-[10px] pi pi-chevron-left']")
        this.filterArrow = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])")
        this.productAdminFilterArrow = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])[2]");
        this.kebabMenu = page.locator("//tbody/tr[3]/td[1]/div[1]/div[1]/button[1]/span[1]")
        this.Edit = page.locator("//button[normalize-space()='Edit']")
        this.Sort = page.locator("//th[2]//div[1]//span[2]//*[name()='svg']")
        this.selectSupplier = page.locator("//div[@name='SupplierId']")
        this.selectBrand=page.locator("//div[@name='BrandId']")
        this.notes=page.locator("//span[@class='p-button-icon pi pi-comments']")
        this.download = page.locator("//i[@class='pi pi-download text-xl text-green-700']")
        this.remove = page.locator("//i[@class='pi pi-times text-xl text-red-700']")
        this.masterCategoryArrow = page.locator("//tbody/tr[1]/td[1]/button[1]/i[1]")
        

        //Btn
        this.sign_In = page.locator("(//input[@name='signInSubmitButton'])[2]")
        this.Profile = page.locator("//p[text()='ONA Super Admin']")
        this.Save = page.locator("//button[normalize-space()='Save']")
        this.Filter = page.locator("//button[normalize-space()='Filter']")
        this.Reset = page.locator("//button[normalize-space()='Reset']")
        this.uploadImage = page.locator("//button[text()='Upload Image']")
        this.uploadVideo = page.locator("//button[text()='Upload Video']")
        this.productMedia = page.locator("//a[text()='Product Media']");
        this.submit = page.locator("//span[text()='Submit']");
        this.addProductsWIP = page.locator("//div[text() = ' Add Products WIP']")
        
        
        //this.Profile = page.locator("//div.border-2.rounded-full.border-primary-50.bg-[#F59E0B].text-white");

        this.signOut = page.locator("//button[normalize-space()='Sign Out']")
        this.addNote=page.locator("//button[normalize-space()='Add Note']")
        
       //dropdownOption
       this.artistic = page.locator("//span[text()='Artistic']")
       this.absto = page.locator("//span[text()='ABSTO']")

      
       
    }

    //Link
    async Link(linkName: String) {

        if (linkName === "addBrand") {
            await this.addBrand.click();
        }
        else if (linkName === "brandInfo") {
            await this.brandInfo.click();
        }
        else if (linkName === "addProduct") {
            await this.addProduct.click();
        }
        else if (linkName === "addCatalogue") {
            await this.addCatalogue.click();
        }
        else if (linkName === "lookupCategory") {
            await this.lookupCategory.click();
        }
        else if (linkName === "masterCategory") {
            await this.masterCategory.click();
        }
        else if (linkName === "iQCategory") {
            await this.iQCategory.click();
        }
        else if (linkName === "pastelCategory") {
            await this.pastelCategory.click();
        }
        else if (linkName === "auditLog") {
            await this.auditLog.click();
        }
        if (linkName === "configCodes") {
            await this.configCodes.click();
        }
        if (linkName === "productInfo") {
            await this.productInfo.click();
        }
    }

    //Tab
    async Tab(str: string): Promise<void> {

        if (str === "Dashboard") {
            await this.Dashboard.click();
        }
        if (str === "Brands") {
            await this.Brands.click();
        }
        else if (str === "Products") {
            await this.Products.click();
        }
        else if (str === "Catalogues") {
            await this.Catalogues.click();
        }
        else if (str === "groupSettings") {
            await this.groupSettings.click();
        }

        else if (str === "Imports") {
            await this.Imports.click();
        }
        else if (str === "Exports") {
            await this.Exports.click();
        }
        else if (str === "productWIP") {
            await this.productWIP.click();
        }
        else if (str === "productAdmin") {
            await this.productAdmin.click();
        }
        else if (str === "productMedia") {
            await this.productMedia.click();
        }
        else if (str === "exportProducts") {
            await this.exportProducts.click();
        }
    }

    //Icon
    async Icon(str: string): Promise<void> {
        if (str === "chevronLeft") {
            await this.chevronLeft.click();
        }
        else if (str === "filterArrow") {
            await this.filterArrow.click();
        }
        else if (str === "productAdminFilterArrow") {
            await this.productAdminFilterArrow.click();
        }
        else if (str === "kebabMenu") {
            await this.kebabMenu.click();
        }
        else if (str === "Edit") {
            await this.Edit.click();
        }
        else if (str === "Sort") {
            await this.Sort.click();
        }
        else if (str === "selectSupplier") {
            await this.selectSupplier.click();
        }
        else if (str === "selectBrand") {
            await this.selectBrand.click();
        }
        else if (str === "notes") {
        await this.notes.click();
        }
        else if (str === "download") {
            await this.download.click();
        }
        else if (str === "remove") {
            await this.remove.click();
        }
        
        else if (str === "masterCategoryArrow") {
            await this.masterCategoryArrow.click();
        }

    }

    //Btn
    async Btn(str: string): Promise<void> {

        if (str === "sign_In") {
            await this.sign_In.click();
        }
        else if (str === "Profile") {
            await this.Profile.click();
        }
        else if (str === "Save") {
            await this.Save.click();
        }
        else if (str === "Filter") {
            await this.Filter.click();
        }

        else if (str === "Reset") {
            await this.Reset.click();
        }
        else if (str === "signOut") {
            await this.signOut.click();
        }
        else if (str === "addNote") {
            await this.addNote.click();
        }
        else if (str === "refresh") {
            await this.refresh.click();
        }
        else if (str === "uploadImage") {
            await this.uploadImage.click();
        }
        else if (str === "uploadVideo") {
            await this.uploadVideo.click();
        }
        else if (str === "submit") {
            await this.submit.click();
        }
        else if (str === "addProductsWIP") {
            await this.addProductsWIP.click();
        }
        else if (str === "exportDataButton") {
            await this.exportDataButton.click();
        }
        

    }

    //dropdownOption
    async dropdownOption(str: string): Promise<void> {

        if (str === "artistic") {
            await this.artistic.click();
        }
        if (str === "absto") {
            await this.absto.click();
        }
    }

    // Export Products methods
    async clickExportDataButton() {
        await this.exportDataButton.click();
    }

    async clickClearFiltersButton() {
        await this.clearFiltersButton.click();
    }

    // Generic dropdown selection method
    async selectFromDropdown(dropdownLocator: Locator, optionText: string, timeout: number = 5000) {
        try {
            // Click the dropdown to open it
            await dropdownLocator.click();
            
            // Wait for the dropdown panel to be visible
            await this.page.waitForSelector('.p-multiselect-panel', { state: 'visible', timeout });
            
            // Use a more specific locator for the option
            const optionLocator = this.page.locator(`//div[contains(@class, "p-multiselect-panel")]//li[contains(@class, "p-multiselect-item")]//span[text()="${optionText}"]`);
            
            // Wait for the option to be visible and click it
            await optionLocator.waitFor({ state: 'visible', timeout });
            await optionLocator.click();
            
            // Wait for the dropdown panel to disappear (indicating selection is complete)
            await this.page.waitForSelector('.p-multiselect-panel', { state: 'hidden', timeout });
            
            console.log(`Successfully selected option "${optionText}" from dropdown`);
            return true;
        } catch (error) {
            console.error(`Failed to select option "${optionText}" from dropdown:`, error);
            return false;
        }
    }

    // Super generic dropdown selection method that can be used for any dropdown
    async selectOptionFromAnyDropdown(dropdownSelector: string, optionText: string, timeout: number = 5000) {
        try {
            // Create a locator for the dropdown
            const dropdownLocator = this.page.locator(dropdownSelector);
            
            // Click the dropdown to open it
            await dropdownLocator.click();
            
            // Wait for the dropdown panel to be visible
            await this.page.waitForSelector('.p-multiselect-panel', { state: 'visible', timeout });
            
            // Use a more specific locator for the option
            const optionLocator = this.page.locator(`//div[contains(@class, "p-multiselect-panel")]//li[contains(@class, "p-multiselect-item")]//span[text()="${optionText}"]`);
            
            // Wait for the option to be visible and click it
            await optionLocator.waitFor({ state: 'visible', timeout });
            await optionLocator.click();
            
            // Wait for the dropdown panel to disappear (indicating selection is complete)
            await this.page.waitForSelector('.p-multiselect-panel', { state: 'hidden', timeout });
            
            console.log(`Successfully selected option "${optionText}" from dropdown with selector "${dropdownSelector}"`);
            return true;
        } catch (error) {
            console.error(`Failed to select option "${optionText}" from dropdown with selector "${dropdownSelector}":`, error);
            return false;
        }
    }

    // Specific dropdown selection methods using the generic method
    async selectSupplierOption(optionText: string) {
        return await this.selectFromDropdown(this.supplierDropdown, optionText);
    }

    async selectProductStatusOption(optionText: string) {
        return await this.selectFromDropdown(this.productStatusDropdown, optionText);
    }

    async selectBrandOption(optionText: string) {
        return await this.selectFromDropdown(this.brandDropdown, optionText);
    }

    async selectPrimaryCategoryOption(optionText: string) {
        return await this.selectFromDropdown(this.primaryCategoryDropdown, optionText);
    }

    async selectCatalogueTypeOption(optionText: string) {
        return await this.selectFromDropdown(this.catalogueTypeDropdown, optionText);
    }

    //checkboxOption

    // async checkboxOption(str:string, page:Page): Promise<void{

    //      await page.locator("//tbody/tr");
    
    // }


}


        


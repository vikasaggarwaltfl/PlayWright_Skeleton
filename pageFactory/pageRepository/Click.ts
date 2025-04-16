import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import { info } from 'console';
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
    private readonly addPastelProduct: Locator
    private readonly auditLog: Locator
    private readonly configCodes: Locator
    private readonly productInfo: Locator
   
    
   
    // Export Products locators
    private readonly exportDataButton: Locator
    private readonly clearFiltersButton: Locator
    public readonly supplierDropdown: Locator
    private readonly statusesDropdown: Locator
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
    private readonly exportProductPrices: Locator
    private readonly exportIQProducts: Locator
    private readonly exportPastelProducts: Locator
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
    private readonly primaryCategoryFilterArrow: Locator
    
    
   
    
    
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
    private readonly view: Locator
    private readonly delete: Locator
    private readonly subDelete: Locator
    private readonly reject: Locator
    private readonly accept: Locator

    

    //dropdownOption
    private readonly artistic: Locator
    private readonly absto: Locator
    private readonly businessTechnology: Locator

    

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context

        //Link
        this.addBrand = page.locator("//div[@class='flex flex-row items-center gap-2']");
        this.brandInfo = page.locator("//a[normalize-space()='ABSTO']")

        this.addProduct = page.locator('a:has-text("Add Product")')
        this.addCatalogue = page.locator('a:has-text("Add Catalogue")')
        this.lookupCategory = page.locator('a:has-text("Lookup Category")')
        //this.masterCategory = page.locator('a:has-text("Master Category")')
        this.masterCategory = page.locator("//a[text()='Master Product Category Setup']")
        this.iQCategory = page.locator('a:has-text("IQ Category")')
       // this.pastelCategory = page.locator('a:has-text("Pastel Category")')
        this.pastelCategory = page.locator("//a[text()='Pastel Product Category Setup']")
        this.addPastelProduct = page.locator("//div[text()=' Add Pastel Product Category']")
        this.auditLog = page.locator('a:has-text("Audit Log")')
        this.configCodes = page.locator('a:has-text("Config Codes")')
        this.productInfo = page.locator("//a[text()='Absto007']")
       
        
        // Initialize Export Products locators
        this.exportDataButton = page.locator('button:has-text("Export Data")')
        this.clearFiltersButton = page.locator('button:has-text("Clear Filters")')
        this.supplierDropdown = page.locator('//div[@title="Supplier"]//div//div[@class="p-multiselect-label-container"]')
        this.statusesDropdown = page.locator('//div[@title="Statuses"]//div//div[@class="p-multiselect-label-container"]')
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
        this.exportProductPrices = page.locator("//a[normalize-space()='Export Prices']")
        this.exportIQProducts = page.locator("//a[normalize-space()='Export IQ']")
        this.exportPastelProducts = page.locator("//a[normalize-space()='Export Pastel']")
        this.productWIP = page.locator("//a[text()='Product WIP']")
        this.productAdmin = page.locator("//a[text()='Product Admin']")

        //Icon
        this.chevronLeft = page.locator("//span[class='p-input-icon text-[10px] pi pi-chevron-left']")
        this.filterArrow = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])")
        this.productAdminFilterArrow = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])[2]");
        this.kebabMenu = page.locator("//tbody/tr[3]/td[1]/div[1]/div[1]/button[1]/span[1]")
        this.Edit = page.locator("//button[normalize-space()='Edit']")
        this.Sort = page.locator("//th[2]//div[1]//span[2]//*[name()='svg']")
        this.selectSupplier = page.locator("//div[@name='Supplier']")
        this.selectBrand=page.locator("//div[@name='BrandId']")
        this.notes=page.locator("//span[@class='p-button-icon pi pi-comments']")
        this.download = page.locator("//i[@class='pi pi-download text-xl text-green-700']")
        this.remove = page.locator("//i[@class='pi pi-times text-xl text-red-700']")
        this.masterCategoryArrow = page.locator("//tbody/tr[1]/td[1]/button[1]/i[1]")
        this.primaryCategoryFilterArrow = page.locator("(//div[@class='p-dropdown-trigger'])[1]")
        

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
        this.view = page.locator("//div[text()='View']")
        this.delete = page.locator("//span[text()='Delete']")
        this.subDelete = page.locator("(//span[@class='p-button-label'][normalize-space()='Delete'])[1]")
        this.reject = page.locator("//button[text()=' Reject']")
        this.accept = page.locator("//button[text()=' Accept']")

        
        //this.Profile = page.locator("//div.border-2.rounded-full.border-primary-50.bg-[#F59E0B].text-white");

        this.signOut = page.locator("//button[normalize-space()='Sign Out']")
        this.addNote=page.locator("//button[normalize-space()='Add Note']")
        
       //dropdownOption
       this.artistic = page.locator("//span[text()='Artistic']")
       this.absto = page.locator("//span[text()='ABSTO']")
       this.businessTechnology = page.locator("//span[text()='Business Technology']")

      
       
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
        else if (linkName === "addPastelProduct") {
            await this.addPastelProduct.click();
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
        else if (str === "exportProductPrices") {
            await this.exportProductPrices.click();
        }else if (str === "exportIQProducts") {
            await this.exportIQProducts.click();
        }else if (str === "exportPastelProducts") {
            await this.exportPastelProducts.click();
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
        else if (str === "primaryCategoryFilterArrow") {
            await this.primaryCategoryFilterArrow.click();
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
        else if (str === "view") {
            await this.view.click();
        }
        else if (str === "delete") {
            await this.delete.click();
        }
        else if (str === "subDelete") {
            await this.subDelete.click();
        }
        else if (str === "reject") {
            await this.reject.click();
        }
        
        else if (str === "accept") {
            await this.accept.click();
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
        if (str === "businessTechnology") {
            await this.businessTechnology.click();
        }
    }
    
    // Export Products --------------------------------------------------------------------------------------------------------------------------
    async clickExportDataButton() {
        await this.exportDataButton.click();
    }

    async clickClearFiltersButton() {
        await this.clearFiltersButton.click();
    }

    //Select Dropdown Option from any dropdown-----------------------------------------------------------------------------------------------------

    public async selectDropdownOption(dropdownLocator: Locator, optionText: string, timeout: number = 10000): Promise<boolean> {
        try {
            await dropdownLocator.click();
            await this.page.waitForSelector('//div[contains(@class, "p-multiselect-panel")]', { 
                state: 'visible', 
                timeout: timeout 
            });
            const optionLocator = this.page.locator(`//div[contains(@class, "p-multiselect-panel")]//li[contains(@class, "p-multiselect-item")]//span[text()="${optionText}"]`);
            await optionLocator.waitFor({ state: 'visible', timeout: timeout });
            await optionLocator.click();
            const closeDropdown = this.page.locator('//button[@aria-label="Close"]//*[name()="svg"]');
            await closeDropdown.click();
            await this.page.waitForSelector('//div[contains(@class, "p-multiselect-panel")]', { 
                state: 'hidden', 
                timeout: timeout 
            });
            console.log(`Successfully selected option: ${optionText}`);
            return true;
        } catch (error) {
            console.error(`Error selecting option ${optionText}:`, error);
            return false;
        }
    }
}


        


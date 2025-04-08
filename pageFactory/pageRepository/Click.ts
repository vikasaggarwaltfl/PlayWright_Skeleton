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
   

    //Tab 
    private readonly Dashboard: Locator
    private readonly Brands: Locator
    private readonly Products: Locator
    private readonly Catalogues: Locator
    private readonly groupSettings: Locator
    private readonly Imports: Locator
    private readonly Exports: Locator
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
    //private readonly pagination: Locator;
   
    
    
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
    private readonly submit: Locator
    private readonly addProductsWIP: Locator

    //dropdownOption
    private readonly artistic: Locator
    private readonly absto: Locator

    

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context

        //Link
        this.addBrand = page.locator("//div[text()=' Add Brand']")
        this.brandInfo = page.locator("//a[normalize-space()='ABSTO']")
        this.addProduct = page.locator("//div[text()=' Add Product']")
        this.addCatalogue = page.locator("//div[text()=' Add Catalogues']")
        this.lookupCategory = page.locator("//a[normalize-space()='Lookup Category Setup']")
        this.masterCategory = page.locator("//a[normalize-space()='Master Product Category Setup']")
        this.iQCategory = page.locator("//a[normalize-space()='IQ Product Category Setup']")
        this.pastelCategory = page.locator("//a[normalize-space()='Pastel Product Category Setup']")
        this.auditLog = page.locator("//a[normalize-space()='Audit Log']")
        this.configCodes = page.locator("//a[normalize-space()='Config Codes']")
        this.productInfo = page.locator("//a[text()='Absto007']")
        

        //Tab
        this.Dashboard = page.locator("//span[text()='DashbproductInfooard']")
        this.Brands = page.locator("//span[text()='Brands']")
        this.Products = page.locator("//span[text()='Products']")
        this.Catalogues = page.locator("//span[text()='Catalogues']")
        this.groupSettings = page.locator("//span[text()='Group Settings']")
        this.Imports = page.locator("//span[text()='Imports']")
        this.Exports = page.locator("//span[text()='Exports']")
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
        //this.pagination = page.locator(".p-paginator-page");
        

        //Btn
        this.sign_In = page.locator("(//input[@name='signInSubmitButton'])[2]")
        this.Profile = page.locator("//p[text()='ONA Super Admin']")
        this.Save = page.locator("//button[normalize-space()='Save']")
        this.Filter = page.locator("//button[normalize-space()='Filter']")
        this.Reset = page.locator("//button[normalize-space()='Reset']")
        this.uploadImage = page.locator("//button[text()='Upload Image']")
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
        else if (str === "submit") {
            await this.submit.click();
        }
        else if (str === "addProductsWIP") {
            await this.addProductsWIP.click();
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


    
    //checkboxOption

    // async checkboxOption(str:string, page:Page): Promise<void{

    //      await page.locator("//tbody/tr");
    
    // }


}


        


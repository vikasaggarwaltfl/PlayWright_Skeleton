import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
dotenv.config()

export class Click {
    readonly page: Page
    readonly context: BrowserContext
    private readonly submitBtn: Locator
    private readonly AddBrand: Locator;
    private readonly Save: Locator;
    private readonly ProductFilter: Locator;
    private readonly ProductReset: Locator;
    private readonly SortBrand: Locator;
    private readonly Filter: Locator;
    private readonly OpenBrandDetails: Locator;
    private readonly BrandActions: Locator;
    private readonly EditBrand: Locator;
    private readonly SaveEditedBrand: Locator
    private readonly LookupCategory: Locator
    private readonly MasterCategory: Locator
    private readonly IQCategory: Locator
    private readonly PastelCategory: Locator
    private readonly AuditLog: Locator
    private readonly ConfigCodes: Locator
    private readonly Products: Locator;
    private readonly ProductFilterArrow: Locator;
    private readonly ArtisticProduct: Locator;
    //tab names
    private readonly Catalogues: Locator
    private readonly Imports: Locator
    private readonly Suppliers: Locator
    private readonly Brands: Locator
    private readonly GroupSettings: Locator
    //Icons names



    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.submitBtn = page.locator(
            "div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']",
        )

        
        
        this.Products= page.locator("(//span[normalize-space()='Products'])[1]")
        this.ProductFilterArrow = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])[1]")
        this.ProductFilter = page.locator("(//button[normalize-space()='Filter'])[1]")
        this.ProductReset = page.locator(" (//button[normalize-space()='Reset'])[1]")
       
       
        this.AddBrand = page.locator("//div[text()=' Add Brand']")
        this.Save = page.locator('button', { hasText: 'Save' });
        this.SortBrand = page.locator("//th[2]//div[1]//span[2]//*[name()='svg']")
        
        this.Filter = page.locator("//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90']")
        this.OpenBrandDetails = page.locator("//a[normalize-space()='ABSTO']")
        this.BrandActions = page.locator("//tbody/tr[3]/td[1]/div[1]/div[1]/button[1]/span[1]")
        this.EditBrand = page.locator("//button[normalize-space()='Edit']")
        this.SaveEditedBrand = page.locator("//span[normalize-space()='Save']")
       
        this.LookupCategory = page.locator("//a[normalize-space()='Lookup Category Setup']")
        this.MasterCategory = page.locator("//a[normalize-space()='Master Product Category Setup']")
        this.IQCategory = page.locator("//a[normalize-space()='IQ Product Category Setup']")
        this.PastelCategory = page.locator("//a[normalize-space()='Pastel Product Category Setup']")
        this.AuditLog = page.locator("//a[normalize-space()='Audit Log']")
        this.ConfigCodes = page.locator("//a[normalize-space()='Config Codes']")
        this.ArtisticProduct = page.locator("//a[normalize-space()='3M087427']")
//tabs 

this.Brands = page.locator("//span[text()='Brands']")
this.GroupSettings = page.locator("//span[text()='Group Settings']")
this.Imports = page.locator("//span[text()='Imports']")
this.Catalogues = page.locator("//span[text()='Catalogues']")
this.Suppliers = page.locator("//span[text()='Suppliers']")
        
    }


    async Btn(str: string): Promise<void> {

        if (str === "Signin") {
            await this.submitBtn.click();
        }
        else if (str === "Save") {
            await this.Save.click();
        }
        else if (str === "ProductFilter") {
            await this.ProductFilter.click();
        }
        else if (str === "ProductReset") {
            await this.ProductReset.click();
        }
        
        else if (str === "EditBrand") {
            await this.EditBrand.click();
        }
        else if (str === "BrandInfo") {
            await this.BrandInfo.click();
        }
        
    }



    async icon(str: string): Promise<void> {
        if (str === "login") {
            await this.submitBtn.click();
        }
        else if (str === "SortBrand") {
            await this.SortBrand.click();
        }
        else if (str === "BrandActions") {
            await this.BrandActions.click();
        }
        
        else if (str === "FilterArrow") {
            await this.FilterArrow.click();
        }
        
        
    }


    async tabs(str: string): Promise<void> {

        if (str === "Brands") {
            await this.Brands.click();
        }
        else if (str === "GroupSettings") {
            await this.GroupSettings.click();
        }
        else if (str === "Catalogues") {
            await this.Catalogues.click();
        }
        else if (str === "Imports") {
            await this.Imports.click();
        }
        else if (str === "Suppliers") {
            await this.Suppliers.click();
        }
    }

    async link(linkName: String) {

        if (linkName === "AddBrand") {
            await this.AddBrand.click();
        }
        else if (linkName === "OpenBrandDetails") {
            await this.OpenBrandDetails.click();
        }
        else if (linkName === "LookupCategory") {
            await this.LookupCategory.click();
        }
        else if (linkName === "MasterCategory") {
            await this.MasterCategory.click();
        }
        else if (linkName === "IQCategory") {
            await this.IQCategory.click();
        }
        else if (linkName === "PastelCategory") {
            await this.PastelCategory.click();
        }
        else if (linkName === "AuditLog") {
            await this.AuditLog.click();
        }
        else if (linkName === "ConfigCodes") {
            await this.ConfigCodes.click();
        }
        if (linkName === "Products") {
            await this.Products.click();
        }
        
        
        if (linkName === "Products") {
            await this.Products.click();
        }

        else if (linkName === "ArtisticProduct") {
            await this.ArtisticProduct.click();
            
        }
        
    }

    
}


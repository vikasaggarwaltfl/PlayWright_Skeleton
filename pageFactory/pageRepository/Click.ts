import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
dotenv.config()

export class Click {
    readonly page: Page
    readonly context: BrowserContext
    private readonly submitBtn: Locator
    private readonly Brands: Locator
    private readonly AddBrand: Locator;
    private readonly Save: Locator;
    private readonly ProductFilter: Locator;
    private readonly ProductReset: Locator;
    private readonly SortBrand: Locator;
    private readonly FilterBrand: Locator;
    private readonly OpenBrandDetails: Locator;
    private readonly BrandActions: Locator;
    private readonly EditBrand: Locator;
    private readonly SaveEditedBrand: Locator
    private readonly GroupSettings: Locator
    private readonly LookupCategory: Locator
    private readonly MasterCategory: Locator
    private readonly IQCategory: Locator
    private readonly PastelCategory: Locator
    private readonly AuditLog: Locator
    private readonly ConfigCodes: Locator


    // private readonly dashboard: Locator
    // private readonly member: Locator
    // private readonly suppliers: Locator
    // private readonly products: Locator
    // private readonly catalogues: Locator
    // private readonly ona_staff: Locator
    // private readonly imports: Locator
    // private readonly filterDropDown: Locator
    // private readonly profileBtn: Locator
    // private readonly sideMenuSlider: Locator
    // private readonly signOutBtn: Locator
    // private readonly MasterProductCategorySetup: Locator;
    // private readonly saveProdcutCatogerySetup: Locator;
    // private readonly addProdcutCatogerySetup: Locator;
    // private readonly IQProductCategorySetup: Locator;
    // private readonly paginatorToLast: Locator;
    // private readonly ProductTab: Locator;
    // private readonly ProductMedia: Locator;
    // private readonly ProductWIP: Locator;
    // private readonly uploadVideo: Locator;
    // private readonly productMediaCode: Locator;
    
    // private readonly BrandDropBox: Locator;
    //private readonly ClickProfileButton: Locator;
   
    //private readonly PasswordSubmit: Locator;
    private readonly Products: Locator;
    private readonly ProductFilterArrow: Locator;
    private readonly ArtisticProduct: Locator;
    //private readonly clickproductFilterBtn: Locator;
    //private readonly clickProductResetBtn: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.submitBtn = page.locator(
            "div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']",
        )

        
        //this.ClickProfileButton = page.locator("//p[text()='ONA Super Admin']")
       
        this.Products= page.locator("(//span[normalize-space()='Products'])[1]")
        this.ProductFilterArrow = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])[1]")
        this.ProductFilter = page.locator("(//button[normalize-space()='Filter'])[1]")
        this.ProductReset = page.locator(" (//button[normalize-space()='Reset'])[1]")
        //this.PasswordSubmit=page.locator("//span[@class='p-button-label']")

        this.Brands = page.locator("//span[text()='Brands']")
        this.AddBrand = page.locator("//div[text()=' Add Brand']")
        this.Save = page.locator('button', { hasText: 'Save' });
        this.SortBrand = page.locator("//th[2]//div[1]//span[2]//*[name()='svg']")
        this.FilterBrand = page.locator("//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90']")
        this.OpenBrandDetails = page.locator("//a[normalize-space()='ABSTO']")
        this.BrandActions = page.locator("//tbody/tr[3]/td[1]/div[1]/div[1]/button[1]/span[1]")
        this.EditBrand = page.locator("//button[normalize-space()='Edit']")
        this.SaveEditedBrand = page.locator("//span[normalize-space()='Save']")
        this.GroupSettings = page.locator("//div[text()='Group Settings']")
        this.LookupCategory = page.locator("//a[normalize-space()='Lookup Category Setup']")
        this.MasterCategory = page.locator("//a[normalize-space()='Master Product Category Setup']")
        this.IQCategory = page.locator("//a[normalize-space()='IQ Product Category Setup']")
        this.PastelCategory = page.locator("//a[normalize-space()='Pastel Product Category Setup']")
        this.AuditLog = page.locator("//a[normalize-space()='Audit Log']")
        this.ConfigCodes = page.locator("//a[normalize-space()='Config Codes']")
        this.ArtisticProduct = page.locator("//a[normalize-space()='3M087427']")

        // this.dashboard = page.locator("//div[text()='Dashboard']")
        // this.member = page.locator("//div[text()='Members']")
        // this.suppliers = page.locator("//div[text()='Suppliers']")
        // this.products = page.locator("//div[text()='Products']")
        // this.catalogues = page.locator("//div[text()='Catalogues']")
        // this.ona_staff = page.locator("//div[text()='ONA Staff']")
        // this.imports = page.locator("//div[text()='Imports']")
        // this.filterDropDown = page.locator("//button[@class='flex items-center justify-center w-4 h-4']")
        // this.profileBtn = page.locator("//p[text()='ONA Super Admin']");
        // this.sideMenuSlider = page.locator("//button[@type='button']")
        // this.signOutBtn = page.locator("//span[text()='Sign Out']")
        // this.MasterProductCategorySetup = page.locator("//a[text()='Master Product Category Setup']")
        // this.saveProdcutCatogerySetup = page.locator("//span[text()='Save']")
        // this.addProdcutCatogerySetup = page.locator("//span[text()='Add']")
        // this.IQProductCategorySetup = page.locator("//a[text()='IQ Product Category Setup']")
        // this.paginatorToLast = page.locator("button[aria-label='Last Page']");
        // this.ProductMedia = page.locator("//a[text()='Product Media']");
        // this.ProductTab = page.locator("//div[text()='Products']");
        // this.ProductWIP = page.locator("//a[text()='Product WIP']");
        // this.uploadVideo = page.locator("//button[text()='Upload Video']")
        // this.productMediaCode = page.locator("//a[text()='SEG1SB']")
        // //this.BrandDropBox = page.locator("//div[text()='Drop files here to upload logo']")
    }


    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.submitBtn.click();
        }
        else if (str === "Save") {
            await this.Save.click();
        }

        // else if (str === "clickProfileButton") {
        //     await this.ClickProfileButton.click();
        // }
        // else if (str === "PasswordSubmit") {
        //     await this.PasswordSubmit.click();
        // }
        else if (str === "ProductFilter") {
            await this.ProductFilter.click();
        }
        else if (str === "ProductReset") {
            await this.ProductReset.click();
        }
        else if (str === "FilterBrand") {
            await this.FilterBrand.click();
        }
        else if (str === "EditBrand") {
            await this.EditBrand.click();
        }
        else if (str === "SaveEditedBrand") {
            await this.SaveEditedBrand.click();
        }


        // else if (str === "ProfileBtn") {
        //     await this.profileBtn.click();
        // }
        // else if (str === "SignoutBtn") {
        //     await this.signOutBtn.click();
        // }
        // else if (str === "saveProdcutCatogerySetup") {
        //     await this.saveProdcutCatogerySetup.click();
        // }
        // else if (str === "addProdcutCatogerySetup") {
        //     await this.addProdcutCatogerySetup.click();
        // }
        // else if (str === "paginatorToLast") {
        //     await this.page.getByRole("button").click();
        //     await this.paginatorToLast.scrollIntoViewIfNeeded();
        //     await this.paginatorToLast.click();
        // }
        // else if (str === "UploadVideo") {
        //     await this.uploadVideo.click();
        // }
        // else if (str === "BrandDropBox") {
        //     await this.BrandDropBox.click();
        // }
        // else if (str === "ProductTab") {
        //     await this.ProductTab.click();
        // }
        // else if (str === "ProductWIP") {
        //     await this.ProductWIP.click();
        // }
    }

    // async Profile() {
    //     await this.page.waitForTimeout(5000);
    //     await this.ClickProfileButton.click();
    //     await this.changePassword.click();
    // }


    async icon(str: string): Promise<void> {
        if (str === "login") {
            await this.submitBtn.click();
        }
        // if (str === "clickProductFilterIcon") {
        //     await this.clickProductFilterIcon.click();
        // }
        if (str === "SortBrand") {
            await this.SortBrand.click();
        }
        if (str === "BrandActions") {
            await this.BrandActions.click();
        }
        // else if (str === "FilterDropDown") {
        //     await this.filterDropDown.click();
        // }
        // else if (str === "MinimizeMenuBtn") {
        //     await this.sideMenuSlider.click();
        // }

        if (str === "ProductFilterArrow") {
            await this.ProductFilterArrow.click();
        }
    }


    async tabs(str: string): Promise<void> {

        if (str === "Brands") {
            await this.Brands.click();
        }
        else if (str === "GroupSettings") {
            await this.GroupSettings.click();
        }

        // if (str === "DashboardTab") {
        //     await this.dashboard.click();
        // }
        // else if (str === "MembersTab") {
        //     await this.member.click();
        // }
        // else if (str === "SuppliersTab") {

        //     await this.suppliers.click();
        // }
        // else if (str === "ProductsTab") {
        //     await this.products.click();
        // }
        // else if (str === "CataloguesTab") {
        //     await this.catalogues.click();
        // }
        // else if (str === "ONAStaffTab") {
        //     await this.ona_staff.click();
        // }
        // 
        // else if (str === "ImportsTab") {
        //     await this.imports.click();
        // }
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
        // if (linkName === "MasterProductCategorySetup") {
        //     await this.MasterProductCategorySetup.click();
        // }
        // else if (linkName === 'IQProductCategorySetup') {
        //     await this.IQProductCategorySetup.click();
        // }
        // else if (linkName === 'ProductMedia') {
        //     await this.ProductMedia.click();
        // }
        // else if (linkName === "productMediaCode") {
        //     await this.productMediaCode.click();
        // }
        
        if (linkName === "Products") {
            await this.Products.click();
        }

        else if (linkName === "ArtisticProduct") {
            await this.ArtisticProduct.click();
            
        }
        
    }

    
}


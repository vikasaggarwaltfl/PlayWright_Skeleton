import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
dotenv.config()

export class Click {
    readonly page: Page
    readonly context: BrowserContext
    private readonly submitBtn: Locator
    private readonly brands: Locator
    private readonly AddnewBrand: Locator;
    private readonly SavenewBrand: Locator;
    private readonly ClickProfileButton: Locator;
    private readonly changePassword: Locator;
    private readonly clickSubmitBtn: Locator;
    private readonly clickproductLink: Locator;
    private readonly clickProductFilterIcon: Locator;
    private readonly clickproductFilterBtn: Locator;
    private readonly clickProductResetBtn: Locator;
    private readonly clickSortBrandIcon: Locator;
    private readonly clickFilterBrandBtn: Locator;
    private readonly clickBrandNameLink: Locator;
    private readonly clickBrandActionsIcon: Locator;
    private readonly clickBrandEditIcon: Locator;
    private readonly SaveEditedBrandBtn: Locator
    private readonly GroupSettingsTab: Locator
    private readonly LookupCatLink: Locator
    private readonly MasterCatLink: Locator
    private readonly IQCatLink: Locator
    private readonly PastelCatLink: Locator
    private readonly AuditLogLink: Locator
    private readonly ConfigCodesLink: Locator

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
    //private readonly BrandDropBox: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.submitBtn = page.locator(
            "div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']",
        )

        this.brands = page.locator("//div[text()='Brands']")
        this.AddnewBrand = page.locator("//div[text()=' Add Brand']")
        this.SavenewBrand = page.locator('button', { hasText: 'Save' });
        this.ClickProfileButton = page.locator("//p[text()='ONA Super Admin']")
        this.changePassword = page.locator("//span[text()='Change Password']")
        this.clickproductLink = page.locator("//div[contains(text(),'Products')]")
        this.clickProductFilterIcon = page.locator("(//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90'])[1]")
        this.clickproductFilterBtn = page.locator("(//button[normalize-space()='Filter'])[1]")
        this.clickProductResetBtn = page.locator("//button[normalize-space()='Reset']")
        this.clickSortBrandIcon = page.locator("//th[2]//div[1]//span[2]//*[name()='svg']")
        this.clickFilterBrandBtn = page.locator("//i[@class='transition-all duration-200 text-[12px] pi pi-chevron-down rotate-90']")
        this.clickBrandNameLink = page.locator("//a[normalize-space()='ABSTO']")
        this.clickBrandActionsIcon = page.locator("//tbody/tr[3]/td[1]/div[1]/div[1]/button[1]/span[1]")
        this.clickBrandEditIcon = page.locator("//button[normalize-space()='Edit']")
        this.SaveEditedBrandBtn = page.locator("//span[normalize-space()='Save']")
        this.GroupSettingsTab = page.locator("//div[text()='Group Settings']")
        this.LookupCatLink = page.locator("//a[normalize-space()='Lookup Category Setup']")
        this.MasterCatLink = page.locator("//a[normalize-space()='Master Product Category Setup']")
        this.IQCatLink = page.locator("//a[normalize-space()='IQ Product Category Setup']")
        this.PastelCatLink = page.locator("//a[normalize-space()='Pastel Product Category Setup']")
        this.AuditLogLink = page.locator("//a[normalize-space()='Audit Log']")
        this.ConfigCodesLink = page.locator("//a[normalize-space()='Config Codes']")


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
        else if (str === "SavenewBrand") {
            await this.SavenewBrand.click();
        }

        else if (str === "clickProfileButton") {
            await this.ClickProfileButton.click();
        }

        else if (str === "changePassword") {
            await this.changePassword.click();
        }
        else if (str === "clickSubmitBtn") {
            await this.clickSubmitBtn.click();
        }
        else if (str === "clickProductFilterBtn") {
            await this.clickproductFilterBtn.click();
        }
        else if (str === "clickProductResetBtn") {
            await this.clickProductResetBtn.click();
        }
        else if (str === "clickFilterBrandBtn") {
            await this.clickFilterBrandBtn.click();
        }
        else if (str === "clickBrandEditIcon") {
            await this.clickBrandEditIcon.click();
        }
        else if (str === "SaveEditedBrandBtn") {
            await this.SaveEditedBrandBtn.click();
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

    async gotToProfile() {
        await this.page.waitForTimeout(5000);
        await this.ClickProfileButton.click();
        await this.changePassword.click();
    }


    async icon(str: string): Promise<void> {
        if (str === "login") {
            await this.submitBtn.click();
        }
        if (str === "clickProductFilterIcon") {
            await this.clickProductFilterIcon.click();
        }
        if (str === "clickSortBrandIcon") {
            await this.clickSortBrandIcon.click();
        }
        if (str === "clickBrandActionsIcon") {
            await this.clickBrandActionsIcon.click();
        }
        // else if (str === "FilterDropDown") {
        //     await this.filterDropDown.click();
        // }
        // else if (str === "MinimizeMenuBtn") {
        //     await this.sideMenuSlider.click();
        // }

    }


    async tabs(str: string): Promise<void> {

        if (str === "BrandsTab") {
            await this.brands.click();
        }
        else if (str === "GroupSettingsTab") {
            await this.GroupSettingsTab.click();
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

        if (linkName === "AddnewBrand") {
            await this.AddnewBrand.click();
        }
        else if (linkName === "clickBrandNameLink") {
            await this.clickBrandNameLink.click();
        }
        else if (linkName === "LookupCatLink") {
            await this.LookupCatLink.click();
        }
        else if (linkName === "MasterCatLink") {
            await this.MasterCatLink.click();
        }
        else if (linkName === "MasterCatLink") {
            await this.MasterCatLink.click();
        }
        else if (linkName === "IQCatLink") {
            await this.IQCatLink.click();
        }
        else if (linkName === "PastelCatLink") {
            await this.PastelCatLink.click();
        }
        else if (linkName === "AuditLogLink") {
            await this.AuditLogLink.click();
        }
        else if (linkName === "ConfigCodesLink") {
            await this.ConfigCodesLink.click();
        }
        if (linkName === "clickproductLink") {
            await this.clickproductLink.click();

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
        
        }
    }
} 

import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
import { get } from 'http'
import { waitForDebugger } from 'inspector'
dotenv.config()

export class Click {
    readonly page: Page
    readonly context: BrowserContext
    private readonly submitBtn: Locator
    private readonly dashboard: Locator
    private readonly member: Locator
    private readonly suppliers: Locator
    private readonly brands: Locator
    private readonly products: Locator
    private readonly catalogues: Locator
    private readonly ona_staff: Locator
    private readonly group_settings: Locator
    private readonly imports: Locator
    private readonly filterDropDown: Locator
    private readonly profileBtn: Locator
    private readonly sideMenuSlider: Locator
    private readonly signOutBtn: Locator
    private readonly MasterProductCategorySetup: Locator;
    private readonly saveProdcutCatogerySetup: Locator;
    private readonly addProdcutCatogerySetup: Locator;
    private readonly IQProductCategorySetup: Locator;
    private readonly paginatorToLast: Locator;
    private readonly ProductMedia: Locator;
    private readonly uploadVideo: Locator;
    private readonly productMediaCode: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.submitBtn = page.locator(
            "div[class='modal-content background-customizable modal-content-mobile visible-md visible-lg'] div[class='modal-body'] div div div div input[name='signInSubmitButton']",
        )
        this.dashboard = page.locator("//div[text()='Dashboard']")
        this.member = page.locator("//div[text()='Members']")
        this.suppliers = page.locator("//div[text()='Suppliers']")
        this.brands = page.locator("//div[text()='Brands']")
        this.products = page.locator("//div[text()='Products']")
        this.catalogues = page.locator("//div[text()='Catalogues']")
        this.ona_staff = page.locator("//div[text()='ONA Staff']")
        this.group_settings = page.locator("//div[text()='Group Settings']")
        this.imports = page.locator("//div[text()='Imports']")
        this.filterDropDown = page.locator("//button[@class='flex items-center justify-center w-4 h-4']")
        this.profileBtn = page.locator("//p[text()='Testing']");
        this.sideMenuSlider = page.locator("//button[@type='button']")
        this.signOutBtn = page.locator("//span[text()='Sign Out']")
        this.MasterProductCategorySetup = page.locator("//a[text()='Master Product Category Setup']")
        this.saveProdcutCatogerySetup = page.locator("//span[text()='Save']")
        this.addProdcutCatogerySetup = page.locator("//span[text()='Add']")
        this.IQProductCategorySetup = page.locator("//a[text()='IQ Product Category Setup']")
        this.paginatorToLast = page.locator("button[aria-label='Last Page']");
        this.ProductMedia = page.locator("//a[text()='Product Media']");
        this.uploadVideo = page.locator("//button[text()='Upload Video']")
        this.productMediaCode = page.locator("text=PPVC0001")
    }



    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.submitBtn.click();
        }
        else if (str === "ProfileBtn") {
            await this.profileBtn.click();
        }
        else if (str === "SignoutBtn") {
            await this.signOutBtn.click();
        }
        else if (str === "saveProdcutCatogerySetup") {
            await this.saveProdcutCatogerySetup.click();
        }
        else if (str === "addProdcutCatogerySetup") {
            await this.addProdcutCatogerySetup.click();
        }
        else if (str === "paginatorToLast") {
            // await this.page.getByRole("button").click();
            await this.paginatorToLast.waitFor();
            await this.paginatorToLast.click();
        }
        else if (str === "UploadVideo") {
            await this.uploadVideo.click();
        }
    }


    async icon(str: string): Promise<void> {
        if (str === "login") {
            await this.submitBtn.click();
        }
        else if (str === "FilterDropDown") {
            await this.filterDropDown.click();
        }
        else if (str === "MinimizeMenuBtn") {
            await this.sideMenuSlider.click();
        }
    }


    async tabs(str: string): Promise<void> {

        if (str === "DashboardTab") {
            await this.dashboard.click();
        }
        else if (str === "MembersTab") {
            await this.member.click();
        }
        else if (str === "SuppliersTab") {

            await this.suppliers.click();
        }
        else if (str === "BrandsTab") {
            await this.brands.click();
        }
        else if (str === "ProductsTab") {
            await this.products.click();
        }
        else if (str === "CataloguesTab") {
            await this.catalogues.click();
        }
        else if (str === "ONAStaffTab") {
            await this.ona_staff.click();
        }
        else if (str === "GroupSettingsTab") {
            await this.group_settings.click();
        }
        else if (str === "ImportsTab") {
            await this.imports.click();
        }
    }

    async link(linkName: String) {
        if (linkName === "MasterProductCategorySetup") {
            await this.MasterProductCategorySetup.click();
        }
        else if (linkName === 'IQProductCategorySetup') {
            await this.IQProductCategorySetup.click();
        }
        else if (linkName === 'ProductMedia') {
            await this.ProductMedia.click();
        }
        else if (linkName === "productMediaCode") {
            await this.productMediaCode.click();
        }
    }
} 

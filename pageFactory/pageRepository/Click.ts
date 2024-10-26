import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
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
    private readonly ProductsTab: Locator

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
        this.filterDropDown = page.locator(
            "//button[@class='flex items-center justify-center w-4 h-4']",
        )
        this.profileBtn = page.locator("//p[text()='Testing']");
        this.sideMenuSlider = page.locator("//button[@type='button']")
        this.ProductsTab = page.locator("//div[text()='Products']")
    }



    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.submitBtn.click();
        }
        else if (str === "ProfileBtn") {
            await this.profileBtn.click();
        }
    }

    async link(str: string): Promise<void> {

        if (str === "login") {
            await this.submitBtn.click();
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
} 

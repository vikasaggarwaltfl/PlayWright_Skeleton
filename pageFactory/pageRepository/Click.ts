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
  }

  async Btn(str: String): Promise<void> {
    if (str === 'login') {
      await this.submitBtn.click()
    }
  }

    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.submitBtn.click();
        }
    }

    async link(str: string): Promise<void> {

        if (str === "login") {
            await this.submitBtn.click();
        }
    }
    async icon(str: string): Promise<void> {

  async tabs(str: String): Promise<void> {
    if (str === 'Dashboard') {
      await this.dashboard.click()
    } else if (str === 'Suppliers') {
      await this.suppliers.click()
    } else if (str === 'Brands') {
      await this.brands.click()
    } else if (str === 'Products') {
      await this.products.click()
    } else if (str === 'Catalogues') {
      await this.catalogues.click()
    } else if (str === 'ONA Staff') {
      await this.ona_staff.click()
    } else if (str === 'Group Settings') {
      await this.group_settings.click()
    } else if (str === 'Imports') {
      await this.imports.click()
    }

    async tabs(str: string): Promise<void> {

        if (str === "Dashboard") {
            await this.dashboard.click();
        }

        else if (str === "Members") {
            await this.suppliers.click();
        }
        else if (str === "Suppliers") {

            await this.suppliers.click();
        }
        else if (str === "Brands") {
            await this.brands.click();
        }
        else if (str === "Products") {
            await this.products.click();
        }
        else if (str === "Catalogues") {
            await this.catalogues.click();
        }
        else if (str === "ONA Staff") {
            await this.ona_staff.click();
        }
        else if (str === "Group Settings") {
            await this.group_settings.click();
        }
        else if (str === "Imports") {
            await this.imports.click();
        }
    }
} 

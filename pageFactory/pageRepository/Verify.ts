import { Page, BrowserContext, expect } from '@playwright/test'
// import * as dotenv from 'dotenv'
// dotenv.config()
export class Verify {
  readonly page: Page
  readonly context: BrowserContext

  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
  }
  get SignIn() {
    return this.page.locator(
      'xpath=/html/body/div[1]/div/div[1]/div[2]/div[2]/div[3]/div/div/form/input[3]',
    )
  }
  get Search() {
    return this.page.locator(
      "input[class='p-inputtext p-component text-base bg-white border rounded-md text-neutral-700 border-neutral-200 placeholder:text-neutral-400 placeholder:text-base']",
    )
  }
  async IsTextDisplayed(text: string): Promise<void> {
    await this.Search.fill('hffh')
    if (text === 'Sign in') {
      const buttonText = await this.SignIn.getAttribute('value')
      expect(buttonText).toBe('Sign in')
    }
    if (text === 'Dashbaord') {
      const dashboardText = await this.page.locator('text=Dashboard')
      await expect(dashboardText).toBeVisible({ timeout: 5000 })
    }
    if (text === 'Member') {
      const MemberText = this.page.locator('text=Member')
      await expect(MemberText).toBeVisible({ timeout: 5000 })
    }
    if (text === 'Supplier') {
      const SupplierText = this.page.locator('text=Supplier')
      await expect(SupplierText).toBeVisible({ timeout: 5000 })
    }
    if (text === 'Brand') {
      const BrandText = this.page.locator('text=Brand')
      await expect(BrandText).toBeVisible({ timeout: 5000 })
    }
  }
}

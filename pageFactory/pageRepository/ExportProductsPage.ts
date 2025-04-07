import { Page } from '@playwright/test';

export class ExportProductsPage {
    private page: Page;

    // Locators
    private readonly exportDataButton = 'button:has-text("Export Data")';
    private readonly supplierDropdown = 'select[name="supplier"]';
    private readonly productStatusDropdown = 'select[name="productStatus"]';
    private readonly brandDropdown = 'select[name="brand"]';
    private readonly primaryCategoryDropdown = 'select[name="primaryCategory"]';
    private readonly catalogueTypeDropdown = 'select[name="catalogueType"]';
    private readonly configCodeIdInput = 'input[name="configCodeId"]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToExportPage() {
        await this.page.goto('https://onexweb-uat.officenational.co.za/export/stock_export_view');
    }

    async clickExportDataButton() {
        await this.page.click(this.exportDataButton);
    }

    async selectSupplier(supplier: string) {
        await this.page.selectOption(this.supplierDropdown, supplier);
    }

    async selectProductStatus(status: string) {
        await this.page.selectOption(this.productStatusDropdown, status);
    }

    async selectBrand(brand: string) {
        await this.page.selectOption(this.brandDropdown, brand);
    }

    async selectPrimaryCategory(category: string) {
        await this.page.selectOption(this.primaryCategoryDropdown, category);
    }

    async selectCatalogueType(type: string) {
        await this.page.selectOption(this.catalogueTypeDropdown, type);
    }

    async enterConfigCodeId(configCodeId: string) {
        await this.page.fill(this.configCodeIdInput, configCodeId);
    }

    async clearFilters() {
        await this.page.click('button:has-text("Clear Filters")');
    }
} 
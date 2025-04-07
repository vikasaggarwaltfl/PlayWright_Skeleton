import { test, expect } from '@playwright/test';
import { ExportProductsPage } from '../pageFactory/pageRepository/ExportProductsPage';

test.describe('Export Products Tests', () => {
    let exportProductsPage: ExportProductsPage;

    test.beforeEach(async ({ page }) => {
        exportProductsPage = new ExportProductsPage(page);
        await exportProductsPage.navigateToExportPage();
    });

    test('should export products without filters', async ({ page }) => {
        // Click export data button without applying any filters
        await exportProductsPage.clickExportDataButton();
        
        // Wait for the download to start
        const downloadPromise = page.waitForEvent('download');
        const download = await downloadPromise;
        
        // Verify that a file is being downloaded
        expect(download.suggestedFilename()).toContain('.xlsx');
    });

    test('should export products with filters', async ({ page }) => {
        // Apply some filters
        await exportProductsPage.selectSupplier('Supplier1');
        await exportProductsPage.selectProductStatus('Active');
        await exportProductsPage.selectBrand('Brand1');
        
        // Click export data button
        await exportProductsPage.clickExportDataButton();
        
        // Wait for the download to start
        const downloadPromise = page.waitForEvent('download');
        const download = await downloadPromise;
        
        // Verify that a file is being downloaded
        expect(download.suggestedFilename()).toContain('.xlsx');
    });

    test('should clear filters and export', async ({ page }) => {
        // Apply some filters first
        await exportProductsPage.selectSupplier('Supplier1');
        await exportProductsPage.selectProductStatus('Active');
        
        // Clear filters
        await exportProductsPage.clearFilters();
        
        // Click export data button
        await exportProductsPage.clickExportDataButton();
        
        // Wait for the download to start
        const downloadPromise = page.waitForEvent('download');
        const download = await downloadPromise;
        
        // Verify that a file is being downloaded
        expect(download.suggestedFilename()).toContain('.xlsx');
    });
}); 
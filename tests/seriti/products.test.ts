import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

test('Verify that user can expand "Products" section and the sub option should display as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(5);
    await Verify.IsTextDisplayed(page, "Product Admin");

});

test('Verify that "product details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await Verify.IsTextDisplayed(page, "Products");
});

test('Verify that the user can filter product details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount();
});

test('Verify that the user can reset product details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount();
});

test('Verify that the user can add new product with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addProduct");
    await Actions.enterText("productName", "Test Product");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await Click.dropdown("Product Sub Type", "Driver & Passenger");
    await page.waitForTimeout(2000);
    await Click.dropdown("Administrator", "AA Company");
    await Click.dropdown("Claims", "Bank Of Uae");
    await Click.dropdown("Payment Type", "Single");
    await Click.calendar(1, "2026", "May", 8);
    await Click.dropdown("Underwriter", "Company 2");
    await Click.dropdown("Owner", "Aviva");
    await Click.dropdown("Display Type", "Check Box");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user cannot add new product with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addProduct");
    await Actions.enterText("productName", "Test Product");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Product Type is a required field");
});

test('Verify that the user can edit the product details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("productName", "practise product");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Products saved!");
});

test.skip('Verify that the user can copy the product details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(1000);
    await Click.Btn("save");
    await Click.calendar(1, "2026", "Oct", 22);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

//Products >> Product lines----------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can filter product lines using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productLines");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Click.calendar(1, "2026", "Jan", 22);
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.IsTextDisplayed(page, "No records found..." );
    });

    test('Verify that the user can reset product lines by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
        await Actions.signIn("Automation");
        await Click.Btn("login");
        await Actions.enterText("searchMenu", "Product Admin");
        await Click.tabs("productAdmin");
        await page.waitForLoadState('networkidle');
        await Click.icon("filterArrow");
        await Actions.enterText("productName", "Demo test product");
        await Click.Btn("apply");
        await page.waitForTimeout(1000);
        await Click.icon("edit");
        await Click.tabs("productLines");
        await page.waitForLoadState('networkidle');
        await Click.icon("filterArrow");
        await Click.calendar(1, "2026", "Jan", 22);
        await Click.Btn("apply");
        await page.waitForTimeout(1000);
        await Click.Btn("reset");
        await page.waitForTimeout(5000);
        await Verify.IsTextDisplayed(page, "Active");   
    });

test.skip('Verify that the user can add a product line with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productLines");
    await Click.Btn("add");
    await Click.dropdown("Administrator", "Nolo");
    await Click.dropdown("Owner", "Marsh Administrators"); 
    await page.waitForTimeout(1000);
    await Click.dropdown("Underwriter", "Rivonia Product Owners");
    await Click.calendar(1, "2026", "Aug", 22);
    await Click.icon("productLineClaims");
    await Click.Btn("productLineClaimsDropdownOption");
    await Click.dropdown("Display Type", "Radio Button");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Products (Demo test product)");
});

test('Verify that the user cannot add a product line with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productLines");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Administrator is a required field");
});


test('Verify that the user cannot edit a product line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productLines");
    await Click.icon("futureArrow");
    await Click.icon("edit");
    await Verify.IsTextDisplayed(page, "Edit Product Lines");
});

test('Verify that the user can copy a product line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productLines");
    await Click.icon("futureArrow");
    await Click.icon("productLineCopy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.verifyDatacount();
});

//Products >> Product options----------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can filter product options using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productOptions");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("optionName", "Demo test products");
    await page.waitForTimeout(2000);
    await Click.Btn("apply");
    await Click.Btn("apply");
    await Verify.verifyDatacount();
    });

    test('Verify that the user can reset product options by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {    
        await Actions.signIn("Automation");
        await Click.Btn("login");
        await Actions.enterText("searchMenu", "Product Admin");
        await Click.tabs("productAdmin");
        await page.waitForLoadState('networkidle');
        await Click.icon("filterArrow");
        await Actions.enterText("productName", "Demo test product");
        await Click.Btn("apply");
        await page.waitForTimeout(1000);
        await Click.icon("edit");
        await Click.tabs("productOptions");
        await page.waitForLoadState('networkidle');
        await Click.icon("filterArrow");
        await Actions.enterText("optionName", "Demo test products");
        await page.waitForTimeout(2000);
        await Click.Btn("apply");
        await Click.Btn("apply");
        await Verify.verifyDatacount();
        await Click.Btn("reset");
        await page.waitForTimeout(5000);
        await Verify.verifyDatacount();
    });

    test('Verify that the user can add a product option with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productOptions");
    await Click.Btn("add");
    await Actions.enterText("sortKey", "100");
    await Actions.enterText("optionCode", "Test Code");
    await Actions.enterText("optionName", "Demo Option");
    await Click.dropdown("Option Type", "Standard");
    await Click.checkboxWithoutAll("Transaction Type", "Fleet");
    await Click.calendar(1, "2026", "Dec", 15);
    await Click.Btn("save");
    await Verify.verifyDatacount();
});
    
test('Verify that the user cannot add a product option with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productOptions");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Sort Key is a required field");
});

test('Verify that the user can copy a product option with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productOptions");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Products (Demo test product)");
});

test('Verify that the user can edit a product option', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productOptions");
    await Click.icon("edit");
    await Actions.enterText("sortKey", "101");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "101");
});

//Products >> Product companies----------------------------------------------------------------------------------------------------------------------------


test('Verify that the user can filter product companies using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productCompanies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("Company Type", "Product");
    await page.waitForTimeout(2000);
    await Click.Btn("apply");
    await Verify.verifyDatacount();
});

test('Verify that the user can reset product companies by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productCompanies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await page.waitForTimeout(2000);
    await Actions.enterText("Company Type", "Product");
    await page.waitForTimeout(2000);
    await Click.Btn("apply");
    await Verify.verifyDatacount();
    await page.waitForTimeout(2000);
    await Click.Btn("reset");
    await Verify.verifyDatacount();
});

test('Verify that the user can add a product company with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productCompanies");
    await Click.Btn("add");
    await Click.dropdown("Company Type", "Broker");
    await Click.dropdown("Company", "Company Test");
    await Actions.enterText("companyProductName", "Demo test product");
    await Actions.enterText("companyProductCode", "Demo test product");
    await Click.Btn("save");
    await Verify.verifyDatacount();
});

test('Verify that the user cannot add a product company with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productCompanies");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Company Type is a required field");
});

test.skip('Verify that the user can copy a product company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productCompanies");
    await Click.icon("copy");
    await page.waitForTimeout(2000);
    await Click.icon("selectAll");
    await page.waitForTimeout(2000);
    await Click.Btn("copying");
    await page.waitForTimeout(5000);
    await Click.Btn("save");
    await Verify.verifyDatacount();
});

test('Verify that the user can edit a product company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Demo test product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("productCompanies");
    await Click.icon("edit");
    await Actions.enterText("companyProductCode", "DP001");
    await Click.Btn("save");
    await Verify.verifyDatacount();
});
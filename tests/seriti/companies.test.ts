import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

test('Verify that "company" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await Verify.IsTextDisplayed(page, "Company");
});

test('Verify that the user can filter company using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "practise company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount();
});

test('Verify that the user can reset company by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "practise company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount();
});

test('Verify that the user can add a new company with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addCompany");
    await Click.checkboxWithoutAll("Company Type", ["Finance", "Insurance"]);
    await Actions.enterText("companyName", "Demo Test Company");
    await Actions.enterText("companyCode", "Demo");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved successfully");
});

test('Verify that the user cannot add new company with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addCompany");
    await Actions.enterText("companyName", "Test Company");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Company Code is a required field");
});

test('Verify that the user cannot copy a company with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Password is required");
});

test('Verify that the user can edit a company with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Company testing");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Actions.enterText("bankerLinkExpiryDays", "2");
    await Click.Btn("bankerLinkEnabledYes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company saved!");
});

//Company >> Company Details ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company details with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Demo Test Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDetails");
    await Click.Btn("add");
    await Actions.enterText("companyEmail", "akshaya@testingframeworks.co.uk");
    await Click.calendar(3, "2026", "Aug", 15);
    await Actions.enterText("leadEmail", "akshaya@testingframeworks.co.uk");
    await Actions.enterText("legalName", "Demo Test Company");
    await Click.Btn("save");
    await Click.calendar(2, "2025", "Sep", 15);
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (Demo Test Company)")
});  

test('Verify that the user cannot add company details with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Demo Test Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDetails");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Legal Name is a required field");
});

test('verify that the user can edit the company details with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Demo Test Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDetails");
    await Click.icon("edit");
    await Actions.enterText("companyEmail", "testing123@gmail.com")
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (Demo Test Company)")
});

test('Verify that the user can copy company details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Demo Test Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDetails");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (Demo Test Company)")
});

test('Verify that password generator working as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDetails");
    await Click.Btn("add");
    await page.waitForTimeout(2000);
    const [popup] = await Promise.all([page.waitForEvent('popup'), await Click.link("clickhere")]);
    await Verify.verifyURL(popup, 'https://randomwheel.org/password-generator');

});

test('Verify Document protection is working if it selected as "Yes"', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "Test Company 6");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDetails");
    await Click.Btn("add");
    await page.waitForTimeout(2000);
    await Click.Btn("documentProtectedyes");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, 'Add Company Information');
});

//Company >> groups ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company groups with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyGroups");
    await Click.Btn("add");
    await Click.dropdown("Group", "AATest");
    await Actions.enterText("sortKey", "309");
    await Click.calendar(1, "2026", "Aug", 15);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot add company groups with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyGroups");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Group is a required field");
});

test('Verify that the user can edit company groups with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyGroups");
    await Click.icon("edit");
    await Actions.enterText("sortKey", "310");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company groups', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyGroups");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot delete company groups', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyGroups");
    await Click.icon("delete");
    await page.waitForTimeout(1000);
    await Click.Btn("yes");
    await Verify.IsTextDisplayed(page, "Could not delete record.");
});

test('Verify that the group dropdown is disabled when editing a company group', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyGroups");
    await Click.icon("edit");
    await Verify.verifyDisabledButton("Demo Group");
});

//Company >> branches ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company branches with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyBranches");
    await Click.Btn("add");
    await Click.dropdown("Group", "Group 2");
    await Click.checkboxWithoutAll("Branch", "Branch 2");
    await Actions.enterText("sortKey", "309");
    await Click.calendar(2, "2026", "Oct", 15);
    await Click.Btn("save");
    await Click.calendar(1, "2025", "Aug", 10);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot add company branches with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyBranches");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Group is a required field");
});

test('Verify that the user can edit company branches with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyBranches");
    await Click.icon("edit");
    await Actions.enterText("sortKey", "310");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});


test('Verify that the user can copy company branches', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyBranches");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.checkboxWithoutAll("Branch", "Branch 2");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot delete company branches', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyBranches");
    await Click.icon("delete");
    await page.waitForTimeout(1000);
    await Click.Btn("yes");
    await Verify.IsTextDisplayed(page, "Could not delete record.");
});

//Company >> WebServices ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company web services with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyWebservices");
    await Click.Btn("add");
    await Click.checkboxWithoutAll("Web Service", "Get Transaction Number");
    await Click.calendar(1, "2025", "May", 15);
    await Click.Btn("save");
    await Click.calendar(2, "2026", "Aug", 10);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot add company web services with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyWebservices");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Web Service is a required field");
});

test('Verify that the user cannot duplicate company web services', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyWebservices");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

//Company >> Product Type Mapping ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company product type mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle'); 
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);        
    await Click.icon("edit");
    await Click.tabs("companyProductTypeMapping");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await Actions.enterText("companyProductTypeName", "AA product type");
    await Actions.enterText("companyProductTypeCode", "AA001");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot add company product type mapping with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);        
    await Click.icon("edit");
    await Click.tabs("companyProductTypeMapping");  
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Product Type is a required field");
});

test('Verify that the user can edit company product type mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle'); 
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);        
    await Click.icon("edit");
    await Click.tabs("companyProductTypeMapping");  
    await Click.icon("edit");
    await Click.Btn("bankerLinkEnabledYes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company product type mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");   
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle'); 
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyProductTypeMapping");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

//Company >> Product Sub Type Mapping ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company product sub type mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle'); 
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyProductSubTypeMapping");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await Click.dropdown("Product Sub Type", "Third Party Insurance");
    await Click.dropdown("Product", "Practise product");
    await Actions.enterText("companyProductSubTypeName", "AA product");
    await Actions.enterText("companyProductSubTypeCode", "AA product");
    await Actions.enterText("companyProductNameCode", "AA product");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user cannot add company product sub type mapping with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyProductSubTypeMapping");  
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Product Type is a required field");
});

test('Verify that the user can edit company product sub type mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");   
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyProductSubTypeMapping");
    await Click.icon("edit");
    await Click.Btn("yes");
    await page.waitForTimeout(1000);
    await Click.Btn("yes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company product sub type mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyProductSubTypeMapping");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

//Company >> Validations ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company validations with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyValidations");
    await Click.Btn("add");
    await Click.dropdown("Field Name", "CustomerType");
    await Click.Btn("save");
    await Verify.verifyDatacount();
});

test('Verify that the user cannot add company validations with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyValidations");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Field Name is a required field");
});

test('Verify that the user can edit company validations with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyValidations");
    await Click.icon("edit");
    await Click.Btn("yes");
    await page.waitForTimeout(1000);
    await Click.Btn("yes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company validations', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyValidations");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

//Company >> LookUpData Mapping ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company lookup data mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyLookupDataMapping");
    await Click.Btn("add");
    await Click.dropdown("Static Category", "Industry");
    await Click.dropdown("Static Value", "Advertising");
    await Actions.enterText("staticValueCode", "TC001");
    await Click.Btn("save");
    await Verify.verifyDatacount();
});

test('Verify that the user cannot add company lookup data mapping with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyLookupDataMapping");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Static Category is a required field");
});

test('Verify that the user can edit company lookup data mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyLookupDataMapping");
    await Click.icon("edit");
    await Actions.enterText("staticValueCode", "TC002");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company lookup data mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");   
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyLookupDataMapping");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the "static category" dropdown is disabled when editing a company lookup data mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyLookupDataMapping");
    await Click.icon("edit");
    await Verify.verifyDisabledButton("Industry");
});

//Company >> Vehicle Code Mapping ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company vehicle code mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyVehicleCodeMapping");
    await Click.Btn("add");
    await Click.dropdown("Vehicle Type", "AUTO"); 
    await Actions.enterText("accessoryCode", "AA001");
    await Click.Btn("save");
    await Verify.verifyDatacount();
});

test('Verify that the user cannot add company vehicle code mapping with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyVehicleCodeMapping");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Vehicle Type is a required field");
});

test('Verify that the user can edit company vehicle code mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyVehicleCodeMapping");
    await Click.icon("edit");
    await Actions.enterText("accessoryCode", "AA002");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company vehicle code mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyVehicleCodeMapping");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
}); 

test('Verify that the "vehicle type" dropdown is disabled when editing a company vehicle code mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");  
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyVehicleCodeMapping");
    await Click.icon("edit");
    await Verify.verifyDisabledButton("AUTO");
});

//Company >> Document Category Mapping ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add company document category mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDocumentCategoryMapping");
    await Click.Btn("add");
    await Click.dropdown("Document Category", "Finance");
    await Actions.enterText("documentCategoryCode", "AA001");
    await Click.Btn("save");
    await Verify.verifyDatacount();
}); 

test('Verify that the user cannot add company document category mapping with invalid details', async ({ page, Actions, Click, Verify }) => {    
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDocumentCategoryMapping");
    await Click.Btn("add");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Document Category is a required field");
});

test('Verify that the user can edit company document category mapping with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDocumentCategoryMapping");
    await Click.icon("edit");
    await Actions.enterText("documentCategoryCode", "AA002");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the user can copy company document category mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDocumentCategoryMapping");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company (AA Company)");
});

test('Verify that the "document category" dropdown is disabled when editing a company document category mapping', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("companyName", "AA Company");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.tabs("companyDocumentCategoryMapping");
    await Click.icon("edit");
    await Verify.verifyDisabledButton("Finance");
});
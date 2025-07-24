import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

test('Verify that "group details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details");
});

test('Verify that the user can filter group using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount();
});

test('Verify that the user can reset group by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount();
});

test('Verify that the user cannot add new group with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await Click.Btn("addGroup");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Group Code is a required field");

});

test('Verify that the user can edit the group with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Actions.enterText("defaultPrime", "2")
    await page.waitForLoadState('networkidle');
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details saved!");
});

test('Verify that the user cannot edit the group with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Actions.enterText("defaultPrime", " ")
    await page.waitForLoadState('networkidle');
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Default Prime Adjustment is a required field");
});

test('Verify that the user cannot copy the group with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can navigate through pagination numbers in group page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForLoadState('networkidle');
    await Click.pagination(9);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount();
});

test('Verify that the user can refresh the group page data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await Click.Btn("refresh");
    await page.waitForLoadState('networkidle');
    await Verify.verifyDatacount();
});

test('Verify that the user can sort the group details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

//Group >> Group line-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "groupline" in the addGroupline section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.Btn("add");
    await Click.dropdown("Account Manager", "admin@seritisolutions.com");
    await page.waitForTimeout(2000);
    await Click.dropdown("Marketer", "a1");
    await page.waitForTimeout(1000);
    await Click.dropdown("Approval User Products", "45012741@mylife.unisa.ac.za");
    await page.waitForTimeout(1000);
    await Click.dropdown("Approval User Other", "adamm@financenow.co.nz");
    await page.waitForTimeout(1000);
    await Click.dropdown("Financial Manager", "amal@theelitecars.com");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 25);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "groupline" in the addGroupline section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.Btn("add");
    await Click.dropdown("Account Manager", "admin@seritisolutions.com");
    await page.waitForTimeout(2000);
    await Click.dropdown("Marketer", "a1");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 25);
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Financial Manager is a required field");
});

test('Verify that the user is able to edit a group line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("registeredName", "Group Line 1");
    await page.waitForTimeout(1000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to copy a group line', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await Click.icon("detailsCopy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to sort the group line details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await Click.icon("groupLineFutureArrow");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that the user is able to refresh the group line details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupLine");
    await page.waitForTimeout(2000);
    await Click.Btn("refresh");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

//Group >> Companies-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "company" in the addGroupCompany section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await Click.Btn("add");
    await Click.calendar(2, "2026", "Jul", 26); 
    await Click.dropdown("Company Name", "ABC Company");  
    await Actions.enterText("sortKey", "309");
    await Click.calendar(1, "2025", "Jul", 25); 
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "company" in the addGroupCompany section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await Click.Btn("add");
    await Actions.enterText("sortKey", " "); 
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Company Name is a required field"); 
});

test('Verify that the user is able to edit a groupCompany', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(1000);
    await Click.icon("edit"); 
    await Actions.enterText("sortKey", "310");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to copy a groupCompany', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to sort the groupCompany details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that the user is able to refresh the groupCompany page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupCompanies");
    await page.waitForTimeout(2000);
    await Click.Btn("refresh");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

//Group >> Products-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "product" in the addGroupProduct section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await page.waitForTimeout(1000);
    await Click.calendar(2, "2027", "Jul", 25); 
    await Click.dropdown("Product Sub Type", "Third Party Insurance");
    await Click.dropdown("Product Name", "Practise product");
    await Actions.enterText("sortKey", "309");
    await Click.calendar(1, "2026", "Jul", 25); 
    await Click.dropdown("Require At Inception", "Always");
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "product" in the addGroupProduct section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await Click.Btn("add");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await page.waitForTimeout(1000);
    await Click.dropdown("Product Sub Type", "Third Party Insurance");
    await Click.dropdown("Product Name", "Practise product");
    await Click.calendar(1, "2026", "Jul", 25); 
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Require At Inception is a required field"); 
});

test('Verify that the user is able to edit a groupProduct', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(1000);
    await Click.icon("edit"); 
    await Actions.enterText("sortKey", "310");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "310");
});

test('Verify that the user is able to copy a groupProduct', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Practise product2");
});

test('Verify that the user is able to sort the groupProduct details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(2000);
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that the user is able to refresh the groupProduct page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupProducts");
    await page.waitForTimeout(2000);
    await Click.Btn("refresh");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

//Group >> SSF-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "ssf" in the addGroupSSF section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupSSF");
    await Click.Btn("add");
    await Actions.enterText("transactionFee", "1000");
    await Click.calendar(1, "2026", "Jul", 25); 
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user cannot add a new "ssf" in the addGroupSSF section with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupSSF");
    await Click.Btn("add");
    await Click.calendar(1, "2026", "Jul", 25); 
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Transaction Fee is a required field"); 
});

test('Verify that the user is able to edit a groupSSF', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupSSF");
    await page.waitForTimeout(1000);
    await Click.icon("edit"); 
    await Actions.enterText("transactionFee", "2000");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to copy a groupSSF', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Demo test group");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.tabs("groupSSF");
    await page.waitForTimeout(2000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});
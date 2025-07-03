import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

//login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
});

test('Verify that error message should displayed for Invalid inputs', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn(" ");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, "Username is a required field");
});

// Navigation side bar-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the navigation sidebar is displayed with all required tabs.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, ["Home", "Transaction", "Dashboard"]);
});

test('Verify that clicking on the "Seriti" logo navigates the user to the landing screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(5000);
    await Click.icon("seritiLogo");
    await page.waitForLoadState('networkidle');
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/transaction");
});

test('Verify that the user can search sidebar menu options using the search box.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Verify.IsTextDisplayed(page, "My Reports");
});

test('Verify that the user can sign out by clicking on the "Sign Out" button.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("testingFrameworks");
    await Click.Btn("signOut");
    await Verify.verifyURL(page, "https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
});

test('Verify that correct users name and profile icon is displayed based on the logged-in account.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, "Testing Frameworks");
});

test('Verify that the user can see the profile options by clicking on the users name', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("testingFrameworks");
    await Verify.IsTextDisplayed(page, ["Profile", "Change Password", "Sign Out"]);
});

test('Verify that the country name is displayed when the user hovers over the country profile', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.hover("(//i[@class='fi fi-ae text-3xl'])[1]");
    await Verify.IsTextDisplayed(page, "United Arab Emirates");
});

test('Verify that the user can change the country by selecting from the country options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");  
    await Click.icon("country"); 
    await Click.icon("Swaziland");
    await page.hover("(//i[@class='fi fi-sz text-4xl'])[1]");
    await Verify.IsTextDisplayed(page, "Swaziland");
});

test('Verify that the user can minimize and maximize the sidebar by clicking on icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");   
    await Click.icon("collapse");
    await Click.icon("find");
    await Verify.IsTextDisplayed(page, "Home");
});

test('Verify that sidebar options are highlighted when hovered over', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.mouseHoverTabs(["Home","Dashboard","Transaction","My Reports","Template","Admin"]);
});

test('Verify that the tab names are displayed for all logos in the minimized state', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("collapse");
    await page.hover("//i[@class='pi pi-home']");
    await Verify.IsTextDisplayed(page, "Home");
});

// Transaction page-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Transaction screen is displayed correctly with all expected content.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Verify.IsTextDisplayed(page, ["Transact","Create Transaction","Search","Recent Transactions",]);
});

test('Verify that the user can click on the "Create Transaction" button to create a new transaction', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Select a group", "Select a branch"]);
});

test('Verify that the user can search for transactions using the transaction number in Quick access modal', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281716");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, "Transaction 281716");
});


test('Verify that the user can reset applied search on transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2");
    await Click.dropdown("Select a branch (Blank for All)", "Branch 2");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("resetCriteria");
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");
});

test('Verify that the user can apply multiple filters to search for transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2");
    await Click.dropdown("Select a branch (Blank for All)", "Branch 2");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("search");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(9);
});

test('Verify that the user can minimize the search module', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("filterArrow");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Verify.IsTextDisplayed(page, "Creation Date");
});

test('Verify that the user can view recent transactions by clicking on the "Recent Transactions" button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.link("recentTransactions");
    await page.waitForLoadState('networkidle');
    //await Verify.verifyDatacount(9);
});

test('Verify that user can enter to any transaction by clicking on enter transaction icon', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2");
    await Click.dropdown("Select a branch (Blank for All)", "Branch 2");
    await Click.Btn("search");
    await Click.icon("enterTransaction");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    await Verify.IsTextDisplayed(page, "Transaction");
});

test('Verify that pagination works correctly for navigating through paged content', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(5000);
    await Click.pagination(1);
    await Verify.verifyDatacount(10);
});

//create transaction-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the Create Transaction module is displayed when the user clicks on the "Create Transaction" button.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
   await Verify.IsTextDisplayed(page, ["Select a group","Select a branch"]);
});

test('Verify that the "Customer Type" field allows switching between Individual and Company', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
    await Click.radioButton("Company")
    await Click.radioButton("Individual");
    await Verify.verifyRadioButton("Individual");
});

test('Verify that the user can select a group from the "Group" and "Branch" dropdown when creating a transaction.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Verify.verifyDropDown("`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Verify.verifyDropDown("Branch 2");
});

test('Verify that if user selects "Company" then the label field name should be "Company Name"', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Click.radioButton("Company");
    await Verify.IsTextDisplayed(page, "Company Name");
});

test('Verify that if user selects "Individual" then the label field name should be "Last Name"', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");
    await Click.radioButton("Individual");
    await Verify.IsTextDisplayed(page, "Last Name");
});

test('Verify that all required fields must be filled before clicking the "Create" button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.Btn("clickTransaction")
    await Verify.verifyErrorMessage(page, "Group is a required field"); 
});

test('Verify that the "Branch" dropdown is disabled until a "Group" is selected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await Verify.verifyDisabledButton("Select a branch");
    await Click.dropdown("Select a group", "`Group 2");
    await page.waitForTimeout(2000);
    await Verify.verifyEnabledButton("Select a branch");
});

test.skip("Verify the system's response when entering extremely long text (e.g., 10,000 characters) in the 'Company Name' or 'Last Name' field", async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await page.waitForLoadState('networkidle');
    await Click.dropdown("Select a group", "`Group 2");
    await Click.dropdown("Select a branch", "Branch 2");  
    await Click.radioButton("Company");
    const longText = 'A'.repeat(10000);
    await Actions.enterText("enterCompanyName", longText);
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page, ["Company Name cannot exceed", "Maximum length", "Error", "Invalid", "Saved Successfully"]);
    await Click.radioButton("Individual");
    await Actions.enterText("lastName", longText);
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page, ["Last Name cannot exceed", "Maximum length", "Error", "Invalid", "Saved Successfully"]);
});

//create company deal transaction-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that navbar options are displayed as expected at the top of the screeen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Show Required","Hide Overview","Client Details","Vehicle Details","Account Details"]);
});

test('Verify that the Show Required tab displays only mandatory fields on the form.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.pause();
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Show Required"); 
    await Verify.IsTextDisplayed(page, ["Transaction Status","Finance Status","Transaction Status Notes"]);
    await Click.transactionTabs("Vehicle Details");
    await Verify.IsTextDisplayed(page, "Vehicle Condition");
});

test('Verify that the "Show All" tab displays all fields on the form.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281744");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');  
    await Verify.IsTextDisplayed(page, ["Preferred Contact Time", "Finance Status", "Fleet Number"]); 
});




//reports >> DealTrackerReport-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can check or uncheck multiple checkbox', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.Btn("addDealTrackerReport");
    await Click.icon("cancel");
    await Click.dropdown("Group", "`Group 2");
    await page.waitForTimeout(2000);
    await Click.checkboxWithAll(2, ["Tebogo Lepelle", "Winjit Staging Bm", "Business Manager Staging"]);
    await Verify.IsTextDisplayed(page, ["Tebogo Lepelle", "Winjit Staging Bm", "Business Manager Staging"]);
});

//report scheduler-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user cannot "Add" new Report Scheduler with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.Btn("addReportScheduler");
    await page.waitForTimeout(2000);
    await Click.dropdown("Report Type", "Transaction Document Report");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Document Category is a required field");
});

test('Verify that the user can "Copy" Report Scheduler report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.icon("futureArrow")
    await Click.icon("reportSchedulerCopy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "delete" Report Scheduler report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.icon("futureArrow")
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    //await Verify.verifyDatacount(3);
});

test('Verify that the user can "edit" Report Scheduler report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await page.waitForLoadState('networkidle');
    await Click.icon("futureArrow")
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2026", "Oct", 20);
    await page.waitForTimeout(2000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Report Scheduler saved!");
});

test('Verify that the user can filter Report Scheduler records and data grid gets updated', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await page.waitForLoadState('networkidle');
    await Click.icon("futureArrow")
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("reportName", "Practise test");
    await Click.Btn("apply");
    //await Verify.verifyDatacount(3);
});

test('Verify that the user can reset Report Scheduler records and data grid gets updated', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await page.waitForLoadState('networkidle');
    await Click.icon("futureArrow")
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("reportName", "Practise test");
    await Click.Btn("apply");
    await Click.Btn("reset");
    //await Verify.verifyDatacount(3);
});

//Template-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can "Add" new Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.Btn("addTemplate");
    await page.waitForTimeout(2000);
    await Click.dropdown("Template Category", "Record of advice");
    await Actions.enterText("templateName", "Template3");
    await Actions.enterText("reportHeading", "Template3 Heading");
    await Click.Btn("yes");
    await Click.calendar(1, "2025", "Jul", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Oct", 26);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can filter template details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("templateName", "my template");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset template details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("templateName", "my template");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.Btn("reset");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user can "sort" the template datas in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Verify.verifySortOrder();
});

test('Verify that the user can "Copy" Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" Template with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.icon("edit");
    await Click.Btn("templateLine");
    await Click.Btn("add");
    await Click.checkboxWithoutAll("Transaction Status", "Active");
    await Click.dropdown("Category", "Finance");
    await Click.calendar(1, "2026", "Jul", 22);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2026", "Oct", 1);
    await Click.Btn("save");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(10);
});

test('Verify that clicking on the back arrow, user is navigated to the template screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.tabs("template");
    await Click.icon("edit");
    await page.waitForTimeout(1000);
    await Click.icon("backArrow");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, "Template Details");
});

//Admin >> Group-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can filter group details using the filter options', async ({ page, Actions, Click, Verify }) => {
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
    //await Verify.verifyDatacount(3);
});

test('Verify that group detail text is displayed when clicking on group tab', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Verify.IsTextDisplayed(page, "Group Details");
});

test('Verify that the user can reset group details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
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
    //await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new group details with invalid data', async ({ page, Actions, Click, Verify }) => {
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

test('Verify that the user can edit the group details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "delete group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Actions.enterText("defaultPrime","2")
    await page.waitForLoadState('networkidle');
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details saved!");
});

test('Verify that the user can copy the group details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "delete group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user cannot add a group in the groupline with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(2000);
    await Click.icon("edit");
    await Click.Btn("groupLine");
    await Click.Btn("add");
    await Click.dropdown("Account Manager", "admin@seritisolutions.com");
    await page.waitForTimeout(2000);
    await Click.dropdown("Marketer", "a1");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 25);
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Financial Manager is a required field");
});

test('Verify that the user can delete a group', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("group");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "delete group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(4000);
    //await Verify.verifyDatacount(1);
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
    //await Verify.verifyDatacount(1);
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
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(3);
    await Click.Btn("refresh");
    await page.waitForLoadState('networkidle');
    //await Verify.verifyDatacount(3);
});

//branches-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that "branch details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await Verify.IsTextDisplayed(page, "Branch Details");
});

test('Verify that the user can filter branch details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Practise branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset branch details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "Practise branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add new branch with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addBranch");
    await Actions.enterText("branchName", "Test Branch");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Branch Code is a required field");
});

test('Verify that the user can edit the branch details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName","Updated Branch Name");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("branchName", "Practise branch");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Branch Details saved!");
});

test('Verify that the user cannot edit the branch details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "copy branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("branchName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Branch Name is a required field");
});

test('Verify that the user can copy the branch details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("branchName", "copy branch");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

//company-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that "company details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("companies");
    await Verify.IsTextDisplayed(page, "Company");
});

test('Verify that the user can filter company details using the filter options', async ({ page, Actions, Click, Verify }) => {
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
    await Verify.verifyDatacount(2);
});

test('Verify that the user can reset company details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
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
    //await page.waitForTimeout(5000);
    //await Verify.verifyDatacount(10);
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

test('Verify that the user cannot copy the company details with invalid data', async ({ page, Actions, Click, Verify }) => {
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
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can edit the company details with valid data', async ({ page, Actions, Click, Verify }) => {
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
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Company saved!");
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
    await Click.Btn("companyDetails");
    await Click.Btn("add");
    await page.waitForTimeout(2000);
    const [popup] = await Promise.all([page.waitForEvent('popup'), await Click.link("clickhere")]);
    await Verify.verifyURL(popup, 'https://randomwheel.org/password-generator');

});

test('Verify Document protection is working or not if it selected as "Yes"', async ({ page, Actions, Click, Verify }) => {
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
    await Click.Btn("companyDetails");
    await Click.Btn("add");
    await page.waitForTimeout(2000);
    await Click.Btn("documentProtectedyes");
    await page.waitForTimeout(2000);

});

//products-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(4);
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
    await Verify.verifyDatacount(10);
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
    await Verify.verifyErrorMessage(page, "Product Sub Type is a required field");
});

test('Verify that the user can edit the product details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName","updated practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("productName","practise product");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Products saved!");
});

test('Verify that the user cannot edit the product details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("productName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Product Name is a required field");
});

test('Verify that the user can copy the product details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(2000); 
    await Click.calendar(1, "2026", "May", 8); 
    await page.waitForTimeout(2000); 
    await Click.calendar(2, "2026", "Aug", 20);
    await page.waitForTimeout(1000);
    await Click.Btn("save");
    await page.waitForTimeout(1000);
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user cannot copy the product details with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("productName", "Practise product");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

//Accessories-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user can expand "Accessories" section and the sub option should display as expected', async ({ page, Actions, Click, Verify }) => {       
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Verify.IsTextDisplayed(page, "Accessory Admin");
});

test('Verify that "accessory details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await Verify.IsTextDisplayed(page, "Accessories");
});

test('Verify that the user can filter accessory details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(2);
}); 

test('Verify that the user can reset accessory details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(3000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user can add new accessory with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addAccessory");
    await Actions.enterText("accessoryName", "Test Accessory");
    await Actions.enterText("accessoryCode", "Test Accessory Sub Type");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user cannot add new accessory with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addAccessory");
    await Actions.enterText("accessoryName", "Test Accessory");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Accessory Code is a required field");
});

test('Verify that the user can edit the accessory details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("accessoryName", "updated practise accessory");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Accessories saved!");
});

test('Verify that the user cannot edit the accessory details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("accessoryName", "practise accessory");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(5000);
    await Actions.enterText("accessoryName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Accessory Name is a required field");
});

test('Verify that the user can sort the accessory details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that pagination works correctly for accessories page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Accessories");
    await Click.chevronLeftArrow(1);
    await Click.tabs("accessoryAdmin");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await Click.pagination(2);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});

//Vehicles-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user can expand "Vehicles" section and the sub option should display as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Verify.IsTextDisplayed(page, "Vehicle Admin");
});

test('Verify that "vehicle details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await Verify.IsTextDisplayed(page, "Vehicle");
});

test('Verify that the user can filter vehicle details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset vehicle details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount(10);
});

test('Verify that the user cannot add an vehicle with that already exsists', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addVehicle");
    await Click.dropdown("Manufacturer", "Acura");
    await Actions.enterText("vehicleModel", "new")
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can edit the vehicle details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("vehicleModel", "Testing Model");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Vehicle saved!");
});

test('Verify that the user cannot edit the vehicle details with invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("vehicleModel", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Model is a required field");
});

test('Verify that the user cannot copy the vehicle details that already exsists', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("vehicleCode", "AC001");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Actions.enterText("vehicleDoors","2");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saving Failed!");
});

test('Verify that the user can sort the vehicle details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that pagination works correctly for vehicles page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await Click.pagination(4);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});

//Vehicles >> Import vehicle file---------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can import a vehicle file when clicking on the import vehicle file button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.tabs("importVehicleFile");
    await Click.dropdown("Select a group","`Group 2")
    await Click.dropdown("Select a branch","Branch 2") 
    const fileInput = await page.$("//input[@type='file']"); 
    await fileInput.setInputFiles(path.resolve('PlayWright_Skeleton/documents/Sample report.pdf'));
    await Click.Btn("importVehicleBtn");
    await Verify.IsTextDisplayed(page, "Success");
});

test('Verify that the user cannot import a vehicle file without uploading a file', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Vehicles");
    await Click.chevronLeftArrow(1);
    await Click.tabs("vehicleAdmin");
    await page.waitForLoadState('networkidle');
    await Click.tabs("importVehicleFile");
    await Click.dropdown("Select a group","`Group 2")
    await Click.dropdown("Select a branch","Branch 2") 
    await Click.Btn("importVehicleBtn");
    await Verify.IsTextDisplayed(page, "Request Failed!");
});

//Users-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that "user details" screen is displayed correctly', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await Verify.IsTextDisplayed(page, "User Details");
});

test('Verify that the user can filter user details using the filter options', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(1);
});

test('Verify that the user can reset user details by clicking on the reset button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.Btn("reset");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});  

test ('Verify that the user cannot add new user with invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addUser");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("save");    
    await Verify.verifyErrorMessage(page, "First Name is a required field");
});

test('Verify that the user can edit the user details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Click.calendar(1, "2001", "Oct", 1); 
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "User Details saved!");
});

test('Verify that the user cannot edit the user details with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("filterArrow");
    await Actions.enterText("userName", "test-automation@testingframeworks.co.uk");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Actions.enterText("firstName", " ");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "First Name is a required field");
});  

test('Verify that the user can sort the user details in the data grid', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await Click.icon("sort");
    await Verify.verifySortOrder();
});

test('Verify that pagination works correctly for users page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Users");
    await Click.tabs("users");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await Click.pagination(2);
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(10);
});

















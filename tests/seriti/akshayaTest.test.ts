import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'

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


// Transaction page-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can search for transactions using the transaction number in Quick access modal', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281716");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, "Transaction 281716");
});

test('Verify that the user can select dropdowns on create transaction page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "`Group 2")
    await Verify.verifyDropDown("`Group 2")
});

test('Verify that the user can select radio buttons on create transaction page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
    await Click.radioButton("Company")
    await Verify.verifyRadioButton("Company");
});

test('Verify that the "Branch" dropdown is disabled until a "Group" is selected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(2000);
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");
    await Click.dropdown("Select a group (Blank for All)", "`Group 2")
    await page.waitForTimeout(2000);
    await Verify.verifyEnabledButton("Select a branch (Blank for All)")
});

test('Verify that the user can filter using the date pickers', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.calendar(3, "2026", "Jan", 1);
    Verify.IsTextDisplayed(page, "2026");
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
    await Verify.verifyDatacount(5);
});

test('Verify that the user can minimize the search module', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.icon("filterArrow");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(0);
});

test('Verify that the user can view recent transactions by clicking on the "Recent Transactions" button', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.link("recentTransactions");
    await page.waitForLoadState('networkidle');
    await Verify.verifyDatacount(9);
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
    await Click.dropdown("Group", "Practise group");
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
    await page.waitForTimeout(5000);
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
    await Verify.verifyDatacount(3);
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
    await Click.dropdown("Daily (Every night)", "Weekly (Every Friday evening)");
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
    await Verify.verifyDatacount(3);
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
    await Verify.verifyDatacount(3);
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
    await Verify.verifyDatacount(3);
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
    await Verify.verifyDatacount(10);
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
    await Click.dropdown("10th night of the month", "2nd night of month");
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
    await Verify.verifyDatacount(1);
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
    await Verify.verifyDatacount(1);
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
    await Verify.verifyDatacount(3);
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
    await Actions.enterText("branchName", "Updated Branch Name");
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
    await page.waitForTimeout(5000);
    await Verify.verifyDatacount(10);
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

test('Verify that the user can add new product with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Product Admin");
    await Click.tabs("productAdmin");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addProduct");
    await Click.dropdown("Product Type", "Comprehensive Insurance");
    await page.pause();
    await Click.dropdown("Product Sub Type", "Comprehensive Insurance");
    await page.pause();
    await Actions.enterText("productName", "Test Product");
    await page.pause();;
    await Click.dropdown("Administrator", "practise company");
    await page.pause();
    await Click.dropdown("Claims", "practise company");
    await page.pause();
    await Click.dropdown("Owner", "practise company");
    await page.pause();
    await Click.dropdown("Underwriter", "practise company");
    await page.pause();
    await Click.calendar(1, "2025", "Jul", 20);
    await Click.calendar(2, "2025", "Aug", 20);
    await Click.dropdown("Payment Type", "Single");
    await page.pause();
    await Click.dropdown("Display Type", "Radio Button");
    await Click.Btn("save");

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



















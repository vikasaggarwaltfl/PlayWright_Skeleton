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
    await Actions.enterText("transactionSearchMenu", "281651");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, "Transaction 281651");
});

test('Verify that the user can select dropdowns on create transaction page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "Practise group")
    await Verify.verifyDropDown("Practise group")
});

test('Verify that the user can select radio buttons on create transaction page', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.Btn("createTransaction")
    await Click.dropdown("Select a group", "Practise group")
    await Click.dropdown("Select a branch", "Practise branch")
    await Click.radioButton("Company")
    await Verify.verifyRadioButton("Company");
});

test('Verify that the "Branch" dropdown is disabled until a "Group" is selected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.waitForTimeout(2000);
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");
    await Click.dropdown("Select a group (Blank for All)", "Practise group")
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
    await Click.dropdown("Select a group (Blank for All)", "Practise group");
    await Click.dropdown("Select a branch (Blank for All)", "Practise branch");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("resetCriteria");
    await Verify.verifyDisabledButton("Select a branch (Blank for All)");
});

test('Verify that the user can apply multiple filters to search for transactions', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Click.dropdown("Select a group (Blank for All)", "Practise group");
    await Click.dropdown("Select a branch (Blank for All)", "Practise branch");
    await Click.calendar(1, "2025", "May", 8);
    await Click.Btn("search");
    await page.waitForTimeout(2000);
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

/*test('Verify that the user can "Add" new Deal tracker report with valid data', async ({ page, Actions, Click, Verify }) => {
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
    await Click.checkboxWithAll(2, "Tebogo Lepelle");
    await Click.calendar(1, "2025", "May", 10);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jun", 11);
    await Click.Btn("createDateYes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Copy"  Deal tracker report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.icon("copy");
    await Click.radioButton(["Group", "Business Manager(s)", "Start Date", "Create Date",
        "Taken-Up Finance Company(s)", "Branch(es)", "Salesperson(s)", "End Date",
        "Applied-To Finance Company(s)"]);
    await Click.Btn("copying");
    await page.waitForTimeout(5000);
    await Click.Btn("save")
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Delete" a Deal tracker report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.icon("delete");
    await Click.Btn("yes");
    await page.waitForTimeout(2000);
    await Verify.verifyDatacount(3);
});

test('Verify that the user cannot "Edit" Deal tracker report with Invalid data.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("dealTracker");
    await Click.icon("edit");
    await Click.Btn("save");
    await Verify.verifyErrorMessage(page, "Notes is a required field");
});

//reports >> DOC-SummaryReport-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can "Add" new DOC Summary report with valid data.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await Click.Btn("addDocSummaryReport");
    await page.waitForTimeout(2000);
    await Click.checkboxWithAll(2, ["Tebogo Lepelle", "Floyd Tshoma", "Hlayisani Shondlani"]);
    await Click.icon("cancel2");
    await Click.dropdown("Administrator Company", "Al Nova");
    await Click.icon("cancel3");
    await page.waitForTimeout(2000);
    await Click.dropdown("Claim Company", "Ghayatta Dic");
    await Click.calendar(1, "2025", "May", 25);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jun", 30);
    await Click.Btn("createDateYes");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Copy" DOC Summary report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await page.waitForTimeout(5000);
    await Click.Btn("save")
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "Edit" DOC Summary report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await Click.icon("edit");
    await Actions.enterText("notes", "Good morning");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Good morning");
});

test('Verify that the user can "download" DOC Summary report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docSummary");
    await Verify.verifyDownload('downloadlink');
});*/


//reports >> DOC Report-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can "Add" new DOC report with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await Click.Btn("addDocReport");
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Click.Btn("inceptDateYes")
    await page.waitForTimeout(4000);
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can "download" DOC report', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("docReport");
    await Verify.verifyDownload('downloadlink');
});

//reports >> Finance Reporting-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can generate Finance Application Analysis Report by selecting valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(3);
    await Click.tabs("financeReport");
    await Click.checkboxWithAll(1, "Practise group")
    await Click.checkboxWithAll(3, "practise company")
    await Click.calendar(1, "2025", "May", 20);
    await page.waitForTimeout(2000);
    await Click.calendar(2, "2025", "Jul", 26);
    await Verify.verifyDownload('generateReport');
});

test('Verify that the user cannot generate Finance Application Analysis Report by selecting Invalid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(3);
    await Click.tabs("financeReport");
    await Click.checkboxWithAll(1, "Practise group")
    await Click.checkboxWithAll(3, "practise company")
    await Click.Btn("generateReport");
    await Verify.verifyErrorMessage(page, "From Date is a required field");
});

//reports >> Admin report >> Banker user login report----------------------------------------------------------------------------------------------------------------------------------------------------

/*test('Verify that the user can generate Banker User Login Report by selecting valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("bankerUserReport");
    await Click.checkboxWithoutAll("Groups", "Practise group");
    await Click.checkboxWithoutAll("Branch", "Practise branch");
    await Click.checkboxWithoutAll("Finance Company", "practise company");
    await Click.checkboxWithoutAll("Role", ["Banker", "MAU banker"]);
    await Click.Btn("includeActiveUsers");
    await Verify.verifyDownload('generateReport');
});

//reports >> Admin report >> Supply data report----------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can generate Supply Data Report by selecting valid details.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("supplyDataReport");
    await page.waitForTimeout(3000);
    await Click.checkboxWithoutAll("Group", "Practise group");
    await page.waitForTimeout(3000);
    await Click.checkboxWithoutAll("Branch", "Practise branch");
    await page.waitForTimeout(3000);
    await Click.checkboxWithoutAll("Product Type", "All");
    await page.waitForTimeout(2000);
    await Click.checkboxWithoutAll("Product Sub Type", "Body Warranty");
    await page.waitForTimeout(2000);
    await Click.checkboxWithoutAll("Product", "Body Warranty");
    await page.waitForTimeout(2000);
    await Click.checkboxWithoutAll("Administrator", "practise company");
    await page.waitForTimeout(2000);
    await Click.checkboxWithoutAll("Underwriter", "practise company");
    await page.waitForTimeout(2000);
    await Click.checkboxWithoutAll("Claims", "practise company");
    await page.waitForTimeout(1000);
    await Click.checkboxWithoutAll("Owner", "practise company");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 20);
    await page.waitForTimeout(1000);
    await Click.calendar(2, "2027", "Aug", 26);
    await Verify.verifyDownload('generateReport');
});*/

//reports >> Admin report >> User name login report----------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can generate User name login report by selecting valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(4);
    await Click.tabs("usernameLoginReport");
    await Click.dropdown("User", "admin@seritisolutions.com");
    await Verify.verifyDownload('generateReport');
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
    await Verify.verifyErrorMessage(page, "Group is a required field");
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
    await Click.icon("futureArrow")
    await Click.icon("edit");
    await page.waitForTimeout(2000);
    await Click.dropdown("Daily (Every night)","Weekly (Every Friday evening)");
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
    await page.pause();
    await Click.icon("futureArrow")
    await page.waitForTimeout(1000);
    await Click.icon("filterArrow");
    await Actions.enterText("reportName", "Practise test");
    await Click.Btn("apply");
    await Verify.verifyDatacount(2);
});

test('Verify that the user can reset Report Scheduler records and data grid gets updated', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "My Reports");
    await Click.chevronLeftArrow(1);
    await Click.chevronLeftArrow(2);
    await Click.tabs("reportScheduler");
    await Click.icon("futureArrow")
    await page.waitForTimeout(2000);
    await Click.icon("filterArrow");
    await Actions.enterText("reportName", "Practise test");
    await Click.Btn("apply");
    await Click.Btn("reset");
    await Verify.verifyDatacount(2);
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
    await Click.icon("filterArrow");
    await Actions.enterText("groupName", "Practise group");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Verify.verifyDatacount(2);
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
    await Actions.enterText("groupName", "Practise group");
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
    await Actions.enterText("groupName", "Practise group");
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
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("edit");
    await Click.dropdown("last night of month","2nd night of month");
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
    await Actions.enterText("groupName", "`Group 2");
    await Click.Btn("apply");
    await page.waitForTimeout(1000);
    await Click.icon("copy");
    await Click.icon("selectAll");
    await Click.Btn("copying");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

test('Verify that the user can add a group in the groupline', async ({ page, Actions, Click, Verify }) => {
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
    await Click.dropdown("Approval User Products", "abhaym@winjit.com");
    await page.waitForTimeout(1000);
    await Click.dropdown("Approval User Other", "45012741@mylife.unisa.ac.za");
    await Click.dropdown("Financial Manager", "api@test.com");
    await page.waitForTimeout(1000);
    await Click.calendar(1, "2026", "Jul", 25);
    await Click.Btn("save");
  
});














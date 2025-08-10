import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
import { Actions } from '@pages/Actions';
import { Click } from '@pages/Click';
import { Verify } from '@pages/Verify'
import * as path from 'path'

// Login ------------------------------------------------------------------------------------------------------------------------


test('Verify that the "Login" screen is displayed as expected.', async ({ page, Actions, Click, Verify }) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
  await Verify.IsTextDisplayed(page, 'Login');
  console.log('Login screen displayed as expected');
});

test('seriti Logo should be visible on the login page', async ({ page }) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
  const logo = page.locator('img.w-auto.h-16.pointer-events-none');
  await expect(logo).toBeVisible();
  console.log('Seriti logo is displayed as expected');
});

test('Verify that the user can log in successfully with valid credentials.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/transaction');
  console.log('User logging in successfully');
});

test('Verify that error message should displayed for Invalid inputs', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn(' ');
  await Click.Btn('login');
  await Verify.IsTextDisplayed(page, 'Username is a required field');
  console.log('Error message displayed as expected for invalid inputs');
});

test('Verify that the user is redirected to the correct URL after logging in successfully.', async ({ page, Actions, Click, Verify }) => {
  await Actions.signIn('sonali');
  await Click.Btn('login');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/transaction');
  console.log('user is redirected to the correct URL after logging in');
});

test('Verify navigation to "Forgot Password" screen from Login screen', async ({ page, Actions, Click, Verify}) => {
  await page.goto("https://seritiweb-mea-uat.seriti-int.com/auth/UserLogin");
  await page.click('text=Forgot Password');
  await Verify.verifyURL(page, 'https://seritiweb-mea-uat.seriti-int.com/password/forgot');
  console.log('User redirected to forgot password screen');
});

// Transaction Screen ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that a user can initiate the individual create transaction process with valid input', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await Click.dropdown("Select a group", "Test_Group")
    await Click.dropdown("Select a branch", "Test_Branch")
    await Click.radioButton("Individual");
    await Actions.enterText("lastName", "TestTransaction");
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page,"redirecting");
    console.log("Individual Transaction created successfully");
});

test('Verify that the user is redirected to the transaction details screen after creating individual transaction. ', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await Click.dropdown("Select a group", "Test_Group")
    await Click.dropdown("Select a branch", "Test_Branch")
    await Click.radioButton("Individual");
    await Actions.enterText("lastName", "TestTransaction");
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page,"Client details");
    console.log("User redirected to transaction details screen as expected");
});

test('Verify that navbar options are displayed as expected at the top of the screeen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Show Required", "Hide Overview", "Client Details", "Vehicle Details", "Account Details", "Documents","Finance Application", "Products", "Audit Logs"]);
    console.log("Navbar options are displayed as expected");
});

test('Verify that the Show Required tab displays only mandatory fields on the form.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Show Required");
    await Verify.IsTextDisplayed(page, ["Transaction Status", "Finance Status", "Transaction Status Notes"]);
    await Click.transactionTabs("Vehicle Details");
    await Verify.IsTextDisplayed(page, "Vehicle Condition");
    console.log(" Show Required tab displays only mandatory fields as expected");
});

test('Verify that the "Show All" tab displays all fields on the form.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Preferred Contact Time", "Finance Status", "Fleet Number"]);
    console.log(" Show All tab displays all fields as expected");
});

test('Verify that the Hide Overview tab hides the overview section of transaction.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("Hide Overview");
    await Verify.IsTextDisplayed(page, "Show Overview"); 
});

test('Verify that the Show Overview tab displays the overview section of transaction.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.transactionTabs("showOverview");
    await Verify.IsTextDisplayed(page, "Hide Overview");
});

test('Verify that all form sections are displayed sequentially on the screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Transaction Details Status Finance Application Info", "Client Details", "Vehicle Details", "Account Details","Documents","Finance Application","Additional Person, Spouse or Guarantor","Products","Accessories","Trade In", "Insurance Application","Record of Advice (ROA)","Record of Transaction (ROT)","Notes","Incept Transaction","Doc Data","Communication"]);
   console.log("All form sections are displayed sequentially on the screen as expected");
});

test('Verify that the user can expand and collapse the details by clicking on the collapse button.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.icon("expandAll");
    await Verify.IsTextDisplayed(page, "Collapse All"); 
    await Click.icon("collapseAll");
    await Verify.IsTextDisplayed(page, "Expand All"); 
    await expect(page.locator('//span[normalize-space()="Change Vehicle"]')).toBeHidden();
});

//Transaction Details Status Finance Application Info ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can view the transaction details status and finance application info on the transaction screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Status", "Transaction Type", "Finance Application Info"]);
    console.log("User can view the transaction details status and finance application info on the transaction screen as expected");
});

test('Verify that the user can save the transaction details status finance application info with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await Actions.enterText("transactionStatusNotes", "Testing");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully"); 
}); 

test('Verify that the user can edit the transaction details status finance application info', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await Actions.enterText("transactionStatusNotes", "Test Notes");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});   

//Client Details ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can view the client details section on the transaction screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("clientDetails");
    await Verify.IsTextDisplayed(page, ["Client Details", "Address in Home Country", "Physical Address","Drivers License Details"]);
    console.log("User can view the client details section on the transaction screen as expected");
});

test('Verify that the user can save the client details section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("clientDetails");
    await Actions.enterText("firstName", "Demo");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

test('Verify that the user can edit the client details section and save successfully.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("clientDetails");
    await Actions.enterText("firstName", "Updated demo");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

//Vehicle Details ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can view the vehicle details section on the transaction screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("vehicleDetails");
    await Verify.IsTextDisplayed(page, ["Vehicle Details", "Vehicle Description", "Vehicle Condition"]);
    console.log("User can view the vehicle details section on the transaction screen as expected");
});

test('Verify that the user can save the vehicle details section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("vehicleDetails");
    await page.pause();
    await Actions.enterText("vehicleKM", "235");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

test('Verify that the user can edit the vehicle details section and save successfully.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281803");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("vehicleDetails");
    await Actions.enterText("vehicleKM", "1000");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

// Account Details

test('Verify that Account details Section displayed as expected on transaction screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("accountDetails");
    await Verify.IsTextDisplayed(page, ["Bank Accounts","Credit Card Accounts"]);
    console.log("Account details displayed as expected");
});


// Document

test('Verify that document section displayed as expected on transaction screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("documents");
    await Verify.IsTextDisplayed(page, ["Uploaded date", "Document category", "Description","File size", "created by","Certification type","File name"]);
    console.log(" Document section displayed as expected");
});

test('Verify that user cannot add Transaction Document with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("documents");
    await Click.Btn("addDocument");
    await Click.Btn("saveDocument");
    await Verify.IsTextDisplayed(page,'please fix errors before submitting');
    console.log(" Error message displayed for required field as expected ");
});

// Finance Application

test('Verify that Finance application section displayed as expected on transaction screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Verify.IsTextDisplayed(page, ["Logo","finance status", "Service message","Bank details", "Latest Application","Document update" ]);
    console.log("Finance application section displayed as expected");
});

test('Verify that user can enter to the finnace application from transaction screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Click.Btn("financeLogo")
    await Verify.IsTextDisplayed(page, "Finance Application: Test_Comp");
    console.log("User successfully enter in to Finance application");
});

// Audit Log

test('Verify user can check Audit Log on transaction screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("auditLog");
    await Verify.IsTextDisplayed(page, "Change made by user");
    console.log("Audit log displayed as expected");
});

// Save Transaction

test('Veriy that user can save transaction with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("saveTransaction");
    await Verify.IsTextDisplayed(page, "Transaction saved Successfully");
    console.log("Transaction saved successfully");
});

test('Veriy that user cannot save transaction with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("saveTransaction");
    await Verify.IsTextDisplayed(page, "validation warnings");
    console.log("Error message displayed as expected for required fields");
});

//groups-------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//Group >> Documents-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can add a new "document" in the addGroupDocument section with valid data', async ({ page, Actions, Click, Verify }) => {
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
    await Click.tabs("groupDocuments");
    await Click.Btn("add");
    await Click.dropdown("Document Category", "BANKING DETAILS");  
    const fileInput = await page.$("//input[@type='file']");
    await fileInput.setInputFiles(path.resolve('./documents/Sample report.pdf'));
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to edit a groupDocument', async ({ page, Actions, Click, Verify }) => {
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
    await Click.tabs("groupDocuments");
    await page.waitForTimeout(1000);
    await Click.icon("edit"); 
    const fileInput = await page.$("//input[@type='file']");
    await fileInput.setInputFiles(path.resolve('./documents/Demo document.pdf'));
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Group Details (Demo test group)");
});

test('Verify that the user is able to download groupDocument', async ({ page, Actions, Click, Verify }) => {
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
    await Click.tabs("groupDocuments");
    await page.waitForTimeout(2000);
    await Click.link("groupDownload");
    await Verify.verifyDownload("DOWNLOAD_LINK");
});

//branch-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    await Verify.verifyDatacount();
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
    await Verify.verifyDatacount();
});

test('Verify that the user can add a new branch with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await Actions.enterText("searchMenu", "Admin");
    await Click.chevronLeftArrow(1);
    await Click.tabs("branches");
    await page.waitForLoadState('networkidle');
    await Click.Btn("addBranch");
    await Click.calendar(1, "2026", "Sep", 15);
    await Actions.enterText("branchCode", "TB001");
    await Click.dropdown("Group Name", "AA Group");
    await Click.calendar(2, "2027", "Jul", 26);
    await Actions.enterText("branchName", "Demo test branch");
    await Click.Btn("save");
    await Verify.IsTextDisplayed(page, "Saved Successfully");
});

//Company-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    await Verify.verifyDatacount();
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


import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
import { Actions } from '@pages/Actions';
import { Click } from '@pages/Click';


test('Verify that a user can initiate the individual create transaction process with valid input', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Click.Btn("createTransaction");
    await Click.dropdown("Select a group", "Test_Group")
    await Click.dropdown("Select a branch", "Test_Branch")
    await Click.radioButton("Individual");
    await Actions.enterText("lastName", "TestTransaction");
    await Click.Btn("clickTransaction");
    await Verify.IsTextDisplayed(page," redirecting...");
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

test('Verify that the Transaction details status and finance application info displayed correctly on the transaction screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Verify.IsTextDisplayed(page, ["Status", "Transaction Type", "Finance Application Info"]);
    console.log("User can view the transaction details status and finance application info on the transaction screen as expected");
});

test('Verify that the user can save the Transaction details status finance application info with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await Actions.enterText("transactionStatusNotes", "Testing");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully"); 
}); 

test('Verify that the user cannot save the Transaction details status finance application info with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await Actions.enterText("transactionStatusNotes", "------");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Validation warnings"); 
});

test('Verify that the user can edit the transaction details status finance application info', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await Actions.enterText("transactionStatusNotes", "Test Notes");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});   

//Client Details ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can view the client details section on the transaction screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("clientDetails");
    await Verify.IsTextDisplayed(page, ["Client Details", "Address in Home Country", "Physical Address","Drivers License Details"]);
    console.log("User can view the client details section on the transaction screen as expected");
});

test('Verify that the user can save the client details section with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("clientDetails");
    await Actions.enterText("firstName", "Demo");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

test('Verify that the user can edit the client details section and save successfully.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("clientDetails");
    await Actions.enterText("firstName", "Demo1");
    await page.waitForTimeout(5000);
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

//Vehicle Details ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that the user can view the vehicle details section on the transaction screen.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("vehicleDetails");
    await Verify.IsTextDisplayed(page, ["Vehicle Details", "Vehicle Description", "Vehicle Condition"]);
    console.log("User can view the vehicle details section on the transaction screen as expected");
});

test('Verify that the user can add vehicle details with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("vehicleDetails");
    await Actions.enterText("vehicleTest", "123");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

test('Verify that the user can edit the vehicle details section and save successfully.', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.tabs("vehicleDetails");
    await Actions.enterText("vehicletest", "700");
    await Click.Btn("saveAll");
    await Verify.IsTextDisplayed(page, "Transaction saved successfully");
});

// Account Details --------------------------------------------------------------------------------------------------------------------------------------------------------------

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

// Document --------------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that document section displayed as expected on transaction screen', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("documents");
    await page.waitForTimeout(2000);
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


//Finance Application------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that Finance Application section displayed as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Verify.IsTextDisplayed(page, ["Logo", "Finance Status", "Service Message","Bank Details", "Latest application","Document Update"]);
    console.log(" Finance Application section displayed as expected");
});

test('Verify that user redirected to Finance Application as expected', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Click.Btn("Test_Comp");
    await Verify.IsTextDisplayed(page, "Finance Application: Test_Comp");
    console.log(" User redirected to Finance application as expected");
});

test('Verify that user can save Finance Application with valid details', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Click.Btn("Test_Comp");
    await page.waitForTimeout(3000);
    await Click.Btn("financeSaveAll")
    await page.waitForTimeout(3000);
    await Verify.IsTextDisplayed(page,"saved successfully!");
    console.log("finance details saved successfully"); 
});

//Submit Finance Application

test('Verify that user can submit finance application with valid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Click.Btn("Test_Comp");
    await page.waitForTimeout(3000);
    await Click.Btn("financeApply")
    await page.waitForTimeout(3000);
    await Verify.IsTextDisplayed(page,"Disclaimer");
});

 test('Verify that user cannot submit finance application with Invalid data', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("sonali");
    await Click.Btn("login");
    await Actions.enterText("transactionSearchMenu", "281957");
    await Click.Btn("view");
    await page.waitForLoadState('networkidle');
    await Click.Btn("financeApplication");
    await Click.Btn("Test_Comp");
    await page.waitForTimeout(3000);
    await Click.Btn("financeApply")
    await page.waitForTimeout(3000);
    await Verify.IsTextDisplayed(page,"Request failed");
 });






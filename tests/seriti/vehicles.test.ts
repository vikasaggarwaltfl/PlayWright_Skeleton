import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'

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
    // await page.waitForTimeout(5000);
    // await Verify.verifyDatacount(10);
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
    await Actions.enterText("vehicleDoors", "2");
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
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
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
    await Click.dropdown("Select a group", "`Group 2")
    await Click.dropdown("Select a branch", "Branch 2")
    await Click.Btn("importVehicleBtn");
    await Verify.IsTextDisplayed(page, "Request Failed!");
});
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import * as path from 'path'


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
    await Verify.IsTextDisplayed(page, "Transact");
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
    await Click.mouseHoverTabs(["Home", "Dashboard", "Transaction", "My Reports", "Template", "Admin"]);
});

test('Verify that the tab names are displayed for all logos in the minimized state', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn("Automation");
    await Click.Btn("login");
    await page.hover("//i[@class='pi pi-home']");
    await Verify.IsTextDisplayed(page, "Home");
});
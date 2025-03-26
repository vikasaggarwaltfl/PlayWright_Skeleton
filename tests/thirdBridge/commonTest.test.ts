
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'
import { Actions } from '@pages/Actions'
import { Click } from '@pages/Click'
import { Verify } from '@pages/Verify'
import { access } from 'fs'
import { Paths } from '@pages/files/paths'


// Login ----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that user is able to login with valid credentials', async ({ page, Actions, Click, Verify }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Verify.IsTextDisplayed("My OfficeNational");
    await Verify.IsTextDisplayed("Products");
    await Verify.IsTextDisplayed("ONA Super Admin");
});

// Brand Screen --------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify user can navigate to the "Brand" screen and verify screen displayed correctly', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await page.waitForTimeout(3000);
    await Verify.verifyURL("https://onexweb-uat.officenational.co.za/table/brand_view");
    await Verify.IsTextDisplayed("Add Brand");
});

test('Verify that the user can apply a filter and check the presence of records in the data grid.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("filterArrow");
    await Actions.enterText("brandName", "Test37");
    await Verify.IsTextDisplayed("Test37");
});

test('Verify user can Sort Brand records and verify sort order  of records.', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("Sort");
    await Verify.verifySortOrder();
    await Click.Icon("Sort");
    await Verify.verifySortOrder();
    await Click.Icon("Sort");
    await Verify.verifySortOrder();
});

test('Verify user can navigate to Brand Information and verify its correct display', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("brandInfo");
    await page.waitForTimeout(5000);
    await Verify.verifyURL('https://onexweb-uat.officenational.co.za/table/brand/6');
    await Verify.IsTextDisplayed('Brand: ABSTO')
});

test('Verify user can Add Brand with "valid data" and verify Success message', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Test118");
    await Click.Btn("Save");
    await Verify.IsTextDisplayed('Saved Successfully');
    
});


test('Verify user cannot Add Brand with "invalid data" and verify error message', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "     ");
    await Click.Btn("Save");
    await Verify.verifyErrorMessage('Brand Name is a required field');
    await Verify.IsTextDisplayed('Validation failed')
});

test('Verify that the user can edit and save the details of an existing brand', async ({ Actions, Click, Verify, page }) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Icon("kebabMenu");
    await Click.Icon("Edit");
    await Actions.enterText("brandPrefix", "AAA");
    await Click.Btn("Save");
    await page.waitForTimeout(3000);
    await Verify.IsTextDisplayed("Brands saved!");
    await page.pause();
});

test('Verify user can upload brand logo and verify success message', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  

    //const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, Paths.BrandLogo);
    await Verify.IsTextDisplayed("File successfully uploaded!");
});

test('Verify user can download uploaded brand logo file ', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
    const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, filePath);
    await page.waitForTimeout(3000);
    await Click.Icon("download")
    
});

test('Verify user can remove uploaded brand logo file ', async ({ Actions, Click, Verify, page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Brands");
    await Click.Link("addBrand");
    await Actions.enterText("brandName", "Tanishq");
    const uploadAreaSelector: string = '//div[@class="flex flex-col items-center gap-2"]';  
    const filePath: string = './tests/thirdBridge/testsamples/logo.png';
    await Actions.uploadFile(page, uploadAreaSelector, filePath);
    await page.waitForTimeout(3000);
    await Click.Icon("remove");
    await Verify.IsTextDisplayed("Drop files here to upload logo")
});

// Product Screen----------------------------------------------------------------------------------------------------------------------------------------------------------

test('Verify that by clicking on a Product,that Product screen is visible correctly.', async ({ Actions, Click,Verify,page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await Click.Tab("Products");
    await Click.Icon("filterArrow");
    await Actions.enterText("productName", "Absto003");
    await Click.Btn("Filter");
    await Click.Link("productInfo");
    await Verify.IsTextDisplayed("Product: Absto003");
    });
    
    test('Verify that by selecting Filter, the filtered screen is displayed as expected', async ({ Actions, Click,Verify,page}) => {
    await Actions.signIn();
    await Click.Btn("sign_In");
    await page.waitForLoadState("domcontentloaded");
    await Click.Tab("Products");
    await Click.Icon("filterArrow"); 
    await page.waitForTimeout(3000);
    await Click.Icon("selectBrand");
    await page.waitForTimeout(2000);
    await Click.dropdownOption("absto");
    await page.waitForTimeout(2000);
    await Click.Btn("Filter");
    await page.waitForTimeout(2000);
    expect(await Verify.verifyData("Artistic")).toBe(5);    
    
    });

    test('Verify that by clicking on the reset button, the filter button is disabled', async ({ Actions, Click,Verify,page}) => {
        await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Products");
        await Click.Icon("filterArrow");
        await Actions.enterText("productName", "Absto003");
        await Click.Btn("Reset");
        await Click.Icon("filterArrow");
        await Verify.verifyDisabledButton("Filter");
      });
      
            
      test('Verify that the user is able to edit the product', async ({ Actions, Click,Verify,page}) => {
        await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Products");
        await Click.Icon("filterArrow");
        await Actions.enterText("productName", "Absto003");
        await Click.Btn("Filter");
        await Click.Link("productInfo");
        await Click.Icon("Edit");
        await Actions.enterText("productCatalogueTitle", "Testing0044");
        await Click.Btn("Save");
        await Verify.IsTextDisplayed("Products saved!");
      });

      test('Verify that the user is able to add a note in a popup window',async ({Actions, Click,Verify,page})=>{
  

        await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Products");
        await Click.Tab("productWIP");
        await page.waitForTimeout(3000);
        await Click.Icon("filterArrow");
        await page.waitForTimeout(2000);
        await Actions.enterText("productName", "Absto007" );
        await Click.Btn("Filter");
        await page.waitForTimeout(2000);
        await Click.Icon("notes");
        await page.waitForLoadState("networkidle");
        await Actions.enterText("productWIPnotes", "Hello");
        await page.waitForLoadState("networkidle");
        await Click.Btn("addNote");
        await page.waitForTimeout(2000);
        await Verify.verifyScreenshot(page,"notesPopupWindow.png");
      });
      
      test('Verify that the user is able to check and uncheck a checkbox',async({Actions, Click,Verify,page})=>{
        await Actions.signIn();
        await Click.Btn("sign_In");
        await Click.Tab("Products");
        await Click.Tab("productAdmin");
        await page.waitForTimeout(3000);
        await Click.Icon("productAdminFilterArrow");
        await Actions.enterText("productName", "Absto001");
        await page.waitForTimeout(3000);
        await Click.Btn("Filter");
        await page.waitForTimeout(3000);
        await Verify.verifyCheckbox(page,"Absto001");
      
      });
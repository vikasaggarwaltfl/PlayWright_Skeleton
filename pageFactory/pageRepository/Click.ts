import { Page, BrowserContext, Locator, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export class Click {
    //link--------------------------------------------------------------------------------------------------------
    
    readonly context: BrowserContext;
    readonly page: Page;
    private readonly download: Locator;
    private readonly recentTransactions: Locator;
    private readonly clickhere: Locator;
    private readonly groupDownload: Locator;

    //tabs--------------------------------------------------------------------------------------------------------
    
    private readonly transaction: Locator;
    private readonly dealTracker: Locator;
    private readonly docSummary: Locator;
    private readonly docReport: Locator;
    private readonly insuranceLeadReport: Locator;
    private readonly payoverReport: Locator;
    private readonly productDetailsReport: Locator;
    private readonly transactionDetailsReport: Locator;
    private readonly userNotificationReport: Locator;
    private readonly apiReqResDetailsReport: Locator;
    private readonly financeReport: Locator;
    private readonly bankerUserLoginReport: Locator;
    private readonly supplyDataReport: Locator;
    private readonly transactionDocumentsReport: Locator;
    private readonly userDetailsReport: Locator;
    private readonly userLoginReport: Locator;
    private readonly userNameLoginReport: Locator;
    private readonly reportScheduler: Locator;
    private readonly template: Locator;
    private readonly group: Locator;
    private readonly branches: Locator;
    private readonly companies: Locator;
    private readonly productAdmin: Locator;
    private readonly product: Locator;
    private readonly accessoryAdmin: Locator;
    private readonly vehicleAdmin: Locator;
    private readonly importVehicleFile: Locator;
    private readonly mainDashboard: Locator;
    private readonly users: Locator;
    private readonly transactionInProgressDashboard: Locator;
    private readonly transactionStatusAgeingAnalysisDashboard: Locator;
    private readonly financeHouseMarketShareDashboard: Locator;
    private readonly dealerMarketShareDashboard: Locator;
    private readonly transactionWeeklyAnalysisDashboard: Locator;
    private readonly financeApplicationAnalysisDashboard: Locator;
    private readonly groupCompanies: Locator;
    private readonly groupLine: Locator;
    private readonly groupProducts: Locator;
    private readonly groupSSF: Locator;
    private readonly groupDocuments: Locator;
    private readonly groupTemplates: Locator;
    private readonly branchProducts: Locator;
    private readonly branchSSF: Locator;
    private readonly branchDocuments: Locator;  
    private readonly branchHFACalculator: Locator;
    private readonly clientDetails: Locator;
    private readonly vehicleDetails: Locator;
    private readonly companyDetails: Locator;
    private readonly branchHFACustomerNotifications: Locator;
    private readonly branchSalesPerson: Locator;
    private readonly companyGroups: Locator;
    private readonly companyBranches: Locator;
    private readonly companyWebservices: Locator;
    private readonly companyProductTypeMapping  : Locator;
    private readonly companyProductSubTypeMapping  : Locator;

    //icon--------------------------------------------------------------------------------------------------------
    
    private readonly seritiLogo: Locator;
    private readonly testingFrameworks: Locator;
    private readonly cancel: Locator;
    private readonly delete: Locator;
    private readonly copy: Locator;
    private readonly edit: Locator;
    private readonly cancel2: Locator;
    private readonly cancel3: Locator;
    private readonly selectAll: Locator;
    private readonly deSelectAll: Locator;
    private readonly filterArrow: Locator;
    private readonly sort: Locator;
    private readonly backArrow: Locator;
    private readonly futureArrow: Locator;
    private readonly reportSchedulerCopy: Locator;
    private readonly enterTransaction: Locator;
    private readonly country: Locator;
    private readonly Swaziland: Locator;
    private readonly collapse: Locator;
    private readonly find : Locator;
    private readonly collapseAll: Locator;
    private readonly expandAll: Locator;
    private readonly groupLineFutureArrow: Locator;
    private readonly detailsCopy: Locator;
    private readonly deleted: Locator;
    private readonly editBranchHFA: Locator;
    

    //buttons--------------------------------------------------------------------------------------------------------
    
    private readonly login: Locator;
    private readonly signOut: Locator;
    private readonly view: Locator;
    private readonly createTransaction: Locator;
    private readonly resetCriteria: Locator;
    private readonly search: Locator;
    private readonly hideOverview: Locator;
    private readonly showOverview: Locator;

    private readonly addDealTrackerReport: Locator;
    private readonly addInsuranceLeadReport: Locator;
    private readonly addPayoverReport: Locator;
    private readonly addProductDetailsReport: Locator;
    private readonly addTransactionDetailsReport: Locator;
    private readonly addUserNotificationReport: Locator;
    private readonly addAPIReqResDetailsReport: Locator;

    private readonly save: Locator;
    private readonly createDateYes: Locator;
    private readonly inceptDateYes: Locator;
    private readonly createDateNo: Locator;
    private readonly inceptDateNo: Locator;
    private readonly yes: Locator;
    private readonly no: Locator;
    private readonly copying: Locator;
    private readonly addDocSummaryReport: Locator;
    private readonly addDocReport: Locator;
    public readonly generateReport: Locator;
    private readonly includeActiveUsers: Locator;
    private readonly addReportScheduler: Locator;
    private readonly apply: Locator;
    private readonly reset: Locator;
    private readonly addTemplate: Locator;
    private readonly templateLine: Locator;
    private readonly add : Locator;
    private readonly addGroup: Locator;
   
    private readonly refresh: Locator;
    private readonly addBranch: Locator;
    private readonly addCompany: Locator; 
    private readonly documentProtectedyes: Locator;
    private readonly addProduct: Locator;
    private readonly supplyDataReportReset: Locator;
    private readonly transactionDocumentReport: Locator;
    private readonly includeActiveUsersYes: Locator;
    private readonly addAccessory: Locator;
    private readonly addVehicle: Locator;
    private readonly importVehicleBtn: Locator;
    private readonly chooseFile: Locator;
    private readonly load: Locator;
    private readonly saveAsButton: Locator;
    private readonly saveAsPNG: Locator;
    private readonly saveAsJPEG: Locator;
    private readonly saveAsPDF: Locator;
    private readonly addUser: Locator;
    private readonly clickTransaction: Locator;
    private readonly tabularViewBtn: Locator;
    private readonly beforeArrowBtn: Locator;
    private readonly submitBtn: Locator;
    private readonly bankerLinkEnabledYes: Locator;
    private readonly saveAll: Locator;

    private readonly accountDetails: Locator;
    private readonly documents: Locator;
    private readonly addDocument: Locator;
    private readonly saveDocument: Locator;
    private readonly financeApplication: Locator;
    private readonly financeLogo: Locator;
    private readonly auditLog: Locator;
    private readonly saveTransaction:Locator;
    private readonly branchEnableLinkButtonYes: Locator;
    
    




    constructor(page: Page, context: BrowserContext) {
        //link--------------------------------------------------------------------------------------------------------
        
        this.page = page
        this.context = context
        this.download = page.locator("//tbody/tr[1]/td[4]/a[1]");
        this.recentTransactions = page.locator("//span[normalize-space()='Recent Transactions']");
        this.clickhere = page.locator("//a[normalize-space()='Click here...']");
        this.groupDownload = page.locator("//tbody/tr[1]/td[2]/a[1]");

        //tabs--------------------------------------------------------------------------------------------------------
        
        this.transaction = page.locator("//div[text()='Transaction']")
        this.dealTracker = page.locator("//div[text()='Deal Tracker Report']")
        this.docSummary = page.locator("//div[text()='DOC Summary Report']");
        this.docReport = page.locator("//div[@class='text-start'][normalize-space()='DOC Report']");
        this.insuranceLeadReport = page.locator("//div[text()='Insurance Lead Report']");
        this.payoverReport = page.locator("//div[@class='text-start'][normalize-space()='Payover Report']")
        this.productDetailsReport = page.locator("//div[@class='text-start'][normalize-space()='Product Details Report']")
        this.transactionDetailsReport = page.locator("//div[@class='text-start'][normalize-space()='Transaction Details Report']")
        this.userNotificationReport = page.locator("//div[@class='text-start'][normalize-space()='User Notification Report']")
        this.apiReqResDetailsReport = page.locator("//div[@class='text-start'][normalize-space()='API Request and Responce']")
        this.financeReport = page.locator("//div[contains(@class,'text-start')][normalize-space()='Finance Application Analysis Report']");
        this.bankerUserLoginReport = page.locator("//div[text()='Banker User Login Report']");
        this.supplyDataReport = page.locator("//div[text()='Supply Data Report']");
        this.transactionDocumentsReport = page.locator("//div[text()='Transaction Documents Report']");
        this.userDetailsReport = page.locator("//div[text()='User Details Report']");
        this.userLoginReport = page.locator("//div[text()='User Login Report']");
        this.userNameLoginReport = page.locator("//div[text()='User Name Login Report']");
        this.reportScheduler = page.locator("//div[@class='text-start'][normalize-space()='Report Scheduler']");
        this.template = page.locator("//div[contains(@class,'text-start')][normalize-space()='Template']");
        this.group = page.locator("//div[contains(@class,'text-start')][normalize-space()='Group']");
        this.branches = page.locator("//div[contains(@class,'text-start')][normalize-space()='Branches']");
        this.companies = page.locator("//div[contains(text(),'Companies')]");
        this.productAdmin = page.locator("//div[contains(text(),'Product Admin')]");
        this.product = page.locator("//div[contains(text(),'Product')]");
        this.accessoryAdmin = page.locator("//div[contains(text(),'Accessory Admin')]");
        this.vehicleAdmin = page.locator("//div[contains(text(),'Vehicle Admin')]");
        this.importVehicleFile = page.locator("//div[contains(text(),'Import Vehicle File')]");
        this.mainDashboard = page.locator("//div[text()='Main Dashboard']");
        this.users = page.locator("//div[contains(text(),'Users')]");
        this.transactionInProgressDashboard = page.locator("//a[.//div[@class='text-start' and contains(text(),'Transactions In Progress')]]");
        this.transactionStatusAgeingAnalysisDashboard = page.locator("//div[text()='Transaction Status Ageing Analysis']");
        this.financeHouseMarketShareDashboard = page.locator("//div[text()='Finance House Market Share']");
        this.dealerMarketShareDashboard = page.locator("//div[text()='Dealer Market Share']");
        this.transactionWeeklyAnalysisDashboard = page.locator("//div[text()='Transaction Weekly Analysis']");
        this.financeApplicationAnalysisDashboard = page.locator("//div[text()='Finance Application Analysis']");
        this.groupCompanies = page.locator("//button[normalize-space()='Companies']");
        this.groupLine = page.locator("//button[normalize-space()='Group Line']");
        this.groupProducts = page.locator("//button[normalize-space()='Products']");
        this.groupSSF = page.locator("//button[normalize-space()='SSF']");
        this.groupDocuments = page.locator("//button[normalize-space()='Documents']");
        this.groupTemplates = page.locator("//button[normalize-space()='Templates']");
        this.branchProducts = page.locator("//button[normalize-space()='Products']");
        this.branchSSF = page.locator("//button[normalize-space()='SSF']");
        this.branchDocuments = page.locator("//button[normalize-space()='Documents']");
        this.branchHFACalculator = page.locator("//button[normalize-space()='HFA Calculator']");
        this.clientDetails = page.locator("(//button[normalize-space()='Client Details'])[1]");
        this.vehicleDetails = page.locator("//button[normalize-space()='Vehicle Details']");
        this.companyDetails = page.locator("//button[normalize-space()='Company Details']");
        this.branchHFACustomerNotifications = page.locator("//button[normalize-space()='HFA Customer Notifications']");
        this.branchSalesPerson = page.locator("//button[normalize-space()='Sales Person']");
        this.companyGroups = page.locator("//button[normalize-space()='Groups']");
        this.companyBranches = page.locator("//button[normalize-space()='Branches']");
        this.companyWebservices = page.locator("//button[normalize-space()='Web Service']");
        this.companyProductTypeMapping  = page.locator("//button[normalize-space()='Product Type Mapping']");
        this.companyProductSubTypeMapping  = page.locator("//button[normalize-space()='Product Sub Type Mapping']");
        
        //icon--------------------------------------------------------------------------------------------------------        
        
        this.seritiLogo = page.locator("//img[@src='https://seritiweb-mea-uat.seriti-int.com/_nuxt/seriti-int-full.Bv5pslmx.svg']")
        this.testingFrameworks = page.locator("//p[text()='Testing Frameworks']")
        this.cancel = page.locator("(//*[name()='svg'][@class='p-icon p-dropdown-clear-icon'])[1]");
        this.delete = page.locator("//i[contains(@class, 'pi-trash')]");
        this.copy = page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]/button[1]/i[1]");
        this.edit = page.locator("(//i[@class='pi pi-pencil text-lg'])[1]");
        this.cancel2 = page.locator("(//*[name()='path'])[8]");
        this.cancel3 = page.locator("(//*[name()='path'])[10]");
        this.selectAll = page.locator("//span[text()='Select All']");
        this.deSelectAll = page.locator("//span[text()='De-select All']");
        this.filterArrow = page.locator("(//button[@class='w-4 h-4 flex justify-center items-center'])[1]");
        this.sort = page.locator("(//span[@data-pc-section='sort'])[1]");
        this.backArrow = page.locator("//button[@class='border rounded-md w-9 h-9 border-primary-500']");
        this.futureArrow = page.locator("(//*[name()='svg'][@class='p-icon p-row-toggler-icon'])[2]");
        this.reportSchedulerCopy = page.locator("(//button[@class='flex flex-col justify-center'])[2]");
        this.enterTransaction = page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]/div[1]/button[1]");
        this.country = page.locator("(//i[@class='fi fi-ae text-3xl'])[1]");
        this.Swaziland = page.locator("(//i[@class='fi fi-sz text-4xl'])[1]");
        this.collapse = page.locator("(//i[@class='text-xl pi pi-bars text-primary-100'])[1]");
        this.find = page.locator("(//span[@class='p-input-icon pi pi-search text-primary-100'])[1]");
        this.collapseAll = page.locator("//div[text()='Collapse All']");
        this.expandAll = page.locator("//div[text()='Expand All']");
        this.groupLineFutureArrow = page.locator("//button[@class='p-row-toggler p-link']//*[name()='svg']");
        this.detailsCopy = page.locator("(//button[@class='flex flex-col justify-center'])[2]");
        this.deleted = page.locator("(//button[@class='flex flex-col justify-center'])[3]");
        this.editBranchHFA = page.locator("//tbody/tr[1]/td[1]/div[1]/button[1]/i[1]");
       

        //buttons---------------------------------------------------------------------------------------------------------------------------------------------------        
        
        this.login = page.locator("//span[text()='Login']")
        this.signOut = page.locator("//span[text()='Sign Out']")
        this.view = page.locator("//span[text()='VIEW']")
        this.createTransaction = page.locator("//span[@class='p-button-icon p-button-icon-left pi pi-plus']")
        this.resetCriteria = page.locator("//button[text()=' Reset Criteria ']")
        this.search = page.locator("//button[@aria-label='Hide Overview']")
        this.hideOverview = page.locator("//div[normalize-space()='Hide Overview']");
        this.showOverview = page.locator("//span[text()='Login']");
        this.addProductDetailsReport = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.addDealTrackerReport = page.locator("//div[text()=' Add Deal Tracker Report']");
        this.addDocSummaryReport = page.locator("//div[@class='flex flex-row gap-2 items-center']");
        this.addDocReport = page.locator("//div[text()=' Add DOC Report']");
        this.addInsuranceLeadReport = page.locator("//div[text()=' Add Insurance Lead Report']");
        this.addPayoverReport = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.addTransactionDetailsReport = page.locator("//div[text()=' Add Transaction Details Report']");
        this.addUserNotificationReport = page.locator("//div[@class='text-start'][normalize-space()='User Notification Report']")
        this.addAPIReqResDetailsReport = page.locator("//div[@class='text-start'][normalize-space()='API Request and Responce']")
        this.save = page.locator("//span[text()='Save']");
        this.createDateYes = page.locator("//div[@placeholder='Create Date']//span[@class='p-button-label'][normalize-space()='Yes']");
        this.inceptDateYes = page.locator("//div[@placeholder='Incept Date']//span[@class='p-button-label'][normalize-space()='Yes']");
        this.createDateNo = page.locator("//div[@placeholder='Create Date']//span[@class='p-button-label'][normalize-space()='No']");
        this.inceptDateNo = page.locator("//div[@placeholder='Incept Date']//span[@class='p-button-label'][normalize-space()='No']");
        this.yes = page.locator("//span[text()='Yes']");
        this.no = page.locator("//span[normalize-space()='No']");
        this.copying = page.locator("//button[text()='Copy']");
        this.selectAll = page.locator("//span[text()='Select All']");
        this.deSelectAll = page.locator("//span[text()='De-select All']");
        this.generateReport = page.locator("//button[normalize-space()='Generate Report']");
        this.includeActiveUsers = page.locator("div[placeholder='Include Active Users'] div[aria-label='Yes'] span[class='p-button-label']");
        this.addReportScheduler = page.locator("//div[@class='p-splitbutton p-component']");
        this.apply = page.locator("//span[normalize-space()='Apply']");
        this.reset = page.locator("//button[@aria-label='Reset']");
        this.addTemplate = page.locator("//button[contains(@class,'p-button p-component p-splitbutton-defaultbutton')]");
        this.templateLine = page.locator("//button[normalize-space()='Template Line']");
        this.add = page.locator("//span[normalize-space()='Add']");
        this.addGroup = page.locator("//button[contains(@class,'p-button p-component p-splitbutton-defaultbutton')]");
        this.refresh = page.locator("//span[text()='Refresh']");
        this.addBranch = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.addCompany = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");  
        this.documentProtectedyes = page.locator("//div[@placeholder='Is Document Protected']//span[@class='p-button-label'][normalize-space()='Yes']");
        this.addProduct = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.supplyDataReportReset = page.locator("//button[normalize-space()='Reset']");
        this.includeActiveUsersYes = page.locator("//div[@placeholder='Include Active Users']//span[@class='p-button-label'][normalize-space()='Yes']");
        this.addAccessory = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.addVehicle = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.importVehicleBtn = page.locator("//button[@title='Please be patient as it could take a few minutes']");
        this.chooseFile = page.locator("//input[@type='file']");
        this.load = page.locator("//button[.//span[contains(text(),'Load')]]");
        this.saveAsButton = page.locator("//div[@id='pv_id_2_0_content']//div[2]//*[name()='svg']");
        this.saveAsPNG = page.getByRole('menuitem', { name: 'PNG' });
        this.saveAsJPEG = page.getByRole('menuitem', { name: 'JPEG' });
        this.saveAsPDF = page.getByRole('menuitem', { name: 'PDF' });
        this.addUser = page.locator("//button[@class='p-button p-component p-splitbutton-defaultbutton']");
        this.clickTransaction = page.locator("//button[@class='p-button p-component flex flex-row justify-center']");
        this.tabularViewBtn = page.locator("//span[normalize-space()='Tabular View']");
        this.beforeArrowBtn = page.locator("//div[@class='flex flex-col gap-2 m-5']//div[2]//div[1]//div[2]//button[1]//i[1]");
        this.submitBtn = page.locator("//button[@aria-label='Submit']");
        this.bankerLinkEnabledYes = page.locator("//span[normalize-space()='Yes']");
        this.saveAll = page.locator("//button[@aria-label='Save All']");

        this.accountDetails = page.locator("//button[normalize-space()='Account Details']");
        this.documents = page.locator("//button[normalize-space()='Documents']");
        this.addDocument = page.locator("//button[@aria-label='Add']");
        this.saveDocument = page.locator("//span[normalize-space()='Save']");
        this.financeApplication = page.locator("//button[normalize-space()='Finance Application']");
        this.financeLogo = page.locator("//button[@class='h-10 w-full flex flex-row justify-center items-center']");
        this.auditLog = page.locator("//span[normalize-space()='Audit Log']");
        this.saveTransaction = page.locator("//span[normalize-space()='Save All']");
        this.branchEnableLinkButtonYes = page.locator("//div[@placeholder='Enable Link Button?']//span[@class='p-button-label'][normalize-space()='Yes']");
        
}

    //link--------------------------------------------------------------------------------------------------------
    
    async link(linkName: String) {
        if (linkName === "download") {
            await this.download.click();
        }
        else if (linkName === 'recentTransactions') {
            await this.recentTransactions.click();
        }
        else if (linkName === 'clickhere') {
            await this.clickhere.click();
        }
        else if (linkName === 'groupDownload') {
            await this.groupDownload.click();
        }
    };

    //tabs--------------------------------------------------------------------------------------------------------
    
    async tabs(str: string): Promise<void> {

        if (str === "transaction") {
            await this.transaction.click();
        }
        else if (str === "dealTracker") {
            await this.dealTracker.click();
        }
        else if (str === "docSummary") {
            await this.docSummary.click();
        }
        else if (str === "docReport") {
            await this.docReport.click();
        }
        else if (str === "insuranceLeadReport") {
            await this.insuranceLeadReport.click();
            
        }
        else if (str === "payoverReport") {
            await this.payoverReport.click();
        }
        else if (str === "productDetailsReport") {
            await this.productDetailsReport.click();
        }
        else if (str === "transactionDetailsReport") {
            await this.transactionDetailsReport.click();
        }
        else if (str === "userNotificationReport") {
            await this.userNotificationReport.click();
        }
        else if (str === "apiReqResDetailsReport") {
            await this.apiReqResDetailsReport.click();
        }
        else if (str === "financeReport") {
            await this.financeReport.click();
        }
        else if (str === "bankerUserLoginReport") {
            await this.bankerUserLoginReport.click();
        }
        else if (str === "supplyDataReport") {
            await this.supplyDataReport.click();
        }
        else if (str === "transactionDocumentsReport") {
            await this.transactionDocumentsReport.click();
        }
        else if (str === "userDetailsReport") {
            await this.userDetailsReport.click();
        }
        else if (str === "userLoginReport") {
            await this.userLoginReport.click();
        }

        else if (str === "userNameLoginReport") {
            await this.userNameLoginReport.click();
        }
        else if (str === "reportScheduler") {
            await this.reportScheduler.click();
        }
        else if (str === "template") {
            await this.template.click();
        }
        else if (str === "group") {
            await this.group.click();
        }
        else if (str === "branches") {
            await this.branches.click();
        }
        else if (str === "companies") {
            await this.companies.click();
        }
        else if (str === "productAdmin") {
            await this.productAdmin.click();
        }
        else if (str === "product") {
            await this.product.click();
        }
        else if (str === "accessoryAdmin") {
            await this.accessoryAdmin.click();
        }
        else if (str === "vehicleAdmin") {
            await this.vehicleAdmin.click();
        }
        else if (str === "importVehicleFile") {
            await this.importVehicleFile.click();
        }
        else if (str === "mainDashboard") {
            await this.mainDashboard.click();
        }
        else if (str === "users") {
            await this.users.click();
        }
        else if (str === "transactionInProgressDashboard") {
            await this.transactionInProgressDashboard.waitFor({ state: 'visible', timeout: 5000 });
            await this.transactionInProgressDashboard.scrollIntoViewIfNeeded();
            await this.transactionInProgressDashboard.click();
        }
        else if (str === "transactionStatusAgeingAnalysisDashboard") {
            await this.transactionStatusAgeingAnalysisDashboard.click();
        }
        else if (str === "financeHouseMarketShareDashboard") {
            await this.financeHouseMarketShareDashboard.click();
        }
        else if (str === "dealerMarketShareDashboard") {
            await this.dealerMarketShareDashboard.click();
        }
        else if (str === "transactionWeeklyAnalysisDashboard") {
            await this.transactionWeeklyAnalysisDashboard.click();
        }
        else if (str === "financeApplicationAnalysisDashboard") {
            await this.financeApplicationAnalysisDashboard.click();
        }
        else if (str === "groupCompanies") {
            await this.groupCompanies.click();
        }
        else if (str === "groupLine") {
            await this.groupLine.click();
        }
        else if (str === "groupProducts") {
            await this.groupProducts.click();
        }
        else if (str === "groupSSF") {
            await this.groupSSF.click();
        }
        else if (str === "groupDocuments") {
            await this.groupDocuments.click();
        }
        else if (str === "groupTemplates") {
            await this.groupTemplates.click();
        }
        else if (str === "branchProducts") {
            await this.branchProducts.click();
        }
        else if (str === "branchSSF") {
            await this.branchSSF.click();
        }
        else if (str === "branchDocuments") {
            await this.branchDocuments.click();
        }
        else if (str === "branchHFACalculator") {
            await this.branchHFACalculator.click();
        }
        else if (str === "clientDetails") {
            await this.clientDetails.click();
        }
         else if (str === "vehicleDetails") {
            await this.vehicleDetails.click();
        }
        else if (str === "companyDetails") {
            await this.companyDetails.click();
        }
        else if (str === "branchHFACustomerNotifications") {
            await this.branchHFACustomerNotifications.click();
        }
        else if (str === "branchSalesPerson") {    
            await this.branchSalesPerson.click();
        }
        else if (str === "companyGroups") {    
            await this.companyGroups.click();
        }
        else if (str === "companyBranches") {    
            await this.companyBranches.click();
        }
        else if (str === "companyWebservices") {    
            await this.companyWebservices.click();
        }
        else if (str === "companyProductTypeMapping") {    
            await this.companyProductTypeMapping.click();
        }
        else if (str === "companyProductSubTypeMapping") {    
            await this.companyProductSubTypeMapping.click();
        }
    };

    //icon--------------------------------------------------------------------------------------------------------
   
    async icon(str: string): Promise<void> {
        if (str === "seritiLogo") {
            await this.seritiLogo.click();
        }
        else if (str === "testingFrameworks") {
            await this.testingFrameworks.click();
        }
        else if (str === "cancel") {
            await this.cancel.click();
        }
        else if (str === "delete") {
            await this.delete.nth(1).click();
        }
        else if (str === "copy") {
            await this.copy.click();
        }
        else if (str === "edit") {
            await this.page.waitForLoadState('networkidle');
            await this.edit.waitFor({ state: 'visible', timeout: 5000 });
            await this.edit.click();
        }
        else if (str === "cancel2") {
            await this.cancel2.click();
        }
        else if (str === "cancel3") {
            await this.cancel3.click();
        }

        else if (str === "selectAll") {
            await this.selectAll.click();
        }
        else if (str === "deSelectAll") {
            await this.deSelectAll.click();
        }
        else if (str === "filterArrow") {
            await this.filterArrow.click();
        }
        else if (str === "sort") {
            await this.sort.click();
        }
        else if (str === "backArrow") {
            await this.backArrow.click();
        }
        else if (str === "futureArrow") {
            await this.futureArrow.click();
        }
        else if (str === "reportSchedulerCopy") {
            await this.reportSchedulerCopy.click();
        }
        else if (str === "enterTransaction") {
            await this.enterTransaction.click();
        }
        else if (str === "country") {
            await this.country.click();
        }
        else if (str === "Swaziland") {
            await this.Swaziland.click();
        }
        else if (str === "collapse") {
            await this.collapse.click();
        }
        else if (str === "find") {
            await this.find.click();
        }
        else if (str === "collapseAll") {
            await this.collapseAll.click();
        }
        else if (str === "expandAll") {
            await this.expandAll.click();
        }
        else if (str === "groupLineFutureArrow") {
            await this.groupLineFutureArrow.click();
        }
        else if (str === "detailsCopy") {
            await this.detailsCopy.click();
        }
        else if (str === "deleted") {
            await this.deleted.click();
        }
        else if (str === "editBranchHFA") {
            await this.editBranchHFA.click();
        }
        
        
        
        
};

    //buttons--------------------------------------------------------------------------------------------------------
    
    async Btn(str: string): Promise<void> {

        if (str === "login") {
            await this.login.click();
        }
        else if (str === "signOut") {
            await this.signOut.click();
        }
        else if (str === "view") {
            await this.view.click();
        }
        else if (str === "createTransaction") {
            await this.createTransaction.click();
        }
        else if (str === "resetCriteria") {
            await this.resetCriteria.click();
        }

        else if (str === "search") {
            await this.search.click();
        }
        else if (str === "hideOverview") {
            await this.hideOverview.click();
        }
        else if (str === "showOverview") {
            await this.showOverview.click();
        }

        else if (str === "addDealTrackerReport") {
            await this.addDealTrackerReport.click();
        }
        else if (str === "addInsuranceLeadReport") {
            await this.addInsuranceLeadReport.click();
        }
        else if (str === "addPayoverReport") {
            await this.addPayoverReport.click();
        }
        else if (str === "addProductDetailsReport") {
            await this.addProductDetailsReport.click();
        }
        else if (str === "addDocSummaryReport") {
            await this.addDocSummaryReport.click();
        }
        else if (str === "addDocReport") {
            await this.addDocReport.click();
        }
        else if (str === "addTransactionDetailsReport") {
            await this.addTransactionDetailsReport.click();
        }
        else if (str === "addUserNotificationReport") {
            await this.addUserNotificationReport.click();
        }
        else if (str === "addAPIReqResDetailsReport") {
            await this.addAPIReqResDetailsReport.click();
        }
        else if (str === "save") {
            await this.save.click();
        }
        else if (str === "createDateYes") {
            await this.createDateYes.click();
        }
        else if (str === "inceptDateYes") {
            await this.inceptDateYes.click();
        }
        else if (str === "createDateNo") {
            await this.createDateNo.click();
        }
        else if (str === "inceptDateNo") {
            await this.inceptDateNo.click();
        }
        else if (str === "yes") {
            await this.yes.click();
        }
        else if (str === "no") {
            await this.no.click();
        }
        else if (str === "copying") {
            await this.copying.click();
        }
        else if (str === "selectAll") {
            await this.selectAll.click();
        }
        else if (str === "deSelectAll") {
            await this.deSelectAll.click();
        }
        else if (str === "generateReport") {
            await this.generateReport.click();
        }
        else if (str === "includeActiveUsers") {
            await this.includeActiveUsers.click();
        }
        else if (str === "addReportScheduler") {
            await this.addReportScheduler.click();
        }
        else if (str === "includeActiveUsersYes") {
            await this.includeActiveUsersYes.click();
        }
        else if (str === "apply") {
            await this.apply.click();
        } 
        else if (str === "reset") {
            await this.reset.click();
        }
        else if (str === "addTemplate") {
            await this.addTemplate.click();
        }
        else if (str === "templateLine") {
            await this.templateLine.click();
        }
        else if (str === "add") {
            await this.add.click();
        }
        else if (str === "addGroup") {
            await this.addGroup.click();
        }
        else if (str === "refresh") {
            await this.refresh.click();
        }
        else if (str === "addBranch") {
            await this.addBranch.click();
        }
        else if (str === "addCompany") {
            await this.addCompany.click();
        }

        else if (str === "documentProtectedyes") {
            await this.documentProtectedyes.click();
        }
        else if (str === "addProduct") {
            await this.addProduct.click();
        }
        else if (str === "addAccessory") {
            await this.addAccessory.click();
        }
        else if (str === "addVehicle") {
            await this.addVehicle.click();
        }
        else if (str === "importVehicleBtn") {
            await this.importVehicleBtn.click();
        }
         else if (str === "chooseFile") {
            await this.chooseFile.click();
        }
        else if (str === "load") {
            await this.load.click();
        }
        else if (str === "addUser") {
            await this.addUser.click();
        }
        else if (str === "clickTransaction") {
            await this.clickTransaction.click();
        }
        else if (str === "tabularViewBtn") {
            await this.tabularViewBtn.click();
        }
        else if (str === "beforeArrowBtn") {
            await this.beforeArrowBtn.click();
        }
        else if (str === "submitBtn") {
            await this.submitBtn.click();
        }
        else if (str === "bankerLinkEnabledYes") {
            await this.bankerLinkEnabledYes.click();
        }
        else if (str === "saveAll") {
            await this.saveAll.click();
        }
        else if (str === "accountDetails") {
            await this.accountDetails.click();
        }
        else if (str === "documents") {
            await this.documents.click();
        }
        else if (str === "addDocument") {
            await this.addDocument.click();
        }
        else if (str === "saveDocument") {
            await this.saveDocument.click();
        }
        else if (str === "financeApplication") {
            await this.financeApplication.click();
        }
         else if (str === "financeLogo") {
            await this.financeLogo.click();
        }
        else if (str === "auditLog") {
            await this.auditLog.click();
        }
        else if (str === "saveTransaction") {
            await this.saveTransaction.click();
        }
        else if (str === "branchEnableLinkButtonYes") {
            await this.branchEnableLinkButtonYes.click();
        }


        
    };

    //dropdown--------------------------------------------------------------------------------------------------------
    async dropdown(value: string, selector: string): Promise<void> {
        // First click the dropdown
       await this.page.locator(`//span[@aria-label='${value}']`).click();
        // Then select the option
        await this.page.locator(`//span[normalize-space()='${selector}']`).click();
    };

 //Dropdownwithscroll-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    async dropdownwithscroll(value: string, selector: string): Promise<void> {
    // Click to open the dropdown
    await this.page.locator(`//span[@aria-label='${value}']`).click();

    const optionLocator = this.page.locator(`//span[normalize-space()='${selector}']`);

    // Scroll the option into view if necessary
    await optionLocator.scrollIntoViewIfNeeded();

    // Click the desired option
    await optionLocator.click();
}
    //radio button-------------------------------------------------------------------------------------------------------

    async radioButton(label: string[] | string): Promise<void> {
        if (Array.isArray(label)) {
            for (const labels of label) {
                await this.page.getByLabel(`${labels}`).check();
            }
        }
        // If we have a single label
        else {
            await this.page.getByLabel(`${label}`).check();
        }
};

    //calendar-------------------------------------------------------------------------------------------------------
    async calendar(index: number, year: string, month: string, date?: number): Promise<void> {
        console.log(`Opening calendar at index ${index}`);
        await this.page.locator(`(//button[@aria-label='Choose Date'])[${index}]`).click();
        console.log('Clicked calendar button, opening year picker');
        await this.page.locator("//button[@aria-label='Choose Year']").click();
        const yearLocator = this.page.locator(`//span[normalize-space()='${year}']`);
        console.log(`Waiting for year element: ${year}`);
        await yearLocator.waitFor({ state: 'visible', timeout: 5000 });
        console.log(`Clicking year: ${year}`);
        await yearLocator.click();
        // Select the month
        const monthLocator = this.page.locator(`(//span[@data-pc-section='month'][text()='${month} '])`);
        console.log(`Waiting for month element: ${month}`);
        await monthLocator.waitFor({ state: 'visible', timeout: 5000 });
        console.log(`Clicking month: ${month}`);
        await monthLocator.click();
        // If date is provided, select it
        if (date !== undefined) {
            const dateLocator = this.page.locator(`(//span[@data-p-disabled='false'])[text()='${date}']`);
            console.log(`Waiting for date element: ${date}`);
            await dateLocator.waitFor({ state: 'visible', timeout: 5000 });
            console.log(`Clicking date: ${date}`);
            await dateLocator.click();
        }
    };

    //chevronLeft-------------------------------------------------------------------------------------------------------
    async chevronLeftArrow(index: number): Promise<void> {
        await this.page.locator(`(//button[@class='flex flex-row items-center justify-center'])[${index}]`).click();
};

    //checkbox-----------------------------------------------------------------------------------------------------------
    async checkboxWithAll(index: number, selectors: string[] | string): Promise<void> {
        // Click the dropdown first
        await this.page.locator(`(//div[@class='p-multiselect-label'])[${index}]`).click();
        // If we want to deselect all checkboxes
        if (selectors === 'All') {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
        }
        // If we have an array of selectors
        else if (Array.isArray(selectors)) {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
            for (const selector of selectors) {
                await this.page.locator(`//span[text()='${selector}']`).click();
            }
        }
        // If we have a single selector
        else {
            await this.page.locator("(//input[@aria-label='All items selected'])[1]").click();
            await this.page.locator(`//span[text()='${selectors}']`).click();
        }
        // Close the dropdown by clicking outside
        await this.page.locator("body").click({ position: { x: 0, y: 0 } });
    };


    async checkboxWithoutAll(Textvalue: string, selectors: string[] | string): Promise<void> {
        // Click the dropdown first
        await this.page.locator(`//div[contains(@class,'p-multiselect-label p-placeholder')][normalize-space()='${Textvalue}']`).click();
        // If we want to select all checkboxes
        if (selectors === 'All') {
            await this.page.locator("//input[contains(@aria-label,'All items unselected')]").click();
        }
        // If we have an array of selectors
        else if (Array.isArray(selectors)) {
            for (const selector of selectors) {
                await this.page.locator(`//span[text()='${selector}']`).click();
            }
        }
        // If we have a single selector
        else {
            await this.page.locator(`//span[text()='${selectors}']`).click();
        }
        // Close the dropdown by clicking outside
        await this.page.locator("body").click({ position: { x: 0, y: 0 } });
    };

    //pagination-------------------------------------------------------------------------------------------------------------------------------------------------------------
    async pagination(value: number): Promise<void> {
        
        for (let i = 1; i <= value; i++) {
            const paginationButton = this.page.locator(`//button[normalize-space()='${i}']`);
            if (await paginationButton.isVisible()) {
                await paginationButton.click();
                await this.page.waitForTimeout(1000);
            } else {
                break; 
            }
        }
    };

    /**
     * Selects an option from the Save As dropdown (e.g., 'PNG', 'JPEG', 'PDF').
     */
    async selectSaveAsOption(option: string): Promise<void> {
        const saveAsArrowButton = this.page.locator('button:has(svg[data-pc-section="menubuttonicon"])');
        await saveAsArrowButton.click();
        await this.page.waitForTimeout(2000);
    
        const menuItem = this.page.getByRole('menuitem', { name: option });
        await menuItem.waitFor({ state: 'visible', timeout: 5000 });
        await menuItem.click();
        await this.page.waitForTimeout(1000);

        console.log(`Dashboard Saved in Format > ${option}`);
    } 


    async mouseHoverTabs(selectors: string[]): Promise<void> {
        for (const selector of selectors) {
            await this.page.locator(`//div[text()='${selector}']`).hover();
            await this.page.waitForTimeout(1000); 
        }
    }

    async transactionTabs(selector: string, printAll: boolean = false): Promise<void> {
        if (printAll) {
            const buttons = await this.page.locator(`//button[normalize-space()]`).all();
            for (const button of buttons) {
                const text = await button.textContent();
                // eslint-disable-next-line no-console
                console.log('Transaction Tab Button:', text?.trim());
            }
        }
        await this.page.locator(`//button[normalize-space()='${selector}']`).click();
    }
}
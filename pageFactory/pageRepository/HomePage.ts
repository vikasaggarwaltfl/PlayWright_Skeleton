import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { Language } from 'common/Language';

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly CHANGE_LANGUAGE_BUTTON: Locator;
    readonly ENGLISH_LANGUAGE_BUTTON: Locator;
    readonly CHINESE_LANGUAGE_BUTTON: Locator;
    readonly CHANGE_LANGUAGE_POPUP_CONFIRM_BUTTON: Locator;
    readonly FORUM: Locator;
    readonly COMMUNITY: Locator;
    readonly PRIMER: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.CHANGE_LANGUAGE_BUTTON = page.locator('[data-testid="language-icon-button"]');
        this.ENGLISH_LANGUAGE_BUTTON = page.locator(`//button[@data-testid='languageSelector-button-en']`);
        this.CHINESE_LANGUAGE_BUTTON = page.locator(`//button[@data-testid='languageSelector-button-zh']`);
        this.CHANGE_LANGUAGE_POPUP_CONFIRM_BUTTON = page.locator("(//div[@class='MuiBox-root css-18pmhcu']//button)[2]");
        this.FORUM = page.getByRole('tab', { name: 'Forum' });
        this.COMMUNITY = page.getByRole('tab', { name: 'Community' }); 
        this.PRIMER = page.getByRole('tab', { name: 'Primer' });
    }

    async getCardsCount(): Promise<number> {
        return await this.page.locator(`(//div[@class='MuiBox-root css-0'])`).count();
    }

    async card(cardCount: number): Promise<void> {
        await this.page.locator(`(//div[contains(@class,'MuiPaper-root MuiPaper-outlined')]//a)[${cardCount}]`).click();
    }
    async checkIfBookMarked(card: number): Promise<boolean> {
        await this.page.waitForLoadState('load');
        await this.page.locator(`(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1cweq8y'])[${card}]`).click();
        var isBookMarked = await this.page.locator(`(//*[@class="PrivateSwitchBase-input css-1m9pwf3"])[1]`).isChecked();
        return isBookMarked;
    }

    async createBookMark(): Promise<void> {
        await this.page.locator(`(//input[@class='PrivateSwitchBase-input css-1m9pwf3'])[1]`).check();
    }

    async alertpage(): Promise<void> {
        // await this.page.locator(`(//div[@class='MuiListItemIcon-root css-16lzz5c']//div)[1]`).click();
        await this.page.getByRole('link', { name: 'Alerts' }).click();
    }

    async browsepage(): Promise<void> {
        await this.page.getByRole('link', { name: 'Browse' }).click();
    }

     async forumTab(): Promise<void> {
        await this.page.locator(`(//div[@class='MuiTabs-flexContainer css-7sga7m']//a)[2]`).click();
    }

    async closeBookMarkCardPopup(): Promise<void> {
        await this.page.waitForLoadState("load");
        await this.page.locator(`(//h6[contains(@class,'MuiTypography-root MuiTypography-h6')]/following-sibling::button)[1]`).click();
        // await this.page.goBack();
    }

    async changeLanguage(language: string): Promise<void> {
        await this.CHANGE_LANGUAGE_BUTTON.click();
        if (language == Language.ENGLISH) {
            await this.ENGLISH_LANGUAGE_BUTTON.click();
        } else {
            await this.CHINESE_LANGUAGE_BUTTON.click();
        }
        await this.CHANGE_LANGUAGE_POPUP_CONFIRM_BUTTON.click();
        await this.page.waitForLoadState("load");
    }


    async checkUpcomingInterviews(page: Page): Promise<number> {
        await page.locator('text="Show Upcoming"').click();
        const currentDate = new Date();

        const interviewDates = await page.$$eval(
            '.MuiCard-root.css-ocfy66',
            cards => cards.map(card => {
                const dateText = card.querySelector('MuiTypography-root MuiTypography-body3 css-1mjq0hd')?.textContent?.trim();
                return new Date(dateText);
            })
        );

        const allUpcoming = interviewDates.map(date => date.getTime() > currentDate.getTime());
        return allUpcoming.length;
    }


    async applyFilters(page: Page): Promise<number> {
        await page.locator('text="Show Upcoming"').click();
        const currentDate = new Date();

        const interviewDates = await page.$$eval(
            '.MuiCard-root.css-ocfy66',
            cards => cards.map(card => {
                const dateText = card.querySelector('MuiTypography-root MuiTypography-body3 css-1mjq0hd')?.textContent?.trim();
                return new Date(dateText);
            })
        );

        const allUpcoming = interviewDates.map(date => date.getTime() > currentDate.getTime());
        return allUpcoming.length;
    }

    async setUpAndCheckNotification(): Promise<string | null> {
        const setUpNotificationXPath = `//span[@aria-label='Set up Transcript Notification']`;
        await this.page.locator(setUpNotificationXPath).first().waitFor({ timeout: 20000 });
        await this.page.locator(setUpNotificationXPath).first().click();
        
        const titleText = await this.page.locator("//div[@class='MuiBox-root css-maj3td']/following-sibling::*/h6").textContent();
        console.log(`Title of the interview: ${titleText}`);

        await this.page.locator("//button[contains(.,'Confirm')]").click();
        
        await this.page.locator("//div[@class='MuiBox-root css-zjm5l']//li[3]").click();
        await this.page.locator("//span[normalize-space()='Notifications']").waitFor({ timeout: 20000 });
        await this.page.locator("//span[normalize-space()='Notifications']").click();
        await this.page.waitForTimeout(5000); 

        const notificationList = await this.page.locator('div[data-field="interviewTitle"] .MuiDataGrid-cellContent').allTextContents();
        console.log(`Notifications list: ${notificationList.join(', ')}`);
        
        return notificationList.includes(titleText) ? titleText : null;
    }


    async checkForumCards(): Promise<void> {
        await this.FORUM.click();
        const cardSelector = '.MuiCard-root.css-ocfy66'; 
        const cards = this.page.locator(cardSelector);
        const cardCount = await cards.count();
        console.log('Total Number of Forum Cards:', cardCount);
        if (cardCount === 0) {
        console.log('No cards found.');
        return;
      }
    
      for (let i = 0; i < cardCount; i++) {
        
        const card = cards.nth(i);
        const textContent = await card.locator("//span[contains(@class, 'MuiTypography-root') and text()='FORUM']").textContent();
        // const textContent = await card.locator('text=FORUM').textContent();
        if (textContent?.includes('FORUM')) {
          // console.log('Forum card found:', await card.innerHTML());
          const href = await card.locator('a').getAttribute('href');
          // console.log('Forum card link:', href);
        } else {
          console.log('Non-forum card found:', await card.innerHTML());
        }
      }
      
    }
    
    
    async checkCommunityCards(): Promise<void> {
      await this.COMMUNITY.click();
      const cardSelector = '.MuiCard-root.css-ocfy66'; 
      const cards = this.page.locator(cardSelector);
      const cardCount = await cards.count();
      console.log('Total Number of Community Cards:', cardCount);
      if (cardCount === 0) {
      console.log('No cards found.');
      return;
    }
    
    for (let i = 0; i < cardCount; i++) {
      
      const card = cards.nth(i);
      const textContent = await card.locator('text=COMMUNITY').textContent();
      if (textContent?.includes('COMMUNITY')) {
        // console.log('Forum card found:', await card.innerHTML());
        const href = await card.locator('a').getAttribute('href');
        // console.log('Community card link:', href);
      } else {
        console.log('Non-forum card found:', await card.innerHTML());
      }
    }
    
    }
    
    
    async checkPrimerCards(): Promise<void> {
      await this.PRIMER.click();
      const cardSelector = '.MuiCard-root.css-ocfy66'; 
      const cards = this.page.locator(cardSelector);
      const cardCount = await cards.count();
      console.log('Total Number of Primer Cards:', cardCount);
      if (cardCount === 0) {
      console.log('No cards found.');
      return;
    }
    
    for (let i = 0; i < cardCount; i++) {
      
      const card = cards.nth(i);
      const textContent = await card.locator('text=PRIMER').textContent();
      if (textContent?.includes('PRIMER')) {
        // console.log('Forum card found:', await card.innerHTML());
        const href = await card.locator('a').getAttribute('href');
        // console.log('Primer card link:', href);
      } else {
        console.log('Non-forum card found:', await card.innerHTML());
      }
    }
    
    }

    async navigateToInterviewDetailsTab(cardCount: number): Promise<void> {
      var endPoint = await this.page.locator(`(//div[contains(@class,'MuiPaper-root MuiPaper-outlined')]//a)[${cardCount}]`).getAttribute('href');
      var URL = 'https://forum.thirdbridge.com' + endPoint;
      await this.page.goto(URL);
  }


      async verifyGridOrientation(cardCount: number) {
        // Check if at least 10 interview cards are visible in the grid view
        if (cardCount >= 10) {
            for (let i = 1; i <= 10; i++) {
                const interviewGrid = this.page.locator(`(//div[@class="MuiBox-root css-1b8opde"])[${i}]`);
                await expect(interviewGrid).toBeVisible();
            }
            console.log('10 interview cards are visible in the grid view.');
        } else {
            throw new Error('Interview cards are not in grid view');
        }
    }

    async switchToListViewAndVerify() {
        await this.page.locator('//button[@aria-label="List view"]').click();
        const listView = this.page.locator('//div[@class="MuiDataGrid-main css-opb0c2"]');
        await expect(listView).toBeVisible();
    }

    async checkInterviewCountsForCompany(companyName: string): Promise<void> {
      await this.page.locator('input[placeholder="Search Companies"]').fill(companyName);
      const listboxLocator = this.page.locator('ul[role="listbox"]');
      await listboxLocator.hover();
      await listboxLocator.locator('[role="option"]:first-child').click();
      await this.page.locator("//button[contains(.,'Search')]").click();
  
      await this.page.waitForSelector("(//a[contains(@class,'MuiButtonBase-root MuiTab-root')]//span)[1]", { state: 'visible' });
      await this.page.waitForLoadState('load');
  
      const allCardCountText = await this.page.locator('a[role="tab"][aria-selected="true"]:has-text("All")').textContent();
      const allCardCount = allCardCountText?.match(/\d+/)?.[0];
      console.log(`${companyName} - All Cards: ${allCardCount}`);
  
      await this.page.locator("(//span[contains(@class,'MuiTypography-root MuiTypography-body3')])[2]").click();
      const forumCardCountText = await this.page.locator('a[role="tab"][aria-selected="true"]:has-text("Forum")').textContent();
      const forumCardCount = forumCardCountText?.match(/\d+/)?.[0];
      console.log(`${companyName} - Forum Cards: ${forumCardCount}`);
  
      await this.page.locator("(//span[contains(@class,'MuiTypography-root MuiTypography-body3')])[3]").click();
      const communityCardCountText = await this.page.locator('a[role="tab"][aria-selected="true"]:has-text("Community")').textContent();
      const communityCardCount = communityCardCountText?.match(/\d+/)?.[0];
      console.log(`${companyName} - Community Cards: ${communityCardCount}`);
  
      await this.page.locator("(//span[contains(@class,'MuiTypography-root MuiTypography-body3')])[4]").click();
      const primersCardCountText = await this.page.locator('a[role="tab"][aria-selected="true"]:has-text("Primers")').textContent();
      const primersCardCount = primersCardCountText?.match(/\d+/)?.[0];
      console.log(`${companyName} - Primers Cards: ${primersCardCount}`);
  }
  
    
// Function to exact dates from cards
async extractDates(): Promise<Date[]> {
    const dateElements = await this.page.locator('.MuiTypography-root.MuiTypography-body3.css-1mjq0hd');
    const dateTexts = await dateElements.allTextContents();
    return dateTexts.map(dateText => new Date(dateText));
}

// Function to sort dates
  sortDates(dates: Date[], order: 'Newest' | 'Oldest'): Date[] {
      return dates.sort((a, b) => {
          if (order === 'Newest') {
              return b.getTime() - a.getTime();
          } else {
              return a.getTime() - b.getTime();
          }
      });
}

// Function to check if the cards are sorted correctly
async areCardsSorted(order: 'Newest' | 'Oldest'): Promise<boolean> {
    const extractedDates = await this.extractDates();
    const sortedDates = this.sortDates([...extractedDates], order);
    return extractedDates.every((date, index) => date.getTime() === sortedDates[index].getTime());
}


async checkAudioInCards(): Promise<number> {
    const forumPageUrl = this.page.url();
    await this.page.waitForSelector('.MuiCard-root.css-ocfy66'); // Wait for cards to load
    const cards = this.page.locator('.MuiCard-root.css-ocfy66'); // Locator for cards
    const cardCount = await cards.count(); // Get the number of cards
    let listenButtonCount = 0;

    for (let i = 0; i < cardCount; i++) {
        // Set up a listener for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for a new page event
            cards.nth(i).click() // Click on each card
        ]);

        await newPage.waitForLoadState('load'); // Ensure the new page is fully loaded
        await newPage.waitForTimeout(5000);

        // Check if the "Listen" button is present in the new page
        const isListenButtonPresent = await newPage.getByRole('button', { name: 'Listen' }).isVisible();

        if (isListenButtonPresent) {
            listenButtonCount++;
            console.log(`"Audio" found in card ${i + 1}`);
        } else {
            console.log(`"Audio" not found in card ${i + 1}`);
        }

        // Close the new tab after checking
        await newPage.close();

        // Go back to the forum page (make sure the main page is active again)
        await this.page.bringToFront(); // Bring the forum page back to the front
        await this.page.waitForSelector('.MuiCard-root.css-ocfy66'); // Ensure the cards are loaded again
    }

    return listenButtonCount;
}


async checkTickersInCards(tickers: string[]): Promise<void> {
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector('.MuiCard-root.css-ocfy66'); // Wait for cards to load
    const searchResultsPage = await this.page.locator('.MuiMasonry-root'); 
    const cards = searchResultsPage.locator('.MuiCard-root.css-ocfy66'); // Locator for cards
    const cardCount = await cards.count(); // Get the number of cards
    console.log("cards count: |", cardCount);

    for (let i = 0; i < cardCount; i++) {
        const card = cards.nth(i);
        const cardText = await card.innerText(); // Get the text content of the card
        const matchedTickers = tickers.filter(ticker => cardText.includes(ticker)); // Check which tickers are present in the card

        if (matchedTickers.length > 0) {
            console.log(`Card ${i + 1} contains tickers: ${matchedTickers.join(', ')}`);
        } else {
            console.log(`Card ${i + 1} does not contain any of the tickers.`);
        }
    }
}



// async verifyTickerOnCards(ticker: string): Promise<void> {
//     await this.page.waitForSelector('.MuiCard-root.css-ocfy66'); // Wait for cards to load
//     const cards = this.page.locator('.MuiCard-root.css-ocfy66'); // Locator for all cards
//     const cardCount = await cards.count(); // Get the number of cards

//     for (let i = 0; i < cardCount; i++) {
//         const card = cards.nth(i);
//         const isTickerPresent = await card.locator(`text=${ticker}`).isVisible(); // Check if the ticker is present in the card
        
//         if (isTickerPresent) {
//             console.log(`Ticker "${ticker}" found in card ${i + 1}`);
//         } else {
//             console.error(`Ticker "${ticker}" NOT found in card ${i + 1}`);
//         }

        
//         // expect(isTickerPresent).toBeTruthy();
//     }
}






    


import { describe, beforeAll, beforeEach, afterEach, afterAll, test, expect  } from 'vitest';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginPage } from '../../business/pages/login.page';
import { env, URLS } from '../../business/data/constants';
import { logger } from '../../utilities/logger';
import { LaunchPage } from '../../business/pages/launch.page';
import { SideBar } from '../../business/pages/components/common/sidebar.component';
import { getLaunchesDataSets } from '../../utilities/json-reader';
import { LaunchComponent } from '../../business/pages/components/launch.component';

describe.concurrent('Launch Validations', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let loginPage: LoginPage
    let launchPage: LaunchPage;

    const launches_data = getLaunchesDataSets();

    test.each(launches_data)('Validate Launch Name #$id', async ({name, id}) => {

      logger.info(`Testing on [${env}] envitonment`);

      browser = await chromium.launch({
          //headless: false
      });
      context = await browser.newContext({
            storageState: './auth.json'
        });
      page = await context.newPage();

      loginPage = new LoginPage(page);
      launchPage = new LaunchPage(page);

      await page.goto('https://reportportal.epam.com/ui/#daniel_albavera_personal/launches');
      await page.waitForLoadState('load');
      await launchPage.launches.first().waitFor({ state: 'visible' });
      let launches = await launchPage.launches.all();
      let launch = new LaunchComponent(page, launches[id-1]);
      await launch.name.waitFor({ state: 'visible' });
      let launchName = await launch.name.textContent();
      let launchNameString = launchName?.toString();
      expect(launchNameString).toBe(name);

      logger.info('Closing Page');
      await page.close();
      logger.info(`Tests finalized`);
    });

});

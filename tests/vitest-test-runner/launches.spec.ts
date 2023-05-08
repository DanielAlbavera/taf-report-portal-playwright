import { describe, beforeAll, beforeEach, afterEach, afterAll, test, expect  } from 'vitest';
import { Browser, BrowserContext, Locator, Page, chromium } from '@playwright/test';
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
    let sideBar: SideBar;

    let launches: Locator[];

    beforeAll( async () => {
      logger.info(`Testing on [${env}] envitonment`);
      browser = await chromium.launch();
      context = await browser.newContext({
          storageState: './auth.json'
      });
    });

    beforeEach( async () => {
      page = await context.newPage();

      loginPage = new LoginPage(page);
      launchPage = new LaunchPage(page);
      sideBar = new SideBar(page);

      await loginPage.navigateToURL(URLS.PORTAL);
      await sideBar.launchButton.click();
      await launchPage.waitForPageToBeLoaded();
      await launchPage.waitForLocator(launchPage.launches.first());
      launches = await launchPage.launches.all();
      for (let launch of launches) launch.waitFor({ state: 'visible'});
    });

    afterEach( async () => {
      logger.info('Closing Page');
      await page.close();
    });

    afterAll( async () => {
      await context.close();
      await browser.close();
      logger.info(`Tests finalized`);
    });

    const launches_data = getLaunchesDataSets();

    test.each(launches_data)('Validate Launch Name #$id', async ({name, id}) => {
      let launch = new LaunchComponent(page, launches[id-1]);
      let launchName = launch.name;
      await launchPage.waitForLocator(launchName);
      let launchNameString = (await launchName.textContent())?.toString();
      logger.info('Launch Name: ');
      logger.data(launchNameString);
      expect(launchNameString).toBe(name);
    });

    test.each(launches_data)('Validate Launch details #$id', async ({id, qg, duration, owner}) => {
      let launch = new LaunchComponent(page, launches[id-1]);
      let launchQG = launch.qualityGateLabel;
      let launchDuration = launch.durationLabel;
      let launchOwner =  launch.ownerName;
      await launchPage.waitForLocator(launchOwner);
      let launchQGString = (await launchQG.textContent())?.toString();
      let launchDurationString = (await launchDuration.textContent())?.toString();
      let launchOwnerString = (await launchOwner.textContent())?.toString();
      logger.info('Quality Gate: ');
      logger.data(launchQGString);
      logger.info('Duration: ');
      logger.data(launchDurationString);
      logger.info('Owner: ');
      logger.data(launchOwnerString);
      expect(launchQGString).toBe(qg);
      expect(launchDurationString).toBe(duration);
      expect(launchOwnerString).toBe(owner);
    });

    test.each(launches_data)('Validate Launch Total Execution Results #$id', async ({id, results}) => {
      let launch = new LaunchComponent(page, launches[id-1]);
      let totalTests = launch.totalTestsLabel;
      await launchPage.waitForLocator(totalTests);
      let totalTestsString = (await totalTests.textContent())?.toString();
      logger.info('Total Test: ');
      logger.data(totalTestsString);
      expect(totalTestsString).toBe(`${results['total']}`);
    });

});

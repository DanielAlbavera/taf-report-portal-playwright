import { test, expect, BrowserContext, Page } from '@playwright/test';
import { LaunchPage } from '../../business/pages/launch.page';
import { SideBar } from '../../business/pages/components/common/sidebar.component';
import { LaunchComponent } from '../../business/pages/components/launch.component';
import { env, URLS } from '../../business/data/constants';
import { logger } from '../../utilities/logger';
import { LoginPage } from '../../business/pages/login.page';
import { getLaunchesDataSets } from '../../utilities/json-reader';

test.describe.parallel('Launch Page Validations', () => {

    let context: BrowserContext;
    let page: Page;

    let loginPage: LoginPage
    let launchPage: LaunchPage;
    let sidebar: SideBar;

    test.beforeAll( async () => {
        logger.info(`Testing on [${env}] envitonment`);
      });
    
      test.beforeEach( async ({ browser }) => {
        context = await browser.newContext({
          //By Terminal: './auth.json'
          //By Test Extension: './../auth.json'
            storageState: './auth.json'
        });
        page = await context.newPage();

        loginPage = new LoginPage(page);
        launchPage = new LaunchPage(page);
        //await loginPage.navigateToURL('https://reportportal.epam.com/ui/#daniel_albavera_personal/dashboard');
        //await loginPage.navigateToURL(URLS.PORTAL);
        await loginPage.navigateToURL(URLS.PORTAL);
        sidebar = new SideBar(page);
        await sidebar.launchButton.click();
        await page.waitForLoadState('load', { timeout: 10000 });
        await launchPage.launches.first().waitFor();
      });
    
      test.afterEach( async () => {
        logger.info('Closing Page');
        await page.close();
      });
    
      test.afterAll( async () => {
        logger.info(`Tests finalized`);
      });

    const launches_data = getLaunchesDataSets();
    for (let index = 0; index < launches_data.length; index++) {
      
      test(`Validate Launch Name #${index+1}`, async () => {
        const launches = await launchPage.launches.all();
        let launch = new LaunchComponent(page, launches[index]);
        let launchDataSet = launches_data[index];
        let name = launch.name;
        let nameText = await name.textContent();
        logger.info('Launch Name: ');
        logger.data(nameText?.toString());
        await expect(name).toHaveText(launchDataSet['name']);
      });

      test(`Validate Launch details #${index+1}`, async () => {
        const launches = await launchPage.launches.all();
        let launch = new LaunchComponent(page, launches[index]);
        let launchDataSet = launches_data[index];
        let qg = launch.qualityGateLabel;
        let duration = launch.durationLabel;
        let owner = launch.ownerName;
        let qgText = await qg.textContent();
        let durationText = await duration.textContent();
        let ownerText = await owner.textContent();
        logger.info('Quality Gate: ');
        logger.data(qgText?.toString());
        logger.info('Duration: ');
        logger.data(durationText?.toString());
        logger.info('Owner: ');
        logger.data(ownerText?.toString());
        await expect(qg).toHaveText(launchDataSet['qg']);
        await expect(duration).toHaveText(launchDataSet['duration']);
        await expect(owner).toHaveText(launchDataSet['owner']);
      });

      test(`Validate Launch Total Execution Results #${index+1}`, async () => {
        const launches = await launchPage.launches.all();
        let launch = new LaunchComponent(page, launches[index]);
        let resultsDataSet: [] = launches_data[index]['results'];
        let totalTests = await launch.totalTestsLabel.textContent();
        logger.info('Total Test: ');
        logger.data(totalTests?.toString());
        expect(totalTests).toBe(resultsDataSet['total'].toString());
      });
    }
    
});
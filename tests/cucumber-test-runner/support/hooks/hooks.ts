import { setDefaultTimeout, BeforeAll, AfterAll, After, AfterStep } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { logger } from '../../../../utilities/logger';
import { env } from '../../../../business/data/constants';
import { pageFixture } from '../fixtures/page.fixture';

setDefaultTimeout( 60 * 1000 * 5);

BeforeAll(async function () {
    logger.info(`Testing on [${env}] environment`);
    pageFixture.browser = await chromium.launch();
    pageFixture.context = await pageFixture.browser.newContext({
        storageState: './auth.json'
    });
});

AfterStep( async function ({ pickle }) {
    const screenShot = await pageFixture.page.screenshot({ path: `test-results/screenshots/${pickle.name}.png`});
    this.attach(screenShot, 'image/png');
});

AfterAll(async function () {
    await pageFixture.context.close();
    await pageFixture.browser.close();
    logger.info('Tests finalized');
});
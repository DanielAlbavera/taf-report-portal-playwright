import { BeforeAll, AfterAll, After, setDefaultTimeout, Status, AfterStep } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { logger } from '../../../../utilities/logger';
import { env } from '../../../../business/data/constants';
import { pageFixture } from '../fixtures/page.fixture';

setDefaultTimeout( 60 * 1000 * 3);

BeforeAll(async function () {
    logger.info(`Testing on [${env}] environment`);
    pageFixture.browser = await chromium.launch();
});

AfterStep( async function ({ pickle }) {
    const screenShot = await pageFixture.page.screenshot({ path: `test-results/screenshots/${pickle.name}.png`});
    this.attach(screenShot, 'image/png');
});

After( async function () {
    await pageFixture.page.close();
    logger.info('Page is closed');
});

AfterAll(async function () {
    await pageFixture.context.close();
    await pageFixture.browser.close();
    logger.info('Tests finalized');
});
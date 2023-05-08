import { describe, beforeAll, beforeEach, afterEach, afterAll, test, expect  } from 'vitest';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginPage } from '../../business/pages/login.page';
import { env, URLS, CREDENTIALS, LOGIN_EXPECTATIONS } from '../../business/data/constants';
import { logger } from '../../utilities/logger';

describe('Login Validations', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;

    beforeAll( async () => {
        logger.info(`Testing on [${env}] environment`);
    });

    beforeEach( async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        await loginPage.navigateToURL(URLS.LOGIN);
        logger.info('Waiting to page to be loaded');
        await page.waitForLoadState('load');
    });

    afterEach( async () => {
        logger.info('Closing Page');
        await page.close();
    });

    afterAll( async () => {
        logger.info(`Tests finalized`);
    });

    test('should not login with invalid credentials', async () => {
        await loginPage.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
        expect(await loginPage.getErrorMessage()).toBe(LOGIN_EXPECTATIONS.BAD_CREDENTIALS);
    });

});

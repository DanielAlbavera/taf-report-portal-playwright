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
        browser = await chromium.launch();
        context = await browser.newContext();
    });

    beforeEach( async () => {
        page = await context.newPage();
        loginPage = new LoginPage(page);
        await loginPage.navigateToURL(URLS.LOGIN);
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

    test('should not login with invalid credentials', async () => {
        await loginPage.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
        expect(await loginPage.getErrorMessage()).toBe(LOGIN_EXPECTATIONS.BAD_CREDENTIALS);
    });

});

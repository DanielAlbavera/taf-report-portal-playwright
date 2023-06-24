import { test, expect } from '@playwright/test';
import { LoginPage } from '../../business/pages/login.page';
import { env, CREDENTIALS, LOGIN_EXPECTATIONS } from '../../business/data/constants';
import { logger } from '../../utilities/logger';

test.describe('Login Validations', () => {

  let loginPage: LoginPage;

  test.beforeAll( async () => {
    logger.info(`Testing on [${env}] environment`);
  });

  test.beforeEach( async ({page, baseURL}) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(baseURL!);
    logger.info('Waiting to page to be loaded');
    await page.waitForLoadState('load');
  });

  test.afterEach( async ({page}) => {
    logger.info('Closing Page');
    await page.close();
  });

  test.afterAll( async () => {
    logger.info(`Tests finalized`);
  });

  test('Invalid Login', async () => {
    await loginPage.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
    expect(await loginPage.getErrorMessage()).toBe(LOGIN_EXPECTATIONS.BAD_CREDENTIALS);
  });

});

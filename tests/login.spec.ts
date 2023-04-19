import { test, expect } from '@playwright/test';
import { Login } from '../business/pages/login.page';
import { env, CREDENTIALS } from '../business/data/constants';
import { logger } from '../utilities/logger';

test.describe('Login Validations', () => {

  let loginPage: Login;

  test.beforeAll( async () => {
    logger.info(`Testing on [${env}] envitonment`);
  });

  test.beforeEach( async ({page, baseURL}) => {
    loginPage = new Login(page);
    await loginPage.navigate(baseURL!);
  });

  test.afterEach( async ({page}) => {
    logger.info('Closing Page');
    await page.close();
  });

  test('Invalid Login', async () => {
    const expected_error_message = 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials';
    await loginPage.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
    expect(await loginPage.getErrorMessage()).toBe(expected_error_message);
  });

});

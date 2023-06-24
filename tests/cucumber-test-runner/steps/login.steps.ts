import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../business/pages/login.page';
import { logger } from '../../../utilities/logger';
import { URLS, CREDENTIALS, LOGIN_EXPECTATIONS } from '../../../business/data/constants';
import { pageFixture } from '../support/fixtures/page.fixture';

let loginPage: LoginPage;

Before(async function () {
    pageFixture.page = await pageFixture.context.newPage();
    loginPage = new LoginPage(pageFixture.page); 
});

After( async function () {
    await pageFixture.page.close();
    logger.info('Page is closed');
});

Given('User navigates to the Login Page', async function () {
    await loginPage.navigateToURL(URLS.LOGIN);
});

Given('User is in the Login Page', async function () {
    logger.info(`Current Page is ${pageFixture.page.url()}`);
});

When('User fills the Username Input with invalid username', async function () {
    const username = CREDENTIALS.INVALID.USERNAME;
    await loginPage.fillUsername(username);
});

When('User fills the Password Input with invalid password', async function () {
    const password = CREDENTIALS.INVALID.PASSWORD;
    await loginPage.fillPassword(password);
});

When('User clicks the Login Button', async function () {
    await loginPage.clickLoginButton();
});

Then('The BAD_CREDENTIALS Error message is displayed', async function () {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(LOGIN_EXPECTATIONS.BAD_CREDENTIALS);
});
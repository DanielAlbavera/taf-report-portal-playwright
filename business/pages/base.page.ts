import { Locator, Page } from '@playwright/test';
import { logger } from '../../utilities/logger';

export abstract class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(baseURL: string) {
        logger.info(`navigating to ${baseURL}`);
        await this.page.goto('/');
        logger.info(`waiting for page to be loaded`);
        await this.page.waitForLoadState();
    }

    async navigateToPath(path: string) {
        logger.info(`navigating to ${path}`);
        await this.page.goto('/'+path);
        logger.info(`waiting for page to be loaded`);
        await this.page.waitForLoadState();
    }

    async navigateToURL(url: string) {
        logger.info(`navigating to ${url}`);
        await this.page.goto(url);
        logger.info(`waiting for page to be loaded`);
        await this.page.waitForLoadState();
    }

    async getTitle() {
        const title = await this.page.title();
        logger.info(`title is: ${title}`);
        return title;
    }

    async waitForPageToBeLoaded() {
        logger.info(`waiting for Page to be Loaded`);
        await this.page.waitForLoadState('load', { timeout: 5000 });
    }

    async waitForLocator(locator: Locator) {
        logger.info(`waiting for Locator to be Visible`);
        await locator.waitFor({ state: 'visible', timeout: 5000 });
    }

}
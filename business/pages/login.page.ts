import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../../utilities/logger';


export class LoginPage extends BasePage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly badCredentialsMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator('[name = "login"]');
        this.passwordInput = this.page.locator('[name = "password"]');
        this.loginButton = this.page.locator('[type="submit"]');
        this.badCredentialsMessage = this.page.locator('.notification-transition-enter-done p');
    }

    async fillUsername(username: string) {
        logger.info(`filling "username" input with: `);
        logger.data(username);
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        logger.info(`filling "password" input with: `);
        logger.data(password);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        logger.info(`clicking on "login" Button`);
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async getErrorMessage() {
        await this.badCredentialsMessage.waitFor({ state: 'visible'});
        const message = await this.badCredentialsMessage.textContent();
        logger.info(`error message is:`);
        logger.data(message);
        return  message;
    }

}
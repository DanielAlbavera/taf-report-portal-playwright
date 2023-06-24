import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Toolbar } from './components/toolbar.component';

export class LaunchPage extends BasePage {

    readonly toolbar: Toolbar;
    readonly launches: Locator;

    constructor(page: Page) {
        super(page);
        this.toolbar = new Toolbar(page);
        this.launches = this.page.locator('//div[contains(@class,"row-wrapper")]');
    }

}
import { Page, Locator } from '@playwright/test';
import { Component } from '../base.component';

export class Footer extends Component {

    private base: Locator;
    private labelsLocator: Locator;
    readonly buildLabel: Locator;
    readonly copyrigthLabel: Locator;
    readonly links: Promise<Locator[]>;

    constructor(page: Page) {
        super(page);
        this.base = this.page.locator('//footer');
        this.labelsLocator = this.base.locator('//div[(contains(@class,"footer-text"))]');
        this.buildLabel = this.labelsLocator.first();
        this.copyrigthLabel = this.labelsLocator.last();
        this.links = this.base.locator('//a').all();
    }

}
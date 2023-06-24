import { Locator, Page } from '@playwright/test';
import { Component } from '../base.component';

export class SideBar extends Component {

    readonly launchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.launchButton = this.page.locator('//div[contains(@class,"sidebar__sidebar-btn")]//a[contains(@href,"launches")]');
    }

}
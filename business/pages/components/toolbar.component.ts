import { Page, Locator } from "@playwright/test";
import { Component } from "./base.component";

export class Toolbar extends Component {

    readonly allLaunchesDropdown: Locator;
    private optionsLocator: Locator;
    readonly allLaunchesOption: Locator;
    readonly latestLaunchesOption: Locator
    readonly addFilterButton: Locator;
    readonly bradCrumbsButton: Locator;
    private actionButtonsLocator: Locator;
    readonly importButton: Locator;
    readonly actionsButton: Locator;
    readonly refreshButton: Locator;

    constructor(page: Page) {
        super(page);
        this.allLaunchesDropdown = this.page.locator('//div[contains(@class,"Dropdown__arrow")]');
        this.optionsLocator = this.page.locator('//div[contains(@class,"allLatestDropdown__option--")]');
        this.allLaunchesOption = this.optionsLocator.first();
        this.latestLaunchesOption = this.optionsLocator.last();
        this.addFilterButton = this.page.locator('//div[contains(@class,"add-filter-button")]/button');
        this.bradCrumbsButton = this.page.locator('//div[contains(@class,"breadcrumbs__toggler")]');
        this.actionButtonsLocator = this.page.locator('//div[contains(@class,"action-buttons")]//button').first();
        this.importButton = this.actionButtonsLocator.first();
        this.actionsButton = this.page.locator('//div[contains(@class,"menu-button")]');
        this.refreshButton = this.actionButtonsLocator.last();
    }

}
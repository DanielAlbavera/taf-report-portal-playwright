import { Page, Locator } from "@playwright/test";
import { Component } from "./base.component";

export class LaunchComponent extends Component{
    
    launch: Locator;
    readonly burguerButton: Locator;
    private burguerMenuLocator: Locator;
    private burguerMenuExportLocator: Locator;
    readonly burguerMenu: Object;
    readonly name: Locator;
    readonly renameButton: Locator;
    readonly nameToolTip: Locator;
    readonly qualityGateLabel: Locator;
    readonly durationLabel: Locator;
    readonly launchHasRetries: Locator;
    readonly ownerName: Locator;
    readonly attributesLabels: Locator;
    readonly startTime: Locator;
    readonly totalTestsLabel: Locator;
    readonly passedTestsLabel: Locator;
    readonly failedTestsLabel: Locator;
    readonly skippedTestsLabel: Locator;
    readonly totalProductBugs: Locator;
    readonly totalAutomationBugs: Locator;
    readonly totalSystemIssues: Locator;
    readonly totalToInvestigate: Locator;
    readonly checkbox: Locator;
    readonly descriptionTitle: Locator;
    readonly descriptionParagraph: Locator;

    constructor(page: Page, launch: Locator) {
        super(page);
        this.launch = launch;
        this.burguerButton = this.launch.locator(`div.hamburger__hamburger--1WEys`);
        this.burguerMenuLocator = this.launch.locator('//div[contains(@class,"hamburgerMenuItem")]');
        this.burguerMenuExportLocator = this.launch.locator('//div[contains(@class,"hamburger__export-button")]/button');
        this.burguerMenu = {
            moveToDebug: this.burguerMenuLocator.nth(0),
            forceFinish: this.burguerMenuLocator.nth(1),
            analysis: this.burguerMenuLocator.nth(2),
            uniqueErrorAnalysis: this.burguerMenuLocator.nth(3),
            patternAnalysis: this.burguerMenuLocator.nth(4),
            delete: this.burguerMenuLocator.nth(5),
            export: {
                pdf: this.burguerMenuExportLocator.nth(0),
                xls: this.burguerMenuExportLocator.nth(1),
                html: this.burguerMenuExportLocator.nth(2)
            }
        };
        this.launchHasRetries = this.launch.locator('//div[contains(@class,"retry-icon")]');
        this.name = this.launch.locator('//div[contains(@class,"itemInfo__main")]').first();
        this.renameButton = this.launch.locator('//span/span/*').first();
        this.qualityGateLabel = this.launch.locator('//div[contains(@class,"additional-info")][1]//span[2]').first();
        this.durationLabel = this.launch.locator('//span[contains(@class,"durationBlock__duration-")]').first();
        this.ownerName = this.launch.locator('//span[contains(@class,"owner")]').first();
        this.attributesLabels = this.launch.locator('//div[contains(@class,"attributesBlock__attribute-")]');
        this.startTime = this.launch.locator('//div[contains(@class,"absRelTime")][1]/span[2]');
        this.totalTestsLabel = this.launch.locator('//div[contains(@class,"launchSuiteGrid__total")]//a');
        this.passedTestsLabel = this.launch.locator('//div[contains(@class,"launchSuiteGrid__passed")]//a');
        this.failedTestsLabel = this.launch.locator('//div[contains(@class,"launchSuiteGrid__failed-col")]//a');
        this.skippedTestsLabel = this.launch.locator('//div[contains(@class,"launchSuiteGrid__skipped")]//a');
        this.totalProductBugs = this.launch.locator('(//div[contains(@class,"launchSuiteGrid__pb-col")])//div[contains(@class,"donutChart__total")]');
        this.totalAutomationBugs = this.launch.locator('//div[contains(@class,"launchSuiteGrid__ab-col")]//div[contains(@class,"donutChart__total")]')
        this.totalSystemIssues = this.launch.locator('//div[contains(@class,"launchSuiteGrid__si-col")]//div[contains(@class,"donutChart__total")]');
        this.totalToInvestigate = this.launch.locator('//div[contains(@class,"launchSuiteGrid__ti-col")]//div[contains(@class,"donutChart__total")]');
        this.checkbox = this.launch.locator('(//*[contains(@class,"checkIcon__icon")])');
        this.descriptionTitle = this.launch.locator('//div[contains(@class,"gridRow__description")]//h3[1]');
        this.descriptionParagraph = this.launch.locator('//div[contains(@class,"gridRow__description")]//p[1]');
    }
}
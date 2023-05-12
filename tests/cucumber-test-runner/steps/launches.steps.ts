import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Locator, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../business/pages/login.page';
import { logger } from '../../../utilities/logger';
import { URLS } from '../../../business/data/constants';
import { pageFixture } from '../support/fixtures/page.fixture';
import { SideBar } from '../../../business/pages/components/common/sidebar.component';
import { LaunchPage } from '../../../business/pages/launch.page';
import { LaunchComponent } from '../../../business/pages/components/launch.component';

let loginPage: LoginPage;
let sideBar: SideBar;
let launchPage: LaunchPage;
let launches: Locator[]; 
let launch: LaunchComponent;
let name: string | undefined;
let qg: string | undefined;
let duration: string | undefined;
let owner: string | undefined;
let total: string | undefined;
let passed: string | undefined;
let failed: string | undefined;
let skipped: string | undefined;
let production_bugs: string | undefined;
let automation_bugs: string | undefined;
let system_issues: string | undefined;
let to_investigate: string | undefined;

Before(async function () {
    pageFixture.page = await pageFixture.context.newPage();
    loginPage = new LoginPage(pageFixture.page);
    sideBar = new SideBar(pageFixture.page);
    launchPage = new LaunchPage(pageFixture.page);
});

After( async function () {
    await pageFixture.page.close();
    logger.info('Page is closed');
});

Given('User navigates to the Portal Page', async function () {
    await loginPage.navigateToURL(URLS.PORTAL);
});

Given('User clicks on the Launches Button in the Sidebar', async function () {
    await sideBar.launchButton.click();
    logger.info('Sidebar "Launch" Button was clicked');
});

Given('User is in the Launches Page', async function () {
    await launchPage.waitForPageToBeLoaded();
    logger.info('The current page is:');
    logger.data(pageFixture.page.url());
});

Given('User sees the Launch Rows', async function () {
    await launchPage.launches.first().waitFor();
    launches = await launchPage.launches.all();
});

Given(/^User sees the Launch Row #(.*)$/, async function (id: number) {
    logger.info('Launch ID: ');
    logger.data(id);
    const launchLocator = launches[id];
    await launchLocator.waitFor();
    launch = new LaunchComponent(pageFixture.page, launchLocator);
});

When('User sees the Launch Name', async function () {
    name = (await launch.name.textContent())?.toString();
});

When('User sees the Quality Gate Label', async function () {
    qg = (await launch.qualityGateLabel.textContent())?.toString();
});

When('User sees the Duration Time Label', async function () {
    duration = (await launch.durationLabel.textContent())?.toString();
});

When('User sees the Owner Label', async function () {
    owner = (await launch.ownerName.textContent())?.toString();
});

When('User sees the total amount of tests executed', async function () {
    total = (await launch.totalTestsLabel.textContent())?.toString();
});

Then(/^The Launch Name (.*) match$/, async function (launchName: string) {
    expect(name).toBe(launchName);
});

Then(/Quality Gate Label is N\/A/, async function () {
    expect(qg).toBe('N/A');
});

Then(/^Duration is (.*)$/, async function (durationTime: string) {
    expect(duration).toBe(durationTime);
});

Then('Owner is daniel_albavera', async function () {
    expect(owner).toBe('daniel_albavera');
});

Then(/^The total amount of tests executed is (.*)$/, async function (totalString: string) {
    expect(total).toBe(totalString);
});
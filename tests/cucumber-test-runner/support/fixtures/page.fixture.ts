import { Browser, BrowserContext, Page } from "@playwright/test";

export const pageFixture =  {
    browser: undefined as unknown as Browser,
    context: undefined as unknown as BrowserContext,
    page:  undefined as unknown as Page
}
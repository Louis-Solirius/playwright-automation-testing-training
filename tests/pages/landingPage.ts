import { Page } from 'playwright';
import {expect} from "@playwright/test";
import landingPage_content from "../content/landingPage_content";
import axeTest from "../accessibilityTestHelper";

class LandingPage {
    private readonly url: string;
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement';
        this.title = `.govuk-heading-xl`
        this.text = `.gem-c-govspeak`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await page.goto(this.url);

        await Promise.all([
            expect(page.locator(this.title)).toHaveText(landingPage_content.pageTitle),
            expect(page.locator(this.text)).toContainText(landingPage_content.pText1),
            expect(page.locator(this.text)).toContainText(landingPage_content.pText2),
            expect(page.locator(this.text)).toContainText(landingPage_content.liText1),
            expect(page.locator(this.text)).toContainText(landingPage_content.liText2),
        ]);
        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Start now" }).click();
    }
}

export default LandingPage;

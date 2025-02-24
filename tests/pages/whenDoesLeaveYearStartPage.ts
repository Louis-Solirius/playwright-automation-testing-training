import { Page } from 'playwright';
import {expect} from "@playwright/test";
import whenDoesLeaveYearStart_content from "../content/whenDoesLeaveYearStart_content";
import axeTest from "../accessibilityTestHelper";

class WhenDoesLeaveYearStartPage {
    private readonly title: string;
    private readonly hint: string;

    private readonly day: string;
    private readonly month: string;
    private readonly year: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.hint = `.govuk-hint`
        this.day = `input#response-0`
        this.month = `input#response-1`
        this.year = `input#response-2`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(whenDoesLeaveYearStart_content.pageTitle),
            expect(page.locator(this.hint)).toContainText(whenDoesLeaveYearStart_content.hint),
        ]);
        await axeTest(page);
    }

    async fillYearDetails(page: Page, day: string, month: string, year: string): Promise<void> {
        await page.fill(this.day, day);
        await page.fill(this.month, month);
        await page.fill(this.year, year);
        await page.getByRole('button', { name: 'Continue' }).click();
    }
}

export default WhenDoesLeaveYearStartPage;

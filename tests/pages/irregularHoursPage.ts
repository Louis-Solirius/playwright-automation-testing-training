import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularHours_content from "../content/irregularHours_content";
import axeTest from "../accessibilityTestHelper";

class IrregularHoursPage {
    private readonly title: string;
    private readonly text: string;
    private readonly radioYes: string;
    private readonly radioNo: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.text = `.govuk-hint`
        this.radioYes = `label[for="response-0"]`
        this.radioNo = `label[for="response-1"]`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(irregularHours_content.pageTitle),
            expect(page.locator(this.text)).toContainText(irregularHours_content.divText),
            expect(page.locator(this.radioYes)).toContainText(irregularHours_content.radioYes),
            expect(page.locator(this.radioNo)).toContainText(irregularHours_content.radioNo),
        ]);
        await axeTest(page);
    }

    async fillOutFields(page: Page, workIrregularHours: boolean): Promise<void> {
        await page.click( workIrregularHours ? this.radioYes : this.radioNo);

        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default IrregularHoursPage;

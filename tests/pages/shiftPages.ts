import { Page } from 'playwright';
import {expect} from "@playwright/test";
import shiftPages_content from "../content/shiftPages_content";
import axeTest from "../accessibilityTestHelper";

class ShiftPages {
    private readonly title: string;
    private readonly input: string;

    constructor() {
        this.title = `.govuk-label--l`
        this.input = `input#response`
    }

    async checkPageLoads(page: Page, type: 'hours' | 'perShiftPattern' | 'days'): Promise<void> {
        let pageTitle: string = "";
        switch (type){
            case "hours":
                pageTitle = shiftPages_content.pageTitle;
                break;
            case "perShiftPattern":
                pageTitle = shiftPages_content.pageTitle2;
                break;
            case "days":
                pageTitle = shiftPages_content.pageTitle3;
                break;
        }
        await Promise.all([
            expect(page.locator(this.title)).toContainText(pageTitle),
        ]);
        await axeTest(page);
    }

    async fillInput(page: Page, input: string): Promise<void> {
        await page.fill(this.input, input);
        await page.getByRole('button', { name: 'Continue' }).click();
    }
}

export default ShiftPages;

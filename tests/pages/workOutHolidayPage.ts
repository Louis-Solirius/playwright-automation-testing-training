import { Page } from 'playwright';
import {expect} from "@playwright/test";
import workOutHoliday_content from "../content/workOutHoliday_content";
import axeTest from "../accessibilityTestHelper";

class WorkOutHolidayPage {
    private readonly title: string;
    private readonly radio1: string;
    private readonly radio2: string;
    private readonly radio3: string;
    private readonly radio4: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.radio1 = `label[for="response-0"]`
        this.radio2 = `label[for="response-1"]`
        this.radio3 = `label[for="response-2"]`
        this.radio4 = `label[for="response-3"]`
    }

    async checkPageLoads(page: Page, workOut: boolean): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText( workOut ? workOutHoliday_content.pageTitle : workOutHoliday_content.pageTitle2),
        ]);
        await axeTest(page);
    }

    async selectOption(page: Page, option: 'full' |
        'starting part way through a leave year' |
        'leaving part way through a leave year' |
        'starting and leaving part way through a leave year'): Promise<void> {

        switch (option) {
            case "full":
                await page.click(this.radio1);
                break;
            case "starting part way through a leave year":
                await page.click(this.radio2);
                break;
            case "leaving part way through a leave year":
                await page.click(this.radio3);
                break;
            case "starting and leaving part way through a leave year":
                await page.click(this.radio4);
                break;
        }

        await page.getByRole('button', { name: 'Continue' }).click();
    }
}

export default WorkOutHolidayPage;

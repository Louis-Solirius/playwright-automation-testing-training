import { Page } from 'playwright';
import {expect} from "@playwright/test";
import answers_content from "../content/answers_content";
import axeTest from "../accessibilityTestHelper";

class AnswersPage {
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.p`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(answers_content.pageTitle),
        ]);
        await axeTest(page);
    }

    async verifyResult(page: Page, expectedResult: string): Promise<void> {
        expect(page.locator(`${this.text}:text-is("${expectedResult}")`));
    }
}

export default AnswersPage;

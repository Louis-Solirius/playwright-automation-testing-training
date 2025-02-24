import {test} from "@playwright/test";
import LandingPage from "./pages/landingPage";
import IrregularHoursPage from "./pages/irregularHoursPage";
import EntitlementBasedOnPage from "./pages/entitlementBasedOnPage";
import WhenDoesLeaveYearStartPage from "./pages/whenDoesLeaveYearStartPage";
import WorkOutHolidayPage from "./pages/workOutHolidayPage";
import EmploymentStartDatePage from "./pages/employmentStartDatePage";
import ShiftPages from "./pages/shiftPages";
import AnswersPage from "./pages/answersPage";

// Test 1: Full leave year with annualised hours
test(`Calculate Holiday Entitlement for a full leave year with annualised hours and other options:
  - Does the employee work irregular hours or for part of the year? Yes
  - When does the leave year start? 01 01 2023
  - Is the holiday entitlement based on: annualised hours
  - Do you want to work out holiday: for a full leave year`, async ({ page }): Promise<void> => {

    const landingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const irregularHoursPage = new IrregularHoursPage();
    await irregularHoursPage.checkPageLoads(page);
    await irregularHoursPage.fillOutFields(page, true);

    const whenDoesLeaveYearStartPage = new WhenDoesLeaveYearStartPage();
    await whenDoesLeaveYearStartPage.checkPageLoads(page);
    await whenDoesLeaveYearStartPage.fillYearDetails(page, "01", "01", "2023");

    const entitlementBasedOnPage = new EntitlementBasedOnPage();
    await entitlementBasedOnPage.checkPageLoads(page);
    await entitlementBasedOnPage.selectOption(page, 'annualised');

    const workOutHolidayPage = new WorkOutHolidayPage();
    await workOutHolidayPage.checkPageLoads(page, true);
    await workOutHolidayPage.selectOption(page, 'full');

    const answersPage = new AnswersPage();
    await answersPage.checkPageLoads(page);
    await answersPage.verifyResult(page, "The statutory holiday entitlement is 5.6 weeks holiday.");
});

// Test 2: Partial leave year with shifts
test(`Calculate Holiday Entitlement for someone starting and leaving part way through a leave year with shifts and other options:
  - Does the employee work irregular hours or for part of the year? Yes
  - When does the leave year start? 01 01 2023
  - Is the holiday entitlement based on: shifts
  - Do you want to work out holiday: for someone starting and leaving part way through a leave year
  - What was the employment start date? 01 01 2023
  - What was the employment end date? 01 09 2023
  - How many hours in each shift? 8
  - How many shifts will be worked per shift pattern? 8
  - How many days in the shift pattern? 8`, async ({ page }): Promise<void> => {

    const landingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const irregularHoursPage = new IrregularHoursPage();
    await irregularHoursPage.checkPageLoads(page);
    await irregularHoursPage.fillOutFields(page, true);

    const whenDoesLeaveYearStartPage = new WhenDoesLeaveYearStartPage();
    await whenDoesLeaveYearStartPage.checkPageLoads(page);
    await whenDoesLeaveYearStartPage.fillYearDetails(page, "01", "01", "2023");

    const entitlementBasedOnPage = new EntitlementBasedOnPage();
    await entitlementBasedOnPage.checkPageLoads(page);
    await entitlementBasedOnPage.selectOption(page, 'shifts');

    const workOutHolidayPage = new WorkOutHolidayPage();
    await workOutHolidayPage.checkPageLoads(page, false);
    await workOutHolidayPage.selectOption(page, 'starting and leaving part way through a leave year');

    const employmentStartDatePage = new EmploymentStartDatePage();
    await employmentStartDatePage.checkPageLoads(page, true);
    await employmentStartDatePage.fillYearDetails(page, "01", "01", "2023");

    const employmentEndDatePage = new EmploymentStartDatePage();
    await employmentEndDatePage.checkPageLoads(page, false);
    await employmentEndDatePage.fillYearDetails(page, "01", "09", "2023");

    const shiftPages = new ShiftPages();
    await shiftPages.checkPageLoads(page, `hours`);
    await shiftPages.fillInput(page, `8`);

    const shiftPages2 = new ShiftPages();
    await shiftPages2.checkPageLoads(page, `perShiftPattern`);
    await shiftPages2.fillInput(page, `8`);

    const shiftPages3 = new ShiftPages();
    await shiftPages3.checkPageLoads(page, `days`);
    await shiftPages3.fillInput(page, `8`);

    const answersPage = new AnswersPage();
    await answersPage.checkPageLoads(page);
    await answersPage.verifyResult(page, "The statutory holiday entitlement is 18.72 shifts for the year. Each shift being 8.0 hours.");
});

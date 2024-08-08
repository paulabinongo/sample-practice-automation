import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { clickTestCaseButton, viewTestCase } from '../../../common/helpers/contact-us-test-cases-api-testing-video-tutorials-subscription-helper';

Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
})
When('I click the test cases button', () => {
    clickTestCaseButton();
})
Then('I should be able to view the list of test cases', () => {
    viewTestCase();
});
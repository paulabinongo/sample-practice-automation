import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyContactUsPageForFeedbackForUs, viewFeedbackUsFeed } from '../../../common/helpers/contact-us-test-cases-api-testing-video-tutorials-subscription-helper';

Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
});

When('I click the Contact Us page link for the Feedback For Us section', () => {
    verifyContactUsPageForFeedbackForUs();
});

Then('I should be able to view the feedback us section', () => {
    viewFeedbackUsFeed();
})
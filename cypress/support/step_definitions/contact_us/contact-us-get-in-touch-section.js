import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyContactUsPageForGetInTouch, viewFieldsWithPlaceholder, fillContactFormWithLoggedInUser, uploadPhoto, verifySuccessMessageForContactUsSubmission } from '../../../common/helpers/contact-us-test-cases-api-testing-video-tutorials-subscription-helper';

Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
});

When('I click the Contact Us page link for the Get In Touch section', () => {
    verifyContactUsPageForGetInTouch();
    viewFieldsWithPlaceholder([
        { fieldName: 'name', placeholder: 'Name' },
        { fieldName: 'email', placeholder: 'Email' },
        { fieldName: 'subject', placeholder: 'Subject' },
        { fieldName: 'message', placeholder: 'Your Message Here' }
    ]);
});

And('fill out the contact us form', () => {
    fillContactFormWithLoggedInUser();
    uploadPhoto();
})
Then('I should be able to redirect to the dashboard page', () => {
    verifySuccessMessageForContactUsSubmission();
})
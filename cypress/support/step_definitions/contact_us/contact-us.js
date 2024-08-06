import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyContactUsPage, viewFieldsWithPlaceholder, fillContactFormWithLoggedInUser, uploadPhoto } from '../../../common/helpers/contact-us-test-cases-api-testing-video-tutorials-helper';

Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
})

When('I click the Contact Us Page Link', () => {
    verifyContactUsPage();
    viewFieldsWithPlaceholder([
        { fieldName: 'name', placeholder: 'Name' },
        { fieldName: 'email', placeholder: 'Email' },
        { fieldName: 'subject', placeholder: 'Subject' },
        { fieldName: 'message', placeholder: 'Your Message Here' }
    ]);
    fillContactFormWithLoggedInUser();
    uploadPhoto();
});
// Then('I should be able to redirect to the Contact Us page', '');
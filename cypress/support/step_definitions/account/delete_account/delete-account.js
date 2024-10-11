import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, verifyClickDelete, verifySuccessMessageForAccountDeletion } from '../../../../common/helpers/register-login-logout-delete-dashboard-helper';

Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
});
When('I click the delete button', () => {
    verifyClickDelete();
});
Then('I should be able to delete the created or logged in account from the website', () => {
    verifySuccessMessageForAccountDeletion();
});
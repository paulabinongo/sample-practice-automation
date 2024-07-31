import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, verifyClickDelete, verifySuccessMessageForAccountDeletion } from '../../../../common/helpers/register-login-logout-delete-helper';

Given('that I am on the dashboard page', () => {
    verifyDashboardPage();
});
When('I view that there is a delete button', () => {
    verifyClickDelete();
});
Then('I should be able to delete the created or logged in account', () => {
    verifySuccessMessageForAccountDeletion();
});
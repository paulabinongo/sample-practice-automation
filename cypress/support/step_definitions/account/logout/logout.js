import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, visitLoginPage, submitLogInForm, verifyClickLogout } from '../../../../common/helpers/register-login-logout-delete-dashboard-helper';


Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
});
When('I click the logout button', () => {
    verifyClickLogout();
});
Then('I should be able to logout the created or logged in account from the website', () => {
    visitLoginPage();
});
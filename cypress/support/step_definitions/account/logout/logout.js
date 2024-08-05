import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, visitLoginPage, submitLogInForm, verifyClickLogout } from '../../../../common/helpers/register-login-logout-delete-dashboard-helper';


Given('that I am on the dashboard page', () => {
    verifyDashboardPage();
});
When('I view that there is a logout button', () => {
    verifyClickLogout();
});
Then('I should be able to logout from the website', () => {
    visitLoginPage();
});
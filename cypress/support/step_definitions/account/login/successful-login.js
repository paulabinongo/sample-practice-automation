import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { visitLoginPage, fillLoginFormForValidData, submitLogInForm, verifySuccessMessageForLogin } from '../../../../common/helpers/register-login-logout-delete-helper';


Given('that I am on the login page', () => {
    visitLoginPage();
});

When('I fill out the login form with correct credentials', () => {
    fillLoginFormForValidData();
});

And('submit the login form', () => {
    submitLogInForm();
});

Then('I should view the Success Message for login', () => {
    verifySuccessMessageForLogin();
});
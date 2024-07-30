import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { visitLoginPage, fillLoginFormForValidData, submitLogInForm, verifySuccessMessageForLogin } from '../../../common/helpers/register-login-logout-delete-helper';


Given('that I am on the login page', () => {
    visitLoginPage();
});

When('I fill out the login form with valid data', () => {
    fillLoginFormForValidData();
});

And('I submit the login Form with correct credentials', () => {
    submitLogInForm();
});

Then('I should view the Success Message for login', () => {
    verifySuccessMessageForLogin();
});
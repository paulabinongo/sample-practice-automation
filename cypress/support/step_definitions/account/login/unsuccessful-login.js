import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import {
    visitLoginPage,
    fillLoginFormForInvalidData,
    submitLogInForm,
    verifyErrorMessageForLogin
} from '../../../../common/helpers/register-login-logout-delete-dashboard-helper';

Given('that I am on the login page', () => {
    visitLoginPage();
});
When('I fill out the login form with incorrect credentials', () => {
    fillLoginFormForInvalidData();
});
Then('submit the login Form', () => {
    submitLogInForm();
});
And('I should view the error message for login', () => {
    verifyErrorMessageForLogin();
})
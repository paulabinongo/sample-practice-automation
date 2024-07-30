import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
    visitLoginPage,
    fillLoginFormForInvalidData,
    submitLogInForm,
    verifyErrorMessageForLogin
} from '../../../common/helpers/register-login-logout-delete-helper';

Given('that I am on the login page', () => {
    visitLoginPage();
});
When('I fill out the login form with invalid data', () => {
    fillLoginFormForInvalidData();
});
Then('I submit the login Form with incorrect credentials', () => {
    submitLogInForm();
});
And('I should view the Error Message for login', () => {
    verifyErrorMessageForLogin();
})
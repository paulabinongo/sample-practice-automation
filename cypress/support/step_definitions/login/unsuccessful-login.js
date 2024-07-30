import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
    visitLoginPage,
    fillLoginFormForInvalidData,
    submitLogInForm,
    verifyErrorMessageForLogin
} from '../../../common/helpers/helpers';

Given('that I am on the Log In page', () => {
    visitLoginPage();
});
When('I fill out the log in form with invalid data', () => {
    fillLoginFormForInvalidData();
});
Then('I submit the Log In Form with incorrect credentials', () => {
    submitLogInForm();
});
And('I should view the Error Message', () => {
    verifyErrorMessageForLogin();
})
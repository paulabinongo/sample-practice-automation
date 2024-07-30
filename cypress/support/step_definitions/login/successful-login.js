import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { visitLoginPage, fillLoginFormForValidData, submitLogInForm, verifySuccessMessageForLogin } from '../../../common/helpers/helpers';


Given('that I am on the Log In page', () => {
    visitLoginPage();
});

When('I fill out the log in form with valid data', () => {
    fillLoginFormForValidData();
});

And('I submit the Log In Form with correct credentials', () => {
    submitLogInForm();
});

Then('I should view the Success Message', () => {
    verifySuccessMessageForLogin();
});
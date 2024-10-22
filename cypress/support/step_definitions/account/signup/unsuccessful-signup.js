import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import {
    visitSignUpPage,
    fillSignUpFormForInvalidData,
    submitSignUpForm,
    verifyErrorMessageForSignUp
} from '../../../../common/helpers/register-login-logout-delete-helper';

Given('that I am on the signup page', () => {
    visitSignUpPage();
});

When('I fill out the signup form with existing credentials', () => {
    fillSignUpFormForInvalidData();
});

And('submit the signup form', () => {
    submitSignUpForm();
});

Then('I should view the Error Message for signup', () => {
    verifyErrorMessageForSignUp();
});
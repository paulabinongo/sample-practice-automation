import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { getRandomEmailWithName } from '../../commands/commands';
import {
    visitSignUpPage,
    fillSignUpFormForInvalidData,
    submitSignUpForm,
    verifyErrorMessageForSignUp
} from '../../../common/helpers/helpers';

Given('that I am on the Sign Up page', () => {
    visitSignUpPage()
});

When('I fill out the sign up form with invalid data', () => {
    fillSignUpFormForInvalidData()
});

And('submit the Sign Up Form with incorrect credentials', () => {
    submitSignUpForm()
});

Then('I should view an Error Message', () => {
    verifyErrorMessageForSignUp()
})
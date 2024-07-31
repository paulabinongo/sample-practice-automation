import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import {
    visitSignUpPage,
    fillSignUpFormForValidData,
    submitSignUpForm,
    verifyAccountInfoPage,
    addPersonalDetails,
    verifySuccessMessageForSignUp,
    continueToDashboard
} from '../../../../common/helpers/register-login-logout-delete-helper';

before(() => {
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
});

Given('that I am on the signup page', () => {
    visitSignUpPage();
});

When('I fill out the signup form with new credentials', () => {
    cy.generateDataAndSaveData().as('userData');
    cy.get('@userData').then(({ userData }) => {
        fillSignUpFormForValidData(userData);
    });
});

And('submit the signup form', () => {
    submitSignUpForm();
});

And('view the Account Information and Address Information sections', () => {
    verifyAccountInfoPage();
});

And('add my Personal Details on each section', () => {
    cy.get('@userData').then(({ userData }) => {
        addPersonalDetails(userData);
    });
});

Then('I should view the Success Message for signup', () => {
    verifySuccessMessageForSignUp();
});

And('be redirected to the Dashboard page', () => {
    continueToDashboard();
});
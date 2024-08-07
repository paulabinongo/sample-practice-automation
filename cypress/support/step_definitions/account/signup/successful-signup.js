import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import {
    visitSignUpPage,
    fillSignUpFormForValidData,
    submitSignUpForm,
    verifyAccountInfoPage,
    addPersonalDetails,
    verifySuccessMessageForSignUp,
    continueToDashboard
} from '../../../../common/helpers/register-login-logout-delete-dashboard-helper';

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

And('view the account information and address information sections', () => {
    verifyAccountInfoPage();
});

And('add my personal details on each section', () => {
    cy.get('@userData').then(({ userData }) => {
        addPersonalDetails(userData);
    });
});

Then('I should view the success message for signup', () => {
    verifySuccessMessageForSignUp();
});

And('be redirected to the dashboard page', () => {
    continueToDashboard();
});
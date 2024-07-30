import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { generateDataAndSaveData } from '../../commands/commands';
import {
    visitSignUpPage,
    fillSignUpFormForValidData,
    submitSignUpForm,
    verifyAccountInfoPage,
    addPersonalDetails,
    verifySuccessMessageForSignUp,
    continueToDashboard
} from '../../../common/helpers/helpers';

before(() => {
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
});

Given('that I am on the sign up page', () => {
    visitSignUpPage();
});

When('I fill out the sign up form with valid data', () => {
    cy.generateDataAndSaveData().as('userData');
    cy.get('@userData').then(({ userData }) => {
        fillSignUpFormForValidData(userData);
    });
});

And('submit the Sign Up Form with correct credentials', () => {
    submitSignUpForm();
});

And('I should view the form for the Account Information and Address Information', () => {
    verifyAccountInfoPage();
});

And('I should add my Personal Details on each section', () => {
    cy.get('@userData').then(({ userData }) => {
        addPersonalDetails(userData);
    });
});

Then('I should view the Success Message', () => {
    verifySuccessMessageForSignUp();
});

And('I should be redirected to the Dashboard page, once I click the Continue button', () => {
    continueToDashboard();
});
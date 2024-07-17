import { Given, When, And } from 'cypress-cucumber-preprocessor/steps';
import { generateDataAndSaveData } from '../commands/commands';

before(() => {
    cy.viewport(Cypress.config('viewportHeight'), Cypress.config('viewportWidth'));
});

Given('I open the website to signup', () => {
    const signupUrl = Cypress.config('baseUrl');
    cy.visit(`${signupUrl}/signup`);
});

When('I sign up', () => {
    cy.generateDataAndSaveData().as('userData');
    cy.get('@userData').then(({ userData }) => {
        // Use userData and newData as needed
        const fullName = `${userData.firstName} ${userData.lastName}`;
        // Fill out the signup form with generated data
        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(userData.email);
    });
});
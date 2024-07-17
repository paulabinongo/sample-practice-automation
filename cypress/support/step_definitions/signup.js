import { Given, When, And } from 'cypress-cucumber-preprocessor/steps'
import { generateAndSaveUserData } from '../commands/commands'

before(() => {
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
})


Given('I open the website to signup', () => {
    const signupUrl = Cypress.config('baseUrl');
    cy.visit(`${signupUrl}/signup`)
});


When('I sign up', () => {
    cy.generateAndSaveUserData().as('userData');
    cy.get('@userData').then(({ userData, newData }) => {
        // Use userData and newData as needed
        const fullName = `${userData.firstName} ${userData.lastName}`;
        // Fill out the signup form with generated data
        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(userData.email);

    });
})
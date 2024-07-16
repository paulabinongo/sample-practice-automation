import { Given, When, And } from 'cypress-cucumber-preprocessor/steps'
// import { faker } from 'faker';



Given('I open the website to signup', () => {
    const signupUrl = Cypress.config('baseUrl');
    cy.visit(`${signupUrl}/signup`)
});
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, verifyClickLogout } from '../../../common/helpers/register-login-logout-delete-helper';


Given('that I am on the Dashboard page', () => {
    cy.visit(`${Cypress.config('baseUrl')}/login`);
    cy.getRandomEmailAndName().then(({ email }) => {
        cy.get('[data-qa="login-email"]').type(email);
    })
    cy.get('[data-qa="login-password"]').type('Password123');
    cy.get('[data-qa="login-button"]').click();
});
When('I view that there is a logout button', () => {
    verifyClickLogout();
});
Then('I should be able to logout from the website', () => {
    cy.url().should('include', '/login');
});
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('that I am on the Sign Up page', () => {
    cy.visit('/signup');
});

When('I fill out the sign up form with invalid data', () => {
    cy.getRandomEmailWithName().then(({ email, fullName }) => {
        // Fill in the email
        cy.get('[data-qa="signup-name"]').type(fullName)
        cy.get('[data-qa="signup-email"]').type(email);

        // Optional: Log the full name for verification
        cy.log(`Filling out form with email: ${email} and full name: ${fullName}`);
    });
});

And('submit the Sign Up Form with incorrect credentials', () => {
    cy.get('[data-qa="signup-button"]').click();
});

Then('I should view an Error Message', () => {
    cy.get('.signup-form > form > p').should('be.visible')
        .contains('Email Address already exist!')
})
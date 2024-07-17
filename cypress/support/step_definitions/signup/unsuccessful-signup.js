import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateDataAndSaveData } from '../../commands/commands';

before(() => {
    cy.viewport(Cypress.config('viewportHeight'), Cypress.config('viewportWidth'));
});

Given('that I am on the sign up page', () => {
    cy.get(':nth-child(4) > a')
        .contains('Signup')
        .wait(3000);
});

When('I fill out the sign up form with an existing data', () => {
    cy.fixture('generated-test-data').then((users) => {
        // Select a random user from the array (example usage)
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // Validate user data structure
        if (!randomUser || !randomUser.email || !randomUser.firstName || !randomUser.lastName) {
            throw new Error('Invalid user data structure');
        }

        const fullName = `${randomUser.firstName} ${randomUser.lastName}`;

        // Fill out the form fields
        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(randomUser.email);
    });
});

And('I submit the Sign Up Form', () => {
    cy.get('[data-qa="signup-button"]').click();
});

Then(' I should see an Error Message', () => {
    cy.get('.signup-form > form > p')
        .contains('Email Address already exist!')
        .wait(3500);
});
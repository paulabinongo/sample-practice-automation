import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateDataAndSaveData } from '../../commands/commands';

before(() => {
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
});

Given('that I am on the sign up page', () => {
    const signupUrl = Cypress.config('baseUrl');
    cy.visit(`${signupUrl}/signup`);
});

When('I fill out the sign up form with valid data', () => {
    cy.generateDataAndSaveData().as('userData');
    cy.get('@userData').then(({ userData }) => {
        const fullName = `${userData.firstName} ${userData.lastName}`;

        // Fill out the signup form with generated data
        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(userData.email);
    });
});

And('I submit the Sign Up Form', () => {
    cy.get('[data-qa="signup-button"]').click();
});

And('I should be able to view the form for the Account Information and Address Information', () => {
    cy.get(':nth-child(1) > b').contains('Enter Account Information', { matchCase: false });
    cy.get('form > .title > b').contains('Address Information', { matchCase: false });
    cy.wait(3500);
});

And('I should be able to add my Personal Details on each section', () => {
    cy.generateDataAndSaveData().as('gender');
    cy.get('@gender').then(({ userData }) => {
        // Select gender radio button based on generated gender
        if (userData.gender === 'Mr.') {
            cy.get('#id_gender1').check({ force: true });
        } else if (userData.gender === 'Mrs.') {
            cy.get('#id_gender2').check({ force: true });
        }
    });

    cy.get('[data-qa="password"]').type('Password123');

    // Function to select a random option from a dropdown
    const selectRandomOption = (selector) => {
        cy.get(selector).then($select => {
            const options = $select.find('option');
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomValue = options.eq(randomIndex).val();
            cy.wrap($select).select(randomValue);
        });
    };

    selectRandomOption('[data-qa="days"]');
    selectRandomOption('[data-qa="months"]');
    selectRandomOption('[data-qa="years"]');

    // Randomly check/uncheck checkboxes
    const toggleCheckbox = (selector) => {
        cy.get(selector).each($checkbox => {
            const randomBoolean = Math.random() >= 0.5;
            if (randomBoolean) {
                cy.wrap($checkbox).check({ force: true });
            } else {
                cy.wrap($checkbox).uncheck({ force: true });
            }
        });
    };

    toggleCheckbox('#newsletter');
    toggleCheckbox('#optin');
});
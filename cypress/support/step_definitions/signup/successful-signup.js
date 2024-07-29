import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { generateDataAndSaveData } from '../../commands/commands';

before(() => {
    cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
});

Given('that I am on the sign up page', () => {
    cy.visit(`${Cypress.config('baseUrl')}/signup`);
});

When('I fill out the sign up form with valid data', () => {
    cy.generateDataAndSaveData().as('userData');
    cy.get('@userData').then(({ userData }) => {
        const fullName = `${userData.firstName} ${userData.lastName}`;
        const userFields = ['firstName', 'lastName', 'email', 'company', 'country', 'mobileNumber', 'address1', 'address2', 'city', 'state', 'zipcode'];

        userFields.forEach(field => cy.wrap(userData[field]).as(field));

        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(userData.email);
    });
});

And('submit the Sign Up Form with correct credentials', () => {
    cy.get('[data-qa="signup-button"]').click();
});

And('I should view the form for the Account Information and Address Information', () => {
    cy.get(':nth-child(1) > b').contains('Enter Account Information', { matchCase: false });
    cy.get('form > .title > b').contains('Address Information', { matchCase: false });
    cy.wait(3500); // Adjust the wait time if necessary
});

And('I should add my Personal Details on each section', () => {
    cy.get('@userData').then(({ userData }) => {
        cy.get(userData.gender === 'Mr.' ? '#id_gender1' : '#id_gender2').check({ force: true });
    });

    cy.get('[data-qa="password"]').type('Password123');

    const selectRandomOption = (selector) => {
        cy.get(selector).then($select => {
            const options = $select.find('option');
            const randomValue = options.eq(Math.floor(Math.random() * options.length)).val();
            cy.wrap($select).select(randomValue);
        });
    };

    selectRandomOption('[data-qa="days"]');
    selectRandomOption('[data-qa="months"]');
    selectRandomOption('[data-qa="years"]');

    const toggleCheckbox = (selector) => {
        cy.get(selector).each($checkbox => {
            const shouldCheck = Math.random() >= 0.5;
            cy.wrap($checkbox).then($checkbox => {
                if (shouldCheck) {
                    cy.wrap($checkbox).check({ force: true });
                } else {
                    cy.wrap($checkbox).uncheck({ force: true });
                }
            });
        });
    };

    toggleCheckbox('#newsletter');
    toggleCheckbox('#optin');

    cy.get('@country').then(country => {
        cy.get('[data-qa="country"]').select(country);
    });

    const fields = {
        firstName: '[data-qa="first_name"]',
        lastName: '[data-qa="last_name"]',
        company: '[data-qa="company"]',
        address1: '[data-qa="address"]',
        address2: '[data-qa="address2"]',
        city: '[data-qa="city"]',
        state: '[data-qa="state"]',
        zipcode: '[data-qa="zipcode"]',
        mobileNumber: '[data-qa="mobile_number"]'
    };

    Object.keys(fields).forEach(key => {
        cy.get(`@${key}`).then(value => {
            cy.get(fields[key]).type(value);
        });
    });

    cy.get('[data-qa="create-account"]').click()
});

Then('I should view the Success Message', () => {
    cy.url().should('include', '/account_created')
    cy.get('b').contains('Account Created!', { matchCase: false });
    cy.get('.col-sm-9').should('be.visible')
        .contains('Congratulations! Your new account has been successfully created! You can now take advantage of member privileges to enhance your online shopping experience with us.');

})
And('I should be redirected to the Dashboard page, once I click the Continue button', () => {
    cy.get('[data-qa="continue-button"]').contains('Continue').click()
    cy.url().should('include', '/')
})
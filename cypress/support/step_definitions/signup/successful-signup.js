import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateDataAndSaveData } from '../../commands/commands'

before(() => {
    cy.viewport(Cypress.config('viewportHeight'), Cypress.config('viewportWidth'));
});

Given('that I am on the sign up page', () => {
    const signupUrl = Cypress.config('baseUrl');
    cy.visit(`${signupUrl}/signup`);
});

When('I fill out the sign up form with valid data', () => {
    cy.generateDataAndSaveData().as('userData');
    cy.get('@userData').then(({ userData }) => {

        // Use userData and newData as needed
        const fullName = `${userData.firstName} ${userData.lastName}`;

        // Fill out the signup form with generated data
        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(userData.email);
    });

    And('I submit the Sign Up Form', () => {
        cy.get('[data-qa="signup-button"]').click();
    })

    And('I should be able to view the form for the Account Information and Address Information', () => {
        cy.get(':nth-child(1) > b').contains('Enter Account Information', { matchCase: false })
            .get('form > .title > b').contains('Address Information', { matchCase: false })
            .wait(3500);
    })

    And('I should be able to add my Personal Details on each section', () => {
        cy.generateDataAndSaveData().as('gender');
        cy.get('@gender').then(({ userData }) => {

            // Select gender radio button based on generated gender
            if (userData.gender === 'Mr.') {
                cy.get('#id_gender1').check({ force: true }); // Adjust selector as per your application
            } else if (userData.gender === 'Mrs.') {
                cy.get('#id_gender2').check({ force: true }); // Adjust selector as per your application
            }
        });
        cy.get('[data-qa="password"]').type('Password123');
        cy.get('[data-qa="days"]').then(select => {
            const dayOption = select.find('option');
            const dayOptionCount = dayOption.length;
            const dayRandomIndex = Math.floor(Math.random() * dayOptionCount);
            const dayRandomValue = dayOption[dayRandomIndex].value;

            //Wrap the select element with Cypress and select the random option by its value
            cy.wrap(select).select(dayRandomValue);
        })

        cy.get('[data-qa="months"]').then(select => {
            const monthOptions = select.find('option');
            const monthOptionCount = monthOptions.length;
            const monthRandomIndex = Math.floor(Math.random() * monthOptionCount);
            const monthRandomValue = monthOptions[monthRandomIndex].value;

            //Wrap the select element with Cypress and select the random option by its value
            cy.get(select).select(monthRandomValue);
        })

        cy.get('[data-qa="years"]').then(select => {
            const yearOption = select.find('option');
            const yearOptionCount = yearOption.length;
            const yearRandomIndex = Math.floor(Math.random() * yearOptionCount);
            const yearRandomValue = yearOption[yearRandomIndex].value;

            //Wrap the select element with Cypress and select the random option by its value
            cy.wrap(select).select(yearRandomValue)
        })

        cy.get('#newsletter').each(($checkbox) => {
            //Generate a randomBoolean
            const randomBoolean = Math.random() >= 0.5;
            if (randomBoolean) {
                //Check the checkbox if it's not already checked
                cy.wrap($checkbox).check();
            } else {
                //Uncheck the checkbox if it's already uncheck
                cy.wrap($checkbox).uncheck();
            }
        })
        cy.get('#newsletter').each(($checkbox) => {
            const isChecked = $checkbox.prop('checked');
            cy.wrap($checkbox).should(isChecked ? 'be.checked' : 'not.be.checked');
        })

        cy.get('#optin').each(($checkbox) => {
            // Generate a random boolean
            const randomBoolean = Math.random() >= 0.2;

            if (randomBoolean) {
                // Check the checkbox if it's not already checked
                cy.wrap($checkbox).check();
            } else {
                // Uncheck the checkbox if it's not already unchecked
                cy.wrap($checkbox).uncheck();
            }
        })
        cy.get('#optin').each(($checkbox) => {
            const isChecked = $checkbox.prop('checked');
            cy.wrap($checkbox).should(isChecked ? 'be.checked' : 'not.be.checked')
        });
    });

});
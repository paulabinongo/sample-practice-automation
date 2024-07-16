import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I open the website', () => {
    cy.visit('https://experience-api-dca-processing-r2-4cb4n4kxsq-as.a.run.app/login'); // Replace with the URL of your website
});
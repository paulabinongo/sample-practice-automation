import { Given, When, And } from 'cypress-cucumber-preprocessor/steps'

Given('I open the website', () => {
    cy.visit('https://www.saucedemo.com/'); // Replace with the URL of your website
});
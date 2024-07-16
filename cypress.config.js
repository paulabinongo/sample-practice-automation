const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber());
            return config;
        },
        specPattern: 'cypress/e2e/**/*.feature', // Ensure this path is correct
        supportFile: 'cypress/support/index.js', // Ensure this path is correct
        baseUrl: 'https://www.automationexercise.com', // Replace with the URL of your website
    },
});
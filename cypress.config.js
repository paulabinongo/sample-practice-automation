const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber());
            return config;
        },
        specPattern: ['cypress/integration/**/*.{feature,spec.js}'], // Ensure this path is correct
        supportFile: 'cypress/support/index.js', // Ensure this path is correct
        baseUrl: 'https://www.automationexercise.com', // Replace with the URL of your website
        viewportHeight: 1000,
        viewportWidth: 1080,
        watchForFileChanges: false,
        screenshotOnRunFailure: true,
        chromeWebSecurity: false,
        defaultCommandTimeout: 10000,
        requestTimeout: 60000,
        responseTimeout: 60000
    },
});
const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber());

            // Task for deleting a user from the JSON file
            on('task', {
                deleteUserFromJSON(email) {
                    const filePath = path.join(__dirname, 'cypress', 'fixtures', 'generated-test-data.json');
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                    // Filter out the user with the specified email
                    const updatedData = data.filter(user => user.email !== email);

                    // Write the updated data back to the file
                    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

                    return null;
                }
            });

            return config;
        },
        specPattern: ['cypress/integration/**/*.{feature,spec.js}'],
        supportFile: 'cypress/support/index.js',
        baseUrl: 'https://www.automationexercise.com',
        viewportHeight: 1000,
        viewportWidth: 1010,
        watchForFileChanges: false,
        screenshotOnRunFailure: true,
        chromeWebSecurity: false,
        defaultCommandTimeout: 10000,
        requestTimeout: 60000,
        responseTimeout: 60000
    },
});
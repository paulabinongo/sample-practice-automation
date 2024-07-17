const faker = require('faker');

Cypress.Commands.add('generateAndSaveUserData', () => {
    return cy.readFile('cypress/fixtures/generated-test-data.json').then((existingData) => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
        };

        // Append new data to existingData
        const newData = [...existingData, userData];

        // Write the updated data back to the fixture file
        return cy.writeFile('cypress/fixtures/generated-test-data.json', newData).then(() => {
            // Return both userData and newData as an object
            return { userData, newData };
        });
    });
});
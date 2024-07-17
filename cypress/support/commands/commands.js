const faker = require('faker');

Cypress.Commands.add('generateDataAndSaveData', () => {
    return cy.readFile('cypress/fixtures/generated-test-data.json').then((existingData) => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            gender: faker.random.arrayElement(['Mr.', 'Mrs.']),
        }

        // Append new data to the existing data
        const newData = [...existingData, userData]

        // Write the updated data back to the fixture file
        return cy.writeFile('cypress/fixtures/generated-test-data.json', newData).then(() => {

            // Return both the user data and new data as an object
            return { userData, newData };
        })
    })
})
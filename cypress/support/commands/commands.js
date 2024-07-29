const faker = require('faker');
const countryMobileMapping = require('../../fixtures/country-mobile-mapping.json'); // Adjust the path as needed

Cypress.Commands.add('generateDataAndSaveData', () => {
    return cy.readFile('cypress/fixtures/generated-test-data.json').then((existingData) => {
        // Select a random country from the mapping
        const country = faker.random.arrayElement(Object.keys(countryMobileMapping));
        const countryData = countryMobileMapping[country];

        // Generate a mobile number based on the country format
        const mobileNumber = `${countryData.prefix}${faker.phone.phoneNumber(countryData.format)}`;

        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            gender: faker.random.arrayElement(['Mr.', 'Mrs.']),
            company: faker.company.companyName(),
            country: country,
            mobileNumber: mobileNumber
        };

        // Append new data to the existing data
        const newData = [...existingData, userData];

        // Write the updated data back to the fixture file
        return cy.writeFile('cypress/fixtures/generated-test-data.json', newData).then(() => {
            // Return both the user data and new data as an object
            return { userData, newData };
        });
    });
});
const faker = require('faker');
const countryAddressMapping = require('../../fixtures/country-mobile-mapping.json'); // Adjust path as needed

Cypress.Commands.add('generateDataAndSaveData', () => {
    return cy.readFile('cypress/fixtures/generated-test-data.json').then((existingData) => {
        // Select a random country from the mapping
        const country = faker.random.arrayElement(Object.keys(countryAddressMapping));
        const addressData = countryAddressMapping[country];

        // Generate dynamic address details
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            gender: faker.random.arrayElement(['Mr.', 'Mrs.']),
            company: faker.company.companyName(),
            country: country,
            mobileNumber: faker.phone.phoneNumber(), // Format this depending on the country
            address1: addressData.address1 || faker.address.streetAddress(),
            address2: addressData.address2 || faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.random.arrayElement(addressData.state) || faker.address.stateAbbr(),
            zipcode: faker.address.zipCode(addressData.zipcode || '#####')
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
import 'cypress-file-upload';
const faker = require('faker');
const countryAddressMapping = require('../../common/fixtures/country-mobile-mapping.json');
const contactFormData = require('../../common/fixtures/contact-form-data-list.json')

Cypress.Commands.add('generateDataAndSaveData', () => {
    return cy.readFile('cypress/common/fixtures/generated-test-data.json').then((existingData) => {
        // Select a random country from the mapping
        const country = faker.random.arrayElement(Object.keys(countryAddressMapping));
        const addressData = countryAddressMapping[country];

        // Function to generate mobile number based on format and prefix
        const generateMobileNumber = (format, prefix) => {
            let number = faker.phone.phoneNumber(format).replace(/[^0-9]/g, ''); // Remove non-numeric characters
            return `${prefix}${number}`;
        };

        // Generate dynamic address details
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            gender: faker.random.arrayElement(['Mr.', 'Mrs.']),
            company: faker.company.companyName(),
            country: country,
            mobileNumber: generateMobileNumber(addressData.mobileFormat || '##########', addressData.mobilePrefix || '+1'),
            address1: addressData.address1 || faker.address.streetAddress(),
            address2: addressData.address2 || faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.random.arrayElement(addressData.state) || faker.address.stateAbbr(),
            zipcode: faker.address.zipCode(addressData.zipcode || '#####')
        };

        // Append new data to the existing data
        const newData = [...existingData, userData];

        // Write the updated data back to the fixture file
        return cy.writeFile('cypress/common/fixtures/generated-test-data.json', newData).then(() => {
            // Return both the user data and new data as an object
            return { userData, newData };
        });
    });
});


Cypress.Commands.add('getRandomEmailAndName', () => {
    return cy.readFile('cypress/common/fixtures/generated-test-data.json').then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const selectedData = data[randomIndex];
            const fullName = `${selectedData.firstName} ${selectedData.lastName}`;
            return {
                email: selectedData.email,
                fullName: fullName
            };
        } else {
            throw new Error('No data found in JSON file');
        }
    });
});

Cypress.Commands.add('getSubjectAndMessage', () => {
    return cy.readFile('cypress/common/fixtures/contact-form-data-list.json').then(data => {
        // Ensure data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const selectedData = data[randomIndex];
            return {
                subject: selectedData.subject,
                message: selectedData.message
            };
        } else {
            throw new Error('No data available in the fixture file.');
        }
    });
});
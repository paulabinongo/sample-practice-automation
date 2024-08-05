import { clickButton, verifyMessage, verifySuccessMessageForLogin } from '../helpers/register-login-logout-delete-dashboard-helper'

export const verifyContactUsPage = () => {
    clickButton(':nth-child(9) > a', 'Contact us')
    verifyMessage('.col-sm-12 > .title', 'Contact Us');
    verifyMessage('div.contact-form > :nth-child(1)', 'Note: Below contact form is for testing purpose.');
    verifyMessage('div.contact-form > .title', 'Get In Touch');
}

export const viewFieldsWithPlaceholder = (fields) => {
    fields.forEach(({ fieldName, placeholder }) => {
        cy.get(`[data-qa=${fieldName}]`).should('be.visible')
            .invoke('attr', 'placeholder')
            .should('equal', placeholder)
    })
};

export const fillContactFormWithLoggedInUser = () => {
    cy.get('@loggedInUser').then(({ fullName, emailAddress }) => {
        const contactUsFields = [
            { selector: '[data-qa="name"]', value: fullName },
            { selector: '[data-qa="email"]', value: emailAddress }
        ];
        contactUsFields.forEach(({ selector, value }) => {
            cy.get(selector).type(value);
        });
        cy.getSubjectAndMessage().then(({ subject, message }) => {
            cy.get('[data-qa="subject"]').type(subject);
            cy.get('[data-qa="message"]').type(message);
        });
    })
};
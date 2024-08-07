import { clickButton, verifyMessage } from './register-login-logout-delete-dashboard-helper'

export const verifyContactUsPageForGetInTouch = () => {
    clickButton(':nth-child(9) > a', 'Contact us')
    verifyMessage('.col-sm-12 > .title', 'Contact Us');
    verifyMessage('div.contact-form > :nth-child(1)', 'Note: Below contact form is for testing purpose.');
    verifyMessage('div.contact-form > .title', 'Get In Touch')
};

export const verifyContactUsPageForFeedbackForUs = () => {
    clickButton(':nth-child(9) > a', 'Contact us')
    verifyMessage('.col-sm-12 > .title', 'Contact Us');
    verifyMessage('div.contact-form > :nth-child(1)', 'Note: Below contact form is for testing purpose.');
    verifyMessage('.contact-info > .title', 'Feedback For Us');
}

export const viewFieldsWithPlaceholder = () => {
    const fieldsWithPlaceholder = [
        { fieldName: 'name', placeholder: 'Name' },
        { fieldName: 'email', placeholder: 'Email' },
        { fieldName: 'subject', placeholder: 'Subject' },
        { fieldName: 'message', placeholder: 'Your Message Here' }
    ]
    fieldsWithPlaceholder.forEach(({ fieldName, placeholder }) => {
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

export const uploadPhoto = (selector = ':nth-child(6) > .form-control', filePathToBeUploaded = 'toBeUploaded.png') => {
    cy.get(selector).attachFile(filePathToBeUploaded);
    clickButton('[data-qa="submit-button"]', 'Submit')
};

export const verifySuccessMessageForContactUsSubmission = () => {
    verifyMessage('.status', 'Success! Your details have been submitted successfully.')
    clickButton('#form-section > .btn', ' Home')
}
export const viewFeedbackUsFeed = () => {
    const feedbackMessages = [
        { selector: 'address > :nth-child(1)', text: 'We really appreciate your response to our website.' },
        { selector: 'address > :nth-child(3)', text: 'Kindly share your feedback with us at feedback@automationexercise.com.' },
        { selector: 'address > :nth-child(5)', text: 'If you have any suggestion areas or improvements, do let us know. We will definitely work on it.' },
        { selector: 'address > :nth-child(7)', text: 'Thank you' },
    ]
    feedbackMessages.forEach(({ selector, text }) => {
        verifyMessage(selector, text)
    })
}
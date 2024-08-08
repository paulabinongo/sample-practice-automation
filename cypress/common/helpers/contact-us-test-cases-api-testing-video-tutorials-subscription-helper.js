import { clickButton, scrollUpAndDown, verifyMessage } from './register-login-logout-delete-dashboard-helper';

export const verifyContactUsPageForGetInTouch = () => {
    clickButton(':nth-child(9) > a', 'Contact us');
    verifyMessage('.col-sm-12 > .title', 'Contact Us');
    verifyMessage('div.contact-form > :nth-child(1)', 'Note: Below contact form is for testing purpose.');
    verifyMessage('div.contact-form > .title', 'Get In Touch');
};

export const verifyContactUsPageForFeedbackForUs = () => {
    clickButton(':nth-child(9) > a', 'Contact us');
    verifyMessage('.col-sm-12 > .title', 'Contact Us');
    verifyMessage('div.contact-form > :nth-child(1)', 'Note: Below contact form is for testing purpose.');
    verifyMessage('.contact-info > .title', 'Feedback For Us');
};

export const viewFieldsWithPlaceholder = () => {
    const fieldsWithPlaceholder = [
        { fieldName: 'name', placeholder: 'Name' },
        { fieldName: 'email', placeholder: 'Email' },
        { fieldName: 'subject', placeholder: 'Subject' },
        { fieldName: 'message', placeholder: 'Your Message Here' },
    ]
    fieldsWithPlaceholder.forEach(({ fieldName, placeholder }) => {
        cy.get(`[data-qa=${fieldName}]`).should('be.visible')
            .invoke('attr', 'placeholder')
            .should('equal', placeholder)
    });
};

export const fillContactFormWithLoggedInUser = () => {
    cy.get('@loggedInUser').then(({ fullName, emailAddress }) => {
        const contactUsFields = [
            { selector: '[data-qa="name"]', value: fullName },
            { selector: '[data-qa="email"]', value: emailAddress },
        ];
        contactUsFields.forEach(({ selector, value }) => {
            cy.get(selector).type(value);
        });
        cy.getSubjectAndMessage().then(({ subject, message }) => {
            cy.get('[data-qa="subject"]').type(subject);
            cy.get('[data-qa="message"]').type(message);
        });
    });
};

export const uploadPhoto = (selector = ':nth-child(6) > .form-control', filePathToBeUploaded = 'toBeUploaded.png') => {
    cy.get(selector).attachFile(filePathToBeUploaded);
    clickButton('[data-qa="submit-button"]', 'Submit');
};

export const verifySuccessMessageForContactUsSubmission = () => {
    verifyMessage('.status', 'Success! Your details have been submitted successfully.');
    clickButton('#form-section > .btn', ' Home');
};

export const viewFeedbackUsForContactUs = () => {
    const feedbackMessagesForContactUs = [
        { selector: 'address > :nth-child(1)', text: 'We really appreciate your response to our website.' },
        { selector: 'address > :nth-child(3)', text: 'Kindly share your feedback with us at feedback@automationexercise.com.' },
        { selector: 'address > :nth-child(5)', text: 'If you have any suggestion areas or improvements, do let us know. We will definitely work on it.' },
        { selector: 'address > :nth-child(7)', text: 'Thank you' },
    ]
    feedbackMessagesForContactUs.forEach(({ selector, text }) => {
        verifyMessage(selector, text);
    });
};

export const clickTestCaseButton = () => {
    clickButton('.shop-menu > .nav > :nth-child(6) > a', 'Test Cases');
}

export const viewTestCase = () => {
    verifyMessage('.title > b', 'Test Cases');
    verifyMessage('span ', 'Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:');
    cy.get('#form > .container').should('be.visible');
    scrollUpAndDown();
};

export const selectRandomTestCase = () => {
    const testCaseSelector = ':nth-child(n) > .panel > .panel-heading > .panel-title > a > u';
    const titleSelector = ':nth-child(n) > .panel > .panel-heading > .panel-title > a > u';

    return cy.get(testCaseSelector).then((elements) => {
        if (elements.length === 0) {
            throw new Error(`No elements found with selector: ${testCaseSelector}`);
        }
        const randomIndex = Math.floor(Math.random() * elements.length);
        const randomElement = elements[randomIndex];

        const selectedText = randomElement.innerText;

        return cy.wrap(randomElement).click().then(() => {
            cy.get(titleSelector).should('be.visible').should('contain', selectedText)
        });
    });
};

export const scrollDown = () => {
    cy.scrollTo('bottom', { duration: 6000 });
    cy.window().its('scrollY').should('be.greaterThan', 8);
};

export const viewFeedbackForUsTestCase = () => {
    verifyMessage(':nth-child(30) > .panel > .panel-heading > .panel-title > a', 'Feedback for Us');
    const feedbackMessagesForTestCase = [
        { selector: '#feedback > .list-group > :nth-child(1)', text: 'We have identified above scenarios and added in the list.' },
        { selector: '#feedback > .list-group > :nth-child(2)', text: 'You can explore more test cases in the website and if you find new test scenario that is not covered in above list, do let us know. We will definitely add that in above list.' },
        { selector: '#feedback > .list-group > :nth-child(3)', text: 'If you think, this website should cover up any particular feature, kindly share with us at feedback@automationexercise.com. We will work on that part. Your feedback matters a lot.' },
    ]
    feedbackMessagesForTestCase.forEach(({ selector, text }) => {
        verifyMessage(selector, text);
    });
};
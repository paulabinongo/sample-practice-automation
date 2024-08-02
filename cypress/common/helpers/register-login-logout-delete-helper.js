export const visitPage = (page) => {
    cy.visit(`${Cypress.config('baseUrl')}/${page}`);
};

export const clickButton = (buttonSelector, expectedButtonTextTitle) => {
    cy.get(buttonSelector).should('be.visible').and('contain', expectedButtonTextTitle)
        .click()
}

export const verifyMessage = (messageContent, expectedMessage) => {
    cy.get(messageContent).should('be.visible').and('contain', expectedMessage)
}

export const visitSignUpPage = () => {
    visitPage('signup')
};

const fillSignUpForm = (userData, isValid = true) => {
    if (isValid) {
        const fullName = `${userData.firstName} ${userData.lastName}`;
        const fields = ['firstName', 'lastName', 'email', 'company', 'country', 'mobileNumber', 'address1', 'address2', 'city', 'state', 'zipcode'];

        fields.forEach(field => cy.wrap(userData[field]).as(field));

        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(userData.email);
    } else {
        cy.getRandomEmailAndName().then(({ email, fullName }) => {
            cy.get('[data-qa="signup-name"]').type(fullName);
            cy.get('[data-qa="signup-email"]').type(email);
        });
    }
};

export const fillSignUpFormForValidData = (userData) => {
    fillSignUpForm(userData, true);
};

export const fillSignUpFormForInvalidData = () => {
    fillSignUpForm({}, false);
};

export const submitSignUpForm = () => {
    clickButton('[data-qa="signup-button"]', 'Signup');
};

export const verifyAccountInfoPage = () => {
    verifyMessage(':nth-child(1) > b', 'Enter Account Information', { matchCase: false });
    verifyMessage('form > .title > b', 'Address Information', { matchCase: false });
    cy.wait(3500);
};

export const addPersonalDetails = (userData) => {
    cy.get(userData.gender === 'Mr.' ? '#id_gender1' : '#id_gender2').check({ force: true });
    cy.get('[data-qa="password"]').type('Password123');

    const selectRandomOption = (selector) => {
        cy.get(selector).then($select => {
            const options = $select.find('option');
            const randomValue = options.eq(Math.floor(Math.random() * options.length)).val();
            cy.wrap($select).select(randomValue);
        });
    };

    selectRandomOption('[data-qa="days"]');
    selectRandomOption('[data-qa="months"]');
    selectRandomOption('[data-qa="years"]');

    const toggleCheckbox = (selector) => {
        cy.get(selector).each($checkbox => {
            const shouldCheck = Math.random() >= 0.5;
            cy.wrap($checkbox).then($checkbox => {
                if (shouldCheck) {
                    cy.wrap($checkbox).check({ force: true });
                } else {
                    cy.wrap($checkbox).uncheck({ force: true });
                }
            });
        });
    };

    toggleCheckbox('#newsletter');
    toggleCheckbox('#optin');

    cy.get('@country').then(country => {
        cy.get('[data-qa="country"]').select(country);
    });

    const fields = {
        firstName: '[data-qa="first_name"]',
        lastName: '[data-qa="last_name"]',
        company: '[data-qa="company"]',
        address1: '[data-qa="address"]',
        address2: '[data-qa="address2"]',
        city: '[data-qa="city"]',
        state: '[data-qa="state"]',
        zipcode: '[data-qa="zipcode"]',
        mobileNumber: '[data-qa="mobile_number"]'
    };

    Object.keys(fields).forEach(key => {
        cy.get(`@${key}`).then(value => {
            cy.get(fields[key]).type(value);
        });
    });

    clickButton('[data-qa="create-account"]', 'Create Account')
};

export const verifySuccessMessageForSignUp = () => {
    cy.url().should('include', '/account_created');
    verifyMessage('b', 'Account Created!', { matchCase: false })
    verifyMessage('.col-sm-9 > :nth-child(2)', 'Congratulations! Your new account has been successfully created!');
    verifyMessage('.col-sm-9 > :nth-child(3)', 'You can now take advantage of member privileges to enhance your online shopping experience with us.');
}

export const verifyErrorMessageForSignUp = () => {
    verifyMessage('.signup-form > form > p', 'Email Address already exist!')
};

export const continueToDashboard = () => {
    clickButton('[data-qa="continue-button"]', 'Continue')
};

export const visitLoginPage = () => {
    visitPage('login');
};

const fillLoginForm = (password) => {
    cy.getRandomEmailAndName().then(({ email }) => {
        cy.wrap({ email, password }).as('userDetails');
        cy.get('[data-qa="login-email"]').type(email);
    });
    cy.get('[data-qa="login-password"]').type(password);
};

export const fillLoginFormForValidData = () => {
    fillLoginForm('Password123');
};

export const fillLoginFormForInvalidData = () => {
    fillLoginForm('PassworD');
};

export const submitLogInForm = () => {
    clickButton('[data-qa="login-button"]', 'Login')
};

const verifyLoggedInAs = (fullName) => {
    cy.url().should('include', '/');
    cy.get(':nth-child(10) > a').should('have.text', ` Logged in as ${fullName}`);
};

export const verifySuccessMessageForLogin = () => {
    cy.get(':nth-child(10) > a').invoke('text').then((text) => {
        const fullName = text.replace('Logged in as ', '').trim();
        verifyLoggedInAs(fullName);
    });
};

export const verifyErrorMessageForLogin = () => {
    verifyMessage('.login-form > form > p', 'Your email or password is incorrect!')
};

export const verifyDashboardPage = () => {
    visitLoginPage();
    fillLoginFormForValidData();
    submitLogInForm();
    verifySuccessMessageForLogin();
};

export const verifyClickLogout = () => {
    clickButton('.shop-menu > .nav > :nth-child(4) > a', 'Logout')
};

export const verifyClickDelete = () => {
    clickButton('.shop-menu > .nav > :nth-child(5)', 'Delete');
    cy.get('@userDetails').then(({ email }) => {
        cy.log(`Logged out email: ${email}`);
        cy.task('deleteUserFromJSON', email);
    });
};

export const verifySuccessMessageForAccountDeletion = () => {
    cy.url().should('include', '/delete_account');
    verifyMessage('b', 'Account Deleted!')
    verifyMessage('.col-sm-9 > :nth-child(2)', 'Your account has been permanently deleted!')
    verifyMessage('.col-sm-9 > :nth-child(3)', 'You can create new account to take advantage of member privileges to enhance your online shopping experience with us.')
    clickButton('[data-qa="continue-button"]', 'Continue')
    cy.url().should('include', '/');
};

export const verifyDashboardPageElements = () => {
    const menuItems = [
        'Home', 'Products', 'Cart', 'Logout', 'Delete Account', 'Test Cases',
        'API Testing', 'Video Tutorials', 'Contact Us'
    ];

    menuItems.forEach((item, index) => {
        cy.get(`.shop-menu > .nav > :nth-child(${index + 1}) > a`)
            .should('be.visible')
            .contains(item.trim(), { matchCase: false });
    });
};
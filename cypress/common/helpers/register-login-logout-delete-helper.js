export const visitSignUpPage = () => {
    cy.visit(`${Cypress.config('baseUrl')}/signup`);
};

export const fillSignUpFormForValidData = (userData) => {
    const fullName = `${userData.firstName} ${userData.lastName}`;
    const userFields = ['firstName', 'lastName', 'email', 'company', 'country', 'mobileNumber', 'address1', 'address2', 'city', 'state', 'zipcode'];

    userFields.forEach(field => cy.wrap(userData[field]).as(field));

    cy.get('[data-qa="signup-name"]').type(fullName);
    cy.get('[data-qa="signup-email"]').type(userData.email);
};

export const fillSignUpFormForInvalidData = () => {
    cy.getRandomEmailAndName().then(({ email, fullName }) => {
        // Fill in the email
        cy.get('[data-qa="signup-name"]').type(fullName);
        cy.get('[data-qa="signup-email"]').type(email);
    });
}

export const submitSignUpForm = () => {
    cy.get('[data-qa="signup-button"]').click();
};

export const verifyAccountInfoPage = () => {
    cy.get(':nth-child(1) > b').contains('Enter Account Information', { matchCase: false });
    cy.get('form > .title > b').contains('Address Information', { matchCase: false });
    cy.wait(3500); // Adjust the wait time if necessary
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

    cy.get('[data-qa="create-account"]').click();
};

export const verifySuccessMessageForSignUp = () => {
    cy.url().should('include', '/account_created');
    cy.get('b').contains('Account Created!', { matchCase: false });
    cy.get('.col-sm-9').should('be.visible')
        .contains('Congratulations! Your new account has been successfully created! You can now take advantage of member privileges to enhance your online shopping experience with us.');
};

export const verifyErrorMessageForSignUp = () => {
    cy.get('.signup-form > form > p').should('be.visible')
        .contains('Email Address already exist!')
}

export const continueToDashboard = () => {
    cy.get('[data-qa="continue-button"]').contains('Continue').click();
    cy.url().should('include', '/');
};

export const visitLoginPage = () => {
    cy.visit(`${Cypress.config('baseUrl')}/login`);
}

export const fillLoginFormForValidData = () => {
    cy.getRandomEmailAndName().then(({ email }) => {
        cy.get('[data-qa="login-email"]').type(email);
    })
    cy.get('[data-qa="login-password"]').type('Password123');
}

export const fillLoginFormForInvalidData = () => {
    cy.getRandomEmailAndName().then(({ email }) => {
        cy.get('[data-qa="login-email"]').type(email);
    })
    cy.get('[data-qa="login-password"]').type('PassworD');
}

export const submitLogInForm = () => {
    cy.get('[data-qa="login-button"]').click();
};

export const verifySuccessMessageForLogin = () => {
    cy.url().should('include', '/');
}

export const verifyErrorMessageForLogin = () => {
    cy.get('.login-form > form > p').contains('Your email or password is incorrect!');
}

export const verifyDashboardPage = () => {
    cy.visit(`${Cypress.config('baseUrl')}/login`);
    cy.getRandomEmailAndName().then(({ email }) => {
        cy.get('[data-qa="login-email"]').type(email);
    })
    cy.get('[data-qa="login-password"]').type('Password123');
    cy.get('[data-qa="login-button"]').click();
    cy.url().should('include', '/');
}

export const verifyClickLogout = () => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible')
        .contains('Logout').click();
}

export const verifyClickDelete = () => {
    cy.get('.shop-menu > .nav > :nth-child(5)').should('be.visible')
        .contains('Delete Account').click();
}

export const verifySuccessMessageForAccountDeletion = () => {
    cy.url().should('include', '/delete_account');
    cy.get('b').contains('Account Deleted!', { matchCase: false });
    cy.get('.col-sm-9').should('be.visible')
        .contains('Your account has been permanently deleted! You can create new account to take advantage of member privileges to enhance your online shopping experience with us.');
};
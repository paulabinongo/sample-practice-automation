// cypress/integration/step_definitions/dashboardSteps.js

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, visitLoginPage, submitLogInForm } from '../../../common/helpers/register-login-logout-delete-helper';

Given('that I login to the website with the correct and existing credentials', () => {
    verifyDashboardPage(visitLoginPage, visitLoginPage, submitLogInForm);
});
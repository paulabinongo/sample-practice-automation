// cypress/integration/step_definitions/dashboardSteps.js

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, visitLoginPage, submitLogInForm, verifyDashboardPageElements, visitPage } from '../../../common/helpers/register-login-logout-delete-helper';

Given('that I login to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
});
When('I view that I am already on the dashboard page', () => {
    visitPage('/');
});
Then('I should view the navigation buttons', () => {
    verifyDashboardPageElements();
});
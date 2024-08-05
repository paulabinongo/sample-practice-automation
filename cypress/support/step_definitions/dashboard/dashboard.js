// cypress/integration/step_definitions/dashboardSteps.js

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { verifyDashboardPage, verifyDashboardPageElements, visitPage, scrollUpAndDown, verifyClickLogout } from '../../../common/helpers/register-login-logout-delete-dashboard-helper';

Given('that I log in to the website with the correct and existing credentials', () => {
    verifyDashboardPage();
});
When('I view that I am already on the Dashboard page', () => {
    visitPage('');
});
And('view the navigation buttons', () => {
    verifyDashboardPageElements();
});

Then('I should be able to navigate the pages from the Dashboard page', () => {
    scrollUpAndDown();
    const pages = [
        '',
        'products',
        'view_cart',
        'test_cases',
        'api_list',
        'https://www.youtube.com/c/AutomationExercise',
        'contact_us',
        ''
    ];
    pages.forEach(page => visitPage(page));
});
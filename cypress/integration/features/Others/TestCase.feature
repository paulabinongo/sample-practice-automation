Feature: Test Case Management

Scenario: Navigate the Contact Us Page - Get In Touch section
 Given that I log in to the website with the correct and existing credentials
 When I click the Contact Us page link for the Get In Touch section
 And fill out the contact us form
 Then I should be able to redirect to the dashboard page
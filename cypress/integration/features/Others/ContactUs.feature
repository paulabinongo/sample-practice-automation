Feature: Contact Us Management

Scenario: Navigate the Contact Us Page - Get In Touch section
 Given that I log in to the website with the correct and existing credentials
 When I click the contact us page link for the get in touch section
 And fill out the contact us form
 Then I should be able to redirect to the dashboard page


 Scenario: Navigate the Contact Us Page - Feedback For Us section
 Given that I log in to the website with the correct and existing credentials
 When I click the contact us page link for the feedback for us section
 Then I should be able to view the feedback us section


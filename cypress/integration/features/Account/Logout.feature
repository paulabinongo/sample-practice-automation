Feature: Logout User

Scenario: Logout User from the Website
 Given that I log in to the website with the correct and existing credentials
 When I click the logout button
 Then I should be able to logout the created or logged in account from the website

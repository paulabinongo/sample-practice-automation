Feature: API Testing Management

Scenario: View the List of APIs
 Given that I log in to the website with the correct and existing credentials
 When I click the API testing button
 Then I should be able to view the list of API testing

Scenario: View the Detailed Test Steps of a certain API
 Given that I log in to the website with the correct and existing credentials
 When I click the API testing button
 Then I should be able to view the list of API testing
 And be able to view the detailed test steps of the selected API

Scenario: Give a Feedback for API Testing Page
 Given that I log in to the website with the correct and existing credentials
 When I click the API testing button
 Then I should be able to give a feedback for API testing page
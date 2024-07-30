Feature: User Login

Scenario: Successful Login
 Given that I am on the login page
 When I fill out the login form with valid data
 And I submit the login Form with correct credentials
 Then I should view the Success Message for login

Scenario: Unsuccessful Login
 Given that I am on the login page
 When I fill out the login form with invalid data
 And I submit the login Form with incorrect credentials
 Then I should view the Error Message for login

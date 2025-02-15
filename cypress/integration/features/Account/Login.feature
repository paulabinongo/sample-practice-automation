Feature: Login User

Scenario: Login User with Correct Credentials
 Given that I am on the login page
 When I fill out the login form with correct credentials
 And submit the login form
 Then I should view the Success Message for login

Scenario: Login User with Mismatch Credentials
 Given that I am on the login page
 When I fill out the login form with incorrect credentials
 And submit the login Form
 Then I should view the Error Message for login

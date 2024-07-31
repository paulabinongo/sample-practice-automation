Feature: Register User

Scenario: Register User with New Credentials
  Given that I am on the signup page
  When I fill out the signup form with new credentials
  And submit the signup form
  And view the Account Information and Address Information sections
  And add my Personal Details on each section
  Then I should view the Success Message for signup
  And be redirected to the Dashboard page

Scenario: Register User with Existing Credentials
  Given that I am on the signup page
  When I fill out the signup form with existing credentials
  And submit the signup form
  Then I should view the Error Message for signup

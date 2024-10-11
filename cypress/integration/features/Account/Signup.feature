Feature: Register User

Scenario: Register User with New Credentials
  Given that I am on the signup page
  When I fill out the signup form with new credentials
  And submit the signup form
  And view the account information and address information sections
  And add my personal details on each section
  Then I should be able to view the success message for signup
  And be redirected to the dashboard page

Scenario: Register User with Existing Credentials
  Given that I am on the signup page
  When I fill out the signup form with existing credentials
  And submit the signup form
  Then I should be able to view the error message for signup

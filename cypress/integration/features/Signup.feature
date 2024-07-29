Feature: User Sign Up
Scenario: Successful Sign Up
  Given that I am on the Sign Up page
  When I fill out the sign up form with valid data
  And submit the Sign Up Form with correct credentials
  And I should view the form for the Account Information and Address Information
  And I should add my Personal Details on each section
  Then I should view the Success Message
  And I should be redirected to the Dashboard page, once I click the Continue button 


Scenario: Unsuccessful Sign Up
  Given that I am on the Sign Up page
  When I fill out the sign up form with invalid data
  And submit the Sign Up Form with incorrect credentials
  Then I should view an Error Message



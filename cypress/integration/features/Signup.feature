Feature: User Signup

Scenario: Successful Signup
  Given that I am on the signup page
  When I fill out the signup form with valid data
  And submit the signup Form with correct credentials
  And I should view the form for the Account Information and Address Information
  And I should add my Personal Details on each section
  Then I should view the Success Message for signup
  And I should be redirected to the Dashboard page, once I click the Continue button 

Scenario: Unsuccessful Signup
  Given that I am on the signup page
  When I fill out the signup form with invalid data
  And submit the signup Form with incorrect credentials
  Then I should view the Error Message for signup

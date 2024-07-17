Feature: User Sign Up

Scenario: Successful Sign Up
  Given that I am on the sign up page
  When I fill out the sign up form with valid data
  And I submit the Sign Up Form
  And I should be able to view the form for the Account Information and Address Information
  And I should be able to add my Personal Details on each section



# Scenario: Unsuccessful Sign Up
#   Given that I am on the sign up page
#   When I fill out the sign up form with an existing data
#   And I submit the Sign Up Form
#   Then I should see an Error Message






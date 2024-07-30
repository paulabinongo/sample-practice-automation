Feature: User Log In

Scenario: Successful Log In
 Given that I am on the Log In page
 When I fill out the log in form with valid data
 And I submit the Log In Form with correct credentials
 Then I should view the Success Message

Scenario: Unsuccessful Log In
 Given that I am on the Log In page
 When I fill out the log in form with invalid data
 And I submit the Log In Form with incorrect credentials
 Then I should view the Error Message

Feature: Login Validations

    Background:
        Given User navigates to the Login Page
        And User is in the Login Page

    Scenario: User should not be able to login with invalid credentials
        When User fills the Username Input with invalid username
        And User fills the Password Input with invalid password
        And User clicks the Login Button
        Then The BAD_CREDENTIALS Error message is displayed
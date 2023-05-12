Feature: Launches Validations

    Background:
        Given User navigates to the Portal Page
        And User clicks on the Launches Button in the Sidebar
        And User is in the Launches Page

    Scenario Outline: Validate Launch Name
        When User sees the Launch Rows
        And User sees the Launch Row #<Launch Id>
        And User sees the Launch Name
        Then The Launch Name <Launch Name> match


        Examples:
            | Launch Id | Launch Name      |
            | 0         | Demo Api Tests#5 |
            | 1         | Demo Api Tests#4 |
            | 2         | Demo Api Tests#3 |
            | 3         | Demo Api Tests#2 |
            | 4         | Demo Api Tests#1 |

    Scenario Outline: Validate Launch Details
        When User sees the Launch Rows
        And User sees the Launch Row #<Launch Id>
        And User sees the Quality Gate Label
        And User sees the Duration Time Label
        And User sees the Owner Label
        Then Quality Gate Label is N/A
        And Duration is <Duration Time>
        And Owner is daniel_albavera


        Examples:
            | Launch Id | Duration Time |
            | 0         | 3s            |
            | 1         | 3s            |
            | 2         | 4s            |
            | 3         | 3s            |
            | 4         | 3s            |

    Scenario Outline: Validate Launch Total Execution Results
        When User sees the Launch Rows
        And User sees the Launch Row #<Launch Id>
        And User sees the total amount of tests executed
        Then The total amount of tests executed is <Total>


        Examples:
            | Launch Id | Total |
            | 0         | 30    |
            | 1         | 25    |
            | 2         | 20    |
            | 3         | 15    |
            | 4         | 10    |

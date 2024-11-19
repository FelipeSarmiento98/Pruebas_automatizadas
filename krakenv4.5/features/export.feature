Feature: Export Content Test

@user1 @web
Scenario: Export content and validate file structure
  Given I navigate to page "<baseUrl>"
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click next
  And I navigate to the migration page
  Then I should see the export button
  When I click the export button
  And I confirm the export
  Then I should validate the export response

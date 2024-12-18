Feature: F01-E2 Import Invalid File Test

@user1 @web
Scenario: Show an error message when importing an invalid file
  Given I navigate to page "<baseUrl>"
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click next
  And I navigate to the migration page
  Then I should see the import button
  When I open the import modal
  And I attach an invalid file "example.json"
  Then I should see an error message
  And I should not see the confirmation modal

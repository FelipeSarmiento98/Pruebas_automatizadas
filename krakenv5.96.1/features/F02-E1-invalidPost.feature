Feature: F02-E1 Invalid Post Test

@user1 @web
Scenario: Show an error if attempting to publish a post without a title
  Given I navigate to page "<baseUrl>"
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click next
  And I navigate to the editor page
  Then I should see the editor loaded
  When I fill the content with "Contenido sin título"
  And I attempt to publish the post
  Then I should not see the success modal

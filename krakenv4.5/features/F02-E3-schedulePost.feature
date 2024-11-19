Feature: F01-E3 Schedule Post Test

@user1 @web
Scenario: Schedule a post for a future date
  Given I navigate to page "<baseUrl>"
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click next
  And I navigate to the editor page
  Then I should see the editor loaded
  When I fill the title with "Scheduled Post"
  And I fill the content with "Content for the scheduled post."
  And I schedule the post
  Then I should see the post with title "Scheduled Post" and excerpt "Content for the scheduled post."

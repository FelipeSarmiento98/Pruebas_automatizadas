Feature: Markdown Post Test

@user1 @web
Scenario: Correctly render content in Markdown
  Given I navigate to page "<baseUrl>"
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click next
  And I navigate to the editor page
  Then I should see the editor loaded
  When I fill the title with "Markdown Post"
  And I fill the content with "# Encabezado\n**Texto en negrita**"
  And I publish the post
  Then I should see the success modal
  And I should see the post with title "Markdown Post" and excerpt "Encabezado"

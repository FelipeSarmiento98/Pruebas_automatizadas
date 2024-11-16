import { loginPage } from '../pages/loginPage';
import { editorPage } from '../pages/editorPage';

describe('Schedule Post in Ghost', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should schedule a post for a future date', () => {
    // Given
    editorPage.visit();
    cy.screenshot('ScheduledPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle('Scheduled Post');
    cy.screenshot('ScheduledPost/step-2-fill-title'); 

    editorPage.fillContent('Content for the scheduled post.');
    cy.screenshot('ScheduledPost/step-3-fill-content'); 

    editorPage.schedulePost();
    cy.screenshot('ScheduledPost/step-4-schedule-post'); 

    // Then
    editorPage.validateScheduledPost('Scheduled Post', 'Content for the scheduled post.');
    cy.screenshot('ScheduledPost/step-5-validate-scheduled-post'); 
  });
});

import { loginPage } from '../../pages/v5.96.1/loginPage';
import { editorPage } from '../../pages/v5.96.1/editorPage';

describe('Schedule Post in Ghost', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should schedule a post for a future date', () => {
    // Given
    editorPage.visit();
    cy.screenshot('v5.96.1/ScheduledPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle('Scheduled Post');
    cy.screenshot('v5.96.1/ScheduledPost/step-2-fill-title'); 

    editorPage.fillContent('Content for the scheduled post.');
    cy.screenshot('v5.96.1/ScheduledPost/step-3-fill-content'); 

    editorPage.schedulePost();
    cy.screenshot('v5.96.1/ScheduledPost/step-4-schedule-post'); 

    // Then
    editorPage.validateScheduledPost('Scheduled Post', 'Content for the scheduled post.');
    cy.screenshot('v5.96.1/ScheduledPost/step-5-validate-scheduled-post'); 
  });
});
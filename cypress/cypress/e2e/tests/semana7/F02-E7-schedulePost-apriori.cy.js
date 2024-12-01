import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';

describe('F02-E3 Schedule Post in Ghost - A Priori', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should schedule a post with predefined data', () => {
    // Given
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('a-priori/ScheduledPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle('A Priori Scheduled Post');
    cy.screenshot('a-priori/ScheduledPost/step-2-fill-title'); 

    editorPage.fillContent('This is a predefined content for the scheduled post.');
    cy.screenshot('a-priori/ScheduledPost/step-3-fill-content'); 

    editorPage.schedulePost();
    cy.wait(1000);
    cy.screenshot('a-priori/ScheduledPost/step-4-schedule-post'); 

    // Then
    editorPage.validateScheduledPost('A Priori Scheduled Post', 'This is a predefined content for the scheduled post.');
    cy.screenshot('a-priori/ScheduledPost/step-5-validate-scheduled-post'); 
  });
});

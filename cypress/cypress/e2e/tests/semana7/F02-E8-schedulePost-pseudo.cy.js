import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E3 Schedule Post in Ghost - Pseudoaleatorio', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should schedule a post with pseudo-random data', () => {
    // Given
    const seed = 12345; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoTitle = faker.lorem.words(3);
    const pseudoContent = faker.lorem.paragraph();

    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('pseudo/ScheduledPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle(pseudoTitle);
    cy.screenshot('pseudo/ScheduledPost/step-2-fill-title'); 

    editorPage.fillContent(pseudoContent);
    cy.screenshot('pseudo/ScheduledPost/step-3-fill-content'); 

    editorPage.schedulePost();
    cy.wait(1000);
    cy.screenshot('pseudo/ScheduledPost/step-4-schedule-post'); 

    // Then
    editorPage.validateScheduledPost(pseudoTitle, pseudoContent);
    cy.screenshot('pseudo/ScheduledPost/step-5-validate-scheduled-post'); 
  });
});

import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E3 Schedule Post in Ghost - Random', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should schedule a post with random data', () => {
    // Given
    const randomTitle = faker.lorem.sentence();
    const randomContent = faker.lorem.paragraph();

    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('random/ScheduledPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle(randomTitle);
    cy.screenshot('random/ScheduledPost/step-2-fill-title'); 

    editorPage.fillContent(randomContent);
    cy.screenshot('random/ScheduledPost/step-3-fill-content'); 

    editorPage.schedulePost();
    cy.wait(1000);
    cy.screenshot('random/ScheduledPost/step-4-schedule-post'); 

    // Then
    editorPage.validateScheduledPost(randomTitle, randomContent);
    cy.screenshot('random/ScheduledPost/step-5-validate-scheduled-post'); 
  });
});

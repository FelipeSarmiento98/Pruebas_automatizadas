import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E1 Invalid Post Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    const seed = 12345; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoContent = faker.lorem.sentence(10);

    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('pseudo/InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent(pseudoContent);
    cy.screenshot('pseudo/InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('pseudo/InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('pseudo/InvalidPost/step-4-validate-no-success-modal'); 
  });
});

import { loginPage } from '../../pages/v5.96.1/loginPage';
import { editorPage } from '../../pages/v5.96.1/editorPage';

describe('Invalid Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    editorPage.visit();
    cy.screenshot('v5.96.1/InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent('Contenido sin título');
    cy.screenshot('v5.96.1/InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.screenshot('v5.96.1/InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('v5.96.1/InvalidPost/step-4-validate-no-success-modal'); 
  });
});
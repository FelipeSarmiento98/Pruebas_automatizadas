import { loginPage } from '../pages/loginPage';
import { editorPage } from '../pages/editorPage';

describe('Invalid Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    editorPage.visit();
    cy.screenshot('InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent('Contenido sin título');
    cy.screenshot('InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.screenshot('InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('InvalidPost/step-4-validate-no-success-modal'); 
  });
});

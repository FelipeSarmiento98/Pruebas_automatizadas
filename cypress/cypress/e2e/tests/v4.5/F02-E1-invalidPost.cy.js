import { loginPage } from '../../pages/v4.5/loginPage';
import { editorPage } from '../../pages/v4.5/editorPage';

describe('F02-E1 Invalid Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    editorPage.visit();
    cy.screenshot('v4.5/InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent('Contenido sin título');
    cy.screenshot('v4.5/InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.screenshot('v4.5/InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('v4.5/InvalidPost/step-4-validate-no-success-modal'); 
  });
});

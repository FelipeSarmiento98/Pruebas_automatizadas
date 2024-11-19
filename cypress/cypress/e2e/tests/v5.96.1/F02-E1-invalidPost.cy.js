import { loginPage } from '../../pages/v5.96.1/loginPage';
import { editorPage } from '../../pages/v5.96.1/editorPage';

describe('F02-E1 Invalid Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    
    cy.screenshot('v5.96.1/InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent('Contenido sin título');
    cy.screenshot('v5.96.1/InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('v5.96.1/InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('v5.96.1/InvalidPost/step-4-validate-no-success-modal'); 
  });
});

import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';

describe('F02-E1 Invalid Post Test - A Priori', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('a-priori/InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent('Este es un contenido de prueba a priori.');
    cy.screenshot('a-priori/InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('a-priori/InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('a-priori/InvalidPost/step-4-validate-no-success-modal'); 
  });
});

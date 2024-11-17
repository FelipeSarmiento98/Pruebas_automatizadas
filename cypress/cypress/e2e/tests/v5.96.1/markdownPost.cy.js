import { loginPage } from '../../pages/v5.96.1/loginPage';
import { editorPage } from '../../pages/v5.96.1/editorPage';

describe('Markdown Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should correctly render content in Markdown', () => {
    // Given
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible'); 
    cy.screenshot('v5.96.1/MarkdownPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle('Markdown Post');
    cy.screenshot('v5.96.1/MarkdownPost/step-2-fill-title'); 

    editorPage.fillContent('# Encabezado\n**Texto en negrita**');
    cy.screenshot('v5.96.1/MarkdownPost/step-3-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('v5.96.1/MarkdownPost/step-4-publish-post'); 

    // Then
    editorPage.validateSuccessModal();
    cy.screenshot('v5.96.1/MarkdownPost/step-5-validate-success-modal'); 

    editorPage.validatePostExists('Markdown Post', 'Encabezado');
    cy.screenshot('v5.96.1/MarkdownPost/step-6-validate-post-exists'); 
  });
});

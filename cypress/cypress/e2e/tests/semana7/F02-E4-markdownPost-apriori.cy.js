import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';

describe('F02-E2 Markdown Post Test - A Priori', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should correctly render content in Markdown with predefined data', () => {
    // Given
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('a-priori/MarkdownPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle('Markdown Post A Priori');
    cy.screenshot('a-priori/MarkdownPost/step-2-fill-title'); 

    editorPage.fillContent('# Encabezado a Priori\n**Texto en negrita**');
    cy.screenshot('a-priori/MarkdownPost/step-3-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('a-priori/MarkdownPost/step-4-publish-post'); 

    // Then
    editorPage.validateSuccessModal();
    cy.screenshot('a-priori/MarkdownPost/step-5-validate-success-modal'); 

    editorPage.validatePostExists('Markdown Post A Priori', 'Encabezado a Priori');
    cy.screenshot('a-priori/MarkdownPost/step-6-validate-post-exists'); 
  });
});

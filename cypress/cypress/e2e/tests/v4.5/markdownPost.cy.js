import { loginPage } from '../../pages/v4.5/loginPage';
import { editorPage } from '../../pages/v4.5/editorPage';

describe('Markdown Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should correctly render content in Markdown', () => {
    // Given
    editorPage.visit();
    cy.screenshot('v4.5/MarkdownPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle('Markdown Post');
    cy.screenshot('v4.5/MarkdownPost/step-2-fill-title'); 

    editorPage.fillContent('# Encabezado\n**Texto en negrita**');
    cy.screenshot('v4.5/MarkdownPost/step-3-fill-content'); 

    editorPage.publishPost();
    cy.screenshot('v4.5/MarkdownPost/step-4-publish-post'); 

    // Then
    editorPage.validateSuccessModal(); 
    cy.screenshot('v4.5/MarkdownPost/step-5-validate-success-modal'); 

    editorPage.validatePostExists('Markdown Post', 'Encabezado'); 
    cy.screenshot('v4.5/MarkdownPost/step-6-validate-post-exists'); 
  });
});

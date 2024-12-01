import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E2 Markdown Post Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should correctly render content in Markdown with pseudo-random data', () => {
    // Given
    const seed = 67890; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoTitle = faker.lorem.words(3);
    const pseudoContent = `# ${faker.lorem.sentence(5)}\n**${faker.lorem.words(2)}**`;

    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('pseudo/MarkdownPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle(pseudoTitle);
    cy.screenshot('pseudo/MarkdownPost/step-2-fill-title'); 

    editorPage.fillContent(pseudoContent);
    cy.screenshot('pseudo/MarkdownPost/step-3-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('pseudo/MarkdownPost/step-4-publish-post'); 

    // Then
    editorPage.validateSuccessModal();
    cy.screenshot('pseudo/MarkdownPost/step-5-validate-success-modal'); 

    editorPage.validatePostExists(pseudoTitle, pseudoContent.split('\n')[0].replace('# ', ''));
    cy.screenshot('pseudo/MarkdownPost/step-6-validate-post-exists'); 
  });
});

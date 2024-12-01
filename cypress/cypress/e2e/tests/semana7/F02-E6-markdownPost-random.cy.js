import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E2 Markdown Post Test - Random', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should correctly render content in Markdown with random data', () => {
    // Given
    const randomTitle = faker.lorem.words(4);
    const randomContent = `# ${faker.lorem.words(3)}\n**${faker.lorem.sentence()}**`;

    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('random/MarkdownPost/step-1-visit-page'); 

    // When
    editorPage.fillTitle(randomTitle);
    cy.screenshot('random/MarkdownPost/step-2-fill-title'); 

    editorPage.fillContent(randomContent);
    cy.screenshot('random/MarkdownPost/step-3-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('random/MarkdownPost/step-4-publish-post'); 

    // Then
    editorPage.validateSuccessModal();
    cy.screenshot('random/MarkdownPost/step-5-validate-success-modal'); 

    editorPage.validatePostExists(randomTitle, randomContent.split('\n')[0].replace('# ', ''));
    cy.screenshot('random/MarkdownPost/step-6-validate-post-exists'); 
  });
});

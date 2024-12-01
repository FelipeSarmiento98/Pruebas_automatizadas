import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E1 Invalid Post Test - Random', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    const randomContent = faker.lorem.paragraph(3); // Contenido aleatorio

    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('random/InvalidPost/step-1-visit-page'); 

    // When
    editorPage.fillContent(randomContent);
    cy.screenshot('random/InvalidPost/step-2-fill-content'); 

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('random/InvalidPost/step-3-attempt-publish'); 

    // Then
    editorPage.validateSuccessModalNotExists();
    cy.screenshot('random/InvalidPost/step-4-validate-no-success-modal'); 
  });
});

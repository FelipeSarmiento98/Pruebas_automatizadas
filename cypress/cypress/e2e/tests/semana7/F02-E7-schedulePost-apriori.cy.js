import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';

describe('F02-E7 Schedule Post in Ghost - A Priori', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should schedule a post with predefined data', () => {
    // Datos a-priori
    const predefinedTitle = 'A Priori Scheduled Post';
    const predefinedContent = 'This is a predefined content for the scheduled post.';

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('a-priori/F02-E7/step-1-visit-page');

    // When: Rellenar título y contenido
    editorPage.fillTitle(predefinedTitle);
    cy.screenshot('a-priori/F02-E7/step-2-fill-title');

    editorPage.fillContent(predefinedContent);
    cy.screenshot('a-priori/F02-E7/step-3-fill-content');

    // Programar el post
    editorPage.schedulePost();
    cy.wait(1000);
    cy.screenshot('a-priori/F02-E7/step-4-schedule-post');

    // Then: Validar que el post está programado
    editorPage.validateScheduledPost(predefinedTitle, predefinedContent);
    cy.screenshot('a-priori/F02-E7/step-5-validate-scheduled-post');

    // Validar estado del post como "programado"
    editorPage.validatePostStatus(predefinedTitle, 'Scheduled');
    cy.screenshot('a-priori/F02-E7/step-6-validate-post-status');
  });
});

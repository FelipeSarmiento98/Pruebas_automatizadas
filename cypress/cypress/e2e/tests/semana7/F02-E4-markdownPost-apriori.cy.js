import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';

describe('F02-E4 Markdown Post Test - A Priori', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should correctly render content in Markdown with predefined data', () => {
    // Datos a-priori
    const predefinedTitle = 'Markdown Post A Priori';
    const predefinedContent = '# Encabezado a Priori\n**Texto en negrita**';

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('a-priori/F02-E4/step-1-visit-page');

    // When: Rellenar título y contenido en Markdown
    editorPage.fillTitle(predefinedTitle);
    cy.screenshot('a-priori/F02-E4/step-2-fill-title');

    editorPage.fillContent(predefinedContent);
    cy.screenshot('a-priori/F02-E4/step-3-fill-content');

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('a-priori/F02-E4/step-4-publish-post');

    // Then: Validar que se muestra el modal de éxito
    editorPage.validateSuccessModal({ timeout: 5000 });
    cy.screenshot('a-priori/F02-E4/step-5-validate-success-modal');

    // Validar que el post existe con título y contenido
    editorPage.validatePostExists(predefinedTitle, 'Encabezado a Priori');
    cy.screenshot('a-priori/F02-E4/step-6-validate-post-exists');
  });
});

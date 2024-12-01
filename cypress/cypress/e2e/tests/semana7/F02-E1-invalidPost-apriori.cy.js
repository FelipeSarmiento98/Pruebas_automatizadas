import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';

describe('F02-E1 Invalid Post Test - A Priori', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Datos A-Priori
    const predefinedContent = 'Este es un contenido de prueba a priori.';

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('a-priori/F02-E1/step-1-visit-page');

    // When: Rellenar contenido pero no el título
    editorPage.fillContent(predefinedContent);
    cy.screenshot('a-priori/F02-E1/step-2-fill-content');

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('a-priori/F02-E1/step-3-attempt-publish');

    // Then: Validar que no se muestra el modal de éxito
    editorPage.validateSuccessModalNotExists({ timeout: 5000 });
    cy.screenshot('a-priori/F02-E1/step-4-validate-no-success-modal');

    // Validar que aparece el mensaje de error esperado
    editorPage.validateErrorToast('Title is required.');
    cy.screenshot('a-priori/F02-E1/step-5-validate-error-toast');
  });
});

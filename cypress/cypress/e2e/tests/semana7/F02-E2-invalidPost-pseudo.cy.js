import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E2 Invalid Post Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Configuración pseudoaleatoria
    const seed = 12345; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoContent = faker.lorem.sentence(10); // Contenido generado pseudoaleatoriamente

    // Log del contenido generado para depuración
    cy.log('Generated Pseudo-Random Content:', pseudoContent);

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('pseudo/F02-E2/step-1-visit-page');

    // When: Rellenar el contenido pero no el título
    editorPage.fillContent(pseudoContent);
    cy.screenshot('pseudo/F02-E2/step-2-fill-content');

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('pseudo/F02-E2/step-3-attempt-publish');

    // Then: Validar que no se muestra el modal de éxito
    editorPage.validateSuccessModalNotExists({ timeout: 5000 });
    cy.screenshot('pseudo/F02-E2/step-4-validate-no-success-modal');

    // Validar que aparece el mensaje de error esperado
    editorPage.validateErrorToast('Title is required.');
    cy.screenshot('pseudo/F02-E2/step-5-validate-error-toast');
  });
});

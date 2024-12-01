import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E3 Invalid Post Test - Random', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Generación de contenido completamente aleatorio
    const randomContent = faker.lorem.paragraph(3); // 3 párrafos aleatorios

    // Log del contenido generado
    cy.log('Generated Random Content:', randomContent);

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('random/F02-E3/step-1-visit-page');

    // When: Rellenar contenido pero no el título
    editorPage.fillContent(randomContent);
    cy.screenshot('random/F02-E3/step-2-fill-content');

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('random/F02-E3/step-3-attempt-publish');

    // Then: Validar que no se muestra el modal de éxito
    editorPage.validateSuccessModalNotExists({ timeout: 5000 });
    cy.screenshot('random/F02-E3/step-4-validate-no-success-modal');

    // Validar que aparece el mensaje de error esperado
    editorPage.validateErrorToast('Title is required.');
    cy.screenshot('random/F02-E3/step-5-validate-error-toast');
  });
});

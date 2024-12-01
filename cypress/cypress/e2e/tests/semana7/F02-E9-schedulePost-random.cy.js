import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E9 Schedule Post in Ghost - Random', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should schedule a post with random data', () => {
    // Generación de datos aleatorios
    const randomTitle = faker.lorem.sentence(); // Título aleatorio
    const randomContent = faker.lorem.paragraph(); // Contenido aleatorio

    // Log de los datos generados
    cy.log('Generated Random Title:', randomTitle);
    cy.log('Generated Random Content:', randomContent);

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('random/F02-E9/step-1-visit-page');

    // When: Rellenar título y contenido
    editorPage.fillTitle(randomTitle);
    cy.screenshot('random/F02-E9/step-2-fill-title');

    editorPage.fillContent(randomContent);
    cy.screenshot('random/F02-E9/step-3-fill-content');

    // Programar el post
    editorPage.schedulePost();
    cy.wait(1000);
    cy.screenshot('random/F02-E9/step-4-schedule-post');

    // Then: Validar que el post está programado
    editorPage.validateScheduledPost(randomTitle, randomContent);
    cy.screenshot('random/F02-E9/step-5-validate-scheduled-post');

    // Validar estado del post como "programado"
    editorPage.validatePostStatus(randomTitle, 'Scheduled');
    cy.screenshot('random/F02-E9/step-6-validate-post-status');
  });
});

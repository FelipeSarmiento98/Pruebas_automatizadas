import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E8 Schedule Post in Ghost - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should schedule a post with pseudo-random data', () => {
    // Configuración pseudoaleatoria
    const seed = 12345; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoTitle = faker.lorem.words(3); // Título pseudoaleatorio
    const pseudoContent = faker.lorem.paragraph(); // Contenido pseudoaleatorio

    // Log de los datos generados
    cy.log('Generated Pseudo-Random Title:', pseudoTitle);
    cy.log('Generated Pseudo-Random Content:', pseudoContent);

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('pseudo/F02-E3/step-1-visit-page');

    // When: Rellenar título y contenido
    editorPage.fillTitle(pseudoTitle);
    cy.screenshot('pseudo/F02-E3/step-2-fill-title');

    editorPage.fillContent(pseudoContent);
    cy.screenshot('pseudo/F02-E3/step-3-fill-content');

    // Programar el post
    editorPage.schedulePost();
    cy.wait(1000);
    cy.screenshot('pseudo/F02-E3/step-4-schedule-post');

    // Then: Validar que el post está programado
    editorPage.validateScheduledPost(pseudoTitle, pseudoContent);
    cy.screenshot('pseudo/F02-E3/step-5-validate-scheduled-post');

    // Validar estado del post como "programado"
    editorPage.validatePostStatus(pseudoTitle, 'Scheduled');
    cy.screenshot('pseudo/F02-E3/step-6-validate-post-status');
  });
});

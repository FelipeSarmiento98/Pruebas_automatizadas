import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E5 Markdown Post Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should correctly render content in Markdown with pseudo-random data', () => {
    // Configuración pseudoaleatoria
    const seed = 67890; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoTitle = faker.lorem.words(3); // Título pseudoaleatorio
    const pseudoContent = `# ${faker.lorem.sentence(5)}\n**${faker.lorem.words(2)}**`; // Contenido en Markdown

    // Log de los datos generados
    cy.log('Generated Pseudo-Random Title:', pseudoTitle);
    cy.log('Generated Pseudo-Random Content:', pseudoContent);

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('pseudo/F02-E5/step-1-visit-page');

    // When: Rellenar título y contenido en Markdown
    editorPage.fillTitle(pseudoTitle);
    cy.screenshot('pseudo/F02-E5/step-2-fill-title');

    editorPage.fillContent(pseudoContent);
    cy.screenshot('pseudo/F02-E5/step-3-fill-content');

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('pseudo/F02-E5/step-4-publish-post');

    // Then: Validar que se muestra el modal de éxito
    editorPage.validateSuccessModal({ timeout: 5000 });
    cy.screenshot('pseudo/F02-E5/step-5-validate-success-modal');

    // Validar que el post existe con título y contenido
    editorPage.validatePostExists(
      pseudoTitle,
      pseudoContent.split('\n')[0].replace('# ', '') // Validar encabezado generado
    );
    cy.screenshot('pseudo/F02-E5/step-6-validate-post-exists');
  });
});

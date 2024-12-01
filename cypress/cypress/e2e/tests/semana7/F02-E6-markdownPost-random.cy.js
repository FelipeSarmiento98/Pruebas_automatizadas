import { loginPage } from '../../pages/semana7/loginPage';
import { editorPage } from '../../pages/semana7/editorPage';
import { faker } from '@faker-js/faker';

describe('F02-E6 Markdown Post Test - Random', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should correctly render content in Markdown with random data', () => {
    // Generación de datos aleatorios
    const randomTitle = faker.lorem.words(4); // Título aleatorio
    const randomContent = `# ${faker.lorem.words(3)}\n**${faker.lorem.sentence()}**`; // Contenido Markdown aleatorio

    // Log de datos generados
    cy.log('Generated Random Title:', randomTitle);
    cy.log('Generated Random Content:', randomContent);

    // Given: Navegar al editor
    editorPage.visit();
    cy.get('.koenig-react-editor', { timeout: 10000 }).should('be.visible');
    cy.screenshot('random/F02-E6/step-1-visit-page');

    // When: Rellenar título y contenido en Markdown
    editorPage.fillTitle(randomTitle);
    cy.screenshot('random/F02-E6/step-2-fill-title');

    editorPage.fillContent(randomContent);
    cy.screenshot('random/F02-E6/step-3-fill-content');

    editorPage.publishPost();
    cy.wait(1000);
    cy.screenshot('random/F02-E6/step-4-publish-post');

    // Then: Validar que se muestra el modal de éxito
    editorPage.validateSuccessModal({ timeout: 5000 });
    cy.screenshot('random/F02-E6/step-5-validate-success-modal');

    // Validar que el post existe con título y encabezado del contenido
    editorPage.validatePostExists(
      randomTitle,
      randomContent.split('\n')[0].replace('# ', '') // Validar encabezado generado
    );
    cy.screenshot('random/F02-E6/step-6-validate-post-exists');
  });
});

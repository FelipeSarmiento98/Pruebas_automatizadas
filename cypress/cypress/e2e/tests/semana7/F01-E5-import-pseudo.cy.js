import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E5 Import Invalid File Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should display an error when importing a pseudo-randomly generated invalid file', () => {
    // Configuración pseudoaleatoria
    const seed = 12345; // Semilla fija para reproducibilidad
    faker.seed(seed);

    // Generar contenido pseudoaleatorio
    const pseudoInvalidFileContent = {
      invalidKey: faker.lorem.word(), // Palabra pseudoaleatoria
      missingExpectedFields: faker.datatype.boolean(), // Booleano pseudoaleatorio
    };

    // Escribe el archivo pseudoaleatorio en una carpeta temporal
    const pseudoInvalidFilePath = 'cypress/fixtures/pseudo-invalid.json';
    cy.writeFile(pseudoInvalidFilePath, pseudoInvalidFileContent);

    // Validar que el archivo se haya escrito correctamente
    cy.readFile(pseudoInvalidFilePath).should('deep.equal', pseudoInvalidFileContent);

    // Given: Acceso a la página de importación
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible');
    cy.screenshot('pseudo/F01-E2/step-1-visit-page');

    // When: Se abre el modal de importación
    migrationPage.openImportModal();
    cy.screenshot('pseudo/F01-E2/step-2-open-import-modal');

    // Adjuntar archivo generado
    migrationPage.attachFile('pseudo-invalid.json');
    cy.screenshot('pseudo/F01-E2/step-3-attach-invalid-file');

    // Then: Validar mensaje de error
    migrationPage.validateErrorToast('Invalid file format detected.');
    cy.screenshot('pseudo/F01-E2/step-4-validate-error-toast');

    // Validar que no aparece un modal de confirmación
    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('pseudo/F01-E2/step-5-validate-no-confirmation-modal');
  });
});

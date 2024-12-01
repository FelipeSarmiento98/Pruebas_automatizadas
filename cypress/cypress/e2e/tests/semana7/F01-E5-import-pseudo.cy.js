import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E2 Import Invalid File Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Inicia sesión antes de cada prueba
    loginPage.login();
  });

  it('Should display an error when importing a pseudo-randomly generated invalid file', () => {
    // Given
    const seed = 12345; // Semilla fija para reproducibilidad
    faker.seed(seed);
    const pseudoInvalidFileContent = {
      invalidKey: faker.word.sample(), // Ajustado a la API actual de Faker
      missingExpectedFields: faker.datatype.boolean(),
    };

    // Escribe el archivo pseudoaleatorio en la carpeta fixtures
    cy.writeFile('cypress/fixtures/pseudo-invalid.json', pseudoInvalidFileContent);

    // Navega a la página de migración
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible'); 
    cy.screenshot('pseudo/Import/step-1-visit-page'); 

    // When
    migrationPage.openImportModal();
    cy.screenshot('pseudo/Import/step-2-open-import-modal'); 

    migrationPage.attachFile('pseudo-invalid.json'); // Adjunta el archivo generado
    cy.screenshot('pseudo/Import/step-3-attach-invalid-file'); 

    // Then
    migrationPage.validateErrorToast('Invalid file format detected.');
    cy.screenshot('pseudo/Import/step-4-validate-error-toast'); 

    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('pseudo/Import/step-5-validate-no-confirmation-modal'); 
  });
});

import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';

describe('F01-E4 Import Invalid File Test - A Priori', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should display an error when importing a predefined invalid file', () => {
    // Archivo predefinido estático
    const invalidFile = 'invalid-apriori.json'; // Ubicado en cypress/fixtures

    // Given: Acceso a la página de migración
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible');
    cy.screenshot('a-priori/F01-E4/step-1-visit-page');

    // When: Se abre el modal de importación
    migrationPage.openImportModal();
    cy.screenshot('a-priori/F01-E4/step-2-open-import-modal');

    // Se adjunta el archivo predefinido
    migrationPage.attachFile(invalidFile);
    cy.screenshot('a-priori/F01-E4/step-3-attach-invalid-file');

    // Then: Validación del mensaje de error
    migrationPage.validateErrorToast('Invalid file structure detected.');
    cy.screenshot('a-priori/F01-E4/step-4-validate-error-toast');

    // Validación de que no existe el modal de confirmación
    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('a-priori/F01-E4/step-5-validate-no-confirmation-modal');
  });
});

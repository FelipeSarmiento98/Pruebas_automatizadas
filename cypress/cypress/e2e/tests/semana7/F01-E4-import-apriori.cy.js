import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';

describe('F01-E2 Import Invalid File Test - A Priori', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should display an error when importing a predefined invalid file', () => {
    // Given
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible'); 
    cy.screenshot('a-priori/Import/step-1-visit-page'); 

    // When
    migrationPage.openImportModal();
    cy.screenshot('a-priori/Import/step-2-open-import-modal'); 

    migrationPage.attachFile('invalid-apriori.json'); // Archivo estático predefinido
    cy.screenshot('a-priori/Import/step-3-attach-invalid-file'); 

    // Then
    migrationPage.validateErrorToast('Invalid file structure detected.');
    cy.screenshot('a-priori/Import/step-4-validate-error-toast'); 

    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('a-priori/Import/step-5-validate-no-confirmation-modal'); 
  });
});

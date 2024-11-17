import { loginPage } from '../../pages/v4.5/loginPage';
import { migrationPage } from '../../pages/v4.5/migrationPage';

describe('Import Invalid File Test', () => {
  beforeEach(() => {
    loginPage.login();
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Request was formatted incorrectly')) {
        return false; 
      }
      return true; 
    });
  });

  it('Should show an error message when importing an invalid file', () => {
    // Given
    migrationPage.visit();
    cy.screenshot('v4.5/Import/step-1-visit-page'); 

    // When
    migrationPage.openImportModal();
    cy.screenshot('v4.5/Import/step-2-open-import-modal'); 

    migrationPage.attachFile('example.json'); 
    cy.screenshot('v4.5/Import/step-3-attach-invalid-file'); 

    // Then
    migrationPage.validateErrorToast('check that the import file is valid JSON.: Expected "," but "[" found.');
    cy.screenshot('v4.5/Import/step-4-validate-error-toast');

    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('v4.5/Import/step-5-validate-no-confirmation-modal'); 
  });
});

import { loginPage } from '../pages/loginPage';
import { migrationPage } from '../pages/migrationPage';

describe('Import Invalid File Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error message when importing an invalid file', () => {
    // Given
    migrationPage.visit();
    cy.screenshot('Import/step-1-visit-page'); 

    // When
    migrationPage.openImportModal();
    cy.screenshot('Import/step-2-open-import-modal'); 

    migrationPage.attachFile('example.json'); 
    cy.screenshot('Import/step-3-attach-invalid-file'); 

    // Then
    migrationPage.validateErrorToast('Something went wrong while loading db, please try again.');
    cy.screenshot('Import/step-4-validate-error-toast'); 

    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('Import/step-5-validate-no-confirmation-modal'); 
  });
});

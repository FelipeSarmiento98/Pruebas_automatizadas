import { loginPage } from '../../pages/v5.96.1/loginPage';
import { migrationPage } from '../../pages/v5.96.1/migrationPage';

describe('Import Invalid File Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error message when importing an invalid file', () => {
    // Given
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible'); 
    cy.screenshot('v5.96.1/Import/step-1-visit-page'); 

    // When
    migrationPage.openImportModal();
    cy.screenshot('v5.96.1/Import/step-2-open-import-modal'); 

    migrationPage.attachFile('example.json'); 
    cy.screenshot('v5.96.1/Import/step-3-attach-invalid-file'); 

    // Then
    migrationPage.validateErrorToast('Something went wrong while loading db, please try again.');
    cy.screenshot('v5.96.1/Import/step-4-validate-error-toast'); 

    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('v5.96.1/Import/step-5-validate-no-confirmation-modal'); 
  });
});

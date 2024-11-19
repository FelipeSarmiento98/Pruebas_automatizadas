import { loginPage } from '../../pages/v4.5/loginPage';
import { migrationPage } from '../../pages/v4.5/migrationPage';

describe('F01-E1 Export Content Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should export content and validate file structure', () => {
    // Given
    cy.intercept('GET', '**/ghost/api/canary/admin/db/').as('exportRequest'); 
    migrationPage.visit();
    cy.screenshot('v4.5/Export/step-1-visit-page');

    // When
    migrationPage.clickExport();
    cy.screenshot('v4.5/Export/step-2-click-export');

    migrationPage.confirmExport();
    cy.screenshot('v4.5/Export/step-3-confirm-export');

    // Then
    cy.wait('@exportRequest', { timeout: 10000 }).then((interception) => {
      migrationPage.validateExportResponse(interception);
      cy.screenshot('v4.5/Export/step-4-validate-response');
    });
  });
});

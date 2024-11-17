import { loginPage } from '../../pages/v5.96.1/loginPage';
import { migrationPage } from '../../pages/v5.96.1/migrationPage';

describe('Export Content Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should export content and validate file structure', () => {
    // Given
    cy.intercept('GET', '**/ghost/api/admin/db/').as('exportRequest');
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible'); 
    cy.screenshot('v5.96.1/Export/step-1-visit-page'); 

    // When
    migrationPage.clickExport();
    cy.screenshot('v5.96.1/Export/step-2-click-export'); 

    migrationPage.confirmExport();
    cy.screenshot('v5.96.1/Export/step-3-confirm-export'); 
    // Then
    cy.wait('@exportRequest').then((interception) => {
      migrationPage.validateExportResponse(interception);
      cy.screenshot('v5.96.1/Export/step-4-validate-response'); 
    });
  });
});

import { loginPage } from '../pages/loginPage';
import { migrationPage } from '../pages/migrationPage';

describe('Export Content Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should export content and validate file structure', () => {
    // Given
    cy.intercept('GET', '**/ghost/api/admin/db/').as('exportRequest');
    migrationPage.visit();
    cy.screenshot('Export/step-1-visit-page'); 

    // When
    migrationPage.clickExport();
    cy.screenshot('Export/step-2-click-export'); 

    migrationPage.confirmExport();
    cy.screenshot('Export/step-3-confirm-export'); 
    // Then
    cy.wait('@exportRequest').then((interception) => {
      migrationPage.validateExportResponse(interception);
      cy.screenshot('Export/step-4-validate-response'); 
    });
  });
});

import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';

describe('F01-E1 Export Content Test - A Priori', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should export content with predefined data and validate file structure', () => {
    // Given
    cy.intercept('GET', '**/ghost/api/admin/db/').as('exportRequest');
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible');
    cy.screenshot('a-priori/Export/step-1-visit-page');

    // When
    migrationPage.clickExport();
    cy.screenshot('a-priori/Export/step-2-click-export');

    migrationPage.confirmExport();
    cy.screenshot('a-priori/Export/step-3-confirm-export');

    // Then
    cy.wait('@exportRequest').then((interception) => {
      migrationPage.validateExportResponse(interception, {
        expectedKeys: ['db', 'meta'],
        fileType: 'application/json',
      });
      cy.screenshot('a-priori/Export/step-4-validate-response');
    });
  });
});

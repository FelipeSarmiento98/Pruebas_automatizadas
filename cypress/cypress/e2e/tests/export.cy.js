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

    // When
    migrationPage.clickExport();
    migrationPage.confirmExport();

    // Then
    cy.wait('@exportRequest').then((interception) => {
      migrationPage.validateExportResponse(interception);
    });
  });
});

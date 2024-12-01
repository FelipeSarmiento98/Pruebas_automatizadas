import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';

describe('F01-E1 Export Content Test - A Priori', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should export content with predefined data and validate file structure', () => {
    // Datos a-priori
    const expectedKeys = ['db', 'meta']; // Claves esperadas en la exportación
    const expectedFileType = 'application/json'; // Tipo de archivo esperado

    // Given: Acceso a la página de migración
    cy.intercept('GET', '**/ghost/api/admin/db/').as('exportRequest');
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible');
    cy.screenshot('a-priori/F01-E1/step-1-visit-page');

    // When: Se realiza la exportación
    migrationPage.clickExport();
    cy.screenshot('a-priori/F01-E1/step-2-click-export');

    migrationPage.confirmExport();
    cy.screenshot('a-priori/F01-E1/step-3-confirm-export');

    // Then: Validación de la respuesta de exportación
    cy.wait('@exportRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200); // Validar código HTTP
      const responseBody = interception.response.body;

      // Validar estructura del archivo
      expect(responseBody).to.have.keys(expectedKeys);
      expect(interception.response.headers['content-type']).to.include(expectedFileType);

      cy.screenshot('a-priori/F01-E1/step-4-validate-response');
    });
  });
});

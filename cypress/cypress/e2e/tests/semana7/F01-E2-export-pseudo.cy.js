import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E2 Export Content Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should export content and validate with pseudo-random data', () => {
    // Configuración pseudoaleatoria
    faker.seed(1234); // Semilla para datos predecibles
    const pseudoRandomExportId = faker.string.uuid(); // Genera un ID único predecible
    const pseudoRandomFileName = `export-${faker.word.adjective()}-${faker.word.noun()}`; // Nombre de archivo pseudoaleatorio

    // Given: Acceso a la página de exportación
    cy.intercept('GET', '**/ghost/api/admin/db/**').as('exportRequest'); // Ajuste para capturar solicitudes dinámicas
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible');
    cy.screenshot('pseudo/F01-E1/step-1-visit-page');

    // When: Se realiza la exportación
    migrationPage.clickExport();
    cy.screenshot('pseudo/F01-E1/step-2-click-export');

    migrationPage.confirmExport();
    cy.screenshot('pseudo/F01-E1/step-3-confirm-export');

    // Then: Validación de la respuesta
    cy.wait('@exportRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200); // Valida código de respuesta HTTP
      const responseBody = interception.response.body;

      // Validación de estructura
      expect(responseBody).to.have.keys(['db', 'meta']);
      expect(interception.response.headers['content-type']).to.include('application/json');

      // Validación pseudoaleatoria
      migrationPage.validateExportResponse(interception, {
        exportId: pseudoRandomExportId,
        expectedKeys: ['db', 'meta'],
        fileType: 'application/json',
        fileName: pseudoRandomFileName,
      });

      cy.screenshot('pseudo/F01-E1/step-4-validate-response');
    });
  });
});

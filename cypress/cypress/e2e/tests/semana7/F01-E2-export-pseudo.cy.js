import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E1 Export Content Test - Pseudoaleatorio', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should export content and validate with pseudo-random data', () => {
    // Seed for predictable data
    faker.seed(1234);
    const exportId = faker.string.uuid(); // Cambiado a faker.string.uuid()

    // Given
    cy.intercept('GET', '**/ghost/api/admin/db/**').as('exportRequest'); // Ajuste para capturar solicitudes dinámicas
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible');
    cy.screenshot('pseudo/Export/step-1-visit-page');

    // When
    migrationPage.clickExport();
    cy.screenshot('pseudo/Export/step-2-click-export');

    migrationPage.confirmExport();
    cy.screenshot('pseudo/Export/step-3-confirm-export');

    // Then
    cy.wait('@exportRequest', { timeout: 10000 }).then((interception) => { // Incrementado timeout a 10 segundos
      // Validación del estado de la respuesta
      expect(interception.response.statusCode).to.eq(200); // Verifica que la solicitud sea exitosa
      migrationPage.validateExportResponse(interception, {
        exportId,
        expectedKeys: ['db', 'meta'],
        fileType: 'application/json',
      });
      cy.screenshot('pseudo/Export/step-4-validate-response');
    });
  });
});

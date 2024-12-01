import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E1 Export Content Test - Aleatorio', () => {
  beforeEach(() => {
    // Inicia sesión antes de cada prueba
    loginPage.login();
  });

  it('Should export content and validate with random data', () => {
    const randomExportId = faker.string.uuid(); // Genera un UUID aleatorio
    const randomFileName = `${faker.system.fileName()}.json`; // Genera un nombre de archivo aleatorio

    // Intercepta todas las solicitudes GET al endpoint relevante
    cy.intercept('GET', '**/ghost/api/admin/db/**').as('exportRequest');

    // Abre la página de migración
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible');
    cy.screenshot('random/Export/step-1-visit-page');

    // Inicia la exportación
    migrationPage.clickExport();
    cy.screenshot('random/Export/step-2-click-export');

    // Confirma la exportación
    migrationPage.confirmExport();
    cy.screenshot('random/Export/step-3-confirm-export');

    // Espera la solicitud de exportación y valida la respuesta
    cy.wait('@exportRequest', { timeout: 20000 }).then((interception) => {
      // Verifica que la respuesta tenga un código de estado 200
      expect(interception.response.statusCode).to.eq(200);

      // Validación personalizada de la respuesta
      migrationPage.validateExportResponse(interception, {
        exportId: randomExportId,
        fileName: randomFileName,
        expectedKeys: ['db', 'meta'],
        fileType: 'application/json',
      });
      cy.screenshot('random/Export/step-4-validate-response');
    });
  });
});

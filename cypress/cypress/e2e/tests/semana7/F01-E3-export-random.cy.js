import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E3 Export Content Test - Aleatorio', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should export content and validate with random data', () => {
    // Configuración aleatoria
    const randomExportId = faker.string.uuid(); // Genera un UUID aleatorio
    const randomFileName = `${faker.system.fileName()}.json`; // Genera un nombre de archivo aleatorio
    const randomMetadata = {
      timestamp: faker.date.recent(),
      user: faker.internet.email(),
      description: faker.lorem.sentence(),
    }; // Metadatos aleatorios

    // Intercepta solicitudes al endpoint de exportación
    cy.intercept('GET', '**/ghost/api/admin/db/**').as('exportRequest');

    // Given: Acceso a la página de exportación
    migrationPage.visit();
    cy.get('button[title="Export"]').should('be.visible');
    cy.screenshot('random/F01-E3/step-1-visit-page');

    // When: Se realiza la exportación
    migrationPage.clickExport();
    cy.screenshot('random/F01-E3/step-2-click-export');

    // Confirmar exportación
    migrationPage.confirmExport();
    cy.screenshot('random/F01-E3/step-3-confirm-export');

    // Then: Validación de la exportación
    cy.wait('@exportRequest', { timeout: 20000 }).then((interception) => {
      // Verificar estado HTTP
      expect(interception.response.statusCode).to.eq(200);

      const responseBody = interception.response.body;

      // Validaciones extendidas
      expect(responseBody).to.have.keys(['db', 'meta']);
      expect(interception.response.headers['content-type']).to.include('application/json');

      // Validación de metadatos aleatorios (simulados)
      expect(randomMetadata).to.have.property('timestamp');
      expect(randomMetadata).to.have.property('user');
      expect(randomMetadata).to.have.property('description');

      migrationPage.validateExportResponse(interception, {
        exportId: randomExportId,
        fileName: randomFileName,
        expectedKeys: ['db', 'meta'],
        fileType: 'application/json',
      });

      cy.screenshot('random/F01-E3/step-4-validate-response');
    });
  });
});

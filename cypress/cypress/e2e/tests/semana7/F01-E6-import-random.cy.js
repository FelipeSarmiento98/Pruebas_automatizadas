import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E2 Import Invalid File Test - Fully Random', () => {
  beforeEach(() => {
    // Inicia sesión antes de cada prueba
    loginPage.login();
  });

  it('Should display an error when importing a randomly generated invalid file', () => {
    // Generar un archivo con contenido completamente aleatorio
    const randomInvalidFileContent = {
      randomKey: faker.lorem.words(faker.number.int({ min: 1, max: 10 })), // Entre 1 y 10 palabras aleatorias
      anotherRandomField: faker.string.uuid(), // UUID completamente aleatorio
      randomNumber: faker.number.int({ min: 1, max: 1000 }), // Número aleatorio
      randomBoolean: faker.datatype.boolean(), // Valor booleano aleatorio
    };

    // Registrar el contenido generado para depuración
    cy.log('Generated File Content:', JSON.stringify(randomInvalidFileContent));

    // Escribir el archivo en la carpeta fixtures
    cy.writeFile('cypress/fixtures/random-invalid.json', randomInvalidFileContent);

    // Navegar a la página de migración
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible');
    cy.screenshot('random/Import/step-1-visit-page');

    // Abrir el modal de importación
    migrationPage.openImportModal();
    cy.screenshot('random/Import/step-2-open-import-modal');

    // Adjuntar el archivo generado
    migrationPage.attachFile('random-invalid.json');
    cy.screenshot('random/Import/step-3-attach-invalid-file');

    // Validar que se muestra un mensaje de error
    migrationPage.validateErrorToast('Error: Unable to process random file.');
    cy.screenshot('random/Import/step-4-validate-error-toast');

    // Validar que no se muestre un modal de confirmación
    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('random/Import/step-5-validate-no-confirmation-modal');
  });
});

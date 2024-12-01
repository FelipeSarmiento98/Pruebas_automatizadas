import { loginPage } from '../../pages/semana7/loginPage';
import { migrationPage } from '../../pages/semana7/migrationPage';
import { faker } from '@faker-js/faker';

describe('F01-E6 Import Invalid File Test - Fully Random', () => {
  beforeEach(() => {
    // Given: El usuario inicia sesión
    loginPage.login();
  });

  it('Should display an error when importing a randomly generated invalid file', () => {
    // Generar contenido aleatorio
    const randomInvalidFileContent = {
      randomKey: faker.lorem.words(faker.number.int({ min: 1, max: 10 })), // Palabras aleatorias
      anotherRandomField: faker.string.uuid(), // UUID aleatorio
      randomNumber: faker.number.int({ min: 1, max: 1000 }), // Número aleatorio
      randomBoolean: faker.datatype.boolean(), // Booleano aleatorio
    };

    // Registrar el contenido generado para facilitar depuración
    cy.log('Generated Random File Content:', JSON.stringify(randomInvalidFileContent));

    // Escribir el archivo aleatorio en una carpeta temporal
    const randomInvalidFilePath = 'cypress/fixtures/random-invalid.json';
    cy.writeFile(randomInvalidFilePath, randomInvalidFileContent);

    // Validar que el archivo se haya generado correctamente
    cy.readFile(randomInvalidFilePath).should('deep.equal', randomInvalidFileContent);

    // Given: Navegar a la página de migración
    migrationPage.visit();
    cy.get('button[title="Import"]').should('be.visible');
    cy.screenshot('random/F01-E6/step-1-visit-page');

    // When: Abrir el modal de importación
    migrationPage.openImportModal();
    cy.screenshot('random/F01-E6/step-2-open-import-modal');

    // Adjuntar el archivo aleatorio
    migrationPage.attachFile('random-invalid.json');
    cy.screenshot('random/F01-E6/step-3-attach-invalid-file');

    // Then: Validar mensaje de error
    migrationPage.validateErrorToast('Error: Unable to process random file.');
    cy.screenshot('random/F01-E6/step-4-validate-error-toast');

    // Validar que no se muestra un modal de confirmación
    migrationPage.validateConfirmationModalNotExists();
    cy.screenshot('random/F01-E6/step-5-validate-no-confirmation-modal');
  });
});

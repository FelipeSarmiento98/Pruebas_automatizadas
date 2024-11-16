import { loginPage } from '../pages/loginPage';
import { migrationPage } from '../pages/migrationPage';

describe('Import Invalid File Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error message when importing an invalid file', () => {
    // Given
    migrationPage.visit();

    // When
    migrationPage.openImportModal();
    migrationPage.attachFile('example.json'); // Asegúrate de que sea un archivo inválido

    // Then
    migrationPage.validateErrorToast('Something went wrong while loading db, please try again.');
    migrationPage.validateConfirmationModalNotExists();
  });
});

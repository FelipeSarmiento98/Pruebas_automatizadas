import { loginPage } from '../pages/loginPage';
import { editorPage } from '../pages/editorPage';

describe('Invalid Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should show an error if attempting to publish without a title', () => {
    // Given
    editorPage.visit();

    // When
    editorPage.fillContent('Contenido sin título');
    editorPage.publishPost();

    // Then
    editorPage.validateSuccessModalNotExists();
  });
});

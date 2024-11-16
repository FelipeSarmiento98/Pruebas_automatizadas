import { loginPage } from '../pages/loginPage';
import { editorPage } from '../pages/editorPage';

describe('Markdown Post Test', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should correctly render content in Markdown', () => {
    // Given
    editorPage.visit();

    // When
    editorPage.fillTitle('Markdown Post');
    editorPage.fillContent('# Encabezado\n**Texto en negrita**');
    editorPage.publishPost();

    // Then
    editorPage.validateSuccessModal();
    editorPage.validatePostExists('Markdown Post', 'Encabezado');
  });
});

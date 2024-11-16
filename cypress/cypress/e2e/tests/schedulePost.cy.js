import { loginPage } from '../pages/loginPage';
import { editorPage } from '../pages/editorPage';

describe('Schedule Post in Ghost', () => {
  beforeEach(() => {
    loginPage.login();
  });

  it('Should schedule a post for a future date', () => {
    // Given
    editorPage.visit();

    // When
    editorPage.fillTitle('Scheduled Post');
    editorPage.fillContent('Content for the scheduled post.');
    editorPage.schedulePost();

    // Then
    editorPage.validateScheduledPost('Scheduled Post', 'Content for the scheduled post.');
  });
});

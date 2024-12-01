export class EditorPage {
    visit() {
      cy.log('Visiting editor page');
      cy.visit('#/editor/post');
    }
  
    fillTitle(title) {
      cy.log('Filling post title');
      cy.get('textarea[placeholder="Post title"]').should('exist').type(title);
    }
  
    fillContent(content) {
      cy.log('Filling post content');
      cy.get('.koenig-react-editor').should('exist').click().type(content);
    }
  
    publishPost() {
      cy.log('Publishing the post');
      cy.get('button').contains('Publish').should('be.visible').click();
      cy.get('button[data-test-button="continue"]').should('be.visible').click();
      cy.get('button[data-test-button="confirm-publish"]').should('be.visible').click();
    }
  
    schedulePost() {
      cy.log('Scheduling the post');
      cy.get('button').contains('Publish').should('be.visible').click();
  
      cy.log('Opening schedule settings');
      cy.get('div[data-test-setting="publish-at"] button.gh-publish-setting-title').click();
  
      cy.log('Selecting "Schedule for later" option');
      cy.get('div.gh-radio').contains('Schedule for later').click();
  
      cy.log('Confirming scheduling');
      cy.get('button[data-test-button="continue"]').should('be.visible').click();
      cy.get('button[data-test-button="confirm-publish"]').should('be.visible').click();
    }
  
    validateScheduledPost(title, content) {
      cy.log('Validating scheduled post');
      cy.get('div.modal-post-success', { timeout: 10000 }).should('be.visible');
      cy.get('h2').contains(title).should('be.visible');
      cy.get('.post-excerpt').contains(content).should('be.visible');
    }
  
    validateSuccessModal() {
      cy.log('Validating success modal');
      cy.get('div.modal-post-success', { timeout: 10000 }).should('be.visible');
    }
  
    validatePostExists(title, excerpt) {
      cy.log('Validating post exists');
      cy.get('h2').contains(title).should('be.visible');
      cy.get('.post-excerpt').contains(excerpt).should('be.visible');
    }
  
    validateSuccessModalNotExists() {
        cy.log('Validating success modal does not exist');
        cy.get('div.modal-post-success').should('not.be.visible');
        cy.get('div.modal-post-success').should('not.exist');
    }
    
    waitForNoSuccessModal() {
      cy.log('Waiting to ensure no success modal is displayed');
      cy.get('div.modal-post-success', { timeout: 5000 }).should('not.exist');
    }

    validateErrorToast(errorMessage) {
      cy.get('.toast-error') 
        .should('be.visible')
        .and('contain.text', errorMessage);
    }

    validatePostStatus(title, expectedStatus) {
      // Cierra el modal de publicación si está visible
      cy.get('[data-test-button="close-publish-flow"]') // Selector del botón "Close"
        .should('be.visible')
        .click();
      cy.wait(400);
      // Valida que el estado del post sea el esperado
      cy.get('.post-list').contains(title).parents('.post-item') // Cambia el selector según la estructura de tu aplicación
        .find('.post-status')
        .should('have.text', expectedStatus);
    }
    
    
  }
  
  export const editorPage = new EditorPage();
  
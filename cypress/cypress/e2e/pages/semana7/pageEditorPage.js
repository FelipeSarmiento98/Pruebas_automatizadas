export const pageEditor = {
    visit() {
        // Navega al editor de páginas (URL final después de la redirección)
        cy.visit('#/editor/page');
      },
      
  
    fillTitle(title) {
      // Llena el campo del título de la página
      cy.get('textarea.gh-editor-title').should('be.visible').clear().type(title);
    },
  
    fillContent(content) {
        cy.get('div[data-secondary-instance="false"] div.kg-prose[contenteditable="true"]', { timeout: 10000 })
  .should('be.visible')
  .type(content, { force: true })
  .then(() => {
      cy.log('Content added successfully');
  });

    },
    
  
    publishPage() {
      // Abre el menú de configuración de publicación
      cy.get('button[title="Settings"]').should('be.visible').click();
  
      // Selecciona la opción de publicación
      cy.get('button.gh-publish-trigger').should('be.visible').click();
  
      // Confirma la publicación
      cy.get('button.gh-btn.gh-btn-blue.gh-publish-cta').should('be.visible').click();
    },
  
    validatePublishedPage(title) {
      // Verifica que la página publicada esté en la lista de páginas
      cy.visit('/ghost/#/pages');
      cy.get('.gh-list-data.gh-post-list-title')
        .contains(title)
        .should('be.visible');
    },
  };
  
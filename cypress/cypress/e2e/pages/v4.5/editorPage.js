export class EditorPage {
    visit() {
      cy.log('Visiting editor page');
      cy.visit('#/editor/post');
    }
  
    fillTitle(title) {
      cy.log('Filling post title');
      cy.get('textarea[placeholder="Post Title"]') 
        .should('exist') 
        .type(title); 
    }
    
  
    fillContent(content) {
      cy.log('Filling post content');
      cy.get('.koenig-editor__editor') 
        .should('exist') 
        .click() 
        .type(content); 
    }
    
    publishPost() {
      cy.log('Publishing the post');
      
   
      cy.get('.gh-publishmenu-trigger') 
        .should('be.visible')
        .click({ force: true });
    

      cy.get('.gh-publishmenu-radio.active') 
        .should('be.visible');
    
    
      cy.get('.gh-publishmenu-footer .gh-publishmenu-button') 
        .should('be.visible')
        .click({ force: true });
    }
    
  
    schedulePost() {
      cy.get('.gh-publishmenu-trigger') 
        .should('be.visible')
        .click({ force: true });
    
      cy.log('Scheduling the post');
    
      cy.log('Opening schedule settings');
      cy.get('.gh-publishmenu-radio-label').contains('Schedule it for later').should('exist').click();
    
      cy.log('Setting the date for future publish');
      cy.get('.gh-date-time-picker-date input[placeholder="YYYY-MM-DD"]')
        .first() 
        .should('be.visible')
        .clear()
        .type('2024-12-25'); 
    
      cy.log('Setting the time for future publish');
      cy.get('.gh-date-time-picker-time input')
        .first() 
        .should('be.visible')
        .clear()
        .type('12:00'); 
    
      cy.log('Confirming scheduling');
      cy.get('.gh-btn.gh-btn-black.gh-publishmenu-button').should('be.enabled').click();
    }
    
    
  
    validateScheduledPost(title, content) {
      cy.log('Validating scheduled post');
      

      cy.get('article.gh-notification').should('be.visible');
    

      cy.get('article.gh-notification.gh-notification-passive')
      .should('be.visible')
      .within(() => {
        cy.get('.gh-notification-title').should('contain', 'Scheduled');
  

        cy.get('.gh-notification-actions a')
          .should('have.attr', 'href')
          .then((href) => {
            cy.visit(href); 
          });
      });
    
      cy.get('h1.article-title').should('contain.text', title);
   
      cy.get('section.gh-content')
        .within(() => {
          cy.get('p').should('contain', content); // 
        });
    
      cy.log('Scheduled post validation completed');
    }
    
  
    validateSuccessModal() {
      cy.log('Validating success modal');
  
    
      cy.get('button.gh-btn-black.gh-publishmenu-button.gh-btn-icon.gh-btn-green', { timeout: 10000 })
        .should('be.visible') 
        .and('contain', 'Published'); 
    }
  
    validatePostExists(title, excerpt) {
      cy.log('Validating post exists');
    
    cy.get('article.gh-notification.gh-notification-passive')
        .should('be.visible')
        .within(() => {
          cy.get('.gh-notification-title').should('contain', 'Published');
    
       
          cy.get('.gh-notification-actions a')
            .should('have.attr', 'href')
            .then((href) => {
              cy.visit(href); 
            });
        });
      
      cy.get('h1.article-title').should('contain.text', title);
    
      cy.get('section.gh-content')
        .within(() => {
          cy.get('h1').should('contain', excerpt); 
        });
    }
    
    
  
    validateSuccessModalNotExists() {
      cy.log('Validating success modal does not exist');

      cy.get('article.gh-notification.gh-notification-passive')
      .should('not.be.visible');

      cy.get('article.gh-notification.gh-notification-passive')
      .should('not.exist');
    }
    
  }
  
  export const editorPage = new EditorPage();
  
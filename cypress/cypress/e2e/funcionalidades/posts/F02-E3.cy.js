// Ignorar errores de reproducción de medios en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('The play() request was interrupted')) {
        return false;
    }
    return true;
});

describe('F06-E2 Prueba Creación de publicación con contenido en Markdown', () => {
    beforeEach(() => {

        cy.login();
    });

    it('Debería renderizar el contenido en Markdown correctamente', () => {
        cy.visit('#/editor/post');
        cy.wait(1000);

        
        cy.get('textarea[placeholder="Post title"]').type('Markdown Post');
        cy.get('.koenig-react-editor').type('# Encabezado\n**Texto en negrita**');
        cy.get('button').contains('Publish').click();


        cy.get('button[data-test-button="continue"]').click();
        cy.get('button[data-test-button="confirm-publish"]').click();

       
        cy.get('div.modal-post-success').should('be.visible');


        cy.get('h2').contains('Markdown Post').should('be.visible');
        cy.get('.post-excerpt').contains('Encabezado').should('be.visible');

       
        cy.get('button[data-test-button="close-publish-flow"]').click();
        cy.get('div.modal-post-success').should('not.exist');

       
        cy.visit('#/posts?type=published');
        cy.get('h3').contains('Markdown Post').should('be.visible');
    });
});

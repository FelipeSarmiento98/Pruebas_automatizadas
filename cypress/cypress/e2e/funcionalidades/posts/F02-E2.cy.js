// Ignorar errores de reproducción de medios en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('The play() request was interrupted')) {
        return false;
    }
    return true;
});

describe('F06-E2 Prueba E2E de Creación publicacion invalida', () => {
    beforeEach(() => {

        cy.login();
    });

    it('Debería mostrar un error si se intenta publicar sin título', () => {
        cy.visit('#/editor/post');
        cy.wait(1000);

        cy.get('.koenig-react-editor').type('Contenido sin título');
        cy.get('button').contains('Publish').click();


        cy.get('button[data-test-button="continue"]').click();

        cy.get('button[data-test-button="confirm-publish"]').click();

        cy.get('.post-excerpt').contains('Contenido sin título').should('be.visible');

        cy.get('div.modal-post-success').should('not.exist');
    });


});
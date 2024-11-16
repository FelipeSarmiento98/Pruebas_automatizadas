
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('The play() request was interrupted')) {
        return false;
    }
    return true;
});

describe('F06-E1 Prueba E2E de Creación y Programación de Publicaciones en Ghost', () => {
    beforeEach(() => {

        cy.login();
    });

    it('Debería programar una publicación para una fecha futura', () => {
        cy.visit('#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type('Publicación Programada');
        cy.get('.koenig-react-editor').type('Contenido para publicación programada.');
        cy.get('button').contains('Publish').click();

        cy.get('div[data-test-setting="publish-at"] button.gh-publish-setting-title').click();

       
        cy.get('div.gh-radio').contains('Schedule for later').click();

        cy.get('button[data-test-button="continue"]').click();

        cy.get('button[data-test-button="confirm-publish"]').click();

     
        cy.get('div.modal-post-success').should('be.visible');

     
        cy.get('h2').contains('Publicación Programada').should('be.visible');
        cy.get('.post-excerpt').contains('Contenido para publicación programada.').should('be.visible');


        cy.get('button[data-test-button="close-publish-flow"]').click();


        cy.get('div.modal-post-success').should('not.exist');
    });


});

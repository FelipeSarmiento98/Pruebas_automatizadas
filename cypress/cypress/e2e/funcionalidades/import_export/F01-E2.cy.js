Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('The play() request was interrupted')) {
        return false;
    }
    return true;
});

describe('sF05-E2 Prueba de Importación en la sección de Migración en Ghost archivo inválido', () => {
    beforeEach(() => {
        cy.login(); // Comando personalizado para iniciar sesión
    });

    it('Debería mostrar un mensaje de error al intentar importar un archivo inválido', () => {
        // Navegar a la sección de migración
        cy.visit('#/settings/migration');
        cy.wait(1000);

        // Hacer clic en el botón para iniciar el proceso de importación
        cy.contains('button', 'Universal import').click();

        // Validar que el modal de importación esté visible
        cy.get('[data-testid="universal-import-modal"]').should('be.visible');

        // Adjuntar un archivo inválido
        cy.get('input[type="file"]').attachFile('example.json'); // Cambiar a un archivo inválido si es necesario

        // Validar que se muestra un mensaje de error
        cy.get('[data-testid="toast-error"]').should('be.visible')
          .and('contain', 'Something went wrong while loading db, please try again.');

        // Confirmar que el modal de confirmación no aparece
        cy.get('[data-testid="confirmation-modal"]').should('not.exist');
    });
});

import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
    cy.visit('/signin'); // Cambia la ruta de inicio de sesión si es diferente
    cy.get('input[name="identification"]').type('jf.sarmiento23@uniandes.edu.co',);
    cy.get('input[name="password"]').type('prueba1234', { log: false });
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard'); // Verificar que llegue al dashboard
});
 
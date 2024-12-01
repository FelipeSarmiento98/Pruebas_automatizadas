class RolesPage {
    navigateToStaff() {
      // Navega a Settings
      cy.visit('#/settings');
      cy.contains('Staff').click(); // Cambia el texto si es diferente
    }
  
    assignRole(email, role) {
      // Busca al usuario por email y asigna el rol
      cy.contains(email)
        .parents('.gh-user-card')
        .within(() => {
          cy.get('select') // Selector para el dropdown de roles
            .select(role);
        });
  
      // Guarda los cambios
      cy.contains('Save').click(); // Cambia este selector si el botón de guardar es diferente
    }
  
    validateAssignedRole(email, role) {
      // Valida que el usuario tenga el rol asignado
      cy.contains(email)
        .parents('.gh-user-card')
        .within(() => {
          cy.get('select').should('have.value', role.toLowerCase()); // Ajusta el valor si es necesario
        });
    }
  }
  
  export const rolesPage = new RolesPage();
  
class NotificationsPage {
    /**
     * Navega a la sección de configuraciones de notificaciones.
     */
    visit() {
      // Navegar a Settings > Integrations o a la sección donde se gestionen notificaciones
      cy.visit('#/settings');
      cy.contains('notifications').click(); // Cambia 'Integrations' por la subsección correcta si es diferente
    }
  
    /**
     * Configura las notificaciones seleccionando los eventos proporcionados.
     * @param {Array} events - Lista de eventos a habilitar.
     */
    configureNotifications(events) {
      events.forEach((event) => {
        cy.get(`input[type="checkbox"][value="${event}"]`).check(); // Selector ajustado a la estructura de la UI
      });
      cy.get('button[data-test-save-notifications]').click(); // Cambia el selector si es necesario
    }
  
    /**
     * Valida que las notificaciones están habilitadas para los eventos proporcionados.
     * @param {Array} events - Lista de eventos esperados.
     */
    validateNotifications(events) {
      events.forEach((event) => {
        cy.get(`input[type="checkbox"][value="${event}"]`).should('be.checked'); // Selector ajustado
      });
    }
  }
  
  export const notificationsPage = new NotificationsPage();
  
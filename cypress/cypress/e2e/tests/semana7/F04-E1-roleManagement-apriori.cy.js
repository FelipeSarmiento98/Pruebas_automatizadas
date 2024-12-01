import { loginPage } from '../../pages/semana7/loginPage';
import { rolesPage } from '../../pages/semana7/rolesPage';

describe('F04-E1 Role Management - A Priori', () => {
  beforeEach(() => {
    // Given: El usuario está autenticado
    loginPage.login();
    cy.screenshot('F04-E1/step-1-login');
  });

  it('Should assign a predefined role to a user', () => {
    // Given: El usuario navega a Settings y luego a Staff
    rolesPage.navigateToStaff();
    cy.screenshot('F04-E1/step-2-navigate-to-staff');

    // When: Asigna un rol predefinido a un usuario
    rolesPage.assignRole('john.doe@example.com', 'Editor');
    cy.screenshot('F04-E1/step-3-assign-role');

    // Then: Valida que el rol fue asignado correctamente
    rolesPage.validateAssignedRole('john.doe@example.com', 'Editor');
    cy.screenshot('F04-E1/step-4-validate-role');
  });
});

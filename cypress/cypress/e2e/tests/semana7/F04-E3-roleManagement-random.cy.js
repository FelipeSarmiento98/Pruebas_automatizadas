import { faker } from '@faker-js/faker';
import { loginPage } from '../../pages/semana7/loginPage';
import { rolesPage } from '../../pages/semana7/rolesPage';

describe('F04-E3 Role Management - Random', () => {
  beforeEach(() => {
    // Given: El usuario está autenticado
    loginPage.login();
    cy.screenshot('F04-E3/step-1-login');
  });

  it('Should assign a completely random role to a user', () => {
    const email = faker.internet.email();
    const role = faker.helpers.arrayElement(['Editor', 'Admin', 'Contributor', 'Viewer']);

    // Given: El usuario está en la página de roles
    rolesPage.navigateToStaff();
    cy.screenshot('F04-E3/step-2-visit-roles-page');

    // When: Asigna un rol aleatorio a un usuario
    rolesPage.assignRole(email, role);
    cy.screenshot('F04-E3/step-3-assign-role');

    // Then: Valida que el rol fue asignado correctamente
    rolesPage.validateAssignedRole(email, role);
    cy.screenshot('F04-E3/step-4-validate-role');
  });
});

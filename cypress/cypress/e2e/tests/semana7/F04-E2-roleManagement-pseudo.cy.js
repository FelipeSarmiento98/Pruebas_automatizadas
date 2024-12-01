import { faker } from '@faker-js/faker';
import { loginPage } from '../../pages/semana7/loginPage';
import { rolesPage } from '../../pages/semana7/rolesPage';

describe('F04-E2 Role Management - Pseudoaleatorio', () => {
  beforeEach(() => {
    // Given: El usuario está autenticado
    loginPage.login();
    cy.screenshot('F04-E2/step-1-login');
  });

  it('Should assign a pseudo-random role to a user', () => {
    const seed = 12345;
    faker.seed(seed);

    const email = `${faker.internet.userName()}@example.com`;
    const role = faker.helpers.arrayElement(['Editor', 'Admin', 'Contributor']);

    // Given: El usuario está en la página de roles
    rolesPage.navigateToStaff();
    cy.screenshot('F04-E2/step-2-visit-roles-page');

    // When: Asigna un rol pseudoaleatorio a un usuario
    rolesPage.assignRole(email, role);
    cy.screenshot('F04-E2/step-3-assign-role');

    // Then: Valida que el rol fue asignado correctamente
    rolesPage.validateAssignedRole(email, role);
    cy.screenshot('F04-E2/step-4-validate-role');
  });
});

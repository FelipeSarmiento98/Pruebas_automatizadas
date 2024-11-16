// Ignorar errores de reproducción de medios en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('The play() request was interrupted')) {
      return false; // Ignorar el error
  }
  return true; // Permitir otros errores
});

describe('F05-E1 Prueba de Exportación en Ghost', () => {
  beforeEach(() => {
      cy.login(); // Comando personalizado para iniciar sesión
  });

  it('Debería exportar contenido y validar la estructura del archivo exportado', () => {
      // Interceptar la solicitud de exportación
      cy.intercept('GET', '**/ghost/api/admin/db/').as('exportRequest');

      // Visitar la página de migración
      cy.visit('#/settings/migration');

      // Esperar hasta que el botón sea visible y hacer clic
      cy.get('button[title="Export"]').scrollIntoView().should('be.visible').click({ force: true });

      // Confirmar la exportación
      cy.contains('button', 'Export content').click({ force: true });

      // Esperar la respuesta de la solicitud de exportación
      cy.wait('@exportRequest').then((interception) => {
        // Validar que la solicitud sea exitosa
        expect(interception.response.statusCode).to.equal(200);

        // Validar el tipo de contenido devuelto
        expect(interception.response.headers['content-type']).to.include('application/json');

        // Validar el contenido del archivo exportado
        const exportData = interception.response.body;

        // Verificar que contiene el campo `db` con la estructura esperada
        expect(exportData).to.have.property('db');
        const db = exportData.db;

        // Validar que el primer elemento tenga `meta` y `data`
        const firstEntry = db[0];
        expect(firstEntry).to.have.property('meta');
        expect(firstEntry.meta).to.have.property('exported_on');
        expect(firstEntry.meta).to.have.property('version'); // No se valida un valor específico

        expect(firstEntry).to.have.property('data');
        const data = firstEntry.data;

        // Validar que `newsletters` contiene un elemento con campos clave
        expect(data).to.have.property('newsletters');
        expect(data.newsletters).to.be.an('array').that.is.not.empty;

        const newsletter = data.newsletters[0];
        expect(newsletter).to.have.property('id');
        expect(newsletter).to.have.property('name'); // No se valida un valor específico
        expect(newsletter).to.have.property('status'); // Validar que el campo existe

        // Validar que `posts` contiene elementos con campos clave
        expect(data).to.have.property('posts');
        expect(data.posts).to.be.an('array').that.is.not.empty;

        const post = data.posts[0];
        expect(post).to.have.property('title'); // No se valida un valor específico
        expect(post).to.have.property('html'); // Validar que el campo existe
        expect(post).to.have.property('status'); // Validar que el campo existe
      });
  });
});

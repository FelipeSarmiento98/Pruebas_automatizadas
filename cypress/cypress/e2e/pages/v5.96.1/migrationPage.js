export class MigrationPage {
    visit() {
      cy.visit('#/settings/migration');
    }
  
    openImportModal() {
      cy.contains('button', 'Universal import').click();
    }
  
    clickExport() {
      cy.get('button[title="Export"]').scrollIntoView().click({ force: true });
    }
  
    confirmExport() {
      cy.contains('button', 'Export content').click({ force: true });
    }
  
    attachFile(fileName) {
      cy.get('input[type="file"]').attachFile(fileName);
    }
  
    validateErrorToast(message) {
      cy.get('[data-testid="toast-error"]').should('be.visible').and('contain', message);
    }
  
    validateConfirmationModalNotExists() {
      cy.get('[data-testid="confirmation-modal"]').should('not.exist');
    }
  
    validateExportResponse(interception) {

      expect(interception.response.statusCode).to.equal(200);
  
      expect(interception.response.headers['content-type']).to.include('application/json');
  
      const exportData = interception.response.body;
      expect(exportData).to.have.property('db');
  
      const db = exportData.db;
      const firstEntry = db[0];
  
      expect(firstEntry).to.have.property('meta');
      expect(firstEntry.meta).to.have.property('exported_on');
      expect(firstEntry.meta).to.have.property('version');
  
      expect(firstEntry).to.have.property('data');
      const data = firstEntry.data;
  
      expect(data).to.have.property('newsletters');
      expect(data.newsletters).to.be.an('array').that.is.not.empty;
  
      expect(data).to.have.property('posts');
      expect(data.posts).to.be.an('array').that.is.not.empty;
    }
  }
  
  export const migrationPage = new MigrationPage();
  
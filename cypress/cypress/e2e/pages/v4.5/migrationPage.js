export class MigrationPage {
  visit() {
    cy.visit('#/settings/labs'); 
  }

  clickExport() {
    cy.get('button.gh-btn span').contains('Export').click({ force: true });
  }

  confirmExport() {
    cy.get('h4.gh-expandable-title').contains('Export your content').click({ force: true });
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


    expect(data).to.have.property('posts');
    expect(data.posts).to.be.an('array').that.is.not.empty;

  }

  
  openImportModal() {
   
    cy.get('form#settings-import input.gh-input-file') 
      .should('exist');
  }

attachFile(fileName) {

    cy.get('form#settings-import input.gh-input-file')
      .attachFile(fileName);


    cy.get('button#startupload')
      .should('be.visible')
      .click({ force: true });
  }

  validateErrorToast(message) {

    cy.get('.gh-import-errors .gh-import-error-message') 
      .should('be.visible')
      .and('contain', message);
  }


  validateConfirmationModalNotExists() {
    cy.get('.modal').should('not.exist'); 
  }

}

export const migrationPage = new MigrationPage();

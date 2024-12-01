class TagPage {
    // Accede a la sección de Tags
    openTagsSection() {
        cy.get('a[data-test-nav="tags"]').should('be.visible').click();
    }

    // Abre el formulario para crear un nuevo tag
    openTagCreationForm() {
        cy.get('a[href="#/tags/new/"].gh-btn-primary').should('be.visible').click();
    }

    // Edita el último tag en la lista
    editLastTag() {
        cy.get('a[title="Edit tag"]').last().scrollIntoView().should('be.visible').click();
    }

    // Navega al primer tag de la lista
    selectFirstTag() {
        cy.get('a[href="#/tags/"]').first().should('be.visible').click();
    }

    // Limpia el campo de nombre del tag
    resetTagName() {
        cy.get('#tag-name').scrollIntoView().should('be.visible').clear();
    }

    // Limpia el campo de descripción del tag
    resetTagDescription() {
        cy.get('#tag-description').should('be.visible').clear();
    }

    // Ingresa un nombre en el campo de nombre
    inputTagName(name) {
        cy.get('#tag-name').should('be.visible').type(name);
    }

    // Ingresa un slug en el campo de slug
    inputTagSlug(slug) {
        cy.get('#tag-slug').should('be.visible').clear().type(slug);
    }

    // Ingresa una descripción en el campo de descripción
    inputTagDescription(description) {
        cy.get('#tag-description').should('be.visible').type(description);
    }

    // Guarda los cambios
    confirmSave() {
        cy.get('button[data-test-button="save"].gh-btn-primary')
          .scrollIntoView()
          .should('be.visible')
          .click();
    }

    // Verifica que el tag esté en la lista
    validateTagPresence(title) {
        cy.get('h3.gh-tag-list-name', { timeout: 10000 })
          .filter(`:contains(${title})`)
          .should('have.length.at.least', 1);
    }

    // Verifica que haya un error visible en el formulario
    validateErrorOnForm() {
        cy.get('[data-test-task-button-state="failure"]').should('be.visible');
    }

    fillTagForm(tag) {
        if (tag.name) this.inputTagName(tag.name);
        if (tag.slug) this.inputTagSlug(tag.slug);
        if (tag.description) this.inputTagDescription(tag.description);
    }

    resetTagSlug() {
        cy.get('#tag-slug').clear(); // Limpia el contenido del campo de slug
    }
}

module.exports = { TagPage };

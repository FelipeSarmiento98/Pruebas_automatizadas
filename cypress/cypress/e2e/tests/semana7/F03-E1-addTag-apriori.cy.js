import { loginPage } from '../../pages/semana7/loginPage';
const { TagPage } = require('../../pages/semana7/tagPage');

describe('F03-E1 Tag Feature Tests with Screenshots', () => {
    const tagPage = new TagPage();

    beforeEach(() => {
        // Given: El usuario inicia sesión
        loginPage.login();
        cy.screenshot('random/Tags/login/step-1-login');
    });

    /**
     * Crear un nuevo tag con un slug válido
     */
    it('Should create a new tag with valid data', function () {
        cy.fixture('tags_example.json').then((tags) => {
            const tag = tags[0]; // Primer tag de los datos predefinidos

            tagPage.openTagsSection();
            cy.screenshot('random/Tags/create/step-2-open-section');

            tagPage.openTagCreationForm();
            cy.screenshot('random/Tags/create/step-3-open-creation-form');

            tagPage.fillTagForm(tag);
            cy.screenshot('random/Tags/create/step-4-fill-form');

            tagPage.confirmSave();
            cy.screenshot('random/Tags/create/step-5-confirm-save');

            tagPage.openTagsSection();
            cy.screenshot('random/Tags/create/step-6-reopen-section');

            tagPage.validateTagPresence(tag.name);
            cy.screenshot('random/Tags/create/step-7-validate-tag');
        });
    });

    /**
     * Intentar crear un tag sin completar campos requeridos
     */
    it('Should not allow creating a tag without required fields', function () {
        tagPage.openTagsSection();
        cy.screenshot('random/Tags/create-empty/step-2-open-section');

        tagPage.openTagCreationForm();
        cy.screenshot('random/Tags/create-empty/step-3-open-creation-form');

        tagPage.confirmSave();
        cy.screenshot('random/Tags/create-empty/step-4-confirm-save');

        tagPage.validateErrorOnForm('Name is required');
        cy.screenshot('random/Tags/create-empty/step-5-validate-error');
    });

    /**
     * Editar un tag existente
     */
    it('Should update an existing tag', function () {
        cy.fixture('tags_example.json').then((tags) => {
            const tag = tags[1]; // Segundo tag para edición

            tagPage.openTagsSection();
            cy.screenshot('random/Tags/edit/step-2-open-section');

            tagPage.selectFirstTag();
            cy.screenshot('random/Tags/edit/step-3-select-first-tag');

            tagPage.fillTagForm(tag);
            cy.screenshot('random/Tags/edit/step-4-edit-form');

            tagPage.confirmSave();
            cy.screenshot('random/Tags/edit/step-5-confirm-save');

            tagPage.openTagsSection();
            cy.screenshot('random/Tags/edit/step-6-reopen-section');

            tagPage.validateTagPresence(tag.name);
            cy.screenshot('random/Tags/edit/step-7-validate-tag');
        });
    });
});

import { loginPage } from '../../pages/semana7/loginPage';
const { TagPage } = require('../../pages/semana7/tagPage');

describe('Tag Feature Tests with Screenshots', () => {
    const tagPage = new TagPage();

    // Datos de prueba
    const sampleTags = [
        {
            name: 'Technology',
            color: '000000',
            slug: 'tech-short',
            description: 'Tags related to technology topics.',
        }
    ];

    beforeEach(() => {
        loginPage.login();
        cy.screenshot('random/Tags/step-1-login');
    });

    /**
     * -------------------------------------------------------------
     * Crear un nuevo tag con un slug de menos de 191 caracteres
     * -------------------------------------------------------------
     */
    sampleTags.forEach((tag) => {
        it(`Should create a new tag: ${tag.name}`, function () {
            tagPage.openTagsSection();
            cy.screenshot('random/Tags/step-2-open-section');
            
            tagPage.openTagCreationForm();
            cy.screenshot('random/Tags/step-3-open-creation-form');
            
            tagPage.inputTagName(tag.name);
            cy.screenshot('random/Tags/step-4-input-name');
            
            tagPage.inputTagSlug(tag.slug);
            cy.screenshot('random/Tags/step-5-input-slug');
            
            tagPage.inputTagDescription(tag.description);
            cy.screenshot('random/Tags/step-6-input-description');
            
            tagPage.confirmSave();
            cy.screenshot('random/Tags/step-7-confirm-save');
            
            tagPage.openTagsSection();
            cy.screenshot('random/Tags/step-8-reopen-section');
            
            tagPage.validateTagPresence(tag.name);
            cy.screenshot('random/Tags/step-9-validate-tag');
        });
    });

    /**
     * -------------------------------------------------------------
     * Intentar agregar un tag sin completar los campos requeridos
     * -------------------------------------------------------------
     */
    it('Should not allow creating a tag without required fields', function () {
        tagPage.openTagsSection();
        cy.screenshot('random/Tags/step-2-open-section-empty');
        
        tagPage.openTagCreationForm();
        cy.screenshot('random/Tags/step-3-open-creation-form-empty');
        
        tagPage.confirmSave();
        cy.screenshot('random/Tags/step-4-confirm-save-empty');
        
        tagPage.validateErrorOnForm();
        cy.screenshot('random/Tags/step-5-validate-error');
    });

    /**
     * -------------------------------------------------------------
     * Editar un tag existente
     * -------------------------------------------------------------
     */
    it('Should update an existing tag', function () {
        cy.fixture('tags_example.json').then((tags) => {
            tags.slice(0, 3).forEach((tag, index) => {
                tagPage.openTagsSection();
                cy.screenshot(`random/Tags/step-${index + 2}-open-section-edit`);
                
                tagPage.selectFirstTag();
                cy.screenshot(`random/Tags/step-${index + 3}-select-first-tag`);
                
                tagPage.editLastTag();
                cy.screenshot(`random/Tags/step-${index + 4}-edit-last-tag`);
                
                tagPage.resetTagName();
                cy.screenshot(`random/Tags/step-${index + 5}-reset-name`);
                
                tagPage.inputTagName(tag.name);
                cy.screenshot(`random/Tags/step-${index + 6}-input-name-edit`);
                
                tagPage.inputTagSlug(tag.slug);
                cy.screenshot(`random/Tags/step-${index + 7}-input-slug-edit`);
                
                tagPage.resetTagDescription();
                cy.screenshot(`random/Tags/step-${index + 8}-reset-description`);
                
                tagPage.inputTagDescription(tag.description);
                cy.screenshot(`random/Tags/step-${index + 9}-input-description-edit`);
                
                tagPage.confirmSave();
                cy.screenshot(`random/Tags/step-${index + 10}-confirm-save-edit`);
                
                tagPage.openTagsSection();
                cy.screenshot(`random/Tags/step-${index + 11}-reopen-section-validate-edit`);
                
                tagPage.validateTagPresence(tag.name);
                cy.screenshot(`random/Tags/step-${index + 12}-validate-tag-edit`);
            });
        });
    });
});

import { loginPage } from '../../pages/semana7/loginPage';
const { TagPage } = require('../../pages/semana7/tagPage');

describe('Tag Management with Dynamic Data - Aviation and Cars with Screenshots', function () {

    const tagPage = new TagPage();

    // Datos dinámicos relacionados con aeronaves y coches
    const names = [
        "Boeing", "Airbus", "Cessna", "Piper", 
        "Tesla", "Ford", "Chevrolet", "Bugatti"
    ];
    const slugs = [
        "jet", "airliner", "plane", "luxury-car", 
        "electric", "muscle-car", "suv", "sports-car"
    ];
    const descriptions = [
        "High-altitude performance", "Long-haul efficiency", "Compact private jet", 
        "Classic designs", "Advanced aerodynamics", "Luxury redefined", 
        "Cutting-edge innovation", "Rugged reliability", "Elegant interiors"
    ];

    // Generador de datos aleatorios
    function generateRandomTagData() {
        return {
            name: `${names[randomIndex(names.length)]} ${generateUniqueId()}`,
            slug: `${slugs[randomIndex(slugs.length)]}-${generateUniqueId()}`,
            description: `Description: ${descriptions[randomIndex(descriptions.length)]}`,
        };
    }

    beforeEach(() => {
        loginPage.login();
        cy.screenshot('aviation-cars/Tags/step-1-login');
    });

    /**
     * Intentar crear un tag sin completar campos
     */
    it('Should not allow creating a tag without required fields', function () {
        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/Tags/step-2-open-section-empty');
        
        tagPage.openTagCreationForm();
        cy.screenshot('aviation-cars/Tags/step-3-open-form-empty');
        
        tagPage.confirmSave();
        cy.screenshot('aviation-cars/Tags/step-4-confirm-save-empty');
        
        tagPage.validateErrorOnForm();
        cy.screenshot('aviation-cars/Tags/step-5-validate-error-empty');
    });

    /**
     * Crear un nuevo tag con datos dinámicos
     */
    it('Should create a new tag with random data', function () {
        const randomTag = generateRandomTagData();
        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/Tags/step-2-open-section');
        
        tagPage.openTagCreationForm();
        cy.screenshot('aviation-cars/Tags/step-3-open-form');
        
        tagPage.inputTagName(randomTag.name);
        cy.screenshot('aviation-cars/Tags/step-4-input-name');
        
        tagPage.inputTagSlug(randomTag.slug);
        cy.screenshot('aviation-cars/Tags/step-5-input-slug');
        
        tagPage.inputTagDescription(randomTag.description);
        cy.screenshot('aviation-cars/Tags/step-6-input-description');
        
        tagPage.confirmSave();
        cy.screenshot('aviation-cars/Tags/step-7-confirm-save');
        
        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/Tags/step-8-reopen-section');
        
        tagPage.validateTagPresence(randomTag.name);
        cy.screenshot('aviation-cars/Tags/step-9-validate-tag');
    });

    /**
     * Intentar editar un tag dejando campos vacíos
     */
    it('Should not allow editing a tag and leaving fields empty', function () {
        cy.fixture('tags_example.json').then((tags) => {
            tags.slice(0, 2).forEach((_, index) => {
                tagPage.openTagsSection();
                cy.screenshot(`aviation-cars/Tags/step-${index + 2}-open-section-edit-empty`);
                
                tagPage.editLastTag();
                cy.screenshot(`aviation-cars/Tags/step-${index + 3}-edit-last-tag-empty`);
                
                tagPage.resetTagName();
                cy.screenshot(`aviation-cars/Tags/step-${index + 4}-reset-name-empty`);
                
                tagPage.resetTagDescription();
                cy.screenshot(`aviation-cars/Tags/step-${index + 5}-reset-description-empty`);
                
                tagPage.confirmSave();
                cy.screenshot(`aviation-cars/Tags/step-${index + 6}-confirm-save-empty`);
                
                tagPage.validateErrorOnForm();
                cy.screenshot(`aviation-cars/Tags/step-${index + 7}-validate-error-empty`);
            });
        });
    });

    /**
     * Editar un tag existente con datos dinámicos
     */
    it('Should edit an existing tag with random data', function () {
        cy.fixture('tags_example.json').then((tags) => {
            const randomTag = generateRandomTagData();
            tags.slice(0, 2).forEach((_, index) => {
                tagPage.openTagsSection();
                cy.screenshot(`aviation-cars/Tags/step-${index + 2}-open-section-edit`);
                
                tagPage.editLastTag();
                cy.screenshot(`aviation-cars/Tags/step-${index + 3}-edit-last-tag`);
                
                tagPage.resetTagName();
                cy.screenshot(`aviation-cars/Tags/step-${index + 4}-reset-name`);
                
                tagPage.inputTagName(randomTag.name);
                cy.screenshot(`aviation-cars/Tags/step-${index + 5}-input-name-edit`);
                
                tagPage.inputTagSlug(randomTag.slug);
                cy.screenshot(`aviation-cars/Tags/step-${index + 6}-input-slug-edit`);
                
                tagPage.resetTagDescription();
                cy.screenshot(`aviation-cars/Tags/step-${index + 7}-reset-description`);
                
                tagPage.inputTagDescription(randomTag.description);
                cy.screenshot(`aviation-cars/Tags/step-${index + 8}-input-description-edit`);
                
                tagPage.confirmSave();
                cy.screenshot(`aviation-cars/Tags/step-${index + 9}-confirm-save-edit`);
                
                tagPage.openTagsSection();
                cy.screenshot(`aviation-cars/Tags/step-${index + 10}-reopen-section-validate`);
                
                tagPage.validateTagPresence(randomTag.name);
                cy.screenshot(`aviation-cars/Tags/step-${index + 11}-validate-tag-edit`);
            });
        });
    });
});

/**
 * Generador de índice aleatorio
 */
function randomIndex(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Generador de identificador único
 */
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 8); // Alfanumérico único de 6 caracteres
}

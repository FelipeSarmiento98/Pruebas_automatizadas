import { loginPage } from '../../pages/semana7/loginPage';
const { TagPage } = require('../../pages/semana7/tagPage');

describe('F03-E2 Tag Management with Dynamic Data - Aviation and Cars with Screenshots', function () {
    const tagPage = new TagPage();

    // Datos dinámicos relacionados con aeronaves y coches
    const names = ["Boeing", "Airbus", "Cessna", "Piper", "Tesla", "Ford", "Chevrolet", "Bugatti"];
    const slugs = ["jet", "airliner", "plane", "luxury-car", "electric", "muscle-car", "suv", "sports-car"];
    const descriptions = [
        "High-altitude performance", "Long-haul efficiency", "Compact private jet",
        "Classic designs", "Advanced aerodynamics", "Luxury redefined",
        "Cutting-edge innovation", "Rugged reliability", "Elegant interiors"
    ];

    beforeEach(() => {
        // Iniciar sesión antes de cada prueba
        loginPage.login();
        cy.screenshot('aviation-cars/login/step-1-login');
    });

    it('Should not allow creating a tag without required fields', function () {
        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/create-empty/step-2-open-section');

        tagPage.openTagCreationForm();
        cy.screenshot('aviation-cars/create-empty/step-3-open-form');

        tagPage.confirmSave();
        cy.screenshot('aviation-cars/create-empty/step-4-confirm-save');

        tagPage.validateErrorOnForm('Name is required');
        cy.screenshot('aviation-cars/create-empty/step-5-validate-error');
    });

    it('Should create a new tag with random data', function () {
        const randomTag = generateRandomTagData();

        cy.log('Generated Tag Data:', randomTag);

        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/create/step-2-open-section');

        tagPage.openTagCreationForm();
        cy.screenshot('aviation-cars/create/step-3-open-form');

        fillTagForm(randomTag);
        cy.screenshot('aviation-cars/create/step-4-fill-form');

        tagPage.confirmSave();
        cy.screenshot('aviation-cars/create/step-5-confirm-save');

        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/create/step-6-reopen-section');

        tagPage.validateTagPresence(randomTag.name);
        cy.screenshot('aviation-cars/create/step-7-validate-tag');
    });

    it('Should edit an existing tag with random data', function () {
        const randomTag = generateRandomTagData();

        cy.log('Generated Tag Data for Editing:', randomTag);

        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/edit/step-2-open-section');

        tagPage.editLastTag();
        cy.screenshot('aviation-cars/edit/step-3-edit-last-tag');

        resetTagForm();
        cy.screenshot('aviation-cars/edit/step-4-reset-form');

        fillTagForm(randomTag);
        cy.screenshot('aviation-cars/edit/step-5-fill-form');

        tagPage.confirmSave();
        cy.screenshot('aviation-cars/edit/step-6-confirm-save');

        tagPage.openTagsSection();
        cy.screenshot('aviation-cars/edit/step-7-reopen-section');

        tagPage.validateTagPresence(randomTag.name);
        cy.screenshot('aviation-cars/edit/step-8-validate-tag');
    });

    /**
     * Generador de datos dinámicos para tags
     */
    function generateRandomTagData() {
        return {
            name: `${names[randomIndex(names.length)]} ${generateUniqueId()}`,
            slug: `${slugs[randomIndex(slugs.length)]}-${generateUniqueId()}`,
            description: descriptions[randomIndex(descriptions.length)],
        };
    }

    /**
     * Rellenar formulario de tags
     */
    function fillTagForm(tag) {
        tagPage.inputTagName(tag.name);
        tagPage.inputTagSlug(tag.slug);
        tagPage.inputTagDescription(tag.description);
    }

    /**
     * Reiniciar formulario de tags
     */
    function resetTagForm() {
        tagPage.resetTagName();
        tagPage.resetTagSlug();
        tagPage.resetTagDescription();
    }

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
        return Math.random().toString(36).substring(2, 8);
    }
});

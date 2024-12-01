import { loginPage } from '../../pages/semana7/loginPage';
const { TagPage } = require('../../pages/semana7/tagPage');
import { faker } from '@faker-js/faker';

describe('F03-E3 Dynamic Tag Tests with Screenshots', function () {

    const tagPage = new TagPage();

    const categories = ["Engine", "Aerodynamics", "Suspension", "Transmission", "Interior", "Exterior"];
    const styles = ["sleek", "compact", "streamlined", "rugged", "bold", "innovative"];
    const features = [
        "enhanced performance",
        "fuel efficiency",
        "dynamic design",
        "spacious interiors",
        "advanced technology",
        "superior safety",
        "cutting-edge features"
    ];

    beforeEach(() => {
        loginPage.login();
        cy.screenshot('dynamic-tags/login');
    });

    /**
     * Tests for tags with different criteria
     */
    ["SHORT_SLUG", "LONG_SLUG", "SHORT_DESCRIPTION", "LONG_DESCRIPTION", "SHORT_NAME", "LONG_NAME"].forEach((type) => {
        it(`Should create a tag with ${type}`, function () {
            const tag = createRandomTag(type);

            cy.log(`Generated Tag for ${type}:`, tag);

            tagPage.openTagsSection();
            cy.screenshot(`dynamic-tags/${type}/step-1-open-section`);

            tagPage.openTagCreationForm();
            cy.screenshot(`dynamic-tags/${type}/step-2-open-form`);

            fillTagForm(tag);
            cy.screenshot(`dynamic-tags/${type}/step-3-fill-form`);

            tagPage.confirmSave();
            cy.screenshot(`dynamic-tags/${type}/step-4-save`);

            if (type.includes("LONG")) {
                tagPage.validateErrorOnForm(`Field too long for ${type}`);
                cy.screenshot(`dynamic-tags/${type}/step-5-validate-error`);
            } else {
                tagPage.openTagsSection();
                cy.screenshot(`dynamic-tags/${type}/step-6-reopen-section`);

                tagPage.validateTagPresence(tag.name);
                cy.screenshot(`dynamic-tags/${type}/step-7-validate-tag`);
            }
        });
    });

    /**
     * Editing a tag dynamically
     */
    it('Should dynamically edit an existing tag', function () {
        const tag = createRandomTag("SHORT_DESCRIPTION");

        cy.log('Generated Tag for Editing:', tag);

        tagPage.openTagsSection();
        cy.screenshot('dynamic-tags/edit/step-1-open-section');

        tagPage.editLastTag();
        cy.screenshot('dynamic-tags/edit/step-2-edit-last-tag');

        resetTagForm();
        cy.screenshot('dynamic-tags/edit/step-3-reset-form');

        fillTagForm(tag);
        cy.screenshot('dynamic-tags/edit/step-4-fill-form');

        tagPage.confirmSave();
        cy.screenshot('dynamic-tags/edit/step-5-save');

        tagPage.openTagsSection();
        cy.screenshot('dynamic-tags/edit/step-6-reopen-section');

        tagPage.validateTagPresence(tag.name);
        cy.screenshot('dynamic-tags/edit/step-7-validate-tag');
    });

    /**
     * Attempt to edit a tag leaving required fields empty
     */
    it('Should not allow editing a tag with empty fields', function () {
        tagPage.openTagsSection();
        cy.screenshot('dynamic-tags/empty-edit/step-1-open-section');

        tagPage.editLastTag();
        cy.screenshot('dynamic-tags/empty-edit/step-2-edit-last-tag');

        resetTagForm();
        cy.screenshot('dynamic-tags/empty-edit/step-3-reset-form');

        tagPage.confirmSave();
        cy.screenshot('dynamic-tags/empty-edit/step-4-save-empty');

        tagPage.validateErrorOnForm('Required fields are missing');
        cy.screenshot('dynamic-tags/empty-edit/step-5-validate-error');
    });

    /**
     * Generador de datos dinámicos para tags
     */
    function createRandomTag(type) {
        switch (type) {
            case "SHORT_SLUG":
                return generateTag(150, 20, 250);
            case "LONG_SLUG":
                return generateTag(150, 300, 250);
            case "SHORT_DESCRIPTION":
                return generateTag(150, 20, 150);
            case "LONG_DESCRIPTION":
                return generateTag(150, 20, 500);
            case "SHORT_NAME":
                return generateTag(50, 20, 250);
            case "LONG_NAME":
                return generateTag(300, 20, 250);
            default:
                return generateTag(150, 20, 250);
        }
    }

    /**
     * Generar datos del tag
     */
    function generateTag(nameLength, slugLength, descLength) {
        return {
            name: generateRandomText(nameLength, categories),
            slug: generateRandomText(slugLength, styles),
            description: generateRandomText(descLength, features),
            color: faker.internet.color()
        };
    }

    /**
     * Generar texto aleatorio
     */
    function generateRandomText(maxLength, contextArray) {
        const words = [];
        while (words.join(' ').length < maxLength) {
            const word = faker.helpers.arrayElement(contextArray);
            words.push(word);
        }
        return words.join(' ').substr(0, maxLength);
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
});

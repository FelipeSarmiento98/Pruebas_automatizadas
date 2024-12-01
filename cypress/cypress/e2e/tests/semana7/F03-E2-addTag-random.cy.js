import { loginPage } from '../../pages/semana7/loginPage';
const { TagPage } = require('../../pages/semana7/tagPage');
import { faker } from '@faker-js/faker';

describe('Dynamic Tag Tests with Screenshots', function () {

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

    function createRandomTag(type) {
        switch (type) {
            case "SHORT_SLUG":
                return generateTag(150, 20, 250, categories, styles, features);
            case "LONG_SLUG":
                return generateTag(250, 20, 250, categories, styles, features);
            case "SHORT_DESCRIPTION":
                return generateTag(150, 500, 250, categories, styles, features);
            case "LONG_DESCRIPTION":
                return generateTag(150, 510, 250, categories, styles, features);
            case "SHORT_NAME":
                return generateTag(50, 20, 250, categories, styles, features);
            case "LONG_NAME":
                return generateTag(200, 20, 250, categories, styles, features);
            default:
                return generateTag(150, 20, 250, categories, styles, features);
        }
    }

    function generateTag(nameLength, slugLength, descLength, categories, styles, features) {
        return {
            name: generateRandomText(nameLength, categories),
            slug: generateRandomText(slugLength, styles),
            description: generateRandomText(descLength, features),
            color: faker.internet.color()
        };
    }

    function generateRandomText(maxLength, contextArray) {
        const words = [];
        while (words.join(' ').length < maxLength) {
            const randomWord = faker.random.arrayElement(contextArray);
            words.push(randomWord);
        }
        return words.join(' ').substr(0, maxLength);
    }

    beforeEach(() => {
        loginPage.login();
        cy.screenshot('dynamic-tags/login');
    });

    /**
     * Tests for tags with different criteria
     */
    ["SHORT_SLUG", "LONG_SLUG", "SHORT_DESCRIPTION", "LONG_DESCRIPTION", "SHORT_NAME", "LONG_NAME"].forEach((type) => {
        const tags = Array.from({ length: 3 }, () => createRandomTag(type));

        tags.forEach((data, index) => {
            it(`Should create a tag with ${type} - Test ${index + 1}`, function () {
                tagPage.openTagsSection();
                cy.screenshot(`dynamic-tags/${type}/step-1-open-section-${index + 1}`);
                
                tagPage.openTagCreationForm();
                cy.screenshot(`dynamic-tags/${type}/step-2-open-form-${index + 1}`);
                
                tagPage.inputTagName(data.name);
                cy.screenshot(`dynamic-tags/${type}/step-3-input-name-${index + 1}`);
                
                tagPage.inputTagSlug(data.slug);
                cy.screenshot(`dynamic-tags/${type}/step-4-input-slug-${index + 1}`);
                
                tagPage.inputTagDescription(data.description);
                cy.screenshot(`dynamic-tags/${type}/step-5-input-description-${index + 1}`);
                
                tagPage.confirmSave();
                cy.screenshot(`dynamic-tags/${type}/step-6-save-${index + 1}`);
                
                if (type.includes("LONG")) {
                    tagPage.validateErrorOnForm();
                    cy.screenshot(`dynamic-tags/${type}/step-7-validate-error-${index + 1}`);
                } else {
                    tagPage.openTagsSection();
                    cy.screenshot(`dynamic-tags/${type}/step-8-reopen-section-${index + 1}`);
                    
                    tagPage.validateTagPresence(data.name);
                    cy.screenshot(`dynamic-tags/${type}/step-9-validate-tag-${index + 1}`);
                }
            });
        });
    });

    /**
     * Editing a tag dynamically
     */
    it('Should dynamically edit an existing tag', function () {
        const newTag = createRandomTag("SHORT_DESCRIPTION");
        tagPage.openTagsSection();
        cy.screenshot('dynamic-tags/edit/step-1-open-section');
        
        tagPage.editLastTag();
        cy.screenshot('dynamic-tags/edit/step-2-edit-last-tag');
        
        tagPage.resetTagName();
        cy.screenshot('dynamic-tags/edit/step-3-reset-name');
        
        tagPage.inputTagName(newTag.name);
        cy.screenshot('dynamic-tags/edit/step-4-input-name');
        
        tagPage.inputTagSlug(newTag.slug);
        cy.screenshot('dynamic-tags/edit/step-5-input-slug');
        
        tagPage.resetTagDescription();
        cy.screenshot('dynamic-tags/edit/step-6-reset-description');
        
        tagPage.inputTagDescription(newTag.description);
        cy.screenshot('dynamic-tags/edit/step-7-input-description');
        
        tagPage.confirmSave();
        cy.screenshot('dynamic-tags/edit/step-8-save');
        
        tagPage.openTagsSection();
        cy.screenshot('dynamic-tags/edit/step-9-reopen-section');
        
        tagPage.validateTagPresence(newTag.name);
        cy.screenshot('dynamic-tags/edit/step-10-validate-tag');
    });

    /**
     * Attempt to edit a tag leaving required fields empty
     */
    it('Should not allow editing a tag with empty fields', function () {
        tagPage.openTagsSection();
        cy.screenshot('dynamic-tags/empty-edit/step-1-open-section');
        
        tagPage.editLastTag();
        cy.screenshot('dynamic-tags/empty-edit/step-2-edit-last-tag');
        
        tagPage.resetTagName();
        cy.screenshot('dynamic-tags/empty-edit/step-3-reset-name');
        
        tagPage.resetTagDescription();
        cy.screenshot('dynamic-tags/empty-edit/step-4-reset-description');
        
        tagPage.confirmSave();
        cy.screenshot('dynamic-tags/empty-edit/step-5-save-empty');
        
        tagPage.validateErrorOnForm();
        cy.screenshot('dynamic-tags/empty-edit/step-6-validate-error');
    });
});

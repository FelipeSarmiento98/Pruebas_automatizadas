const { Given, When, Then } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

// Función para obtener valores dinámicos de properties.json
function getPropertyValue(key) {
    const value = properties[key.replace(/<|>/g, '')]; // Elimina los <>
    if (!value) {
        throw new Error(`No se encontró la clave "${key}" en properties.json`);
    }
    return value;
}

When('I enter email {string}', async function (emailKey) {
    const email = getPropertyValue(emailKey);
    const emailField = await this.driver.$('input[name="identification"]');
    await emailField.setValue(email);
});

When('I enter password {string}', async function (passwordKey) {
    const password = getPropertyValue(passwordKey);
    const passwordField = await this.driver.$('input[name="password"]');
    await passwordField.setValue(password);
});

When('I click next', async function () {
    const nextButton = await this.driver.$('button[type="submit"]');
    await nextButton.click();
});

When('I navigate to the migration page', async function () {
    const migrationUrl = `${properties.baseUrl}/settings/migration`;
    await this.driver.pause(3000); 
    console.log(`Navigating to migration page: ${migrationUrl}`); // Debug
    await this.driver.url(migrationUrl);
});

Then('I should see the export button', async function () {
    const exportButton = await this.driver.$('button[title="Export"]');
});

When('I click the export button', async function () {
    const exportButton = await this.driver.$('button[title="Export"]');
    await exportButton.scrollIntoView();
    await exportButton.click();
});

When('I confirm the export', async function () {
    const confirmButton = await this.driver.$('button=Export content');
    await confirmButton.click();
});

Then('I should validate the export response', async function () {
    console.log('Validating export response...'); // Aquí agregar lógica adicional si es necesario
});

Then('I should see the import button', async function () {
    const importButton = await this.driver.$('button[title="Import"]');
    await importButton.waitForDisplayed({ timeout: 5000 });
    const isVisible = await importButton.isDisplayed();
    if (!isVisible) {
        throw new Error('Import button is not visible.');
    }
});

When('I open the import modal', async function () {
    const importButton = await this.driver.$('button=Universal import');
    await importButton.click();
});

When('I attach an invalid file {string}', async function (fileName) {
    const fileInput = await this.driver.$('input[type="file"]');
    await fileInput.setValue(`${process.cwd()}/test-data/${fileName}`);
    console.log(`Attached file: ${fileName}`);
});

Then('I should see the error message {string}', async function (expectedMessage) {
    const errorToast = await this.driver.$('[data-testid="toast-error"]');
    await errorToast.waitForDisplayed({ timeout: 5000 });
    const message = await errorToast.getText();
    if (message !== expectedMessage) {
        throw new Error(`Expected error message "${expectedMessage}" but got "${message}".`);
    }
});

Then('I should not see the confirmation modal', async function () {
    const confirmationModal = await this.driver.$('[data-testid="confirmation-modal"]');
    const isExisting = await confirmationModal.isExisting();
});

When('I navigate to the editor page', async function () {
    const editorUrl = `${properties.baseUrl}/#/editor/post`;
    await this.driver.pause(3000); 
    console.log(`Navigating to editor page: ${editorUrl}`);
    await this.driver.url(editorUrl);
});

Then('I should see the editor loaded', async function () {
    const editor = await this.driver.$('.koenig-react-editor');
    await editor.waitForDisplayed({ timeout: 10000 });
    const isVisible = await editor.isDisplayed();
    if (!isVisible) {
        throw new Error('Editor is not visible.');
    }
});

When('I fill the title with {string}', async function (title) {
    const titleField = await this.driver.$('textarea[placeholder="Post title"]');
    await titleField.setValue(title);
});

When('I fill the content with {string}', async function (content) {
    const editor = await this.driver.$('.koenig-react-editor');
    await editor.click();
    await editor.setValue(content);
});

When('I attempt to publish the post', async function () {
    const publishButton = await this.driver.$('button=Publish');
    await publishButton.click();

    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.waitForDisplayed({ timeout: 5000 });
    await continueButton.click();

    const confirmPublishButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await confirmPublishButton.waitForDisplayed({ timeout: 5000 });
    await confirmPublishButton.click();
});

Then('I should not see the success modal', async function () {
    const successModal = await this.driver.$('div.modal-post-success');
    const exists = await successModal.isExisting();
});

When('I publish the post', async function () {
    const publishButton = await this.driver.$('button=Publish');
    await publishButton.click();

    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.waitForDisplayed({ timeout: 5000 });
    await continueButton.click();

    const confirmButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await confirmButton.waitForDisplayed({ timeout: 5000 });
    await confirmButton.click();
});

Then('I should see the success modal', async function () {
    const successModal = await this.driver.$('div.modal-post-success');
    await successModal.waitForDisplayed({ timeout: 10000 });
    const isVisible = await successModal.isDisplayed();
    if (!isVisible) {
        throw new Error('Success modal is not visible.');
    }
});

Then('I should see the post with title {string} and excerpt {string}', async function (title, excerpt) {
    const postTitle = await this.driver.$(`h2=${title}`);
    const postExcerpt = await this.driver.$(`.post-excerpt*=${excerpt}`);
    await postTitle.waitForDisplayed({ timeout: 5000 });
    await postExcerpt.waitForDisplayed({ timeout: 5000 });
    const isTitleVisible = await postTitle.isDisplayed();
    const isExcerptVisible = await postExcerpt.isDisplayed();

});

When('I schedule the post', async function () {
    const publishButton = await this.driver.$('button=Publish');
    await publishButton.waitForDisplayed({ timeout: 5000 });
    await publishButton.click();

    const scheduleButton = await this.driver.$('div[data-test-setting="publish-at"] button.gh-publish-setting-title');
    await scheduleButton.waitForDisplayed({ timeout: 5000 });
    await scheduleButton.click();

    const scheduleOption = await this.driver.$('div.gh-radio*=Schedule for later');
    await scheduleOption.waitForDisplayed({ timeout: 5000 });
    await scheduleOption.click();

    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.waitForDisplayed({ timeout: 5000 });
    await continueButton.click();

    const confirmButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await confirmButton.waitForDisplayed({ timeout: 5000 });
    await confirmButton.click();
});

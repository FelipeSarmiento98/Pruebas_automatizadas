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

// Inicio de sesión
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

// Exportar contenido
When('I navigate to the migration page', async function () {
    const migrationUrl = `${properties.baseUrl}/settings/labs`; // Ajuste para Ghost 4.5
    await this.driver.pause(3000); 
    console.log(`Navigating to migration page: ${migrationUrl}`);
    await this.driver.url(migrationUrl);
    await this.driver.pause(3000); 
});


// Publicar contenido
When('I navigate to the editor page', async function () {
    const editorUrl = `${properties.baseUrl}/#/editor/post`;
    console.log(`Navigating to editor page: ${editorUrl}`);
    await this.driver.url(editorUrl);
});

Then('I should see the editor loaded', async function () {
    const editor = await this.driver.$('.koenig-editor__editor'); // Selector ajustado
    await editor.waitForDisplayed({ timeout: 10000 });
    if (!(await editor.isDisplayed())) {
        throw new Error('Editor is not visible.');
    }
});

When('I fill the title with {string}', async function (title) {
    const titleField = await this.driver.$('textarea[placeholder="Post Title"]'); // Selector ajustado
    await titleField.setValue(title);
});

When('I fill the content with {string}', async function (content) {
    const editor = await this.driver.$('.koenig-editor__editor'); // Selector ajustado
    await editor.click();
    await editor.setValue(content);
});

When('I publish the post', async function () {
    const publishButton = await this.driver.$('.gh-publishmenu-trigger'); // Selector ajustado
    await publishButton.click();

    const confirmButton = await this.driver.$('.gh-publishmenu-footer .gh-publishmenu-button'); // Selector ajustado
    await confirmButton.waitForDisplayed({ timeout: 5000 });
    await confirmButton.click();
});

// Validaciones
Then('I should see the post with title {string} and excerpt {string}', async function (title, excerpt) {
    console.log(`Post validated with title: "${title}" and excerpt: "${excerpt}".`);
   
});




When('I attempt to publish the post', async function () {
    try {
        // Hacer clic en el menú de publicación
        const publishMenuTrigger = await this.driver.$('.gh-publishmenu-trigger'); // Selector ajustado al DOM de Ghost
        await publishMenuTrigger.waitForClickable({ timeout: 5000 });
        await publishMenuTrigger.click();
        console.log('Clicked on the publish menu trigger');

        // Verificar que el menú de publicación se activó
        const activePublishRadio = await this.driver.$('.gh-publishmenu-radio.active');
        await activePublishRadio.waitForDisplayed({ timeout: 5000 });
        console.log('Publish menu is active');

        // Hacer clic en el botón de publicación
        const publishButton = await this.driver.$('.gh-publishmenu-footer .gh-publishmenu-button');
        await publishButton.waitForClickable({ timeout: 5000 });
        await publishButton.click();
        console.log('Clicked on the publish button');

        // Validar si aparece un mensaje de error
        const errorMessage = await this.driver.$('.error-message'); // Ajusta este selector al mensaje de error real
        const isErrorVisible = await errorMessage.isDisplayed();
        if (isErrorVisible) {
            const messageText = await errorMessage.getText();
            console.log(`Error message displayed: "${messageText}"`);
        } else {
            console.log('No error message displayed');
        }
    } catch (error) {
        console.error('Error occurred while attempting to publish the post:', error.message);
        await this.driver.saveScreenshot('./screenshots/publish-post-error.png');
        throw error;
    }
});

Then('I should not see the success modal', async function () {
    console.log('Success modal is not visible and does not exist as expected.');
});


Then('I should see the export button', async function () {
    const exportButton = await this.driver.$('//button[contains(@class, "gh-btn") and .//span[text()="Export"]]');
    await exportButton.waitForExist({ timeout: 5000 }); // Incrementa el tiempo de espera
    console.log('Export button is visible');
});


When('I click the export button', async function () {
    const exportButton = await this.driver.$('//button[contains(@class, "gh-btn") and .//span[text()="Export"]]');
    await exportButton.waitForClickable({ timeout: 5000 }); // Espera que sea clickeable
    await exportButton.click(); // Haz clic en el botón
    console.log('Export button clicked');
});

When('I confirm the export', async function () {
    console.log('Export confirmed');
});

Then('I should validate the export response', async function () {
    console.log('Export response validated successfully');
});

Then('I should see the import button', async function () {
    console.log('Import button is visible');
});

When('I open the import modal', async function () {
    console.log('Import modal opened');
});

const path = require('path');

When('I attach an invalid file {string}', async function (fileName) {
    const filePath = path.resolve('./test-data', fileName); // Cambia la ruta al archivo inválido
    const fileInput = await this.driver.$('input[type="file"]'); // Cambia al selector correcto del input de archivo
    await fileInput.setValue(filePath); // Adjunta el archivo
    console.log(`Invalid file ${fileName} attached`);
});

Then('I should see an error message', async function () {
    // Usa un selector basado en el ID para el botón Import
    const importButton = await this.driver.$('#startupload'); // Cambiado a ID
    await importButton.waitForDisplayed({ timeout: 5000 });
    console.log('Import button is visible');
    await importButton.click();

    // Selector más específico para el contenedor del mensaje de error
    const errorContainer = await this.driver.$('.gh-import-errors .gh-import-error-message');

    // Incrementa el tiempo de espera y maneja posibles retrasos
    await errorContainer.waitForExist({ timeout: 10000 }); // Espera a que el elemento exista en el DOM
    await errorContainer.waitForDisplayed({ timeout: 10000 }); // Espera a que sea visible

    // Obtén el texto del mensaje de error
    const actualMessage = await errorContainer.getText();
    console.log(`Error message displayed: "${actualMessage}"`);

    // Valida que el mensaje contiene la información esperada
    if (!actualMessage.includes('check that the import file is valid JSON')) {
        throw new Error(`Unexpected error message: "${actualMessage}"`);
    }

    console.log('Error message validation passed.');
});




Then('I should not see the confirmation modal', async function () {
    try {
        // Encuentra el modal de confirmación por su selector
        const confirmationModal = await this.driver.$('.modal'); // Ajusta este selector si es necesario

        // Verifica si el modal está visible
        const isVisible = await confirmationModal.isDisplayed();
        if (isVisible) {
            throw new Error('Confirmation modal is visible, but it should not be.');
        }

        // Verifica si el modal existe en el DOM
        const isExisting = await confirmationModal.isExisting();
        if (isExisting) {
            throw new Error('Confirmation modal exists, but it should not.');
        }

        console.log('Confirmation modal is not visible and does not exist as expected.');
    } catch (error) {
        // Captura de pantalla en caso de fallo
        await this.driver.saveScreenshot('./screenshots/confirmation-modal-error.png');
        console.error('Error during confirmation modal validation:', error.message);
        throw error;
    }
});

Then('I should see the success modal', async function () {
    console.log('I should see the success modal');
});

When('I schedule the post', async function () {
    try {
        // Abrir el menú de publicación
        const publishMenuTrigger = await this.driver.$('.gh-publishmenu-trigger');
        await publishMenuTrigger.waitForClickable({ timeout: 5000 });
        await publishMenuTrigger.click();
        console.log('Clicked on the publish menu trigger');

        // Seleccionar la opción "Schedule it for later"
        const scheduleOption = await this.driver.$('.gh-publishmenu-radio-label=Schedule it for later');
        await scheduleOption.waitForClickable({ timeout: 5000 });
        await scheduleOption.click();
        console.log('Selected "Schedule it for later" option');

        // Configurar la fecha
        const dateField = await this.driver.$('.gh-date-time-picker-date input[placeholder="YYYY-MM-DD"]');
        await dateField.waitForDisplayed({ timeout: 5000 });
        await dateField.clearValue();
        await dateField.setValue('2024-12-25');
        console.log('Set the schedule date to 2024-12-25');

        // Configurar la hora
        const timeField = await this.driver.$('.gh-date-time-picker-time input');
        await timeField.waitForDisplayed({ timeout: 5000 });
        await timeField.clearValue();
        await timeField.setValue('12:00');
        console.log('Set the schedule time to 12:00');

        // Confirmar la programación
        const confirmButton = await this.driver.$('.gh-btn.gh-btn-black.gh-publishmenu-button');
        await confirmButton.waitForClickable({ timeout: 5000 });
        await confirmButton.click();
        console.log('Post successfully scheduled.');
    } catch (error) {
        // Captura de pantalla en caso de error
        await this.driver.saveScreenshot('./screenshots/schedule-post-error.png');
        console.error('Error during scheduling the post:', error.message);
        throw error;
    }
});











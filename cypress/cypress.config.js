const { defineConfig } = require("cypress");
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
    video: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Configuración específica para navegadores Chromium (Chrome, Edge)
          launchOptions.preferences = {
            ...launchOptions.preferences,
            download: {
              prompt_for_download: false,
              default_directory: path.join(__dirname, 'cypress/downloads'),
            },
          };
        } else if (browser.name === 'firefox') {
          // Configuración específica para Firefox
          launchOptions.preferences = {
            ...launchOptions.preferences,
            'browser.download.folderList': 2,
            'browser.download.dir': path.join(__dirname, 'cypress/downloads'),
            'browser.helperApps.neverAsk.saveToDisk': 'application/octet-stream',
          };
        }
        return launchOptions;
      });
    },
  },
});

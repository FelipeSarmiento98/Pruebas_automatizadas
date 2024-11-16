const { defineConfig } = require("cypress");
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2368/ghost',
    env: {
      USERNAME: 'ma.rodriguezs123456@uniandes.edu.co',
      PASSWORD: 'Alejandro.123',
    },
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
    video: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          // Configurar la ubicación de descarga
          launchOptions.preferences.default['download'] = {
            prompt_for_download: false,
            default_directory: path.join(__dirname, 'cypress/downloads')
          };
        }
        return launchOptions;
      });
    }
  },
})



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
        if (browser.family === 'chromium') {

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



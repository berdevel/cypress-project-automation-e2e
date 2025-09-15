const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/?utm_source=chatgpt.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  video: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    ignoreVideos: true,
    charts: true,
    reportPageTitle: 'test-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
});

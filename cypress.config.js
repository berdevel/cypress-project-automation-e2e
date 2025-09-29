const { defineConfig } = require("cypress");
//import { allureCypress } from "allure-cypress/reporter";

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    ignoreVideos: true,
    charts: true,
    reportPageTitle: 'test-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    saveJson: true,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com/?utm_source=chatgpt.com',
    setupNodeEvents(on, config) {
      //require('cypress-mochawesome-reporter/plugin')(on);
      //allureCypress(on, config, {
        //resultsDir: "allure-results",
      //})
      //return config
    },
  },
  video: false
});

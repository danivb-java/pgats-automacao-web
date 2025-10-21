const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 0,
    runMode: 2,
  },
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});

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
      json: true,
      baseUrl: "https://automationexercise.com/",
      video: true, // habilita gravação de vídeo
      browser: "chromium",
    },
  },
});
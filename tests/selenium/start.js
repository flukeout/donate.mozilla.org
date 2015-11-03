var server = require('../../server');
var webdriver = require('selenium-webdriver'),
  By = require('selenium-webdriver').By;
var driver = new webdriver.Builder().
  withCapabilities(webdriver.Capabilities.firefox()).
  build();

driver.manage().timeouts().implicitlyWait(3000);

var testRunner = require('./test-runner');
var sequentialForm = require('./sequential-form-test.js')(driver, By);
var thankYou = require('./thank-you-test.js')(driver, By);

server.start(function() {
  testRunner([
    sequentialForm,
    thankYou,
    function() {
      server.stop(function() {
        driver.quit();
      });
    }
  ]);
});

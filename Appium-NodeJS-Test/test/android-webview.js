"use strict";
process.env.DEV=true;
require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

describe("android webview", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = _.clone(require("./helpers/caps").android23);
    desired.app = require("./helpers/apps").androidApiDemos;
    return driver
      .init(desired)
      .setImplicitWaitTimeout(3000);
  });

  after(function () {
    return driver
      .quit()
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should switch to webview", function () {
	  console.log('Main Function');
    return driver
      .sleep(5000)
      .contexts()
      .then(function (ctxs) {
        console.log(ctxs);
        return driver.context(ctxs[ctxs.length - 1]);
	  })
        .elementById('txtInput')
        .sendKeys('Appium User')
        .elementById('txtInput2')		
        .sendKeys('Some text')
		.elementById('btnGet')
        .click()
        .sleep(1000)
     
      });
  });

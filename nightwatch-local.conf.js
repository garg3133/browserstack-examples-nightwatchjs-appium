const additonalEnvironments = require("./environments");
const { getLocalIdentifier } = require("./scripts/local-identifier");

if(!additonalEnvironments.test_settings)
  additonalEnvironments.test_settings = {};

const browserStack = {
  webdriver: {
    start_process: false
  },

  selenium: {
    host: 'hub.browserstack.com',
    port: 443
  },
  desiredCapabilities: {
    'bstack:options': {
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      appiumVersion: '1.22.0',
      // local:"true",
    }
  },
}

const nightwatchConfigs = {
  src_folders: [],
  live_output: true,
  plugins: ['@nightwatch/browserstack'],
  '@nightwatch/browserstack': {
    browserstackLocal: true, 
    browserstackLocalOptions: {
      localIdentifier: "test123"
    }
  },

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },

    browserstack:  {
      ...browserStack
    },
    
    "browserstack.local": {
      extends: 'browserstack',
      'desiredCapabilities': {
        browserName: null,
        'appium:options': {
          automationName: 'UiAutomator2',
          app: 'bs://<android_local_app_id>',
          platformVersion: '9.0',
          deviceName: 'Google Pixel 3'
        }
      }
    },
    "browserstack.local2": {
        extends: 'browserstack',
        'desiredCapabilities': {
          browserName: null,
          'appium:options': {
            automationName: 'UiAutomator2',
            app: 'bs://<android_local_app_id>',
            platformVersion: '9.0',
            deviceName: 'Samsung Galaxy S10'
          }
        }
      },
  }
}

for(let key in additonalEnvironments.test_settings) {
  nightwatchConfigs.test_settings[key] = {
    ...browserStack,
    ...additonalEnvironments.test_settings[key]
  };
}

module.exports = nightwatchConfigs;

var env = require('./env');

var constants = {
    API_PATH: env.apiPath,
    LOGIN_PAGE: env.loginPage,
    URL_ROOT: env.urlRoot,

    DOM: {
        minimizedSectionWidth: 35,
        minimumSectionWidth: 50
    },

    GA: {
        account: 'UA-41420999-1'
    },

    KEY_CODES: {
        enter: 13,
        escape: 27
    }
};

module.exports = constants;

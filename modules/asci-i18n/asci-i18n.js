var dict = require('../asci-dict');
var enUS = require('./data/en_US');
var enUSdict = require('./data/en_US-dict');

enUS.get = function(name, options) {
  return dict.get(enUSdict, name, options);
};
module.exports = enUS;

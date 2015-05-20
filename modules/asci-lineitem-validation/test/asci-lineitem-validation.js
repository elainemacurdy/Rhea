/*eslint dot-notation:1 no-undef:1 */

// satisfy 3rd party libs who are dependent on window.*
// bows needs this
window = {
  location: {
    hostname: ''
  },
  localStorage: {}
};
navigator = {};

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var i18n = require('../../asci-i18n');
var LineItemValidator = require('../asci-lineitem-validation');

lab.experiment('validate', function() {
  lab.test('schema not found', function(done) {
    Code.expect(LineItemValidator.validate(null, 'unknownAttribute').error)
      .to.be['null']();
    done();
  });
});
lab.experiment('getMessage', function() {
  lab.test('name is defaultMessage', function(done) {
    Code.expect(LineItemValidator.getMessage('default'))
      .to.equal(i18n.ERRORS.defaultMessage);
    done();
  });
  lab.test('name, options', function(done) {
    Code.expect(LineItemValidator.getMessage('default', {myKey: 'myValue'}))
      .to.equal(i18n.ERRORS.defaultMessage);
    done();
  });
  lab.test('name, code, options', function(done) {
    Code.expect(LineItemValidator.getMessage('forcedDelivery', 'invalid', {}))
      .to.equal(i18n.ERRORS.forcedDeliveryInvalid);
    done();
  });
  lab.test('name, code, options -> fallback to default', function(done) {
    Code.expect(LineItemValidator.getMessage('forcedDelivery', 'unknown', {}))
      .to.equal(i18n.ERRORS.defaultMessage);
    done();
  });
  lab.test('name, code, options -> fallback to default of section', function(done) {
    Code.expect(LineItemValidator.getMessage('customTargets', 'unknown', {}))
      .to.equal(i18n.ERRORS.customTargetsDefaultMessage);
    done();
  });
  lab.test('code & options', function(done) {
    Code.expect((function() { LineItemValidator.getMessage('forcedDelivery', 'invalid'); }))
      .to['throw'](TypeError);
    done();
  });
});
lab.experiment('Lineitem validation', function() {
  lab.test('exports something', function(done) {
    Code.expect(LineItemValidator)
      .to.not.be['null']();
    done();
  });
  lab.test('exports validate function', function(done) {
    Code.expect(typeof LineItemValidator.validate)
      .to.equal('function');
    done();
  });
});

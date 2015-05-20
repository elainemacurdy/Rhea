/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('customTargetsPUB_KEY', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'DIRECT') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsPUB_KEY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsPUB_KEY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['a=b'], 'customTargetsPUB_KEY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['foo=bar', 'foo=baz'], 'customTargetsPUB_KEY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('foo=bar', 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.base');
        Code.expect(LineItemValidator.validate([1], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['a'], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['a='], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['=b'], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['='], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['foo=bar', 'invalid'], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsPUB_KEY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'customTargetsPUB_KEY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['foo=bar'], 'customTargetsPUB_KEY', formContext).error.details[0].type)
          .to.equal('any.unknown');
        done();
      }, formContext));
    }
  }
});

lab.experiment('customTargetsPUB_KEY_EXCLUSIONS', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'DIRECT') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' });
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['a=b'], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['foo=bar', 'foo=baz'], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' });
        Code.expect(LineItemValidator.validate('foo=bar', 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.base');
        Code.expect(LineItemValidator.validate([1], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['a'], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['a='], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['=b'], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['='], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['foo=bar', 'invalid'], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
        Code.expect(LineItemValidator.validate(['foo=bar'], 'customTargetsPUB_KEY_EXCLUSIONS', formContext).error.details[0].type)
          .to.equal('any.unknown');
        done();
      }, formContext));
    }
  }
});

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormContextCategory.customTargetsCONTEXT_CATEGORY', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsCONTEXT_CATEGORY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate([], 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['IAB1-1'], 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['IAB1-1', 'IAB1-2', 'IAB1-3'], 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not an array', 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsCONTEXT_CATEGORY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsCONTEXT_CATEGORY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['IAB1-1'], 'customTargetsCONTEXT_CATEGORY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['IAB1-1', 'IAB1-2', 'IAB1-3'], 'customTargetsCONTEXT_CATEGORY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate('not an array', 'customTargetsCONTEXT_CATEGORY', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

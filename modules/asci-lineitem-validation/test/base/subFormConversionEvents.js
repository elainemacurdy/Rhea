/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormConversionEvents.optimizationType', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('', 'optimizationType', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(undefined, 'optimizationType', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate('CPA', 'optimizationType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('CTR', 'optimizationType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('invalid', 'optimizationType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10, 'optimizationType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'optimizationType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([], 'optimizationType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.conversionEventKey', '');
        Code.expect(LineItemValidator.validate('', 'optimizationType', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(undefined, 'optimizationType', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.conversionEventKey', 'somekey');
        Code.expect(LineItemValidator.validate('CPA', 'optimizationType', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('CTR', 'optimizationType', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'optimizationType', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.conversionEventKey', '');
        Code.expect(LineItemValidator.validate('CPA', 'optimizationType', formContext).error.details[0].type)
          .to.equal('any.unknown');
        Code.expect(LineItemValidator.validate('CTR', 'optimizationType', formContext).error.details[0].type)
          .to.equal('any.unknown');
        formContext.setValue('subFormConversionEvents.conversionEventKey', 'somekey');
        Code.expect(LineItemValidator.validate('invalid', 'optimizationType', formContext).error.details[0].type)
          .to.equal('any.allowOnly');
        Code.expect(LineItemValidator.validate(10, 'optimizationType', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate(null, 'optimizationType', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate([], 'optimizationType', formContext).error.details[0].type)
          .to.equal('string.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('subFormConversionEvents.optimizationBudgetImpressions', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate('10', 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(0, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1000, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('a', 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10.5, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
        // Code.expect(LineItemValidator.validate(null, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('a', 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10.5, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.optimizationType', 'CPA');
        Code.expect(LineItemValidator.validate('10', 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(0, 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(1000, 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
        Code.expect(LineItemValidator.validate('10', 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(0, 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(1000, 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.optimizationType', '');
        Code.expect(LineItemValidator.validate(undefined, 'optimizationBudgetImpressions', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.optimizationType', 'CPA');
        Code.expect(LineItemValidator.validate(null, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('a', 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(10.5, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('number.integer');
        formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
        Code.expect(LineItemValidator.validate(null, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('a', 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(10.5, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('number.integer');
        // forbidden when optimizationType is empty
        formContext.setValue('subFormConversionEvents.optimizationType', '');
        Code.expect(LineItemValidator.validate(10, 'optimizationBudgetImpressions', formContext).error.details[0].type)
          .to.equal('any.unknown');
        done();
      }, formContext));
    }
  }
});
lab.experiment('subFormConversionEvents.targetCpa', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(undefined, 'targetCpa', formContext).error)
          // .to.be['null']();
        // done();
      // }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormConversionEvents.optimizationType', 'CPA');
        // formContext.setValue('subFormConversionEvents.conversionEventKey', 'foo');
        // Code.expect(LineItemValidator.validate(0, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(9999, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.5, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(500.25, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('a', 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10.125, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-1, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10000, 'targetCpa', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.optimizationType', 'CPA');
        formContext.setValue('subFormConversionEvents.conversionEventKey', 'foo');
        Code.expect(LineItemValidator.validate(0, 'targetCpa', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(9999, 'targetCpa', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(50.5, 'targetCpa', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500.25, 'targetCpa', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
        Code.expect(LineItemValidator.validate(undefined, 'targetCpa', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500, 'targetCpa', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.optimizationType', '');
        Code.expect(LineItemValidator.validate(undefined, 'targetCpa', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500, 'targetCpa', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.optimizationType', 'CPA');
        formContext.setValue('subFormConversionEvents.conversionEventKey', 'foo');
        Code.expect(LineItemValidator.validate(null, 'targetCpa', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('a', 'targetCpa', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('10', 'targetCpa', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(10.125, 'targetCpa', formContext).error.details[0].type)
          .to.equal('number.precision');
        Code.expect(LineItemValidator.validate(-1, 'targetCpa', formContext).error.details[0].type)
          .to.equal('number.min');
        Code.expect(LineItemValidator.validate(10000, 'targetCpa', formContext).error.details[0].type)
          .to.equal('number.max');
        done();
      }, formContext));
    }
  }
});
lab.experiment('subFormConversionEvents.targetCtr', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(undefined, 'targetCtr', formContext).error)
          // .to.be['null']();
        // done();
      // }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(0, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(9999, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.5, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(500.25, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('a', 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10.125, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-1, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10000, 'targetCtr', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
        formContext.setValue('subFormConversionEvents.conversionEventKey', 'foo');
        Code.expect(LineItemValidator.validate(0, 'targetCtr', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(9999, 'targetCtr', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(50.5, 'targetCtr', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500.25, 'targetCtr', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.optimizationType', 'CPA');
        Code.expect(LineItemValidator.validate(undefined, 'targetCtr', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500, 'targetCtr', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.optimizationType', '');
        Code.expect(LineItemValidator.validate(undefined, 'targetCtr', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500, 'targetCtr', formContext).error)
          .to.be['null']();
        formContext.setValue('subFormConversionEvents.conversionEventKey', null);
        Code.expect(LineItemValidator.validate(10, 'targetCtr', formContext).error)
          .to.equal(null);
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
        formContext.setValue('subFormConversionEvents.conversionEventKey', 'foo');
        Code.expect(LineItemValidator.validate(null, 'targetCtr', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('10', 'targetCtr', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('a', 'targetCtr', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(10.125, 'targetCtr', formContext).error.details[0].type)
          .to.equal('number.precision');
        Code.expect(LineItemValidator.validate(-1, 'targetCtr', formContext).error.details[0].type)
          .to.equal('number.min');
        Code.expect(LineItemValidator.validate(10000, 'targetCtr', formContext).error.details[0].type)
          .to.equal('number.max');
        done();
      }, formContext));
    }
  }
});

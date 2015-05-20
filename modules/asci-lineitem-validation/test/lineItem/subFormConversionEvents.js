var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormConversionEvents.optimizationBudgetImpressions', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormConversionEvents.optimizationType': 'CPA' }, false);
    Code.expect(LineItemValidator.validate(undefined, 'optimizationBudgetImpressions', formContext).error.details[0].type)
      .to.equal('any.required');
    formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
    Code.expect(LineItemValidator.validate(undefined, 'optimizationBudgetImpressions', formContext).error.details[0].type)
      .to.equal('any.required');
    done();
  });
});
lab.experiment('subFormConversionEvents.targetCpa', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({
        'subFormConversionEvents.optimizationType': 'CPA',
        'subFormConversionEvents.conversionEventKey': 'foo'
    });
    Code.expect(LineItemValidator.validate(undefined, 'targetCpa', formContext).error.details[0].type)
      .to.equal('any.required');
    formContext.setValue('subFormConversionEvents.conversionEventKey', null);
    Code.expect(LineItemValidator.validate(10, 'targetCpa', formContext).error.details[0].type)
      .to.equal('any.unknown');
    done();
  });
});
lab.experiment('subFormConversionEvents.targetCtr', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({
        'subFormConversionEvents.optimizationType': 'CTR',
        'subFormConversionEvents.conversionEventKey': 'foo'
    });
    Code.expect(LineItemValidator.validate(undefined, 'targetCtr', formContext).error.details[0].type)
      .to.equal('any.required');
    done();
  });
});

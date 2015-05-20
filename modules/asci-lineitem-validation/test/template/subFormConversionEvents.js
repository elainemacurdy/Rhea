var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormConversionEvents.optimizationBudgetImpressions', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({
      'subFormConversionEvents.optimizationType': 'CPA',
      'subFormConversionEvents.conversionEventKey': [1]
    }, true);
    Code.expect(LineItemValidator.validate(undefined, 'optimizationBudgetImpressions', formContext).error)
      .to.be['null']();
    formContext.setValue('subFormConversionEvents.optimizationType', 'CTR');
    Code.expect(LineItemValidator.validate(undefined, 'optimizationBudgetImpressions', formContext).error)
      .to.be['null']();
    done();
  });
});
lab.experiment('subFormConversionEvents.targetCpa', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormConversionEvents.optimizationType': 'CPA' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'targetCpa', formContext).error)
      .to.be['null']();
    done();
  });
});
lab.experiment('subFormConversionEvents.targetCtr', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormConversionEvents.optimizationType': 'CTR' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'targetCtr', formContext).error)
      .to.be['null']();
    done();
  });
});

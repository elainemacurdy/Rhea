var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormPricing.budgetCpmType', function() {
    lab.test('validate fails', function(done) {
        Code.expect(LineItemValidator.validate(undefined, 'budgetCpmType').error.details[0].type)
            .to.equal('any.required');
        done();
    });
});
lab.experiment('subFormPricing.markupCpm', function() {
    lab.test('validate fails', function(done) {
        var formContext = util.getFormContext({
            'subFormPricing.budgetCpmType': 'COST_PLUS',
            'subFormPricing.markupPercent': 10
        });
        // value is required when no markupPercent is specified
        formContext.setValue('subFormPricing.markupPercent', '');
        Code.expect(LineItemValidator.validate(undefined, 'markupCpm', formContext).error.details[0].type)
            .to.equal('any.required');
        done();
    });
});
lab.experiment('subFormPricing.markupPercent', function() {
    lab.test('validate fails', function(done) {
        var formContext = util.getFormContext({
            'subFormPricing.budgetCpmType': 'COST_PLUS',
            'subFormPricing.markupCpm': 10
        });
        // value is required when no markupCpm is specified
        formContext.setValue('subFormPricing.markupCpm', '');
        Code.expect(LineItemValidator.validate(undefined, 'markupPercent', formContext).error.details[0].type)
            .to.equal('any.required');
        done();
    });
});
lab.experiment('subFormPricing.maxBidCpm', function() {
    lab.test('validate fails', function(done) {
      var formContext = util.getFormContext({ 'lineItemType': 'RTB' });

        Code.expect(LineItemValidator.validate(undefined, 'maxBidCpm', formContext).error.details[0].type)
            .to.equal('any.required');
        Code.expect(LineItemValidator.validate('', 'maxBidCpm', formContext).error.details[0].type)
            .to.equal('any.required');
        done();
    });
});

// FIXME UI-1039 add tests for costCpm

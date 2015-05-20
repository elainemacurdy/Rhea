var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormPricing.budgetCpmType', function() {
    var formContext = util.getFormContext({}, true);
    lab.test('validate succeeds', function(done) {
        Code.expect(LineItemValidator.validate(undefined, 'budgetCpmType', formContext).error)
            .to.be['null']();
        done();
    });
});
lab.experiment('subFormPricing.markupCpm', function() {
    lab.test('validate succeeds', function(done) {
        var formContext = util.getFormContext({
            'subFormPricing.budgetCpmType': 'COST_PLUS',
            'subFormPricing.markupPercent': undefined
        }, true);
        // value is required when no markupPercent is specified
        Code.expect(LineItemValidator.validate(undefined, 'markupCpm', formContext).error)
            .to.be['null']();
        done();
    });
});
lab.experiment('subFormPricing.markupPercent', function() {
    lab.test('validate succeeds', function(done) {
        var formContext = util.getFormContext({
            'subFormPricing.budgetCpmType': 'COST_PLUS',
            'subFormPricing.markupCpm': undefined
        }, true);
        // value is required when no markupCpm is specified
        Code.expect(LineItemValidator.validate(undefined, 'markupPercent', formContext).error)
            .to.be['null']();
        done();
    });
});
lab.experiment('subFormPricing.maxBidCpm', function() {
    lab.test('validate succeeds', function(done) {
        var formContext = util.getFormContext({}, true);
        Code.expect(LineItemValidator.validate(undefined, 'maxBidCpm', formContext).error)
            .to.be['null']();
        done();
    });
});

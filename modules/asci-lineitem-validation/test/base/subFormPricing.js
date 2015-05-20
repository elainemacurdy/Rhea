/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormPricing.advertiserCpm', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        // Code.expect(LineItemValidator.validate(undefined, 'advertiserCpm', formContext).error)
          // .to.be['null']();
        // done();
      // }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        // Code.expect(LineItemValidator.validate(0.01, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1000, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(500.5, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not a number', 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(0, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-10, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1001, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(500.123, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // // test value when it is forbidden
        // formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        // Code.expect(LineItemValidator.validate(100, 'advertiserCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        Code.expect(LineItemValidator.validate(0.01, 'advertiserCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(1000, 'advertiserCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500.5, 'advertiserCpm', formContext).error)
          .to.be['null']();
        // test undefined value when it is not required
        formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        Code.expect(LineItemValidator.validate(undefined, 'advertiserCpm', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        Code.expect(LineItemValidator.validate(undefined, 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('any.required');
        Code.expect(LineItemValidator.validate('10', 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('not a number', 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(0, 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('number.greater');
        Code.expect(LineItemValidator.validate(-10, 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('number.greater');
        Code.expect(LineItemValidator.validate(1001, 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('number.max');
        Code.expect(LineItemValidator.validate(500.123, 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('number.precision');
        // test value when it is forbidden
        formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        Code.expect(LineItemValidator.validate(100, 'advertiserCpm', formContext).error.details[0].type)
          .to.equal('any.unknown');
        done();
      }, formContext));
    }
  }
});

lab.experiment('subFormPricing.budgetCpmType', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate('', 'budgetCpmType', formContext).error)
          // .to.be['null']();
        // Code.expect(LineItemValidator.validate(undefined, 'budgetCpmType', formContext).error)
          // .to.be['null']();
        // done();
      // }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate('FIXED_CPM', 'budgetCpmType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('COST_PLUS', 'budgetCpmType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10, 'budgetCpmType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('BOGUS', 'budgetCpmType', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('FIXED_CPM', 'budgetCpmType', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('COST_PLUS', 'budgetCpmType', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(10, 'budgetCpmType', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate('BOGUS', 'budgetCpmType', formContext).error.details[0].type)
          .to.equal('any.allowOnly');
        done();
      }, formContext));
    }
  }
});

lab.experiment('subFormPricing.markupCpm', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        // // value is forbidden when markupPercent is specified
        // Code.expect(LineItemValidator.validate(undefined, 'markupCpm', formContext).error)
          // .to.be['null']();
        // // value is forbidden when budgetCpmType is FIXED_CPM
        // formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        // Code.expect(LineItemValidator.validate(undefined, 'markupCpm', formContext).error)
          // .to.be['null']();
        // done();
      // }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        // Code.expect(LineItemValidator.validate(0.01, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(2000, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(500.5, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not a number', 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-10, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(2001, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(500.123, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        // Code.expect(LineItemValidator.validate(100, 'markupCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        formContext.setValue('subFormPricing.markupPercent', 10);
        Code.expect(LineItemValidator.validate(0.01, 'markupCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(2000, 'markupCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(500.5, 'markupCpm', formContext).error)
          .to.be['null']();
        // value is not required when markupPercent is specified
        Code.expect(LineItemValidator.validate(undefined, 'markupCpm', formContext).error)
          .to.be['null']();
        // value is not required when budgetCpmType is FIXED_CPM
        formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        Code.expect(LineItemValidator.validate(undefined, 'markupCpm', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        formContext.setValue('subFormPricing.markupPercent', 10);
        Code.expect(LineItemValidator.validate('10', 'markupCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('not a number', 'markupCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(-10, 'markupCpm', formContext).error.details[0].type)
          .to.equal('number.min');
        Code.expect(LineItemValidator.validate(2001, 'markupCpm', formContext).error.details[0].type)
          .to.equal('number.max');
        Code.expect(LineItemValidator.validate(500.123, 'markupCpm', formContext).error.details[0].type)
          .to.equal('number.precision');
        // value is forbidden when budgetCpmType is FIXED_CPM
        formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        Code.expect(LineItemValidator.validate(100, 'markupCpm', formContext).error.details[0].type)
          .to.equal('any.unknown');
        done();
      }, formContext));
    }
  }
});
lab.experiment('subFormPricing.markupPercent', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        // formContext.setValue('subFormPricing.markupCpm', 10);
        // // value is forbidden when markupCpm is specified
        // Code.expect(LineItemValidator.validate(undefined, 'markupPercent', formContext).error)
          // .to.be['null']();
        // // value is forbidden when budgetCpmType is FIXED_CPM
        // formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        // Code.expect(LineItemValidator.validate(undefined, 'markupPercent', formContext).error)
          // .to.be['null']();
        // done();
      // }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        // formContext.setValue('subFormPricing.markupCpm', 10);
        // Code.expect(LineItemValidator.validate(0.01, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(200, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.5, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not a number', 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-10, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(201, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.123, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // // value is forbidden when budgetCpmType is FIXED_CPM
        // formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        // Code.expect(LineItemValidator.validate(100, 'markupPercent', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        formContext.setValue('subFormPricing.markupCpm', 10);
        Code.expect(LineItemValidator.validate(0.01, 'markupPercent', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(200, 'markupPercent', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(50.5, 'markupPercent', formContext).error)
          .to.be['null']();
        // value is not required when markupCpm is specified
        Code.expect(LineItemValidator.validate(undefined, 'markupPercent', formContext).error)
          .to.be['null']();
        // value is not required when budgetCpmType is FIXED_CPM
        formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        Code.expect(LineItemValidator.validate(undefined, 'markupPercent', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('subFormPricing.budgetCpmType', 'COST_PLUS');
        formContext.setValue('subFormPricing.markupCpm', 10);
        Code.expect(LineItemValidator.validate('10', 'markupPercent', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('not a number', 'markupPercent', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(-10, 'markupPercent', formContext).error.details[0].type)
          .to.equal('number.min');
        Code.expect(LineItemValidator.validate(201, 'markupPercent', formContext).error.details[0].type)
          .to.equal('number.max');
        Code.expect(LineItemValidator.validate(50.123, 'markupPercent', formContext).error.details[0].type)
          .to.equal('number.precision');
        // value is forbidden when budgetCpmType is FIXED_CPM
        formContext.setValue('subFormPricing.budgetCpmType', 'FIXED_CPM');
        Code.expect(LineItemValidator.validate(100, 'markupPercent', formContext).error.details[0].type)
          .to.equal('any.unknown');
        done();
      }, formContext));
    }
  }
});
lab.experiment('subFormPricing.maxBidCpm', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'RTB') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(0.01, 'maxBidCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(1000, 'maxBidCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(50.5, 'maxBidCpm', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('10', 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('not a number', 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(-10, 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.greater');
        Code.expect(LineItemValidator.validate(0, 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.greater');
        Code.expect(LineItemValidator.validate(1001, 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.max');
        Code.expect(LineItemValidator.validate(50.123, 'maxBidCpm', formContext).error.details[0].type)
          .to.equal('number.precision');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'maxBidCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'maxBidCpm', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(null, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not a number', 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-10, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1001, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.123, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(0, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1000, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.5, 'maxBidCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    }
  }
});

lab.experiment('subFormPricing.costCpm', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'DIRECT') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(0, 'costCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(1000, 'costCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(50.5, 'costCpm', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'costCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('10', 'costCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate('not a number', 'costCpm', formContext).error.details[0].type)
          .to.equal('number.base');
        Code.expect(LineItemValidator.validate(-10, 'costCpm', formContext).error.details[0].type)
          .to.equal('number.min');
        Code.expect(LineItemValidator.validate(1001, 'costCpm', formContext).error.details[0].type)
          .to.equal('number.max');
        Code.expect(LineItemValidator.validate(50.123, 'costCpm', formContext).error.details[0].type)
          .to.equal('number.precision');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'costCpm', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'costCpm', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(null, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('10', 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not a number', 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(-10, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1001, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.123, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(0, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(1000, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(50.5, 'costCpm', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    }
  }
});

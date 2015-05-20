/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('customTargetsDIRECT_SITE_ID', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'DIRECT') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate([
          "DxEq7fiHC0FaSUUGIw6wv_tzPQ8",
          "nJSv3nNJO5bc3rKeTdeOIwuhYkA"
        ], 'customTargetsDIRECT_SITE_ID', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['abc'], 'customTargetsDIRECT_SITE_ID', formContext).error)
          .to.be['null']();

        done();
      }, formContext));

      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['&&&q7fiHC0FaSUUGIw6wv_tzPQ8'], 'customTargetsDIRECT_SITE_ID', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate([], 'customTargetsDIRECT_SITE_ID', formContext).error.details[0].type)
          .to.equal('array.min');

        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsDIRECT_SITE_ID', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 deactivate forbidden because each form has to know the type to clean the value ahead of validation
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
      //   Code.expect(LineItemValidator.validate([], 'customTargetsDIRECT_SITE_ID', formContext).error.details[0].type)
      //     .to.equal('any.unknown');
      //   Code.expect(LineItemValidator.validate([
      //     "DxEq7fiHC0FaSUUGIw6wv_tzPQ8",
      //     "nJSv3nNJO5bc3rKeTdeOIwuhYkA"
      //   ], 'customTargetsDIRECT_SITE_ID', formContext).error.details[0].type)
      //     .to.equal('any.unknown');
      //
      //   done();
      // }, formContext));
    }
  }
});

lab.experiment('directCustomPrices', function() {
  lab.test('validate succeeds: DIRECT', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'directCustomPrices').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([], 'directCustomPrices').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([
      {
        "provider": "DIRECT",
        "customTargetAttribute": "DIRECT_SITE_ID",
        "customTargetValue": "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
        "costCpm": 4.00
      }
    ], 'directCustomPrices').error)
      .to.be['null']();

    done();
  });

  lab.test('validate fails: DIRECT', function(done) {
    Code.expect(LineItemValidator.validate([1], 'directCustomPrices').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([
      {
        "provider": "NOT_DIRECT",
        "customTargetAttribute": "DIRECT_SITE_ID",
        "customTargetValue": "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
        "costCpm": 4.00
      }
    ], 'directCustomPrices').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([
      {
        "provider": "DIRECT",
        "customTargetAttribute": "UNKNOWN",
        "customTargetValue": "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
        "costCpm": 4.00
      }
    ], 'directCustomPrices').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([
      {
        "provider": "DIRECT",
        "customTargetAttribute": "UNKNOWN",
        "customTargetValue": "tooshort",
        "costCpm": 4.00
      }
    ], 'directCustomPrices').error.details[0].type)
      .to.equal('array.includesOne');

    done();
  });
});


lab.experiment('forcedDelivery', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'DIRECT') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(true, 'forcedDelivery', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(false, 'forcedDelivery', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('true', 'forcedDelivery', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('false', 'forcedDelivery', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('yes', 'forcedDelivery', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('no', 'forcedDelivery', formContext).error)
          .to.be['null']();
        done();
      }, formContext));

      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('uh-huh', 'forcedDelivery', formContext).error.details[0].type)
          .to.equal('boolean.base');
        Code.expect(LineItemValidator.validate(0, 'forcedDelivery', formContext).error.details[0].type)
          .to.equal('boolean.base');

        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'forcedDelivery', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 deactivate forbidden because each form has to know the type to clean the value ahead of validation
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(true, 'forcedDelivery', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(false, 'forcedDelivery', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('true', 'forcedDelivery', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('false', 'forcedDelivery', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('yes', 'forcedDelivery', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('no', 'forcedDelivery', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    }
  }
});

/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormProviders', function() {
  lab.test('validate succeeds: RTB', function(done) {
    var formContext = util.getFormContext({
      'lineItemType': 'RTB',
      'customTargets': [{
        attribute: 'OPENRTB_PROVIDER',
        values: ['openx']
      }]
    });
    Code.expect(LineItemValidator.validate(['SPOTXCHANGE'], 'subFormProviders', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate(['SPOTXCHANGE', 'BRIGHTROLL', 'ADAPTV'], 'subFormProviders', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error)
      .to.be['null']();

    formContext = util.getFormContext({
      'lineItemType': 'RTB',
      'customTargets': [{
        attribute: 'APPNEXUS_SELLING_MEMBER_ID',
        values: ['280']
      }]
    });
    Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error)
      .to.be['null']();

    formContext = util.getFormContext({
      'lineItemType': 'RTB',
      'customTargets': [{
        attribute: 'RIGHTMEDIA_SELLER_SEAT',
        values: ['23351']
      }]
    });
    Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
    Code.expect(LineItemValidator.validate(null, 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate('SPOTXCHANGE', 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.min');
    Code.expect(LineItemValidator.validate(['SPOTXCHANGE', 'DIRECT', 'ADAPTV'], 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate(['DIRECT'], 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate(['MIAOZHEN'], 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.includesOne');
    done();
  });

  lab.test('validate succeeds: DIRECT', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' });
    Code.expect(LineItemValidator.validate(['DIRECT'], 'subFormProviders', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails: DIRECT', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' });
    Code.expect(LineItemValidator.validate(null, 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate('SPOTXCHANGE', 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.base');
    // FIXME UI-1039 allowing empty providers for DIRECT until valiation is figured out
    // Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.min');
    // Code.expect(LineItemValidator.validate(['SPOTXCHANGE', 'DIRECT', 'ADAPTV'], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.includesOne');
    // Code.expect(LineItemValidator.validate(['DIRECT', 'DIRECT'], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.max');
    // Code.expect(LineItemValidator.validate(['SPOTXCHANGE'], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.includesOne');
    done();
  });

  lab.test('validate succeeds: EXTERNAL', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
    Code.expect(LineItemValidator.validate(['MIAOZHEN'], 'subFormProviders', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails: EXTERNAL', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
    Code.expect(LineItemValidator.validate(null, 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate('SPOTXCHANGE', 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.base');
    // FIXME UI-1039 allowing empty providers for EXTERNAL until valiation is figured out
    // Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.min');
    // Code.expect(LineItemValidator.validate(['SPOTXCHANGE', 'MIAOZHEN', 'ADAPTV'], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.includesOne');
    // Code.expect(LineItemValidator.validate(['MIAOZHEN', 'MIAOZHEN'], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.max');
    // Code.expect(LineItemValidator.validate(['SPOTXCHANGE'], 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('array.includesOne');
    done();
  });
});

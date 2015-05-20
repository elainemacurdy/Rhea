/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormInventorytype.brandsafeList', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'brandsafeList', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate({}, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({
          // inventoryType: 'SITE',
          // hidden: false,
          // name: 'bar'
        // }, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({
          // hidden: false,
          // name: 'bar'
        // }, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('not an object', 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({
          // inventoryType: 10,
          // hidden: false,
          // name: 'bar'
        // }, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({
          // advertiserName: 'foo',
          // hidden: 10,
          // name: 'bar'
        // }, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({
          // advertiserName: 'foo',
          // hidden: false,
          // name: 10
        // }, 'brandsafeList', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'brandsafeList', formContext).error)
          .to.be['null']();
        var err = LineItemValidator.validate({}, 'brandsafeList', formContext).error;
        Code.expect(LineItemValidator.validate({}, 'brandsafeList', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate({
          inventoryType: 'SITE',
          hidden: false,
          name: 'bar'
        }, 'brandsafeList', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate({
          hidden: false,
          name: 'bar'
        }, 'brandsafeList', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'brandsafeList', formContext).error.details[0].type)
          .to.equal('object.base');
        Code.expect(LineItemValidator.validate('not an object', 'brandsafeList', formContext).error.details[0].type)
          .to.equal('object.base');
        Code.expect(LineItemValidator.validate({
          inventoryType: 10,
          hidden: false,
          name: 'bar'
        }, 'brandsafeList', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate({
          advertiserName: 'foo',
          hidden: 10,
          name: 'bar'
        }, 'brandsafeList', formContext).error.details[0].type)
          .to.equal('boolean.base');
        Code.expect(LineItemValidator.validate({
          advertiserName: 'foo',
          hidden: false,
          name: 10
        }, 'brandsafeList', formContext).error.details[0].type)
          .to.equal('string.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('subFormInventorytype.customTargetsINVENTORY_TYPE', function() {
  lab.test('validate succeeds: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsINVENTORY_TYPE', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('', 'customTargetsINVENTORY_TYPE', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('APP', 'customTargetsINVENTORY_TYPE', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('SITE', 'customTargetsINVENTORY_TYPE', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
    Code.expect(LineItemValidator.validate(null, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('string.base');
    Code.expect(LineItemValidator.validate(3, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('string.base');
    Code.expect(LineItemValidator.validate('unknown', 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('any.allowOnly');
    done();
  });
  lab.test('validate succeeds: DIRECT', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' });
    Code.expect(LineItemValidator.validate('SITE', 'customTargetsINVENTORY_TYPE', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails: DIRECT', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' });
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('any.required');
    Code.expect(LineItemValidator.validate('', 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('string.base');
    Code.expect(LineItemValidator.validate(3, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('string.base');
    Code.expect(LineItemValidator.validate('APP', 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      .to.be.equal('any.allowOnly');
    done();
  });
  lab.test('validate succeeds: EXTERNAL', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsINVENTORY_TYPE', formContext).error)
      .to.be['null']();
    done();
  });
  // lab.test('validate fails: EXTERNAL', function(done) {
    // var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
    // Code.expect(LineItemValidator.validate(undefined, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // Code.expect(LineItemValidator.validate('', 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // Code.expect(LineItemValidator.validate(null, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // Code.expect(LineItemValidator.validate([], 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // Code.expect(LineItemValidator.validate(3, 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // Code.expect(LineItemValidator.validate('APP', 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // Code.expect(LineItemValidator.validate('SITE', 'customTargetsINVENTORY_TYPE', formContext).error.details[0].type)
      // .to.be.equal('any.unknown');
    // done();
  // });
});

lab.experiment('subFormInventorytype.customTargetsMANUAL_WHITELIST', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
        // Code.expect(LineItemValidator.validate([], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['nytimes.com'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['wikipedia.com', 'nytimes.com'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['APPID.123-4'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['APPID_2', 'APPID_3'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('unknown', 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([''], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['abc'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['abcdef/'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['United States'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['A&B&C'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['nytimes.com'], 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['wikipedia.com', 'nytimes.com'], 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['APPID.123-4'], 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['APPID_2', 'APPID_3'], 'customTargetsMANUAL_WHITELIST', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.base');
        Code.expect(LineItemValidator.validate([''], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['abc'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['abcdef/'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['United States'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['A&B&C'], 'customTargetsMANUAL_WHITELIST', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        done();
      }, formContext));
    }
  }
});

lab.experiment('subFormInventorytype.manualBlacklist', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
        Code.expect(LineItemValidator.validate(undefined, 'manualBlacklist', formContext).error)
          .to.be['null']();
        // seems a little weird, but it's because '' means the same thing as undefined
        Code.expect(LineItemValidator.validate('', 'manualBlacklist', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // var formContext = util.getFormContext({ 'lineItemType': 'EXTERNAL' });
        // Code.expect(LineItemValidator.validate({}, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { pattern: 'wikipedia.org' }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { pattern: 'www.google.com' },
          // { pattern: 'nytimes.org' },
          // { pattern: 'amazon.co.uk' }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([], 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ blah: [] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // var tooBig = [];
        // var obj = { pattern: 'google.com' };
        // for (var i = 0; i <= 50001; i++) {
          // tooBig[i] = obj;
        // }
        // Code.expect(LineItemValidator.validate({ items: tooBig }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { foo: 'whatever' }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { pattern: 123 }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { pattern: util.getNLengthStr(2) }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { pattern: util.getNLengthStr(101) }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate({ items: [
          // { pattern: 'incorrect-lala-' }
        // ] }, 'manualBlacklist', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'manualBlacklist').error)
          .to.be['null']();
        // seems a little weird, but it's because '' means the same thing as undefined
        Code.expect(LineItemValidator.validate('', 'manualBlacklist', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate({}, 'manualBlacklist', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate({ items: [] }, 'manualBlacklist', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate({ items: [
          { pattern: 'wikipedia.org' }
        ] }, 'manualBlacklist', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate({ items: [
          { pattern: 'www.google.com' },
          { pattern: 'nytimes.org' },
          { pattern: 'amazon.co.uk' }
        ] }, 'manualBlacklist', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('object.base');
        Code.expect(LineItemValidator.validate([], 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('object.base');
        Code.expect(LineItemValidator.validate({ blah: [] }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('object.allowUnknown');
        var tooBig = [];
        var obj = { pattern: 'google.com' };
        for (var i = 0; i <= 50001; i++) {
          tooBig[i] = obj;
        }
        Code.expect(LineItemValidator.validate({ items: tooBig }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('array.max');
        Code.expect(LineItemValidator.validate({ items: [
          { foo: 'whatever' }
        ] }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate({ items: [
          { pattern: 123 }
        ] }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate({ items: [
          { pattern: util.getNLengthStr(2) }
        ] }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate({ items: [
          { pattern: util.getNLengthStr(101) }
        ] }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate({ items: [
          { pattern: 'incorrect-lala-' }
        ] }, 'manualBlacklist', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        done();
      }, formContext));
    }
  }
});

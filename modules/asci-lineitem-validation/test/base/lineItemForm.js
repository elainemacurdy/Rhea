/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('customTargetsBROWSER', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate failse: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(null, 'customTargetsBROWSER').error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('unknown', 'customTargetsBROWSER').error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([3], 'customTargetsBROWSER').error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsBROWSER').error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['CHROME'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['FIREFOX'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['IE'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['SAFARI'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['OTHER'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['CHROME', 'FIREFOX'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['IE', 'SAFARI', 'OTHER'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['CHROME', 'FIREFOX', 'IE', 'SAFARI', 'OTHER'], 'customTargetsBROWSER', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['CHROME'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['FIREFOX'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['IE'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['SAFARI'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['OTHER'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['CHROME', 'FIREFOX'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['IE', 'SAFARI', 'OTHER'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['CHROME', 'FIREFOX', 'IE', 'SAFARI', 'OTHER'], 'customTargetsBROWSER', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsBROWSER', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsBROWSER', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate([3], 'customTargetsBROWSER', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsBROWSER', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        done();
      }, formContext));
    }
  }
});

lab.experiment('customTargetsDEVICE_TYPE', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate(null, 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('unknown', 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([3], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONE'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['TABLET'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['DESKTOP'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['CONNECTED_TV'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['SET_TOP_BOX'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['CONNECTED_DEVICE'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONE', 'TABLET'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['DESKTOP', 'CONNECTED_TV'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['SET_TOP_BOX', 'CONNECTED_DEVICE'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONE', 'TABLET', 'DESKTOP', 'CONNECTED_TV', 'SET_TOP_BOX', 'CONNECTED_DEVICE'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['PHONE'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['TABLET'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['DESKTOP'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['CONNECTED_TV'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['SET_TOP_BOX'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['CONNECTED_DEVICE'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['PHONE', 'TABLET'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['DESKTOP', 'CONNECTED_TV'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['SET_TOP_BOX', 'CONNECTED_DEVICE'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['PHONE', 'TABLET', 'DESKTOP', 'CONNECTED_TV', 'SET_TOP_BOX', 'CONNECTED_DEVICE'], 'customTargetsDEVICE_TYPE', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          .to.equal('array.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          .to.equal('array.base');
        Code.expect(LineItemValidator.validate([3], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsDEVICE_TYPE', formContext).error.details[0].type)
          .to.equal('array.includesOne');
        done();
      }, formContext));
    }
  }
});

lab.experiment('customTargetsDIRECT_PRIORITY', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'DIRECT') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('1', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('2', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('3', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('4', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('5', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('6', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('7', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsDIRECT_PRIORITY', formContext).error.details[0].type)
          .to.equal('any.required');
        Code.expect(LineItemValidator.validate('', 'customTargetsDIRECT_PRIORITY', formContext).error.details[0].type)
          .to.equal('any.required');
        Code.expect(LineItemValidator.validate('0', 'customTargetsDIRECT_PRIORITY', formContext).error.details[0].type)
          .to.equal('any.allowOnly');
        Code.expect(LineItemValidator.validate('8', 'customTargetsDIRECT_PRIORITY', formContext).error.details[0].type)
          .to.equal('any.allowOnly');
        Code.expect(LineItemValidator.validate(1, 'customTargetsDIRECT_PRIORITY', formContext).error.details[0].type)
          .to.equal('string.base');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'customTargetsDIRECT_PRIORITY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 deactivate forbidden because each form has to know the type to clean the value ahead of validation
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
      //   Code.expect(LineItemValidator.validate('1', 'customTargetsDIRECT_PRIORITY', formContext).error.details[0].type)
      //     .to.equal('any.unknown');
      //   done();
      // }, formContext));
    }
  }
});

lab.experiment('customTargetsFOLD_POSITION', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'RTB') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['ANY'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ABOVE'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['BELOW'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['UNDEFINED'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ABOVE', 'BELOW'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['BELOW', 'UNDEFINED'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ABOVE', 'BELOW', 'UNDEFINED'], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate([3], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsFOLD_POSITION', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          .to.be.equal('array.base');
        // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
        // Code.expect(LineItemValidator.validate([3], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['ANY'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['ABOVE'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['BELOW'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['UNDEFINED'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['ABOVE', 'BELOW'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['BELOW', 'UNDEFINED'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        // Code.expect(LineItemValidator.validate(['ABOVE', 'BELOW', 'UNDEFINED'], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
          // .to.be.equal('array.max');
        done();
      }, formContext));
    }
  }
});

lab.experiment('customTargetsOPERATING_SYSTEM', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate([], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['ANDROID'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['IOS'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['MAC'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['WINDOWS'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['WINDOWS_PHONE'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['OTHER'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['ANDROID', 'IOS'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['MAC', 'WINDOWS'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['WINDOWS_PHONE', 'OTHER'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['ANDROID', 'IOS', 'MAC', 'WINDOWS', 'WINDOWS_PHONE', 'OTHER'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('unknown', 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([3], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ANDROID'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['IOS'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['MAC'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['WINDOWS'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['WINDOWS_PHONE'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['OTHER'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ANDROID', 'IOS'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['MAC', 'WINDOWS'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['WINDOWS_PHONE', 'OTHER'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ANDROID', 'IOS', 'MAC', 'WINDOWS', 'WINDOWS_PHONE', 'OTHER'], 'customTargetsOPERATING_SYSTEM', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate([3], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['PHONY'], 'customTargetsOPERATING_SYSTEM', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        done();
      }, formContext));
    }
  }
});

lab.experiment('customTargetsVIEWABILITY', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate('10', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('20', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('35', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('50', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('75', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([], 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(10, 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('unknown', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          // .to.equal('any.unknown');
        // done();
      // });
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('10', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('20', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('35', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('50', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('75', 'customTargetsVIEWABILITY', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(null, 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate([], 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate(10, 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          .to.equal('string.base');
        Code.expect(LineItemValidator.validate('unknown', 'customTargetsVIEWABILITY', formContext).error.details[0].type)
          .to.equal('any.allowOnly');
        done();
      }, formContext));
    }
  }
});

lab.experiment('dataType', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate('FIRST_PARTY', 'dataType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('THIRD_PARTY', 'dataType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('MIXED', 'dataType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('UNTARGETED', 'dataType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('DISCOVERY', 'dataType').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'dataType').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate('', 'dataType').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'dataType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'dataType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate(10, 'dataType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('unknown', 'dataType').error.details[0].type)
      .to.equal('any.allowOnly');
    done();
  });
});

lab.experiment('description', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate('My line item name here', 'description').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('r3gula41n spe#i*l ch&rs?!', 'description').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('r3gula41n~ spe#i*l ~~ch&rs?!', 'description').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(null, 'description').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'description').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate(10, 'description').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('01', 'description').error.details[0].type)
      .to.equal('string.min');
    Code.expect(LineItemValidator.validate(util.getNLengthStr(101), 'description').error.details[0].type)
      .to.equal('string.max');
    Code.expect(LineItemValidator.validate('bad/chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad|chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad"chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad\\chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad+chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad~~~chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad~~~~~chars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('~~~badchars', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('badchars~~~', 'description').error.details[0].type)
      .to.equal('string.regex.base');
    done();
  });
});

lab.experiment('dynamicCreativeAlias', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate('test_12345', 'dynamicCreativeAlias').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('a', 'dynamicCreativeAlias').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(null, 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('bad chars', 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad/chars', 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad|chars', 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad"chars', 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad\\chars', 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad+chars', 'dynamicCreativeAlias').error.details[0].type)
      .to.equal('string.regex.base');
    done();
  });
});

lab.experiment('formatType', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate('VIDEO', 'formatType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('DISPLAY', 'formatType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('SURVEY', 'formatType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('VIDEO_SSM', 'formatType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('VIDEO_TBB', 'formatType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('MOBILE_DISPLAY', 'formatType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('MOBILE_VIDEO', 'formatType').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'formatType').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate('', 'formatType').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'formatType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'formatType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate(10, 'formatType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('unknown', 'formatType').error.details[0].type)
      .to.equal('any.allowOnly');
    done();
  });
});

lab.experiment('prioritizeDeals', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'RTB') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('', 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('yes', 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('no', 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('true', 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate('false', 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(true, 'prioritizeDeals', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(false, 'prioritizeDeals', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('dude', 'prioritizeDeals', formContext).error.details[0].type)
          .to.be.equal('boolean.base');
        Code.expect(LineItemValidator.validate([], 'prioritizeDeals', formContext).error.details[0].type)
          .to.be.equal('boolean.base');
        Code.expect(LineItemValidator.validate(null, 'prioritizeDeals', formContext).error.details[0].type)
          .to.be.equal('boolean.base');
        Code.expect(LineItemValidator.validate(0, 'prioritizeDeals', formContext).error.details[0].type)
          .to.be.equal('boolean.base');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'prioritizeDeals', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate('true', 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('false', 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('yes', 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('no', 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(true, 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(false, 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('', 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([], 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(0, 'prioritizeDeals', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // done();
      // }, formContext));
    }
  }
});

lab.experiment('productType', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate('PUBLIC', 'productType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('PRIVATE', 'productType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('DIRECT', 'productType').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('EXTERNAL', 'productType').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'productType').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate('', 'productType').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'productType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'productType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate(10, 'productType').error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('unknown', 'productType').error.details[0].type)
      .to.equal('any.allowOnly');
    done();
  });
});

lab.experiment('targetLanguages', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'targetLanguages', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      // lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        // Code.expect(LineItemValidator.validate([], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['ar'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['en'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['fr'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['de'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['el'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['iw'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['hu'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['pt'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['es'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['en', 'fr'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['de', 'pt', 'es'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['ar', 'en', 'fr', 'de', 'el', 'iw', 'hu', 'pt', 'es'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate('unknown', 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate([3], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(['PHONY'], 'targetLanguages', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // done();
      // }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate([], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ar'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['en'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['fr'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['de'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['el'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['iw'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['hu'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['pt'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['es'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['en', 'fr'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['de', 'pt', 'es'], 'targetLanguages', formContext).error)
          .to.be['null']();
        Code.expect(LineItemValidator.validate(['ar', 'en', 'fr', 'de', 'el', 'iw', 'hu', 'pt', 'es'], 'targetLanguages', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate('unknown', 'targetLanguages', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate([3], 'targetLanguages', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        Code.expect(LineItemValidator.validate(['PHONY'], 'targetLanguages', formContext).error.details[0].type)
          .to.be.equal('array.includesOne');
        done();
      }, formContext));
    }
  }
});

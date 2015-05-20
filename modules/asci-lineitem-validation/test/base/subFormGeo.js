var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('targetCities', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'targetCities', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetCities', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'targetCities', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'targetCities', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetCities', formContext).error)
          .to.be['null']();
        formContext.setValue('targetRegions', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'targetCities', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('targetRegions', ['something']);
        Code.expect(LineItemValidator.validate(null, 'targetCities', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'targetCities', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('targetCountries', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'targetCountries', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetCountries', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'targetCountries', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'targetCountries', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetCountries', formContext).error)
          .to.be['null']();
        formContext.setValue('targetCities', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'targetCountries', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('targetCities', ['something']);
        Code.expect(LineItemValidator.validate(null, 'targetCountries', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'targetCountries', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('targetRegions', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'targetRegions', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetRegions', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'targetRegions', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'targetRegions', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetRegions', formContext).error)
          .to.be['null']();
        formContext.setValue('targetCities', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'targetRegions', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('targetCities', ['something']);
        Code.expect(LineItemValidator.validate(null, 'targetRegions', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'targetRegions', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('targetMetros', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'targetMetros', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetMetros', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'targetMetros', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'targetMetros', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'targetMetros', formContext).error)
          .to.be['null']();
        formContext.setValue('targetCities', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'targetMetros', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('targetCities', ['something']);
        Code.expect(LineItemValidator.validate(null, 'targetMetros', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'targetMetros', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('excludedCities', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'excludedCities', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedCities', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'excludedCities', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'excludedCities', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedCities', formContext).error)
          .to.be['null']();
        formContext.setValue('excludedRegions', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'excludedCities', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('excludedRegions', ['something']);
        Code.expect(LineItemValidator.validate(null, 'excludedCities', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'excludedCities', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('excludedCountries', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'excludedCountries', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedCountries', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'excludedCountries', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'excludedCountries', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedCountries', formContext).error)
          .to.be['null']();
        formContext.setValue('excludedCities', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'excludedCountries', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('excludedCities', ['something']);
        Code.expect(LineItemValidator.validate(null, 'excludedCountries', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'excludedCountries', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('excludedRegions', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'excludedRegions', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedRegions', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'excludedRegions', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'excludedRegions', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedRegions', formContext).error)
          .to.be['null']();
        formContext.setValue('excludedCities', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'excludedRegions', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('excludedCities', ['something']);
        Code.expect(LineItemValidator.validate(null, 'excludedRegions', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'excludedRegions', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

lab.experiment('excludedMetros', function() {
  var lineItemTypes = ['RTB', 'DIRECT', 'EXTERNAL'];
  for (var i=0; i<lineItemTypes.length; i++) {
    var lineItemType = lineItemTypes[i];
    var formContext = util.getFormContext({ 'lineItemType': lineItemType });
    if (lineItemType === 'EXTERNAL') {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(undefined, 'excludedMetros', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedMetros', formContext).error.details[0].type)
          .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(null, 'excludedMetros', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        // Code.expect(LineItemValidator.validate(3, 'excludedMetros', formContext).error.details[0].type)
          // .to.be.equal('any.unknown');
        done();
      }, formContext));
    } else {
      lab.test('validate succeeds: ' + lineItemType, util.getClosure(function(done, formContext) {
        Code.expect(LineItemValidator.validate(['something'], 'excludedMetros', formContext).error)
          .to.be['null']();
        formContext.setValue('excludedCities', ['something']);
        Code.expect(LineItemValidator.validate(undefined, 'excludedMetros', formContext).error)
          .to.be['null']();
        done();
      }, formContext));
      lab.test('validate fails: ' + lineItemType, util.getClosure(function(done, formContext) {
        formContext.setValue('excludedCities', ['something']);
        Code.expect(LineItemValidator.validate(null, 'excludedMetros', formContext).error.details[0].type)
          .to.be.equal('array.base');
        Code.expect(LineItemValidator.validate(3, 'excludedMetros', formContext).error.details[0].type)
          .to.be.equal('array.base');
        done();
      }, formContext));
    }
  }
});

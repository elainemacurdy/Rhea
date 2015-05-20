var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormFrequencyCap.frequencyCap', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' });
    Code.expect(LineItemValidator.validate(1, 'frequencyCap', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate(999, 'frequencyCap', formContext).error)
      .to.be['null']();
    // test setting the frequencyCapType to 'group'
    formContext.setValue('subFormFrequencyCap.frequencyCapType', 'frequencyCapGroup');
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCap', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' });
    Code.expect(LineItemValidator.validate('', 'frequencyCap', formContext).error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'frequencyCap', formContext).error.details[0].type)
      .to.equal('number.base');
    Code.expect(LineItemValidator.validate({}, 'frequencyCap', formContext).error.details[0].type)
      .to.equal('number.base');
    // test setting the frequencyCapType to 'group'
    formContext.setValue('subFormFrequencyCap.frequencyCapType', 'frequencyCapGroup');
    Code.expect(LineItemValidator.validate(10, 'frequencyCap', formContext).error.details[0].type)
      .to.equal('any.unknown');
    done();
  });
});
lab.experiment('subFormFrequencyCap.frequencyCapGroup', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCapGroup' });
    Code.expect(LineItemValidator.validate('foo', 'frequencyCapGroup', formContext).error)
      .to.be['null']();
    // test setting the frequencyCapType to 'cap'
    formContext.setValue('subFormFrequencyCap.frequencyCapType', 'frequencyCap,frequencyCapUnit');
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCapGroup', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCapGroup' });
    Code.expect(LineItemValidator.validate('', 'frequencyCapGroup', formContext).error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'frequencyCapGroup', formContext).error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate({}, 'frequencyCapGroup', formContext).error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate(10, 'frequencyCapGroup', formContext).error.details[0].type)
      .to.equal('string.base');
    // test setting the frequencyCapType to 'cap'
    formContext.setValue('subFormFrequencyCap.frequencyCapType', 'frequencyCap,frequencyCapUnit');
    Code.expect(LineItemValidator.validate('foo', 'frequencyCapGroup', formContext).error.details[0].type)
      .to.equal('any.unknown');
    done();
  });
});
lab.experiment('subFormFrequencyCap.frequencyCapUnit', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' });
    Code.expect(LineItemValidator.validate('HOUR', 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('DAY', 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('WEEK', 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('MONTH', 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('LIFETIME', 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    // test setting the frequencyCapType to 'group'
    formContext.setValue('subFormFrequencyCap.frequencyCapType', 'frequencyCapGroup');
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' });
    Code.expect(LineItemValidator.validate('', 'frequencyCapUnit', formContext).error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'frequencyCapUnit', formContext).error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('BOGUS', 'frequencyCapUnit', formContext).error.details[0].type)
      .to.equal('any.allowOnly');
    // test setting the frequencyCapType to 'group'
    formContext.setValue('subFormFrequencyCap.frequencyCapType', 'frequencyCapGroup');
    Code.expect(LineItemValidator.validate('HOUR', 'frequencyCapUnit', formContext).error.details[0].type)
      .to.equal('any.unknown');
    done();
  });
});

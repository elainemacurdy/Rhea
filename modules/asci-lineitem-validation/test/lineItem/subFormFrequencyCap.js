var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormFrequencyCap.frequencyCap', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' });
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCap', formContext).error.details[0].type)
      .to.equal('any.required');
    done();
  });
});
lab.experiment('subFormFrequencyCap.frequencyCapGroup', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCapGroup' });
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCapGroup', formContext).error.details[0].type)
      .to.equal('any.required');
    done();
  });
});
lab.experiment('subFormFrequencyCap.frequencyCapUnit', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' });
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCapUnit', formContext).error.details[0].type)
      .to.equal('any.required');
    done();
  });
});

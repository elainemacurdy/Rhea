var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormFrequencyCap.frequencyCap', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCap', formContext).error)
      .to.be['null']();
    done();
  });
});
lab.experiment('subFormFrequencyCap.frequencyCapGroup', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCapGroup' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCapGroup', formContext).error)
      .to.be['null']();
    done();
  });
});
lab.experiment('subFormFrequencyCap.frequencyCapUnit', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormFrequencyCap.frequencyCapType': 'frequencyCap,frequencyCapUnit' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'frequencyCapUnit', formContext).error)
      .to.be['null']();
    done();
  });
});

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('customTargetsFOLD_POSITION', function() {
  lab.test('validate fails: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
      .to.be.equal('any.required');
    Code.expect(LineItemValidator.validate([], 'customTargetsFOLD_POSITION', formContext).error.details[0].type)
      .to.be.equal('array.min');
    done();
  });
});

lab.experiment('description', function() {
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'description').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate('', 'description').error.details[0].type)
      .to.equal('any.required');
    done();
  });
});

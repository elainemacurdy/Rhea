var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormProviders', function() {
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' });
    // FIXME UI-1039 allowing empty providers for DIRECT until valiation is figured out
    // Code.expect(LineItemValidator.validate(undefined, 'subFormProviders', formContext).error.details[0].type)
    //   .to.equal('any.required');
    Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error.details[0].type)
      .to.equal('array.min');
    done();
  });
});

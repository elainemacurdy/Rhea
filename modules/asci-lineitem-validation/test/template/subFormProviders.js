var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormProviders', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'subFormProviders', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([], 'subFormProviders', formContext).error)
      .to.be['null']();
    done();
  });
});

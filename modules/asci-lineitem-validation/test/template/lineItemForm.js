/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('customTargetsDIRECT_PRIORITY', function() {
  lab.test('validate succeeds: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsDIRECT_PRIORITY', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('', 'customTargetsDIRECT_PRIORITY', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate succeeds: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' }, true);
    Code.expect(LineItemValidator.validate('1', 'customTargetsDIRECT_PRIORITY', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate succeeds: DIRECT', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'DIRECT' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsDIRECT_PRIORITY', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('', 'customTargetsDIRECT_PRIORITY', formContext).error)
      .to.be['null']();
    done();
  });
});

lab.experiment('customTargetsFOLD_POSITION', function() {
  lab.test('validate succeeds: RTB', function(done) {
    var formContext = util.getFormContext({ 'lineItemType': 'RTB' }, true);
    Code.expect(LineItemValidator.validate(undefined, 'customTargetsFOLD_POSITION', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([], 'customTargetsFOLD_POSITION', formContext).error)
      .to.be['null']();
    done();
  });
});

lab.experiment('description', function() {
  var formContext = util.getFormContext({}, true);
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'description', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('', 'description', formContext).error)
      .to.be['null']();
    done();
  });
});

lab.experiment('name', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({}, true);
    Code.expect(LineItemValidator.validate('My template name here', 'name', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('r3gula41n spe#i*l ch&rs?!', 'name', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate('r3gula41n~ spe#i*l ~~ch&rs?!', 'name', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({}, true);
    Code.expect(LineItemValidator.validate(undefined, 'name', formContext).error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate('', 'name', formContext).error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate(null, 'name', formContext).error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate([], 'name', formContext).error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate(10, 'name', formContext).error.details[0].type)
      .to.equal('string.base');
    Code.expect(LineItemValidator.validate('01', 'name', formContext).error.details[0].type)
      .to.equal('string.min');
    Code.expect(LineItemValidator.validate(util.getNLengthStr(101), 'name', formContext).error.details[0].type)
      .to.equal('string.max');
    Code.expect(LineItemValidator.validate('bad/chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad|chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad"chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad\\chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad+chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad~~~chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('bad~~~~~chars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('~~~badchars', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    Code.expect(LineItemValidator.validate('badchars~~~', 'name', formContext).error.details[0].type)
      .to.equal('string.regex.base');
    done();
  });
});

/*eslint dot-notation:0*/
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');

lab.experiment('targetSegments', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate([], 'targetSegments').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([
        {segmentId: 'J10982_10152'},
        {segmentId: 'B08725_50045'},
        {segmentId: 'G07610_11407'}], 'targetSegments').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate([{segmentId: 'J10982_101'}], 'targetSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([{segmentId: '10982_10100'}], 'targetSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate(['a'], 'targetSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([1], 'targetSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([{segId: 'J10982_10152'}], 'targetSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([{segmentId: ''}], 'targetSegments').error.details[0].type)
      .to.equal('array.includesOne');
    done();
  });
});
lab.experiment('excludedSegments', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate([], 'excludedSegments').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([
        {segmentId: 'J10982_10152'},
        {segmentId: 'B08725_50045'},
        {segmentId: 'G07610_11407'}], 'excludedSegments').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate([{segmentId: 'J10982_101'}], 'excludedSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([{segmentId: '10982_10100'}], 'excludedSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate(['a'], 'excludedSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([1], 'excludedSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([{segId: 'J10982_10152'}], 'excludedSegments').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([{segmentId: ''}], 'excludedSegments').error.details[0].type)
      .to.equal('array.includesOne');
    done();
  });
});

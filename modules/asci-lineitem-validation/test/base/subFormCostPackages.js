var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormCostPackages.costPackages', function() {
  lab.test('validate succeeds', function(done) {
    // schema
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.jan['31']['0'] }
    ], 'costPackages').error)
      .to.be['null']();
    // custom: overlaps
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.jan['31']['0'] },
      { startDate: util.dates.feb['1']['0'], endDate: util.dates.feb['28']['0'] },
      { startDate: util.dates.may['1']['0'], endDate: util.dates.may['31']['0'] }
    ], 'costPackages').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['15']['0'], endDate: util.dates.feb['1']['0'] },
      { startDate: util.dates.feb['1']['1'], endDate: util.dates.feb['15']['0'] }
    ], 'costPackages').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    // schema
    Code.expect(LineItemValidator.validate(null, 'costPackages').error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate('I am not an array', 'costPackages').error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate([], 'costPackages').error.details[0].type)
      .to.equal('array.min');
    // custom: overlaps
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.jan['31']['0'] },
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.jan['31']['0'] }
    ], 'costPackages').error.details[0].type)
      .to.equal('array.overlap');
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.feb['1']['0'] },
      { startDate: util.dates.feb['1']['0'], endDate: util.dates.feb['28']['0'] }
    ], 'costPackages').error.details[0].type)
      .to.equal('array.overlap');
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.jan['31']['0'] },
      { startDate: util.dates.jan['15']['0'], endDate: util.dates.feb['15']['0'] }
    ], 'costPackages').error.details[0].type)
      .to.equal('array.overlap');
    Code.expect(LineItemValidator.validate([
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.feb['28']['0'] },
      { startDate: util.dates.jan['15']['0'], endDate: util.dates.feb['15']['0'] }
    ], 'costPackages').error.details[0].type)
      .to.equal('array.overlap');
    done();
  });
});
lab.experiment('subFormCostPackages.endDate', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'endDate').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate(0, 'endDate').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate(1421875110484, 'endDate').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(null, 'endDate').error.details[0].type)
      .to.equal('number.base');
    Code.expect(LineItemValidator.validate('not a number', 'endDate').error.details[0].type)
      .to.equal('number.base');
    done();
  });
});
lab.experiment('subFormCostPackages.flightdates', function() {
  lab.test('validate succeeds', function(done) {
    var formContext = util.getFormContext({ 'subFormCostPackages.costPackages': [] });
    // custom: startDate < endDate
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jan['1']['0'],
      endDate: util.dates.jan['31']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.feb['1']['0'],
      endDate: util.dates.feb['1']['1']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    // custom: flight dates inside budget groups' range
    // ranges should boil down to: jan-mar, may, jul-aug, oct, dec
    formContext.setValue('subFormCostPackages.costPackages', [
      { startDate: util.dates.feb['1']['0'], endDate: util.dates.mar['1']['0'] },
      { startDate: util.dates.aug['1']['0'], endDate: util.dates.aug['31']['0'] },
      { startDate: util.dates.oct['1']['0'], endDate: util.dates.oct['31']['0'] },
      { startDate: util.dates.mar['1']['0'], endDate: util.dates.mar['31']['0'] },
      { startDate: util.dates.may['1']['0'], endDate: util.dates.jun['1']['0'] },
      { startDate: util.dates.jul['1']['0'], endDate: util.dates.aug['1']['0'] },
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.feb['1']['0'] },
      { startDate: util.dates.dec['1']['0'], endDate: util.dates.dec['31']['0'] }
    ]);
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jan['1']['0'],
      endDate: util.dates.feb['1']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jan['15']['0'],
      endDate: util.dates.jan['20']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.may['1']['0'],
      endDate: util.dates.may['31']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    // cross-group ranges
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jan['15']['0'],
      endDate: util.dates.feb['15']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jan['15']['0'],
      endDate: util.dates.mar['15']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jul['1']['0'],
      endDate: util.dates.jul['31']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jul['1']['0'],
      endDate: util.dates.aug['31']['0']
    }, 'flightDates', formContext).error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    var formContext = util.getFormContext({ 'subFormCostPackages.costPackages': [] });
    // custom: startDate >= endDate
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.jan['31']['0'],
      endDate: util.dates.jan['1']['0']
    }, 'flightDates', formContext).error.details[0].type)
      .to.equal('date.order');
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.feb['1']['0'],
      endDate: util.dates.feb['1']['0']
    }, 'flightDates', formContext).error.details[0].type)
      .to.equal('date.order');
    // custom: flight dates inside budget groups' range
    // ranges should boil down to: jan-mar, may, jul-aug, oct, dec
    formContext.setValue('subFormCostPackages.costPackages', [
      { startDate: util.dates.feb['1']['0'], endDate: util.dates.mar['1']['0'] },
      { startDate: util.dates.aug['1']['0'], endDate: util.dates.aug['31']['0'] },
      { startDate: util.dates.oct['1']['0'], endDate: util.dates.oct['31']['0'] },
      { startDate: util.dates.mar['1']['0'], endDate: util.dates.mar['31']['0'] },
      { startDate: util.dates.may['1']['0'], endDate: util.dates.jun['1']['0'] },
      { startDate: util.dates.jul['1']['0'], endDate: util.dates.aug['1']['0'] },
      { startDate: util.dates.jan['1']['0'], endDate: util.dates.feb['1']['0'] },
      { startDate: util.dates.dec['1']['0'], endDate: util.dates.dec['31']['0'] }
    ]);
    // neither start/end date in a budget group range
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.apr['1']['0'],
      endDate: util.dates.apr['30']['0']
    }, 'flightDates', formContext).error.details[0].type)
      .to.equal('range.overlap');
    // end date outside range
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.mar['15']['0'],
      endDate: util.dates.apr['15']['0']
    }, 'flightDates', formContext).error.details[0].type)
      .to.equal('range.overlap');
    // start date outside range
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.apr['15']['0'],
      endDate: util.dates.may['15']['0']
    }, 'flightDates', formContext).error.details[0].type)
      .to.equal('range.overlap');
    // start/end dates in different ranges, spanning non-included range
    Code.expect(LineItemValidator.validate({
      startDate: util.dates.aug['15']['0'],
      endDate: util.dates.oct['15']['0']
    }, 'flightDates', formContext).error.details[0].type)
      .to.equal('range.overlap');
    done();
  });
});
lab.experiment('subFormCostPackages.startDate', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate(undefined, 'startDate').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate(0, 'startDate').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate(1421875110484, 'startDate').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate(null, 'startDate').error.details[0].type)
      .to.equal('number.base');
    Code.expect(LineItemValidator.validate('not a number', 'startDate').error.details[0].type)
      .to.equal('number.base');
    done();
  });
});

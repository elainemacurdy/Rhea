var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var LineItemValidator = require('../../asci-lineitem-validation');
var util = require('../../lib/test/util');

lab.experiment('subFormDaypart.targetDayParts', function() {
  lab.test('validate succeeds', function(done) {
    Code.expect(LineItemValidator.validate([], 'targetDayParts').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    })], 'targetDayParts').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([util.getDaypart({
      friday: true,
      saturday: true,
      sunday: true
    })], 'targetDayParts').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([util.getDaypart({
      saturday: true,
      sunday: true
    }), util.getDaypart({
      tuesday: true
    })], 'targetDayParts').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([util.getDaypart({
      tuesday: true,
      saturday: true,
      sunday: true
    }), util.getDaypart({
      tuesday: true,
      startHour: 18,
      endHour: 23
    })], 'targetDayParts').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([util.getDaypart({
      thursday: true,
      sunday: true
    }), util.getDaypart({
      monday: true,
      sunday: true,
      startHour: 17,
      endHour: 20
    })], 'targetDayParts').error)
      .to.be['null']();
    Code.expect(LineItemValidator.validate([util.getDaypart({
      wednesday: true,
      thursday: true,
      sunday: true
    }), util.getDaypart({
      monday: true,
      sunday: true,
      startHour: 17,
      endHour: 20
    })], 'targetDayParts').error)
      .to.be['null']();
    done();
  });
  lab.test('validate fails', function(done) {
    Code.expect(LineItemValidator.validate('unknown', 'targetDayParts').error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate(null, 'targetDayParts').error.details[0].type)
      .to.equal('array.base');
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: undefined
    })], 'targetDayParts').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: true,
      startHour: undefined
    })], 'targetDayParts').error.details[0].type)
      .to.equal('any.required');
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: true,
      startHour: 24
    })], 'targetDayParts').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: true,
      endHour: 0
    })], 'targetDayParts').error.details[0].type)
      .to.equal('array.includesOne');
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: true,
      startHour: 17,
      endHour: 9
    })], 'targetDayParts').error.details[0].type)
      .to.equal('date.order');
    Code.expect(LineItemValidator.validate([util.getDaypart({
      monday: true,
      startHour: 10,
      endHour: 10
    })], 'targetDayParts').error.details[0].type)
      .to.equal('date.order');
    done();
  });
});

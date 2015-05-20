var _ = require('lodash');

var util = {
  dates: {
    jan: {
      1: { 0: new Date(2015, 0, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 0, 15, 0, 0, 0, 0).valueOf() },
      20: { 0: new Date(2015, 0, 20, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 0, 31, 0, 0, 0, 0).valueOf() }
    },
    feb: {
      1: {
        0: new Date(2015, 1, 1, 0, 0, 0, 0).valueOf(),
        1: new Date(2015, 1, 1, 0, 0, 0, 1).valueOf()
      },
      15: { 0: new Date(2015, 1, 15, 0, 0, 0, 0).valueOf() },
      28: { 0: new Date(2015, 1, 28, 0, 0, 0, 0).valueOf() }
    },
    mar: {
      1: { 0: new Date(2015, 2, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 2, 15, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 2, 31, 0, 0, 0, 0).valueOf() }
    },
    apr: {
      1: { 0: new Date(2015, 3, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 3, 15, 0, 0, 0, 0).valueOf() },
      30: { 0: new Date(2015, 3, 30, 0, 0, 0, 0).valueOf() }
    },
    may: {
      1: { 0: new Date(2015, 4, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 4, 15, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 4, 31, 0, 0, 0, 0).valueOf() }
    },
    jun: {
      1: { 0: new Date(2015, 5, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 5, 15, 0, 0, 0, 0).valueOf() },
      30: { 0: new Date(2015, 5, 30, 0, 0, 0, 0).valueOf() }
    },
    jul: {
      1: { 0: new Date(2015, 6, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 6, 15, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 6, 31, 0, 0, 0, 0).valueOf() }
    },
    aug: {
      1: { 0: new Date(2015, 7, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 7, 15, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 7, 31, 0, 0, 0, 0).valueOf() }
    },
    sep: {
      1: { 0: new Date(2015, 8, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 8, 15, 0, 0, 0, 0).valueOf() },
      30: { 0: new Date(2015, 8, 30, 0, 0, 0, 0).valueOf() }
    },
    oct: {
      1: { 0: new Date(2015, 9, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 9, 15, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 9, 31, 0, 0, 0, 0).valueOf() }
    },
    nov: {
      1: { 0: new Date(2015, 10, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 10, 15, 0, 0, 0, 0).valueOf() },
      30: { 0: new Date(2015, 10, 30, 0, 0, 0, 0).valueOf() }
    },
    dec: {
      1: { 0: new Date(2015, 11, 1, 0, 0, 0, 0).valueOf() },
      15: { 0: new Date(2015, 11, 15, 0, 0, 0, 0).valueOf() },
      31: { 0: new Date(2015, 11, 31, 0, 0, 0, 0).valueOf() }
    }
  },

  getClosure: function(fn, closureArgs) {
    if (!_.isArray(closureArgs)) {
      closureArgs = [closureArgs];
    }
    return function(done) {
      var args = closureArgs;
      args.unshift(done);
      fn.apply(this, args);
    }
  },
  getDaypart: function(overrides) {
    var defaultDaypart = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      startHour: 9,
      endHour: 17
    };
    var daypart = _.extend({}, defaultDaypart, overrides);
    for (var key in daypart) {
      if (daypart[key] === undefined) {
        daypart = _.omit(daypart, key);
      }
    }
    return daypart;
  },
  getFormContext: function(attributes, isTemplate) {
    var setValueByRef = function(ref, value) {
      var refs = ref.split('.');
      var node = formContext._fieldViews;
      for (var i = 0; i < refs.length; i++) {
        if (!node[refs[i]]) {
          node[refs[i]] = {};
        }
        if (i < refs.length - 1) {
          if (!node[refs[i]]._fieldViews) {
            node[refs[i]]._fieldViews = {};
          }
          node = node[refs[i]]._fieldViews;
        } else {
          node[refs[i]].value = value;
        }
      }
      formContext.value[refs[refs.length - 1]] = value;
    };
    var formContext = {
      _fieldViews: {},
      isTemplate: isTemplate || false,
      value: {},
      getData: function() { return this.value; },
      setValue: setValueByRef
    };
    for (var key in attributes) {
      setValueByRef.bind(formContext)(key, attributes[key]);
    }
    return formContext;
  },
  getNLengthStr: function(n) {
    var multiplicand = Math.floor(n / 10);
    var remainder = n % 10;
    var str = '';
    for (var i = 0; i < multiplicand; i++) {
      for (var j = 0; j < 10; j++) {
        str += j;
      }
    }
    for (var k = 0; k < remainder; k++) {
      str += k;
    }
    return str;
  }
};

module.exports = util;

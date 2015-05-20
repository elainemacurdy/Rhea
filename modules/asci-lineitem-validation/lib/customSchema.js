/*eslint no-cond-assign:0*/

// what error messages look like
// ok
// { error: null, value: [ 'MOBILE_APP' ] }
//
// error
// { error:
//    { name: 'ValidationError',
//      details: [ [Object] ],
//      _object: [ 'MOBILE_AP' ],
//      annotate: [Function] },
//   value: [ 'MOBILE_AP' ] }

var _ = require('lodash');
var language = require('./en_US/language');
var moment = require('moment');

var internal = {
  _areBudgetGroupsContiguous: function(budgetGroup1, budgetGroup2) {
    var startDate1 = internal._getMoment(budgetGroup1.startDate);
    var endDate1 = internal._getMoment(budgetGroup1.endDate);
    var startDate2 = internal._getMoment(budgetGroup2.startDate);
    var endDate2 = internal._getMoment(budgetGroup2.endDate);
    return (endDate1.isSame(startDate2) || endDate2.isSame(startDate1)) ? true : false;
  },
  _areBudgetGroupsOverlapping: function(budgetGroup1, budgetGroup2) {
    var startDate1 = internal._getMoment(budgetGroup1.startDate);
    var endDate1 = internal._getMoment(budgetGroup1.endDate);
    var startDate2 = internal._getMoment(budgetGroup2.startDate);
    var endDate2 = internal._getMoment(budgetGroup2.endDate);
    return (startDate1.isSame(startDate2) || endDate1.isSame(startDate2)
      || startDate1.isBetween(startDate2, endDate2) || endDate1.isBetween(startDate2, endDate2)
      || startDate2.isBetween(startDate1, endDate1) || endDate2.isBetween(startDate1, endDate1)) ? true : false;
  },
  _getCollapsedBudgetGroupRanges: function(budgetGroups) {
    var ranges = budgetGroups.slice();
    for (var pointer = 0; pointer < ranges.length; pointer++) {
      var compare = -1;
      while (++compare < ranges.length) {
        if (compare !== pointer) {
          if (internal._areBudgetGroupsContiguous(ranges[pointer], ranges[compare])) {
            // new range encompassing both budget groups' ranges
            var newRange = {
              startDate: Math.min(ranges[pointer].startDate, ranges[compare].startDate),
              endDate: Math.max(ranges[pointer].endDate, ranges[compare].endDate)
            };
            // splice both pointer and compare out of ranges, and add the new range at the current position
            ranges.splice(pointer, 1, newRange);
            // make sure 'compare' checks the same index next go around, as there will be a new element at
            // that position after the splice
            ranges.splice(compare--, 1);
          }
        }
      }
    }
    return ranges;
  },
  _getError: function(messageKey) {
    var message = language.getMessage(messageKey);
    var type = messageKey.replace(/^[^.]+\./, '');
    return {
      name: 'ValidationError',
      details: [{
        message: message,
        type: type
      }]
    };
  },
  _getMoment: function(ts) {
    return (ts) ? moment(ts) : null;
  },
  _hasNumericValue: function(value) {
    // these are the 'legal' values for 'no value' in a number field
    return ((value === '') || (value === undefined)) ? false : true;
  }
};

// FIXME because of the way formContext is integrated into each validation method concerns are mixed up,
// we should think about decoupling the form and the validation entirely from one another
// first step could be to have an extractor method per attribute which aquires the information from the form

var custom = {
  // make sure none of the selected budget groups overlaps
  costPackages: function(value, options) {
    var validation = { error: null, value: value };
    if (!validation.error && value && value.length) {
      for (var i = 0; i < value.length; i++) {
        for (var j = i + 1; j < value.length; j++) {
          if (internal._areBudgetGroupsOverlapping(value[i], value[j])) {
            validation.error = internal._getError('costPackages.array.overlap');
            break;
          }
        }
        if (validation.error) {
          break;
        }
      }
    }
    return validation;
  },
  // startDate < endDate, and check for dates outside the range of any seleted budget groups
  flightDates: function(value, options) {
    var validation = { error: null, value: value };
    var startDate = internal._getMoment(value.startDate);
    var endDate = internal._getMoment(value.endDate);
    var budgetGroups = options.context.costPackages;
    if (!validation.error && startDate && endDate) {
      if (!endDate.isAfter(startDate)) {
        validation.error = internal._getError('flightDates.date.order');
      } else if (budgetGroups && budgetGroups.length) {
        // make sure the selected dates fall inside at least one selected budget group ranges
        var collapsedRanges = internal._getCollapsedBudgetGroupRanges(budgetGroups);
        validation.error = internal._getError('flightDates.range.overlap');
        for (var i = 0; i < collapsedRanges.length; i++) {
          var rangeStartDate = internal._getMoment(collapsedRanges[i].startDate);
          var rangeEndDate = internal._getMoment(collapsedRanges[i].endDate);
          if ((startDate.isAfter(rangeStartDate) || startDate.isSame(rangeStartDate))
            && (endDate.isBefore(rangeEndDate) || endDate.isSame(rangeEndDate))) {
            validation.error = null;
            break;
          }
        }
      }
    }
    return validation;
  },
  // mostly duplicating joi's string.hostname method, because theirs doesn't work (but ours does)
  manualBlacklist: function(value, options) {
    var validation = { error: null, value: value };
    if (value && value.items) {
      for (var i = 0; i < value.items.length; i++) {
        var pattern = value.items[i].pattern;
        var hostnameRE = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
        if (!hostnameRE.test(pattern)) {
        // if ((pattern.length > 255 || !hostnameRE.test(pattern)) && !Net.isIPv6(pattern)) {
          validation.error = internal._getError('manualBlacklist.string.hostname');
          break;
        }
      }
    }
    return validation;
  },
  // at least one of the 8 geo fields needs to contain a value
  subFormGeo: function(value, options) {
    var validation = { error: null, value: value };
    var geosPresent;

    geosPresent = _.some(_.keys(value), function(key) {
      return value[key] && value[key].length >= 1;
    });

    if (!geosPresent && !options.context.isTemplate) {
      validation.error = internal._getError('subFormGeo.any.required');
    }

    return validation;
  },
  // subFormProviders also populates the customTargets attribute (an array) with 3 special keys for subproviders,
  // if any of those values is present with an entry that also counts towards the minimum count of providers of 1
  subFormProviders: function(value, options) {
    var validation = { error: null, value: value };
    var customTargets = options.context.customTargets;
    var subproviderPresent;
    var subProviders = [
      'APPNEXUS_SELLING_MEMBER_ID',
      'OPENRTB_PROVIDER',
      'RIGHTMEDIA_SELLER_SEAT'
    ];

    if (options.context.lineItemType === 'RTB' && !options.context.isTemplate) {
      subproviderPresent = _.some(subProviders, function(providerKey) {
        var subproviderTargets = _.find(customTargets, { attribute: providerKey });
        if (subproviderTargets && subproviderTargets.values.length >= 1) {
          return true;
        }
      });
      if (value.length === 0 && !subproviderPresent) {
        validation.error = internal._getError('subFormProviders.array.min');
      }
    }

    return validation;
  },
  targetDayParts: function(value, options) {
    var validation = { error: null, value: value };
    if (!validation.error && value && value.length) {
      for (var i = 0; i < value.length; i++) {
        var part = value[i];
        if (!(_.has(part, 'monday') && _.has(part, 'tuesday') && _.has(part, 'wednesday') && _.has(part, 'thursday')
          && _.has(part, 'friday') && _.has(part, 'saturday') && _.has(part, 'sunday'))) {
          validation.error = internal._getError('targetDayParts.any.required');
        } else if (!(_.has(part, 'startHour') && _.has(part, 'endHour'))) {
          validation.error = internal._getError('targetDayParts.any.required');
        } else if (part.startHour >= part.endHour) {
          validation.error = internal._getError('targetDayParts.date.order');
        }
      }
    }
    return validation;
  }
};

module.exports = custom;

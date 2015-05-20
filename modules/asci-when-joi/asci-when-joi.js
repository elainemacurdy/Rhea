/*eslint no-use-before-define:1*/
var _ = require('lodash');
var Joi = require('joi');

var compareFunctions = {
  equalPrimitive: function(value, compare) {
    if (compare === WhenJoi.falsey()) {
      // if value is falsey, return true
      return (!value) ? true : false;
    } else {
      return (value === compare) ? true : false;
    }
  },
  notEqualPrimitive: function(value, compare) {
    if (compare === WhenJoi.falsey()) {
      // if value is not falsey, return true
      return (value || (value === 0)) ? true : false;
    } else {
      return (value !== compare) ? true : false;
    }
  },
  emptyPrimitive: function(value, compare) {
    if (compare === WhenJoi.falsey()) {
      return !_.isEmpty(value);
    } else {
      return _.isEmpty(value);
    }
  }
};

var WhenJoi = {
  falsey: function() {
    return '__asci-when-joi:falsey';
  },
  /**
   * Validate the given value against the given asci-when-joi schema.
   * @param {Object} value Value to validate
   * @param {Object} schema Schema containing 'when' entries to parse
   * @param {Object} options Validation options. Entries include:
   *    fieldName {String} Name of field currently being validated
   *    context {Object} Collection of values representing the other fields in the form
   *    languageDict {Object} Dict that has a 'get' method which returns a Joi-style language object.
   */
  validate: function(value, schema, options) {
    var validation = { error: null, value: value };

    // if a joi-style language dict was specified, set the 'language' attribute on the validate options
    // this controls how error messages get resolved
    if (options.languageDict && options.fieldName) {
      if (!options.languageDict.get) {
        throw new ReferenceError('The passed value for languageDict does not contain a "get" method.');
      }
      options.language = options.languageDict.get(options.fieldName);
      options = _.omit(options, 'languageDict');
    }

    if (schema.when) {
      if (!schema.when.length) {
        schema.when = [schema.when];
      }
      for (var i=0; i<schema.when.length; i++) {
        var when = schema.when[i];
        if (!when.test.length) {
          when.test = [when.test];
        }
        var testResult = true;
        for (var j=0; j<when.test.length; j++) {
          var test = when.test[j];
          var testFieldName = test.name.replace(/^\$/, '');
          var testFieldValue = options.context[testFieldName];
          if (_.has(test, 'is')) {
            testResult = compareFunctions.equalPrimitive(testFieldValue, test.is);
          } else if (_.has(test, 'isNot')) {
            testResult = compareFunctions.notEqualPrimitive(testFieldValue, test.isNot);
          } else if (_.has(test, 'isEmpty')) {
            testResult = compareFunctions.emptyPrimitive(testFieldValue, test.isEmpty);
          }
          if (!testResult) {
            break;
          }
        }
        if (testResult && when.then) {
          validation = Joi.validate(value, when.then, options);
        } else if (!testResult && when.otherwise) {
          validation = Joi.validate(value, when.otherwise, options);
        }
        if (validation.error) {
          break;
        }
      }
    }

    return validation;
  }
};

module.exports = WhenJoi;

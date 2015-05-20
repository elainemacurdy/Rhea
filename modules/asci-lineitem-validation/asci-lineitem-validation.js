/*eslint no-use-before-define:1*/
var bows = require('bows');
var extendObject = require('extend-object');
var Joi = require('joi');
var log = bows('LI Validation');
var util = require('util');
var WhenJoi = require('../asci-when-joi');

var baseSchema = require('./lib/baseSchema');
var customSchema = require('./lib/customSchema');
var language = require('./lib/en_US/language');
var whenSchema = require('./lib/whenSchema');

var internals = {
  addCustomFields: function(formContext, formValue, updatedFieldData) {
    var customFields = {};
    var testContext;

    // copy the value currently being updated over to the data set
    customFields[updatedFieldData.name] = updatedFieldData.value;

    // now we copy over the frequencyCapType, as it is not part of the lineitem data set
    if (formContext && formContext._fieldViews && formContext._fieldViews.subFormFrequencyCap
      && formContext._fieldViews.subFormFrequencyCap._fieldViews.frequencyCapType) {
      customFields.frequencyCapType = formContext._fieldViews.subFormFrequencyCap._fieldViews.frequencyCapType.value;
    }

    // copy over the value for isTemplate
    customFields.isTemplate = (formContext && formContext.isTemplate) || false;

    // add testContext attributes for testability
    testContext = (formContext && formContext.testContext);
    if (testContext && typeof testContext === 'object') {
      customFields = extendObject({}, customFields, testContext);
    }

    return extendObject({}, formValue, customFields);
  },
  stripMessagePrefix: function(error) {
    error.details[0].message = error.details[0].message.replace(/^joi\s*/i, '');
    error.message = error.details[0].message;
  }
};

var LineitemValidation = {
  /**
   * does a lookup in the errorMessages collection, only en_US so far
   *
   * @param {String} name Key to lookup in error messages
   * @param {String} code When given a string prefix (delimited by .) as name, code becomes the last part
   * @param {Object} options Key-value pairs to use when interpolating variables
   */
  getMessage: function(name, code, options) {
    var lookup = [name];
    if (!options) {
      options = code;
    } else {
      lookup.push(code);
    }
    if (options && typeof options !== 'object') {
      throw new TypeError('code must be an object if used without 3rd argument');
    }

    return language.getMessage(lookup.join('.'));
  },

  // blind search through all known schemas to see if anything has an entry for this field
  hasValidationRules: function(validateFieldName) {
    if (baseSchema[validateFieldName] || whenSchema[validateFieldName] || customSchema[validateFieldName]) {
      return true;
    }
    return false;
  },

  validate: function(value, attributes, formContext) {
    // Terrible. But the only way to fool joi's base type tests into understanding that "" means "not specified",
    // which effectively for an HTML form, it does.
    if (value === '') {
      value = undefined;
    }
    var baseSchemaFunction, customFunction, whenSchemaFunction;
    var formValue = (formContext && formContext.value) ? formContext.getData() : null;
    var schemaOptions = {
      context: internals.addCustomFields(formContext, formValue, {
        name: attributes,
        value: value
      })
    };

    baseSchemaFunction = baseSchema[attributes] || null;
    whenSchemaFunction = whenSchema[attributes] || null;
    customFunction = customSchema[attributes] || null;

    var validation = { error: null, value: value };

    if (baseSchemaFunction) {
      // use the form's value to validate the schema, as a flat structure works best
      validation = Joi.validate(value, baseSchemaFunction, schemaOptions);
    }

    if (!validation.error && whenSchemaFunction) {
      var whenSchemaOptions = {
          fieldName: attributes,
          context: schemaOptions.context,
          languageDict: language
      };
      validation = WhenJoi.validate(value, whenSchemaFunction, whenSchemaOptions);
    }

    if (!validation.error && customFunction) {
      // use the form object itself to validate the custom schema, as it contains useful data that isn't in the value.
      // allow for customFunction to override an error when it sees fit
      validation = customFunction(value, schemaOptions);
    }

    if (validation.error) {
      // disabled by default
      // enable the log contents with "localStorage.debug = true" in the console and refresh
      // disable again with "delete localStorage.debug" and refresh
      log(attributes, util.inspect(validation));

      // strip off the 'joi ' prefix on the error message that gets added by joi
      internals.stripMessagePrefix(validation.error);
    }

    return validation;
  }
};

module.exports = LineitemValidation;

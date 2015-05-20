/*eslint no-undef:1, no-loop-func:1*/
var $ = require('jquery');
var _ = require('lodash');
var BaseView = require('../asci-base-view');
var extendObject = require('extend-object');
var LineitemValidation = require('../asci-lineitem-validation');

var templates = require('./templates');

var result = function (obj, prop) {
  if (typeof obj[prop] === 'function') {
    return obj[prop]();
  }
  return prop;
};

var SubFormView = BaseView.extend({
  bindings: {
    className: {
      type: 'class'
    },
    hasSeparator: {
      type: 'booleanClass'
    },
    label: {
      type: 'text',
      selector: '[data-hook="label"]'
    },
    message: {
      type: 'text',
      hook: 'subform-message-text'
    },
    showMessage: {
      type: 'toggle',
      hook: 'subform-message-container'
    },
    name: {
      type: 'attribute',
      name: 'data-hook'
    }
  },
  derived: {
    showMessage: {
      deps: ['valid', 'shouldValidate', 'message'],
      fn: function () {
        return !!(this.shouldValidate && this.message && !this.valid);
      }
    },
    valid: {
      cache: false, // necessary because fields failing validation won't update their values
      deps: ['value', 'message'],
      fn: function () {
        // have to hit the 'valid' prop on every field, or fields with previous errors won't get reset if fixed
        var areAllFieldsValid = true;
        for (var name in this._fieldViews) {
          if (!this._fieldViews[name].valid) {
            areAllFieldsValid = false;
          }
        }
        return (areAllFieldsValid && !this.runTests()) ? true : false;
      }
    }
  },
  props: {
    className: ['string', false, 'form'],
    hasSeparator: ['boolean', true, true],
    label: 'string',
    message: 'string',
    // TODO this should be ['string', true] to make name a required prop
    name: 'string',
    parent: 'any',
    parentDependencies: 'array',
    parentValue: ['object', true, function() { return {}; }], // local reference to parent values declared in parentDependencies
    shouldValidate: ['boolean', true, false],
    suppressFields: 'array',
    // for testing only, allows to pass in extra context for validation, see asci-lineitem-validation#addCustomFields
    testContext: ['object', false],
    tests: 'array',
    // FIXME this should be ['any', true] to make value a required prop (brandsafelist blocks that)
    value: 'any'
  },
  template: templates.form,

  initialize: function (opts) {
    this.autoAppend = opts.autoAppend === false ? false : true;

    // storage for our fields
    this._fieldViews = {};
    this._fieldViewsArray = [];
    if (opts.template) {
      this.template = opts.template;
    }

    if (this.parent && typeof this.parent.on === 'function') {
      this.listenTo(this.parent, 'fieldFocus', this.handleFieldFocus);
      if (this.parentDependencies && this.parentDependencies.length) {
        this.listenTo(this.parent, 'change:value', function() {
          var parentValue = extendObject({}, this.parentValue);
          var hasChanged = false;
          for (var i = 0; i < this.parentDependencies.length; i++) {
            var propName = this.parentDependencies[i];
            // push any changed values to the new object
            if (this.parentValue[propName] !== this.parent.value[propName]) {
              hasChanged = true;
              parentValue[propName] = this.parent.value[propName];
            }
          }
          if (hasChanged) {
            this.set('parentValue', parentValue);
          }
        });
      }
    }

    // two ways the 'valid' property gets a change event:
    //      1) this view's 'value' changes, triggering the derived 'valid' property to change
    //      2) one of the child subforms' 'valid' property changes, which as per the below, will trigger a change
    //         event on the parent.
    this.listenTo(this, 'change:valid', function() {
      if (this.parent && this.parent.trigger) {
        this.parent.trigger('change:valid', this);
      }
    });

    this.render();

    // only render the fields when we have values to plug in, either from this.value or from a synced model
    if (!this.model || this.model.get('isSynced')) {
      this.renderFields(opts);
    }
  },
  render: function () {
    if (this.rendered) {
      return;
    }
    if (!this.el) {
      if (this.template) {
        this.renderWithTemplate();
      } else {
        this.el = document.createElement('div');
      }
    }
    if (this.autoAppend) {
      this.fieldContainerEl = this.el.querySelector('[data-hook~=field-container]') || this.el;
    }

    return this;
  },
  renderFields: function(opts) {
    if (!opts) {
      opts = {};
    }
    // TODO in the ampersand module this is expressed differently but forEach is apparently not avaliable
    // in the browser that tap-run uses, or i'm missing something
    // (opts.fields || result(this, 'fields') || []).forEach(this.addField.bind(this));
    var fields = (opts.fields || result(this, 'fields') || []);
    for (var i = 0, field; field = fields[i]; i++ ) {
      this.addField.bind(this)(field);
    }
  },

  addField: function (fieldView, fieldContainerEl) {
    this._fieldViews[fieldView.name] = fieldView;
    this._fieldViewsArray.push(fieldView);
    if (!fieldContainerEl) {
      fieldContainerEl = this.fieldContainerEl;
    }
    if (fieldContainerEl) {
      fieldView.parent = this;
      fieldView.render();
      fieldContainerEl.appendChild(fieldView.el);
    }
    var target = (this.parent instanceof SubFormView) ? this.parent : this;
    this.listenTo(target, 'serviceValidationFailure:' + fieldView.name, this.handleServiceValidationFailure.bind(this));
  },
  beforeSubmit: function () {
    this._fieldViewsArray.forEach(function (field) {
      if (field.beforeSubmit) {
        field.beforeSubmit();
      }
    });
    this.shouldValidate = true;
    this.runTests();
  },
  clean: function (value) {
    return value;
  },
  getData: function () {
    var res = {};
    // getData can run as a result of field instantiation, *before* _fieldViews has been populated.
    // When that happens it returns {}, instead of the valid value.
    var hasFields = false;
    for (var key in this._fieldViews) {
      res[key] = (this._fieldViews[key].getValue) ? this._fieldViews[key].getValue() : this._fieldViews[key].value;
      hasFields = true;
    }
    if (hasFields) {
      res = this.clean(res);
    } else {
      res = this.value;
    }

    return res;
  },
  getErrorMessage: function () {
    var message = '';
    (this.tests || []).some(function (test) {
      message = test.call(this, this.value) || '';
      return message;
    }, this);
    return message;
  },
  getField: function (name) {
    return this._fieldViews[name];
  },
  // handler for intercepting focus events on fields outside this subform, enabling this form to execute specific
  // actions on its own fields. E.g. closing an open subsection if another field gets focus.
  handleFieldFocus: function(name) {},
  handleFocus: function(e) {
    e.preventDefault();
    var name = e.target.getAttribute('name');
    if (!name) {
      var parents = $(e.target).parentsUntil('.formComponent');
      name = parents[parents.length-1].parentNode.getAttribute('data-hook');
    }
    this.trigger('fieldFocus', name);
  },
  handleServiceValidationFailure: function(errorJson) {
    var field = this._fieldViews[errorJson.field];
    if (field && field.serviceErrorMessages) {
      var message = LineitemValidation.getMessage(errorJson.field, errorJson.error, field);
      field.serviceErrorMessages.add(message);
    }
    return true;
  },
  handleSubmit: function () {
    this.beforeSubmit();
    return this.valid;
  },
  handleSubmitResponse: function(model, json, response, callbacks) {},
  hideField: function(name) {
    this.getField(name).el.style.display = 'none';
  },
  remove: function () {
    // you could do it with vanilla JS like this
    var parent = this.el.parentNode;
    if (parent) {
      parent.removeChild(this.el);
    }
    this._fieldViewsArray.forEach(function (field) {
      field.remove();
    });
  },
  removeField: function (name) {
    // FIXME fieldView is not defined
    delete this._fieldViews[fieldView.name];
    // FIXME field is not defined
    this._fieldViewsArray.splice(this._fieldViewsArray.indexOf(field), 1);
    this.getField(name).remove();
  },
  reportToParent: function () {
    // Can't just check on the existence of parent, as even when this form does not have a form parent it will have
    // an AmpersandView parent. Can't think of a better way to test for that atm.
    if (this.parent && this.parent.update) {
      this.parent.update(this);
    }
  },
  runTests: function () {
    this.message = this.getErrorMessage();
    return this.message;
  },
  setValue: function (value) {
    if (value) {
      this.value = value;
    } else {
      this.value = this.getData();
    }

    // if there is a parent call update
    this.reportToParent();
  },
  submit: function(callbacks) {
    var returnValue = false;
    if (this.model) {
      if (!this.handleSubmit()) {
        // alert(i18n.INVALID_FORM_DATA_MESSAGE);
        this.parent.set('state', 'error'); // button goes back to "Save"
      } else {
        this.listenToOnce(this.model, 'sync', function(model, json, response) {
          this.handleSubmitResponse(model, json, response, callbacks);
        }.bind(this));
        this.model
          .clear()
          .set(this.getData())
          .save();
        returnValue = true;
      }
    }
    return returnValue;
  },
  showField: function(name) {
    this.getField(name).el.style.display = '';
  },
  update: function (field) {
    this._resetServiceErrorMessages(field);
    this.setValue();
    this.trigger('change:' + field.name, field);
  },

  _getFieldOptions: function(fieldSpecificOptions) {
    var defaults = {
      parent: this,
      suppressFields: this.suppressFields
    };
    // if validation rules are found for this field, add the default test
    if (LineitemValidation.hasValidationRules(fieldSpecificOptions.name)) {
      defaults.tests = [
        function(val, formContext) {
          var error = LineitemValidation.validate(val, this.name, formContext).error;
          return error && error.details[0].message;
        }
      ];
    }
    // override defaults with specific options
    var options = extendObject(defaults, fieldSpecificOptions);
    // take whatever tests we ended up with, wrap them in a closure that captures the topForm reference
    var topForm = this;
    while (topForm.parent && topForm.parent.value) {
      topForm = topForm.parent;
    }
    if (options.tests && options.tests.length) {
      for (var i=0; i<options.tests.length; i++) {
        var test = options.tests[i];
        options.tests[i] = function(val) {
          return test.call(this, val, topForm);
        };
      }
    }
    return options;
  },
  _getFields: function(allFields) {
    var fields = [];
    for (var name in allFields) {
      if (!this.suppressFields || !_.contains(this.suppressFields, name)) {
        fields.push(allFields[name].call(this));
      }
    }
    return fields;
  },
  // retrieve a filtered list of select options, removing any that represent (as in hide/show) suppressed fields
  _getSelectOptions: function(allOptions) {
    var options = [];
    for (var i=0; i<allOptions.length; i++) {
      // option values are a comma-separated list of all the field names they represent
      var optionValues = allOptions[i][0].split(',');
      for (var j=0; j<optionValues.length; j++) {
        if (!_.contains(this.suppressFields, optionValues[j])) {
          options.push(allOptions[i]);
          break; // show this option as soon as we find even one displayed field it represents
        }
      }
    }
    return options;
  },
  _resetServiceErrorMessages: function(field, isForce) {
    // when the user changes the value at all, kill any pre-existing service error messages
    if (isForce || (field.hasChanged && field.hasChanged('value')
        && field.serviceErrorMessages && field.serviceErrorMessages.length)) {
      field.serviceErrorMessages.reset();
    }
  }
});

module.exports = SubFormView;

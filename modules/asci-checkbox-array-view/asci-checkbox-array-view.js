var View = require('ampersand-view');
var CheckboxView = require('../asci-checkbox-view');

var templates = require('./templates');

var result = function(obj, prop) {
  if (typeof obj[prop] === 'function') {
    return obj[prop]();
  }
  return prop;
};

var CheckboxArrayView = View.extend({
  bindings: {
    hasSeparator: {
      type: 'booleanClass'
    },
    name: {
      type: 'attribute',
      name: 'data-hook'
    },
    label: [{
      hook: 'arrayLabel'
    }, {
      type: 'toggle',
      hook: 'arrayLabel'
    }],
    message: {
      type: 'text',
      hook: 'message-text'
    },
    showMessage: {
      type: 'toggle',
      hook: 'message-container'
    }
  },
  derived: {
    changed: {
      deps: ['value', 'startingValue'],
      fn: function() {
        return this.value !== this.startingValue;
      }
    },
    showMessage: {
      deps: ['message', 'shouldValidate'],
      fn: function () {
        return this.shouldValidate && this.message;
      }
    },
    valid: {
      cache: false,
      deps: ['value'],
      fn: function() {
        return !this.runTests();
      }
    }
  },
  events: {
    'blur input': 'handleBlur'
  },
  props: {
    hasSeparator: ['boolean', true, false],
    label: ['string', true, ''],
    message: ['string', true, ''],
    name: 'string',
    requiredMessage: ['string', true, 'This field is required.'],
    shouldValidate: ['boolean', true, false],
    value: 'any'
  },
  template: templates.form,

  initialize: function(spec) {
    this.options = spec.options;
    this.tests = this.tests || spec.tests || [];
    this.template = spec.template || this.template;

    this.autoAppend = spec.autoAppend === false ? false : true;

    this.render();

    // storage for our fields
    this._fieldViews = {};
    this._fieldViewsArray = [];

    (spec.fields || result(this, 'fields') || []).forEach(this.addField.bind(this));

    this.setValue(spec.value);
    this.on('change:valid change:value', this.reportToParent, this);
  },
  render: function() {
    if (this.rendered) {
      return;
    }
    this.renderWithTemplate();

    if (this.autoAppend) {
      this.fieldContainerEl = this.el.querySelector('[data-hook~=field-container]') || this.el;
    }

    this.initInputBindings();
  },

  addField: function(fieldView) {
    this._fieldViews[fieldView.name] = fieldView;
    this._fieldViewsArray.push(fieldView);
    if (this.fieldContainerEl) {
      fieldView.parent = this;
      fieldView.render();
      this.fieldContainerEl.appendChild(fieldView.el);
    }
  },
  beforeSubmit: function() {
    this.shouldValidate = true;
    this.runTests();
  },
  clean: function() {},
  fields: function() {
    return this.options.map(function(option) {
      return new CheckboxView({
        template: templates.field,
        label: option[1],
        name: option[0],
        value: this.value.indexOf(option[0]) !== -1,
        valueAttribute: option[0],
        parent: this
      });
    }.bind(this));
  },
  getData: function() {
    var value = [];
    this._fieldViewsArray.forEach(function(field) {
      if (field.value) {
        value.push(field.valueAttribute);
      }
    });
    return value;
  },
  getErrorMessage: function() {
    var message = '';
    if (this.required && !this.value) {
      return this.requiredMessage;
    } else {
      (this.tests || []).some(function(test) {
        message = test.call(this, this.value) || '';
        return message;
      }, this);
      return message;
    }
  },
  getField: function(name) {
    return this._fieldViews[name];
  },
  handleBlur: function () {
    this.shouldValidate = true;
    this.runTests();
  },
  handleInputChanged: function() {},
  initInputBindings: function() {},
  remove: function() {
    var parent = this.el.parentNode;
    if (parent) {
      parent.removeChild(this.el);
    }
    this._fieldViewsArray.forEach(function(field) {
      field.remove();
    });
  },
  reportToParent: function() {
    if (this.parent) {
      this.parent.update(this);
    }
  },
  runTests: function() {
    this.message = this.getErrorMessage();
    return this.message;
  },
  setValue: function(value) {
    var self = this;
    this.value = value;
    if (!this.value || !this.value.length) {
      this._fieldViewsArray.forEach(function(field) {
        field.setValue(false);
      });
    } else {
      value.forEach(function(name) {
        self.getField(name).setValue(name);
      });
    }
  },
  update: function(field) {
    this.value = this.getData();
  }
});

module.exports = CheckboxArrayView;

var extendObject = require('extend-object');
var InputView = require('ampersand-input-view');
var ValidationErrors = require('../asci-lineitem-validation/collections/ValidationErrors');

var templates = require('./templates');

module.exports = InputView.extend({
  bindings: extendObject(InputView.prototype.bindings, {
    hasSeparator: {
      type: 'booleanClass'
    },
    message: {
      type: 'innerHTML',
      hook: 'message-text'
    },
    name: [
      {
        type: 'attribute',
        selector: 'input, textarea',
        name: 'name'
      },
      {
        type: 'attribute',
        name: 'data-hook'
      }
    ],
    prefix: {
      type: 'innerHTML',
      selector: '[data-hook="prefix"]'
    },
    suffix: {
      type: 'innerHTML',
      selector: '[data-hook="suffix"]'
    }
  }),
  collections: {
    serviceErrorMessages: ValidationErrors
  },
  derived: {
    valid: {
      cache: false,
      deps: ['value'],
      fn: function () {
        return !this.runTests();
      }
    }
  },
  props: {
    hasSeparator: ['boolean', true, false],
    prefix: ['string', false, ''],
    required: ['boolean', true, false],
    suffix: ['string', false, '']
  },

  initialize: function (options) {
    InputView.prototype.initialize.call(this, options);
    this.template = options.template || templates.field;
    this.listenTo(this.serviceErrorMessages, 'add', this.handleChangeServiceErrorMessages.bind(this));
  },

  clean: function (val) {
    var res;

    if (val) {
      if (this.type === 'number') {
        if (typeof val === 'number') {
          val = val + '';
        }
        val = val.replace(/[^0-9\.]/g, '');
        res = ((val === '') ? undefined : parseFloat(val));
      } else if (typeof val === 'string') {
        res = val.trim();
      } else {
        res = val;
      }
    } else {
      res = val;
    }

    return res;
  },
  focus: function() {
    if (this.input) {
      this.input.focus();
    }
  },
  getErrorMessage: function() {
    var errorMessage = InputView.prototype.getErrorMessage.apply(this, arguments);
    if (!errorMessage && this.serviceErrorMessages.length) {
      errorMessage = this.serviceErrorMessages.render();
    }
    return errorMessage;
  },
  handleBlur: function() {
    this.shouldValidate = true;
    this.runTests();
  },
  handleChangeServiceErrorMessages: function() {
    this.shouldValidate = true;
    this.runTests();
  },
  remove: function() {
    // TODO: this terrible hack necessary because some compliance tests call remove() before render().
    if (!this.input) {
      this.input = document.createElement('input');
    }
    InputView.prototype.remove.apply(this, arguments);
  },
  runTests: function () {
    this.message = this.getErrorMessage();
    return this.message;
  },
  select: function() {
    if (this.input) {
      this.input.select();
    }
  },
  // TODO the ampersand original needs render to be called first
  setValue: function (value) {
    this.value = this.clean(value);
    if (this.input) {
      if (!this.value && (this.value !== 0)) {
        this.input.value = '';
      } else {
        this.input.value = this.value.toString();
      }
    }
  }
});

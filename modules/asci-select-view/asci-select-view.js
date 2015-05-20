var $ = require('jquery');
var _ = require('lodash');
var extend = require('ampersand-class-extend');
var AmpersandSelectView = require('ampersand-select-view');
var ValidationErrors = require('../asci-lineitem-validation/collections/ValidationErrors');

var templates = require('./templates');

// http://stackoverflow.com/questions/4152931/javascript-inheritance-call-super-constructor-or-use-prototype-chain
var tmp = function(){};
tmp.prototype = AmpersandSelectView.prototype;
function SelectView(opts) {
  var template = opts.template || templates.field;
  if (_.isFunction(template)) {
    template = template(opts);
  }
  if (_.isElement(template)) {
    var templateWrap = $('<div/>').append(template);
    template = templateWrap.html();
  }
  this.message = '';
  this.shouldValidate = false;
  opts.template = template;
  this.tests = opts.tests || [];
  this.isDisabled = opts.isDisabled;
  this.hasSeparator = opts.hasSeparator;
  this.serviceErrorMessages = new ValidationErrors();
  this.serviceErrorMessages
    .listenTo(this.serviceErrorMessages, 'add reset', this.handleChangeServiceErrorMessages.bind(this));
  this._previous = {};
  AmpersandSelectView.call(this, opts);
}
SelectView.prototype = new tmp();
SelectView.prototype.constructor = SelectView;

SelectView.prototype.beforeSubmit = function () {
  // at the point where we've tried to submit, we want to validate everything from now on.
  this.shouldValidate = true;
  this.validate();
};

SelectView.prototype.bindDOMEvents = function () {
  AmpersandSelectView.prototype.bindDOMEvents.apply(this, arguments);
  $('select', this.el).on('blur', this.handleBlur.bind(this));
};

SelectView.prototype.getMessage = function() {
  var message = '';
  if (this.required && _.isEmpty(this.value)) {
    message = this.requiredMessage;
  } else if (!_.isEmpty(this.value)) {
    var hasValidValue = this.options.some(function (element) {
      //If it's a collection, ensure it's in the collection
      if (this.options.isCollection) {
        if (this.yieldModel) {
          return this.options.indexOf(this.value) > -1;
        } else {
          return !!this.findModelForId(this.value);
        }
      }

      //[ ['foo', 'Foo Text'], ['bar', 'Bar Text'] ]
      if (Array.isArray(element) && element.length === 2) {
        return element[0] === this.value;
      }

      //[ 'foo', 'bar', 'baz' ]
      return element === this.value;
    }.bind(this));
    if (!hasValidValue) {
      message = this.requiredMessage; // weird, but this is what ampersand does
    }
  }
  if (!message) {
    (this.tests || []).some(function (test) {
      message = test.call(this, this.value) || '';
      return message;
    }, this);
  }
  if (!message && this.serviceErrorMessages.length) {
    message = this.serviceErrorMessages.render();
  }
  return message;
};

SelectView.prototype.getOptionTextFromValue = function(value) {
  if (!value) {
    value = this.value;
  }
  var text = this.getOptionText(_.find(this.options, function(option) {
    if (this.getOptionValue(option) === value) {
      return true;
    }
  }, this));
  return text || value;
};

SelectView.prototype.getSelectedOptions = function() {
  if (!this.select) {
    return [];
  }
  if (this.select.selectedOptions) {
    return this.select.selectedOptions;
  }
  var selectedOptions = [];
  for (var i=0; i<this.select.options.length; i++) {
    if (this.select.options[i].selected) {
      selectedOptions.push(this.select.options[i]);
    }
  }
  return selectedOptions;
};

SelectView.prototype.handleBlur = function() {
  this.shouldValidate = true;
  this.validate();
};

SelectView.prototype.handleChangeServiceErrorMessages = function() {
  this.validate();
};

SelectView.prototype.hasChanged = function(attribute) {
  return (this._previous[attribute] !== this[attribute]) ? true : false;
};

SelectView.prototype.remove = function() {
  $('select', this.el).off('blur', this.handleBlur.bind(this));
  AmpersandSelectView.prototype.remove.apply(this, arguments);
};

SelectView.prototype.render = function() {
  AmpersandSelectView.prototype.render.apply(this, arguments);
  if (this.options.isCollection) {
    this.options.on('reset', function () {
      this.renderOptions();
      this.updateSelectedOption();
    }.bind(this));
    this.options.on('remove', function () {
      this.renderOptions();
      this.updateSelectedOption();
    }.bind(this));
  }
};

SelectView.prototype.runTests = function() {
  this.message = this.getMessage();
  return this.message;
};

SelectView.prototype.setIsDisabled = function(isDisabled) {
  this.isDisabled = isDisabled;
  if (this.isDisabled) {
    this.el.querySelector('select').setAttribute('disabled', 'disabled');
  } else {
    this.el.querySelector('select').removeAttribute('disabled');
  }
};

SelectView.prototype.setValue = function(value) {
  if (value !== this.value) {
    this._previous.value = this.value;
  }
  AmpersandSelectView.prototype.setValue.apply(this, arguments);
};

/**
 * Overriding parent validate() because even when the field is not required, it fails when '' is selected.
 */
SelectView.prototype.validate = function () {
  this.runTests();
  this.valid = (this.message) ? false : true;
  this.setMessage((this.shouldValidate) ? this.message : '');
  return this.valid;
};

SelectView.extend = extend;
module.exports = SelectView.extend({
  render: function() {
    SelectView.prototype.render.call(this);
    this.el.setAttribute('data-hook', this.name);
    if (this.hasSeparator) {
      this.el.className += ' hasSeparator';
    }
    if (this.isDisabled) {
      this.el.querySelector('select').setAttribute('disabled', 'disabled');
    }
    return this;
  },
  reset: function() {
    this.options.reset();
    this.setValue();
  },
  remove: function() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    // else {
    // TODO phantom cannot find the parentNode here, why?
    // }
    this.el.removeEventListener('change', this.onChange, false);
  }
});

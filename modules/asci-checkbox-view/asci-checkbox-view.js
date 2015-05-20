var $ = require('jquery');
var _ = require('lodash');
var extend = require('ampersand-class-extend');
var AmpersandCheckboxView = require('ampersand-checkbox-view');
var ValidationErrors = require('../asci-lineitem-validation/collections/ValidationErrors');

var templates = require('./templates');

// this is a bit chaotic, needed to add valueAttribute handling
AmpersandCheckboxView.prototype.handleInputEvent = function () {
  // track whether user has edited directly
  if (document.activeElement === this.input) {
    this.directlyEdited = true;
  }
  if (this.valueAttribute) {
    this.value = this.input.checked && this.valueAttribute;
  } else {
    this.value = this.input.checked;
  }
  this.test();
  if (this.parent) {
    this.parent.update(this);
  }
};

// http://stackoverflow.com/questions/4152931/javascript-inheritance-call-super-constructor-or-use-prototype-chain
var tmp = function(){};
tmp.prototype = AmpersandCheckboxView.prototype;
function CheckboxView(opts) {
  var template = opts.template || templates.field;
  if (_.isFunction(template)) {
    template = template(this);
  }
  if (_.isElement(template)) {
    var templateWrap = $('<div/>').append(template);
    template = templateWrap.html();
  }
  opts.template = template;
  this.inputBindings = opts.inputBindings;
  this.hasSeparator = opts.hasSeparator;
  this.valueAttribute = opts.valueAttribute;
  this.serviceErrorMessages = new ValidationErrors();
  this.serviceErrorMessages
    .listenTo(this.serviceErrorMessages, 'add reset', this.handleChangeServiceErrorMessages.bind(this));
  this._previous = {};
  this.checkboxLabel = opts.checkboxLabel;

  AmpersandCheckboxView.call(this, opts);
}
CheckboxView.prototype = new tmp();
CheckboxView.prototype.constructor = CheckboxView;

CheckboxView.prototype.handleChangeServiceErrorMessages = function() {
  this.test();
};

CheckboxView.prototype.hasChanged = function(attribute) {
  return (this._previous[attribute] !== this[attribute]) ? true : false;
};

CheckboxView.prototype.render = function () {
  AmpersandCheckboxView.prototype.render.call(this);

  if (this.valueAttribute) {
    this.input.value = this.valueAttribute;
  }

  if (this.hasSeparator) {
    this.el.className += ' hasSeparator';
  }

  if (this.checkboxLabel) {
    var checkboxLabelEl = this.el.querySelector('[data-hook~=checkboxLabel]');
    if (checkboxLabelEl) {
      checkboxLabelEl.textContent = this.checkboxLabel;
    }
  }

  this.el.setAttribute('data-hook', this.name);

  return this;
};

CheckboxView.prototype.setValue = function(value) {
  if (value !== this.value) {
    this._previous.value = this.value;
  }
  AmpersandCheckboxView.prototype.setValue.apply(this, arguments);
};

CheckboxView.prototype.test = function() {
  var valid = AmpersandCheckboxView.prototype.test.apply(this, arguments);
  if (valid && this.serviceErrorMessages.length) {
    valid = false;
    this.setMessage(this.serviceErrorMessages.render());
  }
  return valid;
};


CheckboxView.extend = extend;
module.exports = CheckboxView;

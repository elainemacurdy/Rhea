var _ = require('lodash');
var ElementView = require('./ElementView');
var templates = require('../templates');

var InputView = ElementView.extend({
  type: 'InputView',
  bindings: {
    inputType: {
      type: 'attribute',
      name: 'type'
    },
    value: {
      type: 'attribute',
      name: 'value'
    },
    placeholder: {
      type: 'attribute',
      name: 'placeholder'
    }
  },
  events: {
    'keydown': 'handleKeyDown'
  },
  props: {
    inputType: ['string', true, 'text'],
    restrict: 'string',
    value: 'any',
    valid: ['boolean', true, true],
    placeholder: 'string'
  },
  template: templates.input,

  initialize: function(options) {
    ElementView.prototype.initialize.call(this, options);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.on('change:valid change:value', this.reportToParent, this);
  },

  clean: function (val) {
    var res;

    if ((this.restrict === 'number') || (this.inputType === 'number')) {
      var number = Number(val);
      if (!isNaN(number)) {
        return number;
      } else {
        res = undefined;
      }
    } else {
      res = val.trim();
    }

    return res;
  },
  getData: function() {
    return (this.el) ? this.clean(this.el.value) : null;
  },
  handleInputChanged: function () {
    this.value = this.clean(this.el.value);
  },
  handleKeyDown: function(e) {
    if (this.restrict === 'number') {
      var key = e.keyCode ? e.keyCode : e.which;
      if (isNaN(String.fromCharCode(key)) && key !== 8 && key !== 9 && key !== 13 && key !== 190) {
        e.preventDefault();
      }
    }
  },
  render: function() {
    ElementView.prototype.render.call(this);
    this.el.addEventListener('input', _.debounce(this.handleInputChanged, 200), false);
    return this;
  },
  reportToParent: function () {
    if (this.parent) {
      this.parent.update(this);
    }
  },
  setValue: function(value) {
    if (this.el) {
      if (!value) {
        this.el.value = '';
      } else {
        this.el.value = value.toString();
      }
    }
    this.value = value;
  }
});

module.exports = InputView;

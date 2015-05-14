var _ = require('lodash');
var ElementView = require('./ElementView');
var templates = require('../templates');

var SelectView = ElementView.extend({
  type: 'SelectView',
  bindings: {
    multiple: {
      type: 'booleanAttribute',
      name: 'multiple'
    },
    options: {
      type: function(el, value, previousValue) {
        for (var i=0; i<value.length; i++) {
          var isArray = _.isArray(value[i]);
          var option = templates.option();
          option.value = (isArray) ? value[i][0] : value[i];
          option.innerHTML = (isArray) ? value[i][1] : value[i];
          el.appendChild(option);
        }
      }
    },
    value: {
      type: function(el, value, previousValue) {
        el.value = value;
      }
    }
  },
  props: {
    multiple: 'boolean',
    options: 'array',
    value: 'any',
    valid: ['boolean', true, true]
  },
  template: templates.select,

  initialize: function(options) {
    ElementView.prototype.initialize.call(this, options);
    this.on('change:valid change:value', this.reportToParent, this);
    this.handleInputEvent = this.handleInputEvent.bind(this);
  },

  render: function() {
    ElementView.prototype.render.call(this);
    this.el.addEventListener('change', this.handleInputEvent, false);

    return this;
  },
  handleInputEvent: function () {
    this.value = this.el.value;
  },
  getData: function() {
    return this.el.value;
  },
  reportToParent: function () {
    if (this.parent) {
      this.parent.update(this);
    }
  },
  // this does not really line up, handleInputEvent sort of parallels the same behaviour
  setValue: function(value) {
    this.value = value;
    if (this.el) {
      this.el.value = value;
    }
  }
});

module.exports = SelectView;

var ElementView = require('./ElementView');
var LabelView = require('./LabelView');
var templates = require('../templates');

var CheckboxView = ElementView.extend({
  type: 'CheckboxView',
  bindings: {
    checkboxValue: {
      type: 'attribute',
      name: 'value'
    },
    value: {
      type: 'booleanAttribute',
      name: 'checked'
    }
  },
  derived: {
    // adding for clarity and convenience
    checked: {
      deps: ['value'],
      fn: function() {
        return this.value;
      }
    }
  },
  events: {
    'click': 'handleClick'
  },
  props: {
    checkboxValue: 'any', // optional static non-boolean value, e.g. a key or id
    label: 'string',
    valid: ['boolean', true, true],
    value: 'boolean' // synonymous with a 'checked' attribute
  },
  session: {
    labelView: 'LabelView'
  },
  template: templates.checkbox,

  initialize: function(options) {
    ElementView.prototype.initialize.call(this, options);
    if (this.label) {
      if (!this.id) {
        // give this checkbox a unique id
        this.id = ['checkboxId', this.name, this.checkboxValue || this.value].join('_');
      }
      this.labelView = new LabelView({
        content: this.label,
        for: this.id
      });
    }
    this.on('change:valid change:value', this.reportToParent, this);
  },

  handleClick: function () {
    this.value = this.el.checked;
  },
  /**
   * @return If checked and checkboxValue was specified, checkboxValue; otherwise Boolean
   */
  getData: function() {
    return (this.value) ? this.checkboxValue || true : false;
  },
  render: function() {
    ElementView.prototype.render.apply(this, arguments);
    if (this.labelView) {
      setTimeout(function() {
        this.renderSubview(this.labelView, this.el.parentNode);
      }.bind(this), 0);
    }
  },
  reportToParent: function () {
    if (this.parent && this.parent.update) {
      this.parent.update(this);
    }
  },
  setValue: function(value, options) {
    this.set('value', value, options);
    if (options && options.silent) {
      this._applyBindingsForKey('value');
    }
  }
});

module.exports = CheckboxView;

var _ = require('lodash');
var BaseView = require('../../asci-base-view');

var ElementView = BaseView.extend({
  type: 'ElementView',
  bindings: {
    content: {
      type: function(el, value, previousValue) {
        if (_.isElement(value)) {
          this.el.appendChild(value);
        } else {
          this.el.innerHTML = value;
        }
      }
    },
    cssClasses: {
      type: function(el, value, previousValue) {
        if (value) {
          el.className += ' ' + value.join(' ');
        }
      }
    },
    data: {
      type: function(el, value, previousValue) {
        if (value) {
          for (var attributeName in value) {
            el.setAttribute('data-' + attributeName, value[attributeName]);
          }
        }
      }
    },
    dataHook: {
      type: 'attribute',
      name: 'data-hook'
    },
    disabled: [
      {
        type: 'booleanAttribute',
        name: 'disabled'
      },
      {
        type: 'booleanClass',
        name: 'disabled'
      }
    ],
    id: {
      type: 'attribute',
      name: 'id'
    },
    name: {
      type: 'attribute',
      name: 'name'
    },
    title: {
        type: 'attribute',
        name: 'title'
    }
  },
  derived: {
    dataHook: {
      deps: ['hook', 'name'],
      fn: function() {
        return this.hook || this.name;
      }
    }
  },
  props: {
    content: ['any', true, ''],
    cssClasses: 'array',
    data: 'object',
    disabled: 'boolean',
    hook: 'string',
    id: 'string',
    name: 'string',
    parent: 'object',
    title: 'string'
  }
});

module.exports = ElementView;

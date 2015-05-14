/*eslint no-script-url:1*/
var ElementView = require('./ElementView');
var templates = require('../templates');

var AnchorView = ElementView.extend({
  type: 'AnchorView',
  bindings: {
    displayedHref: {
      type: 'attribute',
      name: 'href'
    }
  },
  derived: {
    displayedHref: {
      deps: ['href', 'disabled'],
      fn: function() {
        return (this.href && !this.disabled) ? this.href : 'javascript:void(0);';
      }
    }
  },
  events: {
    'click': 'handleClick'
  },
  props: {
    clickCallback: 'function',
    href: ['string', false, 'javascript:void(0);']
  },
  template: templates.anchor,

  handleClick: function(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
    } else if (this.clickCallback) {
      this.clickCallback(e.target.getAttribute('data-button-action'));
    }
  }
});

module.exports = AnchorView;

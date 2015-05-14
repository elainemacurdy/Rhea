var BaseView = require('../../asci-base-view');
var i18n = require('../../asci-i18n');
var templates = require('../templates');

var SearchableInputView = BaseView.extend({
  type: 'SearchableInputView',
  bindings: {
    clearTitle: {
      type: 'attribute',
      name: 'title',
      hook: 'clear-button'
    },
    hasValue: {
      type: 'toggle',
      hook: 'clear-button'
    },
    searchTitle: {
      type: 'attribute',
      name: 'title',
      hook: 'search-button'
    }
  },
  derived: {
    hasValue: {
      deps: ['value'],
      fn: function() {
        return (this.value || (this.value === 0)) ? true : false;
      }
    }
  },
  events: {
    'click .clearButton': 'handleClear',
    'click .searchButton': 'handleSearch',
    'keydown input': 'handleKeyDown'
  },
  props: {
    inputView: 'InputView'
  },
  session: {
    clearTitle: ['string', false, i18n.CLEAR_SEARCH],
    keyEvents: ['object', true, function() {
      return {
        13: 'handleSearch',
        27: 'handleClear'
      };
    }],
    searchTitle: ['string', false, i18n.SEARCH],
    value: 'any'
  },
  template: templates.searchableInput,

  initialize: function() {
    BaseView.prototype.initialize.apply(this, arguments);
    if (!this.inputView) {
      throw new ReferenceError('Cannot instantiate a SearchableInput without an InputView component.');
    }
    this.listenTo(this.inputView, 'change:value', this.handleChangeValue);
  },

  handleChangeValue: function() {
    this.set('value', this.inputView.getData());
  },
  handleClear: function() {
    this.inputView.setValue('');
    this.trigger('clear');
  },
  handleKeyDown: function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (this.keyEvents[key]) {
      this[this.keyEvents[key]]();
    }
  },
  handleSearch: function() {
    this.trigger('search', this.inputView.getData());
  },
  render: function() {
    BaseView.prototype.render.call(this);
    this.renderSubview(this.inputView);
    return this;
  }
});

module.exports = SearchableInputView;

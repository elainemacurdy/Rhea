var _ = require('lodash');
var AbstractSectionView = require('../../asci-section-abstract/views/AbstractSectionView');
var GlobalRegistry = require('../../asci-global-registry');
var i18n = require('../../asci-i18n');
var templateError = require('../templates').error;

var ErrorView = AbstractSectionView.extend({
  modelType: 'ErrorModel',
  type: 'ErrorView',
  bindings: {
    genericErrorMessage: {
      type: 'text',
      hook: 'generic-error-message'
    },
    specificErrorMessage: {
      type: 'text',
      hook: 'specific-error-message'
    }
  },
  props: {
    buttons: ['array', true, function() {
      return [{
        buttonType: 'form',
        className: 'backButton',
        clickHandlerName: 'handleClickBack',
        isDefault: true,
        label: i18n.BACK,
        name: 'backButton'
      }];
    }],
    genericErrorMessage: ['string', true, i18n.ERROR_MESSAGE],
    specificErrorMessage: 'string',
    title: ['string', true, i18n.ERROR]
  },

  _contentTemplate: templateError,

  constructor: function(options) {
    AbstractSectionView.prototype.constructor.call(this, options);
    var template = _.template(i18n.ERRORS[this.model.code]);
    this.set('specificErrorMessage', template({
      PATH: this.model.path
    }));
  },

  handleClickBack: function() {
    GlobalRegistry.get('vent').trigger('back');
  },
  render: function() {
    AbstractSectionView.prototype.render.apply(this, arguments);
    this._applyBindingsForKey('genericErrorMessage');
    this._applyBindingsForKey('specificErrorMessage');
  }
});

module.exports = ErrorView;

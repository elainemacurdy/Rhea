var _ = require('lodash');
var AbstractSectionView = require('../../asci-section-abstract/views/AbstractSectionView');
var ButtonView = require('../../asci-button-view');
var GlobalRegistry = require('../../asci-global-registry');
var i18n = require('../../asci-i18n/asci-i18n');
var LineitemFormView = require('../../asci-lineitem-form-view');
var templates = require('../templates');

var LineitemSectionView = AbstractSectionView.extend({
  type: 'LineitemSectionView',
  modelType: 'LineitemSection',
  session: {
    form: 'LineitemFormView'
  },

  constructor: function() {
    AbstractSectionView.prototype.constructor.apply(this, arguments);
    this.set('title', (this.model.isEdit()) ? i18n.EDIT_LINE_ITEM : i18n.NEW_LINE_ITEM);
    this.set('buttons', [
      _.extend({
        isDefault: true
      }, ButtonView.standardButtons.save),
      ButtonView.standardButtons.cancel
    ]);
  },
  initialize: function() {
    AbstractSectionView.prototype.initialize.apply(this, arguments);
    this.form = new LineitemFormView({
      model: this.model.get('lineItem'),
      name: 'lineItemForm',
      parent: this
    });
    this.listenToOnce(this.model.get('lineItem'), 'sync', this._loadForm);
  },

  handleClickCancel: function() {
    GlobalRegistry.get('vent').trigger('back');
  },
  handleClickSave: function() {
    this.form.submit({
      success: this.handleSaveSuccess.bind(this),
      error: this.handleSaveError.bind(this)
    });
  },
  handleSaveError: function() {
    this.set('state', 'error');
  },
  handleSaveSuccess: function() {
    this.set('state', 'completed');
    GlobalRegistry.get('vent').trigger('back');
  },
  render: function() {
    AbstractSectionView.prototype.render.apply(this, arguments);
    this.renderSubview(this.form, this.getContentElement());
  },

  _getContent: function() {
    return this.form.el;
  },
  _loadForm: function() {
    this.form.renderFields();
  }
});

module.exports = LineitemSectionView;

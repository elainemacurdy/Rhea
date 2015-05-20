var _ = require('lodash');
var CheckboxView = require('../asci-checkbox-view');
var CheckboxArrayView = require('../asci-checkbox-array-view');
var i18n = require('../asci-i18n');
var InputView = require('../asci-input-view');
// var LineitemValidation = require('../asci-lineitem-validation');
var SelectView = require('../asci-select-view');
var SubFormView = require('../asci-sub-form-view');
var templates = require('./templates');

var LineitemFormView = SubFormView.extend({
  bindings: {
    isDirect: [
      {
        type: 'toggle',
        yes: '[data-hook=costCpm]'
      }
    ],
    isExternal: [
      {
        type: 'toggle',
        no: '[data-hook=targetLanguages]'
      }
    ],
    isRTB: [
      {
        type: 'toggle',
        yes: '[data-hook=maxBidCpm]'
      }
    ]
  },
  derived: {
    isDirect: {
      cache: false,
      deps: ['value'],
      fn: function() {
        var lineItemType = (this.value && this.value.lineItemType) || this.model.get('lineItemType');
        return (lineItemType === 'DIRECT') ? true : false;
      }
    },
    isExternal: {
      cache: false,
      deps: ['value'],
      fn: function() {
        var lineItemType = (this.value && this.value.lineItemType) || this.model.get('lineItemType');
        return (lineItemType === 'EXTERNAL') ? true : false;
      }
    },
    isRTB: {
      cache: false,
      deps: ['value'],
      fn: function() {
        var lineItemType = (this.value && this.value.lineItemType) || this.model.get('lineItemType');
        return (lineItemType === 'RTB') ? true : false;
      }
    }
  },
  template: templates.form,

  fields: function() {
    return [
      new SelectView({
        hasSeparator: true,
        isDisabled: (this.model.isNew()) ? false : true, // disable only if the user has previously saved a value
        label: i18n.LINE_ITEM_TYPE,
        name: 'lineItemType',
        options: [
            ['RTB', i18n.RTB],
            ['DIRECT', i18n.DIRECT],
            ['EXTERNAL', i18n.EXTERNAL]
        ],
        unselectedText: i18n.UNSELECTED_DROPDOWN_TEXT,
        value: this.model.lineItemType || 'RTB'
      }),
      new InputView({
        hasSeparator: true,
        label: i18n.LINE_ITEM_NAME,
        name: 'description',
        placeholder: i18n.ENTER_NAME,
        type: 'text',
        value: this.model.description || ''
      }),
      new SelectView({
        label: i18n.BUY_TYPE,
        name: 'productType',
        options: [
          ['PUBLIC', i18n.PUBLIC],
          ['PRIVATE', i18n.PRIVATE],
          ['DIRECT', i18n.DIRECT],
          ['EXTERNAL', i18n.EXTERNAL]
        ],
        unselectedText: i18n.UNSELECTED_DROPDOWN_TEXT,
        value: this.model.productType || ''
      }),
      new CheckboxView({
        hasSeparator: true,
        label: i18n.DISCOVERY_LINE_ITEM,
        name: 'segmentDiscovery',
        value: this.model.segmentDiscovery
      }),
      new InputView({
        label: i18n.MAX_BID_CPM,
        name: 'maxBidCpm',
        placeholder: i18n.ENTER_CURRENCY,
        prefix: i18n.CURRENCY_SYMBOL,
        type: 'number',
        value: this.model.maxBidCpm
      }),
      new InputView({
        label: i18n.COST_CPM,
        name: 'costCpm',
        placeholder: i18n.ENTER_CURRENCY,
        prefix: i18n.CURRENCY_SYMBOL,
        type: 'number',
        value: this.model.costCpm
      }),
      new CheckboxArrayView({
        hasSeparator: true,
        label: i18n.BROWSER_LANGUAGES,
        name: 'targetLanguages',
        options: [
          ['ar', 'Arabic'],
          ['en', 'English'],
          ['fr', 'French'],
          ['de', 'German'],
          ['el', 'Greek'],
          ['iw', 'Hebrew'],
          ['hu', 'Hungarian'],
          ['pt', 'Portuguese'],
          ['es', 'Spanish']
        ],
        value: this.model.targetLanguages || []
      })
    ];
  },

  renderFields: function() {
    SubFormView.prototype.renderFields.call(this);

    // have to re-apply bindings after the fields have been added to the dom
    this._applyBindingsForKey('isDirect');
    this._applyBindingsForKey('isExternal');
    this._applyBindingsForKey('isRTB');
  }
});

module.exports = LineitemFormView;

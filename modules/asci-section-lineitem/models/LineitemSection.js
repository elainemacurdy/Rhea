var AbstractSectionState = require('../../asci-section-abstract/models/AbstractSectionState');
var i18n = require('../../asci-i18n');
var LineItem = require('../../asci-lineitem');

var LineitemSection = AbstractSectionState.extend({
  modelType: 'LineitemSection',
  session: {
    advertiserName: 'string',
    campaignName: 'string',
    lineItem: 'LineItem',
    lineItemKey: 'string'
  },

  constructor: function(options) {
    this.fragmentId = 'lineItemCreate';
    // if (options.lineItemKey) {
      // this.fragmentId = 'lineItemEdit~~~{{=advertiserName}}~~~{{=campaignName}}~~~{{=lineItemKey}}';
    // } else if (options.mode === 'create') {
      // this.fragmentId = 'lineItemCreate~~~{{=advertiserName}}~~~{{=campaignName}}';
    // }
    AbstractSectionState.prototype.constructor.apply(this, arguments);
  },
  initialize: function() {
    this.set('lineItem', new LineItem({
      advertiserName: this.get('advertiserName'),
      campaignName: this.get('campaignName'),
      key: this.get('lineItemKey') || ''
    }));
  },

  fetch: function() {
    this.get('lineItem').fetch();
  },
  isCreate: function() {
    return (!this.isEdit()) ? true : false;
  },
  isEdit: function() {
    return (this.fragmentId.indexOf('lineItemEdit') === 0) ? true : false;
  }
});

module.exports = LineitemSection;

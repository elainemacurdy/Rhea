var _ = require('lodash');
var BaseModel = require('../../asci-base-model');

module.exports = BaseModel.extend({
  idAttribute: 'key',
  modelType: 'LineItem',
  derived: {
    lineItemType: {
      deps: ['providers'],
      fn: function() {
        if (_.contains(this.providers, 'DIRECT')) {
          return 'DIRECT';
        } else {
          return 'RTB';
        }
      }
    }
  },
  props: {
    key: 'string',
    costCpm: { type: 'number', allowNull: true },                                   // DIRECT: Cost CPM (replaces Max Bid CPM)
    description: { type: 'string', allowNull: true },                               // Line Item Name
    maxBidCpm: { type: 'number', allowNull: true },                                 // Max Bid CPM
    productType: { type: 'string', allowNull: true },                               // Buy Type
    providers: { type: 'array', allowNull: true },                                  // Edit RTB Providers
    segmentDiscovery: { type: 'boolean', allowNull: true },                         // Discovery Line Item
    targetLanguages: { type: 'array', allowNull: true }                             // Browser Language
  },
  session: {
    advertiserName: 'string',
    campaignName: 'string'
  },

  fetch: function() {
    if (!this.isNew()) {
      BaseModel.prototype.fetch.apply(this, arguments);
    } else {
      this.trigger('sync');
    }
  },
  isNew: function() {
    return (this.key) ? false : true;
  },
  parse: function(json) {
    return json.lineItem;
  },
  save: function() {
    var lineItemJson = { lineItem: this.toJSON() };
    BaseModel.prototype.save.call(this, lineItemJson);
  },
  url: function() {
    var url = _.template('saturn/advertisers/{{advertiserName}}/campaigns/{{campaignName}}/lineitems/{{key}}')(this);
    return url;
  }
});

var AmpersandModel = require('ampersand-model');
var ModelRegistry = require('../asci-global-registry/models');
var hat = require('hat');

var BaseModel = AmpersandModel.extend({
  idAttribute: 'uuid',  // default id, override in subclasses
  modelType: 'BaseModel',
  session: {
    isSynced: ['boolean', true, false],
    uuid: ['string', true]
  },

  ajaxConfig: function() {
    return {
      xhrFields: {
        timeout: 120000 // defaults to 5 sec
      }
    };
  },
  constructor: function() {
    AmpersandModel.prototype.constructor.apply(this, arguments);
    if (!this.getType() || (this.getType() === 'BaseModel')) {
      throw new ReferenceError("Please specify the type of this class.", 'BaseModel.constructor');
    }
    this.listenTo(this, 'sync', function() { this.isSynced = true; }.bind(this));

    // keep the model in a registry
    this.uuid = hat();
    ModelRegistry.store(this);
    this.on('destroy', function(){
      ModelRegistry.remove(this.getType(), this.getId());
    }, this);

    return this;
  },

  fetch: function() {
    this.isSynced = false;
    return AmpersandModel.prototype.fetch.apply(this, arguments);
  },

  sync: function() {
    this.isSynced = false;
    return AmpersandModel.prototype.sync.apply(this, arguments);
  }
});

module.exports = BaseModel;

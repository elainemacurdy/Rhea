var AbstractSectionState = require('../../asci-section-abstract/models/AbstractSectionState');

var ErrorModel = AbstractSectionState.extend({
  fragmentId: 'error-{{=code}}?{{=search}}',
  modelType: 'ErrorModel',
  session: {
    code: 'number',
    path: 'string',
    search: 'string'
  },

  constructor: function(options) {
    options.code = (!isNaN(options.code)) ? parseInt(options.code, 10) : options.code;
    AbstractSectionState.prototype.constructor.call(this, options);
  },

  initialize: function() {
    AbstractSectionState.prototype.initialize.apply(this, arguments);
    this._parseSearch();
  },

  fetch: function() {},

  _parseSearch: function() {
    var params = this.search.split('&');
    for (var i=0; i<params.length; i++) {
      var pair = params[i].split('=');
      this.set(pair[0], pair[1]);
    }
  }
});

module.exports = ErrorModel;

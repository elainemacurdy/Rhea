var ErrorModel = require('../asci-section-error/models/Error');
var GlobalRegistry = require('../asci-global-registry');
var Router = require('../asci-router');

var RouterRhea = Router.extend({
  _routes: [
    ['', 'def'],
    ['index', 'index'],

    ['error-:code:search', 'error'],
    // this route must be at the end of this list
    ['*notfound', 'notFound']
  ],

  initialize: function() {
    Router.prototype.initialize.apply(this, arguments);
    this.history.setPrefix('media/');
  },

  def: function() {
    this.redirectTo('/index');
  },

  error: function(code, search) {
    GlobalRegistry.get('sectionContainerView').open(new ErrorModel({
      code: code,
      search: search
    }));
  },

  index: function(advertiserName, campaignName, lineItemKey) {
    // this._setPathVariablesInRegistry({ advertiserName: advertiserName, campaignName: campaignName });
    // GlobalRegistry.get('sectionContainerView').open(new LineitemCreateEdit({
      // advertiserName: advertiserName,
      // campaignName: campaignName,
      // lineItemKey: lineItemKey,
      // mode: (lineItemKey) ? 'duplicate' : 'create'
    // }));
  },

  notFound: function(path) {
    this.redirectTo('/error-404?path=' + encodeURIComponent(path));
  }
});

module.exports = RouterRhea;

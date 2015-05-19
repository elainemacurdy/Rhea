var ErrorModel = require('../asci-section-error/models/Error');
var ExampleSection = require('../asci-section-example/models/ExampleSection');
var GlobalRegistry = require('../asci-global-registry');
var Router = require('../asci-router');

var RouterRhea = Router.extend({
  _routes: [
    ['', 'def'],
    ['example', 'example'],

    ['error-:code:search', 'error'],
    // this route must be at the end of this list
    ['*notfound', 'notFound']
  ],

  def: function() {
    this.redirectTo('/example');
  },

  error: function(code, search) {
    GlobalRegistry.get('sectionContainerView').open(new ErrorModel({
      code: code,
      search: search
    }));
  },

  example: function(advertiserName, campaignName, lineItemKey) {
    GlobalRegistry.get('sectionContainerView').open(new ExampleSection());
  },

  notFound: function(path) {
    this.redirectTo('/error-404?path=' + encodeURIComponent(path));
  }
});

module.exports = RouterRhea;

var ErrorModel = require('../asci-section-error/models/Error');
var GlobalRegistry = require('../asci-global-registry');
var Router = require('../asci-router');

var RouterRhea = Router.extend({
  _routes: [
    ['', 'def'],

    ['error-:code:search', 'error'],
    // this route must be at the end of this list
    ['*notfound', 'notFound']
  ],

  def: function() {
  },

  error: function(code, search) {
    GlobalRegistry.get('sectionContainerView').open(new ErrorModel({
      code: code,
      search: search
    }));
  },


  notFound: function(path) {
    this.redirectTo('/error-404?path=' + encodeURIComponent(path));
  }
});

module.exports = RouterRhea;

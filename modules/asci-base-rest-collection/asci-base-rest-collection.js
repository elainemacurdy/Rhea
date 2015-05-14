var $ = require('jquery');
var RestCollection = require('ampersand-rest-collection');

var BaseRestCollection = RestCollection.extend({
  ajaxConfig: function() {
    return {
      xhrFields: {
        timeout: 120000 // defaults to 5 sec
      }
    };
  },
  fetchDeferred: function() {
    var deferred = $.Deferred();

    this.fetch({
      success: function(collection) {
        deferred.resolveWith(this, collection);
      }
    });

    return deferred.promise();
  }
});

module.exports = BaseRestCollection;

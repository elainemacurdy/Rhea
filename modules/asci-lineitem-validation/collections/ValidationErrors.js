var _ = require('lodash');
var AmpersandCollection = require('ampersand-collection');
var extend = require('extend-object');

var ValidationErrors = AmpersandCollection.extend({
  add: function(errors, options) {
    // return this.set(errors, options);
    if (!errors) {
      errors = [];
    } else if (!_.isArray(errors)) {
      errors = [errors];
    }
    var toAdd = [];
    for (var i = 0; i < errors.length; i++) {
      if (!_.contains(this.models, errors[i])) {
        toAdd.push(errors[i]);
      }
    }
    return this.set(toAdd, options);
  },
  render: function() {
    return this.models.join('<br/>');
  },
  set: function(errors, options) {
    return AmpersandCollection.prototype.set.call(this, errors, extend({}, options, { remove: false }));
  }
});

module.exports = ValidationErrors;

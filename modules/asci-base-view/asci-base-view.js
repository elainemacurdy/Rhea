var $ = require('jquery');
var _ = require('lodash');
var AmpersandView = require('ampersand-view');

var BaseView = AmpersandView.extend({
  type: 'BaseView',
  typeAttribute: 'type',

  template: '<div></div>',

  initialize: function(options) {
    AmpersandView.prototype.initialize.apply(this, arguments);
    if (!this.getType() || (this.getType() === 'BaseView')) {
      throw new ReferenceError("Please specify the type of this class.", 'BaseView.initialize');
    }
  },
  getSubViewsByName: function(name) {
    return _.filter(this._subviews, function(subview) {
      return (subview.name === name) ? true : false;
    });
  },
  getSubViewsByType: function(constructor) {
    return _.filter(this._subviews, function(subview) {
      return (subview instanceof constructor) ? true : false;
    });
  },
  getType: function() {
    return this.type;
  },
  render: function() {
    AmpersandView.prototype.render.apply(this, arguments);
    if (this.className) {
      $(this.el).addClass(this.className);
    }
    return this;
  },
  unwrap: function() {
    $(this.el).unwrap();
  },
  unwrapSubviews: function() {
    for (var i=0; i<this._subviews.length; i++) {
      this._subviews[i].unwrap();
    }
  }
});

/*
 * Ampersand overwrites a superclass's 'events' and 'bindings' property with the subclass's events/bindings, which is not so useful.
 * Adding a little sugar that merges the two together.
 */
var naturalExtend = AmpersandView.extend;
BaseView.extend = function(properties) {
  var superClass = this.prototype;
  if (!_.isEmpty(superClass.events) && !_.isEmpty(properties.events)) {
    properties.events = _.extend({}, superClass.events, properties.events);
  }
  if (!_.isEmpty(superClass.bindings) && !_.isEmpty(properties.bindings)) {
    properties.bindings = _.extend({}, superClass.bindings, properties.bindings);
  }
  return naturalExtend.call(this, properties);
};

module.exports = BaseView;

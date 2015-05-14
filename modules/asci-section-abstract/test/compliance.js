if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var Model = require('ampersand-model');
var AbstractSectionView = require('../views/AbstractSectionView');
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');

// viewCompliance.view(test, AbstractSectionView, {model: new Model()});

if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var lineitemFormView = require('../asci-lineitem-form-view');
var Model = require('ampersand-model');

viewCompliance.view(test, lineitemFormView, {model: new Model()});

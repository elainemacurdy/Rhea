if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var headerLayoutView = require('../asci-header-layout-view');

viewCompliance.view(test, headerLayoutView, {});

// viewCompliance.formField(test, headerLayoutView, {
//   label: 'example',
//   name: 'example',
//   value: 'valid string'
// }, 'valid string');

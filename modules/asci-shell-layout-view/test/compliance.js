if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var shellLayoutView = require('../asci-shell-layout-view');

// viewCompliance.view(test, shellLayoutView, {});

// viewCompliance.formField(test, shellLayoutView, {
//   label: 'example',
//   name: 'example',
//   value: 'valid string'
// }, 'valid string');

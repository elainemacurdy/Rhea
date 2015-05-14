if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var sectionContainerLayoutView = require('../asci-section-container-layout-view');

// viewCompliance.view(test, sectionContainerLayoutView, {});

// viewCompliance.formField(test, sectionContainerLayoutView, {
//   label: 'example',
//   name: 'example',
//   value: 'valid string'
// }, 'valid string');

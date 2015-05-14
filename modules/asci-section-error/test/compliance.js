if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var errorSectionView = require('../asci-section-error');

// viewCompliance.view(test, errorSectionView, {});

// viewCompliance.formField(test, errorSectionView, {
//   label: 'example',
//   name: 'example',
//   value: 'valid string'
// }, 'valid string');

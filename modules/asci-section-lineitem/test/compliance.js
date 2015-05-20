if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var lineitemSectionView = require('../asci-section-lineitem');

// viewCompliance.view(test, lineitemSectionView, {});

// viewCompliance.formField(test, lineitemSectionView, {
//   label: 'example',
//   name: 'example',
//   value: 'valid string'
// }, 'valid string');

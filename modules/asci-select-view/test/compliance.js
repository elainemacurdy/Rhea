if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}

var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var SelectView = require('../asci-select-view');

viewCompliance.view(test, SelectView, {
  label: 'select',
  name: 'mySelect',
  options: [
    ['PUBLIC', 'Public'],
    ['PRIVATE', 'Private'],
    ['DIRECT', 'Direct'],
    ['EXTERNAL', 'External']
  ],
  unselectedText: 'Select one',
  value: ''
});

viewCompliance.formField(test, SelectView, {
  label: 'select',
  name: 'mySelect',
  options: [
    ['PUBLIC', 'Public'],
    ['PRIVATE', 'Private'],
    ['DIRECT', 'Direct'],
    ['EXTERNAL', 'External']
  ],
  unselectedText: 'Select one',
  value: ''
}, 'PUBLIC');

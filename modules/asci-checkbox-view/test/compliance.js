if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var CheckboxView = require('../asci-checkbox-view');

viewCompliance.view(test, CheckboxView, {
  label: 'checkbox',
  name: 'myCheckbox',
  value: true
});

viewCompliance.formField(test, CheckboxView, {
  label: 'checkbox',
  name: 'myCheckbox',
  value: false
}, true);

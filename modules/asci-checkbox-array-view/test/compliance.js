if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var CheckboxArrayView = require('../asci-checkbox-array-view');

viewCompliance.view(test, CheckboxArrayView, {
  label: 'Device Targeting',
  name: 'deviceTypeTargeting',
  options: [
    ['PHONE', 'Phone'],
    ['TABLET', 'Tablet'],
    ['DESKTOP', 'Desktop'],
    ['OTHER', 'Other']
  ],
  value: [],
  parent: this,
  tests: [
    function(val) {

    }
  ]
});

viewCompliance.formField(test, CheckboxArrayView, {
  label: 'Device Targeting',
  name: 'deviceTypeTargeting',
  options: [
    ['PHONE', 'Phone'],
    ['TABLET', 'Tablet'],
    ['DESKTOP', 'Desktop'],
    ['OTHER', 'Other']
  ],
  value: [],
  parent: this,
  tests: [
    function(val) {

    }
  ]
}, ['PHONE']);

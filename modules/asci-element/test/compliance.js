if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var InputView = require('../views/InputView');
var CheckboxView = require('../views/CheckboxView');

viewCompliance.view(test, InputView, {
  name: 'input',
  value: 'string'
});

viewCompliance.formField(test, InputView, {
  name: 'input',
  value: 'string'
}, 'modified string');

viewCompliance.view(test, CheckboxView, {
  name: 'input',
  value: true
});

viewCompliance.formField(test, CheckboxView, {
  name: 'input',
  value: true
}, false);

var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var InputView = require('../asci-input-view');

viewCompliance.view(test, InputView, {
  label: 'input test',
  name: 'input',
  placeholder: 'placeholder',
  type: 'text',
  value: ''
});

viewCompliance.formField(test, InputView, {
  label: 'input test',
  name: 'input',
  placeholder: 'placeholder',
  type: 'text',
  value: 'valid' // must be valid
}, 'valid value');

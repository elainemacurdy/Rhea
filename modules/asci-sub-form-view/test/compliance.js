if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var SelectView = require('../../asci-select-view');
var SubFormView = require('../asci-sub-form-view');

viewCompliance.view(test, SubFormView, {
  name: 'pricing',
  value: {},
  fields: function () {
    return [
      new SelectView({
        label: 'Product Type',
        name: 'productType',
        options: [
          ['PUBLIC', 'Public'],
          ['PRIVATE', 'Private'],
          ['DIRECT', 'Direct'],
          ['EXTERNAL', 'External']
        ],
        unselectedText: 'Select',
        value: ''
      })
    ];
  }
});

viewCompliance.formField(test, SubFormView, {
  name: 'pricing',
  value: {},
  fields: function () {
    return [
      new SelectView({
        label: 'Product Type',
        name: 'productType',
        options: [
          ['PUBLIC', 'Public'],
          ['PRIVATE', 'Private'],
          ['DIRECT', 'Direct'],
          ['EXTERNAL', 'External']
        ],
        unselectedText: 'Select',
        value: ''
      })
    ];
  }
}, {});

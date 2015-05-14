if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var BaseView = require('../asci-base-view');

var MyView = BaseView.extend({
  type: 'MyView',
  template: 'mytemplate'
});

// viewCompliance.view(test, MyView, {});
test('placeholder', function(t) {
  t.end();
});

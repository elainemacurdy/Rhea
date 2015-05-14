if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var buttonView = require('../asci-button-view.js');

test('first test', function(t) {
  t.equal(1, 1, 'should make sure math is working');
  t.end();
});

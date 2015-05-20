if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var CheckboxArrayView = require('../asci-checkbox-array-view');

test('basic initialization', function (t) {
  var input = new CheckboxArrayView({
    name: 'title',
    options: [
      ['PHONE', 'Phone'],
      ['TABLET', 'Tablet'],
      ['DESKTOP', 'Desktop'],
      ['OTHER', 'Other']
    ],
    value: []
  });
  input.render();
  t.equal(input.el.tagName, 'DIV');
  t.equal(input.el.querySelectorAll('input').length, 4);
  t.end();
});

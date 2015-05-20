var test = require('tape');
var InputView = require('../asci-input-view.js');

test('clean string', function(t) {
  var view = new InputView({
    name: 'testClean',
    type: 'string',
    value: '',
    parent: this
  });
  t.equal(view.clean(null), null, 'should leave null');
  t.equal(view.clean(undefined), undefined, 'should leave undefined');
  t.equal(view.clean(''), '', 'should keep empty string');
  t.equal(view.clean('abc124'), 'abc124', 'should keep characters');
  t.equal(view.clean('124'), '124', 'should keep characters');
  t.equal(view.clean(124), 124, 'should keep number');
  t.end();
});

test('clean number', function(t) {
  var view = new InputView({
    name: 'testClean',
    type: 'number',
    value: '',
    parent: this
  });
  t.equal(view.clean(null), null, 'should leave null');
  t.equal(view.clean(undefined), undefined, 'should leave undefined');
  t.equal(view.clean(''), '', 'should keep empty string');
  t.equal(view.clean('abc'), undefined, 'should return undefined when only non-number characters present');
  t.equal(view.clean('abc124'), 124, 'should keep only numbers and convert to number');
  t.equal(view.clean(124), 124, 'should keep number');
  t.end();
});

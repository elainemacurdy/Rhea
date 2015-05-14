var test = require('tape');
var constants = require('../asci-constants');

test('first test', function(t) {
  t.equal(constants.DOM.minimizedSectionWidth, 35, 'should return value');
  t.equal(constants.DOM.minimumSectionWidth, 50, 'should return value');
  t.equal(constants.GA.account, 'UA-41420999-1', 'should return value');
  t.end();
});

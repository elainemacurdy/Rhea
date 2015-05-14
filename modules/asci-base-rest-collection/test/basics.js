var test = require('tape');
var BaseRestCollection = require('../asci-base-rest-collection.js');

test('first test', function(t) {
  var collection = new BaseRestCollection;
  t.deepEqual(
    collection.ajaxConfig(),
    { xhrFields: { timeout: 120000 } },
    'should have ajaxConfig set correctly');
  t.end();
});

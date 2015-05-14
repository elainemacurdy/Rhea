if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind');
}
var test = require('tape');
var viewCompliance = require('ampersand-view-conventions');
var buttonView = require('../asci-button-view');

// FIXME button api is a little different from what view compliance expects (extra parent param), these different
// expectations need to be reconciled in order to use the tests

// viewCompliance.view(test, buttonView, {
//   className: 'fooButton',
//   clickHandlerName: 'handleClickFoo',
//   label: i18n.FOO,
//   name: 'fooButton'
// }, this);

# asci-input-view

A view module for rendering a single input element.
Based on [ampersand-input-view](https://github.com/AmpersandJS/ampersand-input-view).
Made to work with [ampersand-form-view](https://github.com/AmpersandJS/ampersand-form-view).

Follows the ampersand form conventions:
http://ampersandjs.com/learn/forms#form-input-view-conventions

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-input-view
```

## example

```javascript
var i18n = require('asci-i18n');
var InputView = require('asci-input-view');

var field = new InputView({
  label: i18n.MAX_BID_CPM,
  name: 'maxBidCpm',
  placeholder: i18n.ENTER_CURRENCY,
  type: 'number',
  value: '',
  parent: this // use when inside a form view
});

// append it somewhere or use it inside an ampersand-form-view
document.querySelector('form').appendChild(field.el);
```

## license

ASI

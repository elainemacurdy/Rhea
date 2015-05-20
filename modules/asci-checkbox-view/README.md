# asci-checkbox-view

A view module for rendering a single checkbox.
Based on [ampersand-checkbox-view](https://github.com/AmpersandJS/ampersand-checkbox-view).
Made to work with [ampersand-form-view](https://github.com/AmpersandJS/ampersand-form-view).

Follows the ampersand form conventions:
http://ampersandjs.com/learn/forms#form-input-view-conventions

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-checkbox-view
```

## example

```javascript
var i18n = require('asci-i18n');
var CheckboxView = require('asci-checkbox-view');

var field = new CheckboxView({
  label: i18n.DISCOVERY_LINE_ITEM,
  name: 'segmentDiscovery',
  value: false,
  parent: this, // use if within a form view
  appendSeparator: true
})

// append it somewhere or use it inside an ampersand-form-view
document.querySelector('form').appendChild(field.el);
```

## license

ASI

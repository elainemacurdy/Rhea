# asci-select-view

A view module for rendering a single select element.
Based on [ampersand-select-view](https://github.com/AmpersandJS/ampersand-select-view).
Made to work with [ampersand-form-view](https://github.com/AmpersandJS/ampersand-form-view).

Follows the ampersand form conventions:
http://ampersandjs.com/learn/forms#form-input-view-conventions

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-select-view
```

## example

```javascript
var i18n = require('asci-i18n');
var SelectView = require('asci-select-view');

var field = new SelectView({
  label: i18n.BUY_TYPE,
  name: 'productType',
  options: [
    ['PUBLIC', 'Public'],
    ['PRIVATE', 'Private'],
    ['DIRECT', 'Direct'],
    ['EXTERNAL', 'External']
  ],
  unselectedText: i18n.UNSELECTED_DROPDOWN_TEXT,
  value: this.model && this.model.productType || '',
  parent: this
});

// append it somewhere or use it inside an ampersand-form-view
document.querySelector('form').appendChild(field.el);
```

## license

ASI

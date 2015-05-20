# asci-checkbox-array-view

A view module for rendering form view to render an array of checkboxes from an input similar to a select view.
Made to work with [ampersand-form-view](https://github.com/AmpersandJS/ampersand-form-view).

Follows the ampersand form conventions:
http://ampersandjs.com/learn/forms#form-input-view-conventions

It's built on [ampersand-view](https://github.com/AmpersandJS/ampersand-view) so it can be extended with `extend` as you might expect.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-checkbox-array-view
```

## example

```javascript
var i18n = require('asci-i18n');
var LineItemValidator = require('asci-lineitem-validation');
var CheckboxArrayView = require('asci-checkbox-array-view');

var field = new CheckboxArrayView({
  label: i18n.DEVICE_TARGETING,
  name: 'deviceTypeTargeting',  // is a custom Target BEWARE, can be handled with derived
  options: [
    ['PHONE', 'Phone'],
    ['TABLET', 'Tablet'],
    ['DESKTOP', 'Desktop'],
    ['OTHER', 'Other']
  ],
  value: this.model && this.model.deviceTypeTargeting || [],
  parent: this,
  appendSeparator: true,
  tests: [
    function(val) {
      var error = LineItemValidator.validate(val, 'customTargets.DEVICE_TYPE').error;
      return error && error.details[0].message;
    }
  ]
})

// append it somewhere or use it inside an ampersand-form-view
document.querySelector('form').appendChild(field.el);

```

## license

ASI

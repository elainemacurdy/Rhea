# asci-lineitem-validation

This module was built with [Joi](https://github.com/hapijs/joi).

This module provides a way of validating a lineitem. It does this by providing a single interface,
a validate method, that can be used in 4 different validation scenarios.

* attribute-level
* group of attributes
* whole lineitem (before sent to server)
* whole lineitem plus other objects (budget groups etc.)

## attribute-level example

```javascript
var LineitemValidation = require('asci-lineitem-validation');
var data = ['MOBILE_APP'];

var result = LineitemValidation.validate(data, 'customTargetsMOBILE');
if (result.error) {
  // ... do some error handling, null means ok
}
```
Results of the validation look like this:
```javascript
// ok
{ error: null, value: [ 'MOBILE_APP' ] }

// error
{ error:
   { name: 'ValidationError',
     details: [ [Object] ],
     _object: [ 'MOBILE_AP' ],
     annotate: [Function] },
  value: [ 'MOBILE_AP' ] }
```

Use it within a form field tests attribute:

```javascript
var LineitemValidation = require('asci-lineitem-validation');
var data = ['PHONE', 'TABLET'];

new CheckboxArrayView({
  label: i18n.DEVICE_TARGETING,
  name: 'customTargetsDEVICE_TYPE',
  // ... omitted other configuration
  tests: [
    function(val) {
      var error = LineitemValidation.validate(val, 'customTargetsDEVICE_TYPE').error;
      return error && error.details[0].message;
    }
  ]
});
```

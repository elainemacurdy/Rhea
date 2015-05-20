# asci-when-joi

A module to encapsulate the Joi-like 'when' framework we use because Joi's when statements don't quite work.
(See issue here.)[https://github.com/hapijs/joi/issues/537].

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-when-joi
```

## example

```javascript
// schema definition:
var whenSchema = {
  myField: {
    when: [
      {
        test: {	// if (budgetCpmType !== 'FIXED_CPM') { Joi.forbidden(); }
          name: '$budgetCpmType',
          isNot: 'FIXED_CPM'
        },
        then: Joi.forbidden()
      },
      {
        test: [ // if (!isTemplate && (budgetCpmType === 'FIXED_CPM')) { Joi.required(); }
          {
            name: 'isTemplate',
            is: false
          },
          {
            name: '$budgetCpmType',
            is: 'FIXED_CPM'
          }
        ],
        then: Joi.required()
      }
    ]
  }
};


// usage:
var WhenJoi = require('asci-when-joi');
var language = {
  myField: {
    default: "Something went wrong.",
    any: {
      required: "MyField is required.",
      unknown: "MyField is forbidden."
    }
  },
  get: function(name) {
  	return language[name];
  }
};

validationObj = WhenJoi.validate('someUserValue', whenSchema.myField, {
  fieldName: 'myField',
  context: { 'myOtherField': 'foo' },
  languageDict: language
});

```

## license

ASI

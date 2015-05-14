# asci-base-model

This module provides a base model that can be extended to create any other model.
It is derived from ampersand-model.
For further info, see [ampersand-model](https://github.com/AmpersandJS/ampersand-model)

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-base-model
```

## example

```javascript
var BaseModel = require('asci-base-model');

var Provider = BaseModel.extend({
  modelType: 'Provider',             // modelType is required
  props: {
    // ...                           // add props and other parts of ampersand-model
  }

```

## license

ASI

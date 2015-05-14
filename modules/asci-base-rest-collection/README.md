# asci-base-rest-collection

This module is used to centralize changes by providing a base collection derived from ampersand-rest-collection

The initial reason for this was the need to extend the ajax timeout globally
from 5s (default of "xhr" npm module) to 120s, which is more forgiving should a backend system
respond slowly.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-base-rest-collection
```

## example

```javascript
var RestCollection = require('asci-base-rest-collection');

var SectionCollection = RestCollection.extend({
  mainIndex: 'fragmentId'
});

module.exports = SectionCollection;
```

## license

ASI

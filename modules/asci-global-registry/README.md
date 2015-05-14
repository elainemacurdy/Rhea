# asci-global-registry

This module represents a global registry for classes.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-global-registry
```

## example

```javascript
window.GlobalRegistry = require('asci-global-registry');

GlobalRegistry.add('key', { myObject: true});
```

## license

ASI

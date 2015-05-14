# asci-base-view

A view module to extend AmpersandView and override/enhance some of the default behavior.
Made to work with [ampersand-view](https://github.com/AmpersandJS/ampersand-view).

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-base-view
```

## example

```javascript
var BaseView = require('asci-base-view');

var MyView = BaseView.extend({
	bindings: {
		...
	},
	derived: {
		...
	},
	events: {
		...
	}
});
```

## license

ASI

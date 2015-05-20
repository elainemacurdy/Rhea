# asci-lineitem-form-view

A module to encapsulate functionality for an editable line item.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-lineitem-form-view
```

## example

```javascript
var LineitemFormView = require('asci-lineitem-form-view');

this._form = new LineitemFormView({
  model: this.model.get('lineItem'),
  parent: this
});
this.listenTo(this._form, 'change:valid', this._toggleSaveButtonState.bind(this));
this.renderSubview(this._form, this.getContentElement());
```

## license

ASI

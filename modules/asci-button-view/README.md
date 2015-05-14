# asci-button-view

A module to encapsulate all incarnations of global application buttons.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-button-view
```

## example

```javascript
var ButtonView = require('asci-button-view');

// make a default button
var createButton = new ButtonView(ButtonView.standardButtons.create, this);
// make a form button
var saveButton = new ButtonView(_.extend({ type: 'form'}, ButtonView.standardButtons.save), this);
// make a non-standard button
var fooButton = new ButtonView({
  className: 'fooButton',
  clickHandlerName: 'handleClickFoo',
  label: i18n.FOO,
  name: 'fooButton'
}, this);

this.renderSubview(createButton, this.el);
this.renderSubview(saveButton, this.el);
this.renderSubview(fooButton, this.el);
```

## license

ASI

# asci-sub-form-view

A view module to render an form element containing multiple other fields.
Works like both a form field (has a complex value) and a form (has individual fields).

Follows the ampersand form conventions:
http://ampersandjs.com/learn/forms#form-input-view-conventions

It's built on [ampersand-view](https://github.com/AmpersandJS/ampersand-view) so it can be extended with `extend` as you might expect.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-sub-form-view
```

## example

```javascript
var SubView = require('asci-sub-form-view');
var InputView = require('../asci-input-view');
var SelectView = require('../asci-select-view');
var i18n = require('../asci-i18n');
var form = new SubView({
  fields: function () {
    return [
      new InputView({
        label: i18n.MAX_BID_CPM,
        name: 'maxBidCpm',
        placeholder: i18n.ENTER_CURRENCY,
        type: 'number',
        value: this.value && this.value.maxBidCpm || '',
        parent: this
      }),
      new SelectView({
        label: i18n.PRICING_TYPE,
        name: 'budgetCpmType',
        options: [
          ['FIXED_CPM', 'Fixed CPM'],
          ['COST_PLUS', 'Cost Plus']
        ],
        unselectedText: i18n.UNSELECTED_DROPDOWN_TEXT,
        value: this.value && this.value.budgetCpmType || '',
        parent: this
      }),
      new InputView({
        inputBindings: ['budgetCpmType:FIXED_CPM'],
        label: i18n.ADVERTISER_CPM,
        name: 'advertiserCpm',
        placeholder: i18n.ENTER_CURRENCY,
        type: 'number',
        value: this.value && this.value.advertiserCpm || ''
      }),
      new InputView({
        inputBindings: ['budgetCpmType:COST_PLUS'],
        label: i18n.PERCENTAGE_MARKUP,
        name: 'markupPercent',
        placeholder: i18n.PERCENTAGE_MARKUP,
        type: 'number',
        value: this.value && this.value.markupPercent || null
      }),
      new InputView({
        inputBindings: ['budgetCpmType:COST_PLUS'],
        label: i18n.FIXED_CPM_MARKUP,
        name: 'markupCpm',
        placeholder: i18n.FIXED_CPM_MARKUP,
        type: 'number',
        value: this.value && this.value.markupCpm || null,
      })
    ]
  }
  label: 'pricing',
  name: 'product',
  value: {}
})

// append it somewhere or use it inside an ampersand-form-view
document.querySelector('form').appendChild(form.el);
```

## license

ASI

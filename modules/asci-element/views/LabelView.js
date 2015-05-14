var ElementView = require('./ElementView');
var templates = require('../templates');

var LabelView = ElementView.extend({
  type: 'LabelView',
  bindings: {
    for: {
      type: 'attribute',
      name: 'for'
    }
  },
  props: {
    for: 'string'
  },
  template: templates.label
});

module.exports = LabelView;

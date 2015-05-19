var AbstractSectionView = require('../../asci-section-abstract/views/AbstractSectionView');
var ButtonView = require('../../asci-button-view');
var GlobalRegistry = require('../../asci-global-registry');
var extendObject = require('extend-object');

var templates = require('../templates');

var ExampleSectionView = AbstractSectionView.extend({
  type: 'ExampleSectionView',
  modelType: 'ExampleSection',

  constructor: function() {
    AbstractSectionView.prototype.constructor.apply(this, arguments);
    this.set('title', 'Hello World'); // this should be in the i18n file
    this.set('buttons', [
      extendObject({
        isDefault: true
      }, ButtonView.standardButtons.cancel)
    ]);
  },

  handleClickCancel: function() {
    GlobalRegistry.get('vent').trigger('back');
  },

  _getContent: function() {
    return templates.body(this);
  },
});

module.exports = ExampleSectionView;

var AbstractSectionState = require('../../asci-section-abstract/models/AbstractSectionState');

var ExampleSection = AbstractSectionState.extend({
  fragmentId: 'example',
  modelType: 'ExampleSection',
  
  fetch: function() {}

});

module.exports = ExampleSection;

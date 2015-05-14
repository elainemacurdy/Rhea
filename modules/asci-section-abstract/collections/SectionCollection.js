var RestCollection = require('../../asci-base-rest-collection');

var SectionCollection = RestCollection.extend({
  mainIndex: 'fragmentId'
});

module.exports = SectionCollection;

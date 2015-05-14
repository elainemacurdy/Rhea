var _ = require('lodash');
var BaseModel = require('../../asci-base-model');

var AbstractSectionState = BaseModel.extend({
  fragmentId: null,
  modelType: 'AbstractSectionState',
  session: {
    // FIXME: these can be moved to AbstractSectionView
    footerHeight: ['number', false, 0],
    hasFooter: ['boolean', true, false],
    hasHeader: ['boolean', true, false],
    hasHelp: ['boolean', true, false],
    hasNavigation: ['boolean', true, false],
    headerHeight: ['number', false, 0],


    canClose: ['boolean', true, false],
    canMinimize: ['boolean', true, false],
    canResize: ['boolean', true, false],
    isAbsolutePositioned: ['boolean', false, false],
    isSubSection: ['boolean', false, false],
    maxWidth: ['number', false],
    name: 'string',
    openIndex: ['number', true, -1],
    parent: 'object',
    searchResults: 'PagedCollection',
    state: ['string', true, ''], // open|minimized
    value: ['any'],
    width: ['number', true, 0]
  },

  constructor: function(options) {
    BaseModel.prototype.constructor.apply(this, arguments);
    if (!this.getFragmentId()) {
      throw new ReferenceError("Please specify the id that correlates this instance to its representation in the history fragment.", 'AbstractSectionState.constructor');
    }
    if (this.getType() === 'AbstractSectionState') {
      throw new ReferenceError("Please specify the type of this class.", 'AbstractSectionState.constructor');
    }
    var idTemplate = _.template(this.getFragmentId());
    this.fragmentId = decodeURIComponent(idTemplate(options));
    this.listenTo(this, 'change:state', this.handleChangeState);
    this.listenTo(this, 'change:value', this.handleChangeValue);
    if (this.parent) {
      this.listenTo(this.parent, 'change:value', this.handleChangeValue);
    }
  },

  getFragmentId: function() {
    return this.fragmentId;
  },
  /**
   * Triggered both when the value of a subsection is changed, and when the corresponding value on the parent view
   * is changed.
   * @param {Object} model
   * @param {Object} value
   * @param {Object} options
   */
  handleChangeValue: function(model, value) {
    this.set('value', value); // doesn't cause an infinite loop because it stops firing change events when the value is the same
    this.reportToParent();
  },
  /**
   * Report updates in this sub section's value up to the parent view.
   */
  reportToParent: function() {
    this.parent.update(this);
  }
});

module.exports = AbstractSectionState;

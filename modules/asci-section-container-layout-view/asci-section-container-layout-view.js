var _ = require('lodash');
var $ = require('jquery');
var AbstractSectionView = require('../asci-section-abstract/views/AbstractSectionView');
var BaseView = require('../asci-base-view');
var GlobalRegistry = require('../asci-global-registry');
var templateSectionContainer = require('./templates').sectionContainer;

var sectionViews = {
  ErrorView: require('../asci-section-error'),
  ExampleView: require('../asci-section-example'),
  LineitemSectionView: require('../asci-section-lineitem')
};

var SectionContainerView = BaseView.extend({
  type: 'SectionContainerView',

  bindings: {
    'model.state': { type: 'class', hook: 'pageContent' },
    'model.useSectionTransitioning': { type: 'booleanClass', hook: 'pageContent' }
  },
  template: templateSectionContainer,

  _numOpenSections: 0,

  initialize: function () {
    BaseView.prototype.initialize.apply(this, arguments);
    var me = this;
    this.listenTo(this.model.get('sections'), 'add', this.onAddSections);
    $(window)
      .on('resize.sectioncontainerview', function() { me.model.set('useSectionTransitioning', false); })
      .on('resize.sectioncontainerview', _.debounce(function() { me._setContentWidth(); }, 100))
      .on('resize.sectioncontainerview', _.debounce(function() { me.model.set('useSectionTransitioning', true); }, 500));
  },
  render: function() {
    BaseView.prototype.render.apply(this, arguments);
    var me = this;
    setTimeout(function() {
      me._setContentWidth();
    }, 0);
  },

  onAddSections: function(addSection) {
    // create a new instance of the view class mapped to the current model
    var ViewClass = GlobalRegistry.get('sectionViewModelMapping')[addSection.getType()];
    if (!ViewClass) {
      // ViewClass = window[addSection.getType() + 'View'];
      // if (typeof this[addSection.getType() + 'View'] !== 'undefined') {
      //   // infer it
      //
      // } else {
      throw new ReferenceError("Please map a View class for " + addSection.getType() + " in asci-section-container-layout-view.sectionViews.", 'SectionContainerView.onAddSections');
      // }
    }
    var addSectionView = new ViewClass({ model: addSection });
    this._listenToSection(addSectionView);

    if (this._numOpenSections === 0) { // don't do the slide effect if this is the very first section, it just looks weird
      this.model.set('useSectionTransitioning', false);
    }
    // append the view's element to the dom
    this.renderSubview(addSectionView, this.el);
    // fetch new view's model
    addSectionView.model.fetch();
    this._numOpenSections++;
    // reset container transition mode after animation has a chance to finish
    var me = this;
    setTimeout(function() {
      me.model.set('useSectionTransitioning', true);
    }, 500);
  },
  onUserCloseSection: function(sectionView) {
    if (!sectionView.model.get('isSubSection')) {
      GlobalRegistry.get('vent').trigger('navigate', '..');
    } else {
      this.model.closeSubSection(sectionView.model);
    }
    this.stopListening(sectionView);
  },
  onUserMaximizeSection: function(sectionId) {
    this.model.maximizeSection(sectionId);
  },
  onUserMinimizeSection: function(sectionId) {
    this.model.minimizeSection(sectionId);
  },
  onUserResizeSection: function(sectionId, ui) {
    this.model.resizeSection(sectionId, ui);
  },
  onUserStartResizeSection: function(sectionId, ui) {
    this.model.startResizeSection(sectionId, ui);
  },
  onUserStopResizeSection: function(sectionId, ui) {
    this.model.stopResizeSection(sectionId, ui);
  },
  open: function(abstractSectionModel) {
    this.model.addSection(abstractSectionModel);
  },
  openSubSection: function(subSection) {
    if (!subSection.get('parent')) {
      throw new ReferenceError('subSection.parent should contain the opening view.', 'SectionContainerView.openSubSection');
    }
    var superSectionView = subSection.get('parent'); // e.g. LineitemBudgetgroupsFormView
    while (!(superSectionView instanceof AbstractSectionView)) {
      if (!superSectionView.parent) {
        throw new ReferenceError('superSectionView.parent should not be null', 'SectionContainerView.openSubSection');
      }
      superSectionView = superSectionView.parent;
    }
    subSection.set('isSubSection', true);
    superSectionView.set('subSection', subSection);
    this.open(subSection);
  },
  remove: function() {
    BaseView.prototype.remove.apply(this, arguments);
    $(window).off('resize.sectioncontainerview');
  },

  _listenToSection: function(sectionView) {
    this.listenTo(sectionView, 'user:close', this.onUserCloseSection);
    this.listenTo(sectionView, 'user:minimize', this.onUserMinimizeSection);
    this.listenTo(sectionView, 'user:maximize', this.onUserMaximizeSection);
    this.listenTo(sectionView, 'user:resize', this.onUserResizeSection);
    this.listenTo(sectionView, 'user:startResize', this.onUserStartResizeSection);
    this.listenTo(sectionView, 'user:stopResize', this.onUserStopResizeSection);
  },
  _setContentWidth: function() {
    this.model.set('sectionContainerWidth', $(this.el).outerWidth());
  }
});

module.exports = SectionContainerView;

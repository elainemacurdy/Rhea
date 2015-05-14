var _ = require('lodash');
var BaseModel = require('../../asci-base-model');
var constants = require('../../asci-constants');
var GlobalRegistry = require('../../asci-global-registry');
var SectionCollection = require('../../asci-section-abstract/collections/SectionCollection');

var UIState = BaseModel.extend({
  modelType: 'UIState',

  session: {
    sectionContainerWidth: ['number', true, 0],
    sections: ['SectionCollection', false],
    selectedTab: ['string', true, ''],
    state: ['string', true, 'default'],
    useSectionTransitioning: ['boolean', true, true]
  },
  _history: null,
  _isEnsuringPath: false,
  _numOpenSections: 0,
  _resizeSettings: {
    nextOpenSection: null,
    nextOpenSectionWidth: null,
    section: null
  },
  _sectionWidths: null,
  // default width percentages for each section, overridden by user-specified values
  _sectionWidthDefaults: [
    null, // this array is 1-based for readability, so we can access it using the current section count (never < 1)
    [1],
    [0.4, 0.6],
    [0.33, 0.33, 0.34],
    [0.25, 0.25, 0.25, 0.25]
  ],
  _staged: [],

  initialize: function(options, history) {
    this._history = history;
    this.set('sections', new SectionCollection());

    var sessionStorage = GlobalRegistry.get('BrowserStorage').session();
    if (!sessionStorage.get('sectionWidths')) {
      sessionStorage.set('sectionWidths', this._sectionWidthDefaults.slice());
    }
    this._sectionWidths = sessionStorage.get('sectionWidths');

    this.listenTo(this, 'change:sectionContainerWidth', this.onChangeSectionContainerWidth);
    this.listenTo(GlobalRegistry.get('vent'), 'ensurePath:start', this.onStartEnsurePath);
    this.listenTo(GlobalRegistry.get('vent'), 'ensurePath:stop', this.onStopEnsurePath);
  },

  addSection: function(newSectionModel) {
    // add the new model to the list of staged models; if we are just ensuring the path, this is all we do
    if (!this.get('sections').findWhere({ fragmentId: newSectionModel.getFragmentId() })) {
      this._staged.push(newSectionModel);
    }

    // only do the actual adds, removes, and state modifications once we have collected all the section models necessary to render the current fragment
    if (!this._isEnsuringPath) {
      // add new sections to the collection
      this._addStagedSections();
      // update all section states, abilities, widths etc.
      var totalSectionIds = this._getSectionIdsFromFragment();
      this._updateSectionStates(totalSectionIds); // update section states
      this._updateOpenIndeces(totalSectionIds); // update the number of open sections, and also each open section's index into that list
      this._updateSectionAbilities(totalSectionIds); // update each section's ability to close, resize, and minimize
      this._updateSectionWidths(totalSectionIds); // update coords on each model
      // prune old sections after setting the current sections' widths so we don't see them disappear suddenly
      this._pruneSections(totalSectionIds);
      // reset the staged sections and sections to remove
      this._staged = [];
    }
  },
  /*
   * Special handler for closing a sub section. Necessary because sub sections do not affect navigation;
   * closing a regular section will go "back" in the fragment history and trigger addSection, which will prune
   * as necessary.
   */
  closeSubSection: function(sectionModel) {
    var sections = this.get('sections');
    sectionModel.set('state', 'closed');
    sections.remove(sectionModel);
    // update all section states, abilities, widths etc.
    var totalSectionIds = this._getSectionIdsFromFragment();
    this._updateSectionStates(totalSectionIds); // update section states
    this._updateOpenIndeces(totalSectionIds); // update the number of open sections, and also each open section's index into that list
    this._updateSectionAbilities(totalSectionIds); // update each section's ability to close, resize, and minimize
    this._updateSectionWidths(totalSectionIds); // update coords on each model
  },
  maximizeSection: function(openId) {
    this._maximizeSection(this.get('sections').get(openId));
    var sectionIds = this._getSectionIdsFromFragment();
    this._updateOpenIndeces(sectionIds); // update the number of open sections, and also each open section's index into that list
    this._updateSectionAbilities(sectionIds);
    this._updateSectionWidths(sectionIds);
  },
  minimizeSection: function(minimizeId) {
    var sections = this.get('sections');
    // this should never happen, but just in case, don't let the only section minimize
    if (sections.length <= 1) {
      return;
    }
    // if about to minimize the last open section, we need to force open the closest leaf
    if (this._numOpenSections === 1) {
      for (var i=sections.length-1; i>=0; i--) {
        if (sections.at(i).get('state') === 'minimized') {
          this._maximizeSection(sections.at(i));
          break;
        }
      }
    }
    this._minimizeSection(sections.get(minimizeId));
    var sectionIds = this._getSectionIdsFromFragment();
    this._updateOpenIndeces(sectionIds); // update the number of open sections, and also each open section's index into that list
    this._updateSectionAbilities(sectionIds);
    this._updateSectionWidths(sectionIds);
  },
  onChangeSectionContainerWidth: function() {
    var sections = this.sections;
    // only update the widths if we have at least one minimized section
    if (this._numOpenSections !== sections.length) {
      this._updateSectionWidths(this._getSectionIdsFromFragment());
    }
  },
  onStartEnsurePath: function() {
    this._isEnsuringPath = true;
  },
  onStopEnsurePath: function() {
    this._isEnsuringPath = false;
  },
  resizeSection: function(resizeId, uiObject) {
    var delta = uiObject.originalSize.width - uiObject.size.width;
    this._resizeSettings.nextOpenSection.set('width', this._resizeSettings.nextOpenSectionWidth + delta);
  },
  startResizeSection: function(resizeId, uiObject) {
    var sections = this.get('sections');
    this._resizeSettings.section = sections.get(resizeId); // section being resized
    this._resizeSettings.nextOpenSection = sections.findWhere({ openIndex: this._resizeSettings.section.get('openIndex') + 1 }); // next open section, also being resized
    if (!this._resizeSettings.nextOpenSection) { // should never happen, but just in case
      return;
    }
    var contentWidth = this.get('sectionContainerWidth'); // total content area width
    this._resizeSettings.nextOpenSectionWidth = this._resizeSettings.nextOpenSection.get('width') * contentWidth; // grab the next section's original width
    // add this section's width, plus the next section's width, and subtract the min section width: that's the new max width for this section.
    var maxWidth = uiObject.originalSize.width + this._resizeSettings.nextOpenSectionWidth - constants.DOM.minimumSectionWidth;
    this._resizeSettings.section.set('maxWidth', maxWidth);
    // temporarily absolute position all sections to the right of the one being resized
    this._setRightSectionsAbsolute(sections, true);
  },
  stopResizeSection: function(resizedId, uiObject) {
    var contentWidth = this.get('sectionContainerWidth'); // total content area width
    // convert the widths of the two sections back to %
    this._resizeSettings.nextOpenSection.set('width', this._resizeSettings.nextOpenSection.get('width') / contentWidth); // set the width back to a % of the total window width
    this._resizeSettings.section.set('width', uiObject.size.width / contentWidth); // set the width back to a % of the total window width
    // store the new widths, after converting them to percentages of the available width. E.g. if a section width is 50% to look correct with one minimized section,
    // it has to be ~52% to look correct without the minimized section. We always want to store the 52%.
    var sections = this.get('sections');
    var numMinimizedSections = sections.length - this._numOpenSections; // total number of minimized sections
    var availableWidth = contentWidth - (numMinimizedSections * constants.DOM.minimizedSectionWidth); // width available to open sections, minus real estate taken by minimized sections
    this._sectionWidths[this._numOpenSections][this._resizeSettings.section.get('openIndex')] = uiObject.size.width / availableWidth;
    this._sectionWidths[this._numOpenSections][this._resizeSettings.nextOpenSection.get('openIndex')] = (this._resizeSettings.nextOpenSection.get('width') * contentWidth) / availableWidth;
    GlobalRegistry.get('BrowserStorage').session.set('sectionWidths', this._sectionWidths.slice());
    // remove the temporary positioning we added earlier
    this._setRightSectionsAbsolute(sections, false);
    // reset the resize references
    this._resizeSettings = {
      nextOpenSection: null,
      nextOpenSectionWidth: null,
      section: null
    };
  },

  _addStagedSections: function() {
    var sections = this.get('sections');
    for (var i=0; i<this._staged.length; i++) {
      sections.add(this._staged[i]);
    }
  },
  /**
   * Return an array of the sectionIds both in the current fragment, and of any open sub sections.
   * This is a little weird and might behave strangely in the following situations:
   *  - opening a new sub section to replace an existing sub section
   *  - opening a new sub section from a sub section
   */
  _getSectionIdsFromFragment: function() {
    var subSectionIds = _.pluck(_.filter(this.get('sections').models, function(model) {
      return (model.get('isSubSection')) ? true : false;
    }), 'fragmentId');
    var ids = this._history.getAppFragment().split('/').concat(subSectionIds);
    return _.map(ids, function(id) {
      return decodeURIComponent(id);
    });
  },
  _maximizeSection: function(sectionModel) {
    sectionModel.set('state', 'open');
    this._numOpenSections++;
  },
  _minimizeSection: function(sectionModel) {
    sectionModel.set('state', 'minimized');
    this._numOpenSections--;
  },
  /**
   * Prune all sections in the collection including and after the first one not in the current fragment.
   * E.g.: fragment = /blue/green, collection = [blue, red, purple]: prune [red, purple]
   */
  _pruneSections: function(sectionIds) {
    var sections = this.get('sections');
    var remove = [];
    for (var i=0; i<sections.length; i++) {
      var section = sections.at(i);
      // never close sub sections, they're taken care of via other channels
      if (!section.get('isSubSection') && !_.contains(sectionIds, section.getFragmentId())) {
        section.set('state', 'closed');
        remove.push(section);
      }
    }
    sections.remove(remove);
  },
  /**
   * This little tweak prevents sections to the right of the one being positioned from visibly jumping around on the right, as the width struggles to keep up with the left position changing.
   * We just make the right-most section absolute positioned and set its 'right' coord to its existing position, such that it'll be anchored on the right.
   * Then when we change its width, any gappiness appears between the two sections instead of over on the right, which is much less jarring.
   */
  _setRightSectionsAbsolute: function(sections, isAbsolute) {
    var indexOfNextOpenSection = sections.indexOf(this._resizeSettings.nextOpenSection);
    for (var i=sections.length-1; i>=indexOfNextOpenSection; i--) {
      sections.at(i).set('isAbsolutePositioned', isAbsolute);
    }
  },
  _updateOpenIndeces: function(sectionIds) {
    this._numOpenSections = 0;
    for (var i=0; i<sectionIds.length; i++) {
      var section = this.get('sections').findWhere({ fragmentId: sectionIds[i] });
      if (section.get('state') === 'open') {
        section.set('openIndex', this._numOpenSections++);
      } else {
        section.set('openIndex', -1);
      }
    }
  },
  _updateSectionAbilities: function(sectionIds) {
    var numSections = sectionIds.length; // number of sections in any state
    var hasMultipleSections = (numSections > 1) ? true : false;
    for (var i=0; i<numSections; i++) {
      var section = this.get('sections').findWhere({ fragmentId: sectionIds[i] });
      var isOpenSection = (section.get('state') === 'open') ? true : false;
      var isLastOpenSection = (section.get('openIndex') === this._numOpenSections - 1) ? true : false;

      // if there is more than one section in any state, and if a section is the last of the open||forceOpen sections, it can be closed
      section.set('canClose', (hasMultipleSections && isLastOpenSection) ? true : false);
      // if there is more than one section in any state, and if a section is open||forcedOpen, it can be minimized
      section.set('canMinimize', (hasMultipleSections && isOpenSection) ? true : false);
      // if a section is open||forcedOpen, and if the section is not the last open||forcedOpen section, it can be resized
      section.set('canResize', (isOpenSection && !isLastOpenSection) ? true : false);
    }
  },
  _updateSectionStates: function(sectionIds) {
    var firstOpenIndex = Math.max(0, sectionIds.length - 2);
    for (var i=0; i<sectionIds.length; i++) {
      var section = this.get('sections').findWhere({ fragmentId: sectionIds[i] });
      // only have two sections open at a time, even if they had been forced open previously
      var state = (i >= firstOpenIndex) ? 'open' : 'minimized';
      section.set('state', state);
    }
  },
  /**
   * Update the width of each section. Each section width is a percentage, so that we can resize the window and not have to intensively update px coords.
   * But because minimized sections are a precise px width (35), we must do the following hoop jumping:
   *  - figure out how much real estate is left over after minimized sections are subtracted
   *  - if a section is 40% width, figure out how many px are in 40% of the available real estate
   *  - now that we have the absolute px width, figure out what % that is of the total real estate and use that number for the width
   * Makes perfect sense to me now. I suspect it never will again.
   */
  _updateSectionWidths: function(sectionIds) {
    var numMinimizedSections = sectionIds.length - this._numOpenSections; // total number of minimized sections
    var widthSet = this._sectionWidths[this._numOpenSections]; // the set of width percentages for the current number of open sections
    var contentWidth = this.get('sectionContainerWidth'); // total content area width
    var availableWidth = contentWidth - (numMinimizedSections * constants.DOM.minimizedSectionWidth); // width available to open sections, minus real estate taken by minimized sections
    for (var i=0; i<sectionIds.length; i++) {
      var section = this.get('sections').findWhere({ fragmentId: sectionIds[i] });
      var widthPercent = 0; // null out the widthPercent for minimized sections, their width is set in CSS
      if (section.get('state') === 'open') {
        var widthPx = widthSet[section.get('openIndex')] * availableWidth; // exact pixel width of this section
        widthPercent = widthPx / contentWidth; // widthPx is x% of total content width
      }
      section.set('width', widthPercent);
    }
  }
});

/*
 * Maintain collection (actually be a collection??) of open sections. Do all the calculations about screen width and left/right positions. So each section
 * would have a collection of properties: left, right... um didn't I just implement this in the view?
 */

module.exports = UIState;

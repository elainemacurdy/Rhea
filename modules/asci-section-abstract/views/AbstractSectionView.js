var _ = require('lodash');
var $ = require('jquery');
require('jquery-ui/resizable');
var BaseView = require('../../asci-base-view');
var ButtonView = require('../../asci-button-view');
var constants = require('../../asci-constants');
var GlobalRegistry = require('../../asci-global-registry');
var i18n = require('../../asci-i18n');
var InputView = require('../../asci-element').InputView;
var SearchableInputView = require('../../asci-element/decorators/SearchableInputView');

var templates = require('../templates');

/**
 * Base section view. Model property should be a subclass of public/js/models/AbstractSectionState.
 */
var AbstractSectionView = BaseView.extend({
  type: 'AbstractSectionView',

  bindings: {
    'hasSearch': {
      type: 'toggle',
      hook: 'search'
    },
    'model.canClose': {
      type: 'booleanClass',
      hook: 'controls'
    },
    'model.canMinimize': {
      type: 'booleanClass',
      hook: 'controls'
    },
    'model.canResize': {
      type: 'booleanClass',
      hook: 'section'
    },
    'model.hasFooter': {
      type: 'booleanClass',
      hook: 'section'
    },
    'model.hasHeader': {
      type: 'booleanClass',
      hook: 'section'
    },
    'model.hasHelp': {
      type: 'booleanClass',
      hook: 'section'
    },
    'model.hasNavigation': {
      type: 'booleanClass',
      hook: 'section'
    },
    'model.name': {
      type: 'attribute',
      name: 'data-test'
    },
    'model.state': {
      type: 'class',
      hook: 'section'
    },
    'pretitle': {
      type: 'text',
      hook: 'pretitle'
    },
    'subtitle': {
      type: 'text',
      hook: 'subtitle'
    },
    'title': {
      type: 'text',
      hook: 'title'
    }
  },
  events: {
    'mousedown': 'onMouseDown',
    'mouseup': 'onMouseUp',
    'click .close': 'onClose',
    'click .maximize': 'onMaximize',
    'click .minimize': 'onMinimize',
    'click .openHelp': 'onToggleHelp'
  },
  modelType: null,
  props: {
    buttons: ['array', false, function() { return []; }],
    hasSearch: ['boolean', true, false],
    pretitle: 'string',
    title: 'string',
    subSection: 'object',
    subtitle: 'string'
  },
  session: {
    '$body': 'any',
    '$content': 'any',
    '$footer': 'any',
    '$header': 'any',
    '$help': 'any',
    '$navigation': 'any',
    '_search': 'any',
    'searchQuery': 'string'
  },
  template: templates.section,

  _contentTemplate: null,
  _footerTemplate: templates.footer,
  _helpTemplate: null,

  initialize: function (options) {
    BaseView.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'change:state', this.onChangeState);
    this.listenTo(this.model, 'change:width', this.onChangeWidth);
    this.listenTo(this.model, 'change:canResize', this.onChangeCanResize);
    this.listenTo(this.model, 'change:isAbsolutePositioned', this.onChangeAbsolutePositioned);
    this.listenTo(this.model, 'change:maxWidth', this.onChangeMaxWidth);
    this.listenTo(this.model, 'change:footerHeight', this.onChangeFooterHeight);
    this.listenTo(this.model, 'change:headerHeight', this.onChangeHeaderHeight);
    this.listenTo(this.model, 'close', this.close);
    this.listenTo(this, 'change:subSection', this.handleChangeSubSection);
  },
  render: function() {
    BaseView.prototype.render.apply(this, arguments);
    this.$el = $(this.el);
    this._setHeader();
    this._setFooter();
    this._setNavigation();
    this._setContent();
    var me = this;
    this.$el
      .resizable({
        containment: 'parent',
        disabled: (this.model.get('canResize')) ? false : true,
        handles: 'e',
        minWidth: constants.DOM.minimumSectionWidth,
        resize: function(e, ui) {
          me.trigger('user:resize', me.model.getFragmentId(), ui);
        },
        start: function(e, ui) {
          me.trigger('user:startResize', me.model.getFragmentId(), ui);
        },
        stop: function(e, ui) {
          me.trigger('user:stopResize', me.model.getFragmentId(), ui);
        }
      });
    return this;
  },

  close: function() {
    this.onClose();
  },
  getContentElement: function() {
    return this.$body.get(0);
  },
  getId: function() {
    return this._id;
  },
  handleChangeSubSection: function() {
    // close any sub sections that were previously open
    if (this.previous('subSection')) {
      this.previous('subSection').trigger('close');
    }
  },
  handleClearSearch: function() {
    if (this.model.searchResults) {
      this.set('searchQuery', '');
      this.model.searchResults.reset();
      this.model.searchResults.fetch();
    }
  },
  handleSearch: function(value) {
    if (this.model.searchResults) {
      this.set('searchQuery', value);
      // clear out the results from the old search
      this.model.searchResults.reset();
      this.model.searchResults.search(value);
    }
  },
  onChangeAbsolutePositioned: function(model, isAbsolutePositioned) {
    this.$el.css({
      position: (isAbsolutePositioned) ? 'absolute' : '',
      right: (isAbsolutePositioned) ? this.$el.parent().outerWidth() - (this.$el.position().left + this.$el.outerWidth()) + 'px' : ''
    });
  },
  onChangeCanResize: function(model, canResize) {
    if (canResize) {
      this.$el.resizable('enable');
    } else {
      this.$el.resizable('disable');
    }
  },
  onChangeFooterHeight: function(model, footerHeight) {
    this.$body.css('bottom', footerHeight + 'px');
  },
  onChangeHeaderHeight: function(model, headerHeight) {
    this.$content.css('top', headerHeight + 'px');
    if (this.$help) {
      this.$help.css('top', headerHeight + 'px');
    }
  },
  onChangeMaxWidth: function(model, maxWidth) {
    this.$el.resizable('option', 'maxWidth', maxWidth);
  },
  onChangeState: function(model, state) {
    if (state === 'closed') {
      this.set('subSection', null);
      this.remove();
    }
  },
  onChangeWidth: function(model, width) {
    var isPercent = (width <= 1) ? true : false;
    var unit = (width && isPercent) ? '%' : 'px';
    if (!width) {
      width = constants.DOM.minimizedSectionWidth;
    } else if (isPercent) {
      width = width * 100;
    }
    this.$el.css({
      width: width + unit
    });
  },
  onClose: function(e) {
    this.trigger('user:close', this);
  },
  onMaximize: function() {
    this.trigger('user:maximize', this.model.getFragmentId());
  },
  onMinimize: function() {
    this.trigger('user:minimize', this.model.getFragmentId());
  },
  onMouseDown: function() {
    GlobalRegistry.set('activeSection', this.model.getFragmentId());
  },
  onMouseUp: function() {
    // remove the active section only after other clicks have completed, so the navigation handler has time to grab the active section id
    setTimeout(function() { GlobalRegistry.set('activeSection', null); }, 0);
  },
  onToggleHelp: function(e) {
    this._toggleHelp();
  },
  open: function() {
    this.render();
    return this.$el;
  },
  // Called when the search field value changes. Implement when we do an auto-complete-like search.
  update: function(field) {
    if (this.hasSearch && this.model.searchResults) {
        this.model.searchResults.setQuery(field.getData());
    }
  },

  _getClickHandler: function(clickHandlerName) {
    return function(e, $input) {
      this[clickHandlerName](e, $input);
    }.bind(this);
  },
  _getContent: function() {
    return this._contentTemplate(this);
  },
  _getFooter: function() {
    var footer = this._footerTemplate(this);
    var buttonsWrap = $('.buttons', footer).get(0);
    for (var i=0; i<this.buttons.length; i++) {
      var button = new ButtonView(_.extend({}, this.buttons[i], { buttonType: 'form' }), this);
      this.renderSubview(button, buttonsWrap);
    }
    return footer;
  },
  _getHelp: function(options) {
    var help = null;
    if (this._helpTemplate) {
      help = this._helpTemplate(options);
    }
    return help;
  },
  _getNavigation: function() {
    return null;
  },
  _setContent: function() {
    if (!this.$content) {
      this.$content = $('.content', this.el);
      this.$body = $('.body', this.$content);
    }
    this.$body.append(this._getContent());
  },
  _setFooter: function() {
    if (!this.$footer) {
      this.$footer = $('.footer', this.el);
    }
    var footer = this._getFooter();
    if (footer) {
      this.model.set('hasFooter', true);
      this.$footer.append(footer);
    }
    var me = this;
    setTimeout(function() {
      me.model.set('footerHeight', me.$footer.outerHeight());
    }, 0);
  },
  _setHeader: function() {
    if (!this.$header) {
      this.$header = $('.header', this.el);
    }
    if (!this._search) {
      this.set('_search', this.queryByHook('search'));
      var searchView = new SearchableInputView({
        inputView: new InputView({
            name: 'search',
            inputType: 'text',
            placeholder: i18n.SEARCH,
            parent: this
        })
      });
      this.renderSubview(searchView, this._search);
      this.listenTo(searchView, 'search', this.handleSearch);
      this.listenTo(searchView, 'clear', this.handleClearSearch);
    }
    if (this.title || this.subtitle || this.pretitle || this.hasSearch) {
      this.model.set('hasHeader', true);
    }
    var me = this;
    setTimeout(function() {
      me.model.set('headerHeight', me.$header.outerHeight());
    }, 0);
  },
  _setNavigation: function() {
    if (!this.navigation) {
      this.$navigation = $('.navigation', this.el);
    }
    var navigation = this._getNavigation();
    if (navigation) {
      this.model.set('hasNavigation', true);
      this.$navigation.append(navigation);
    }
  },
  _toggleHelp: function() {
    if (!this.$help) {
      this.$help = $('.help', this.el)
        .css('top', this.model.headerHeight + 'px');
      var $helpContent = $('.gutter', this.$help);
      var help = this._getHelp();
      if (help) {
        $helpContent.append(help);
      }
    }
    var me = this;
    var isShow = (this.model.get('hasHelp')) ? false : true;
    if (isShow) {
      this.$help.show();
      setTimeout(function() {
        me.model.set('hasHelp', isShow);
      }, 0);
    } else {
      this.model.set('hasHelp', isShow);
      setTimeout(function() {
        me.$help.hide();
      }, 200);
    }
  }
});

/*
 * Some wacky magic to ensure the modelType is specified in all subclasses.
 * Mapping the specified model key to the subclass constructor in a global variable, so SectionContainerView can automatically create a view for each anonymous model.
 */
GlobalRegistry.add('sectionViewModelMapping', {});
var naturalExtend = AbstractSectionView.extend;
AbstractSectionView.extend = function(properties) {
  var ViewClass = naturalExtend.apply(this, arguments);
  if (!properties.modelType) {
    throw new ReferenceError('modelType cannot be null', 'AbstractSectionView.extend');
  }
  var newMapping = {};
  newMapping[properties.modelType] = ViewClass;
  GlobalRegistry.set('sectionViewModelMapping', _.extend(GlobalRegistry.get('sectionViewModelMapping'), newMapping));
  return ViewClass;
};

module.exports = AbstractSectionView;

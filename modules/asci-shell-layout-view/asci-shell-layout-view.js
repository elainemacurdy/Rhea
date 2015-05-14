// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders iteslf on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.

var $ = require('jquery');
var BaseView = require('../asci-base-view');
var GlobalRegistry = require('../asci-global-registry');

var HeaderView = require('../asci-header-layout-view');
var SectionContainerView = require('../asci-section-container-layout-view');
var setFavicon = require('favicon-setter');
var templateBody = require('./templates').body;
var templateHead = require('./templates').head;

var ShellView = BaseView.extend({
  type: 'ShellView',

  bindings: {
    'model.selectedTab': { type: 'class', hook: 'page' }
  },
  events: {
    'click a[href]': 'handleLinkClick'
  },
  template: templateBody,

  initialize: function () {
    BaseView.prototype.initialize.apply(this, arguments);
    this._headerView = new HeaderView({ model: this.model });
    this._sectionContainerView = new SectionContainerView({ model: this.model });

    GlobalRegistry.add('sectionContainerView', this._sectionContainerView);
  },
  render: function () {
    BaseView.prototype.render.apply(this, arguments);

    // add this element to the dom
    $(document.body).append(this.el);

    // some additional stuff we want to add to the document head
    $('head').append(templateHead());

    this.renderSubview(this._headerView, this.el);
    this.renderSubview(this._sectionContainerView, this.el);

    // setting a favicon for fun (note, it's dyanamic)
    var rootPath = (GlobalRegistry.get('rootAssetDir')) ? '/' + GlobalRegistry.get('rootAssetDir') : '';
    setFavicon(rootPath + '/client/public/images/Helios_Favicon_16x16.ico');
    return this;
  },

  handleLinkClick: function (e) {
    var target = $(e.target);
    var aElement = target.is('a') ? target[0] : target.closest('a')[0];
    var isLocal = (window.location.host === aElement.host) ? true : false;

    // if the window location host and target host are the same it's local, else, leave it alone
    if (isLocal) {
      e.preventDefault();
      var path = $(aElement).attr('href');
      GlobalRegistry.get('vent').trigger('navigate', path);
    }
  }
});

module.exports = ShellView;

window.jQuery = window.$ = require('jquery');
window._ = require('lodash'); // lodash itself relies on a global _ variable
var BackboneEvents = require('backbone-events-standalone');
var BrowserStorage = require('./modules/asci-browserstorage');
var GlobalRegistry = require('./modules/asci-global-registry');
var RouterRhea = require('./modules/asci-router-rhea');
var ShellView = require('./modules/asci-shell-layout-view');
var UIState = require('./modules/asci-ui-state');

window.modelRegistry = require('./modules/asci-global-registry/models');

module.exports = {
  // this is the the whole app initter
  blastoff: function () {
    // add the ability to bind/unbind/trigger events
    // to the main app object.
    window._.extend(this, BackboneEvents);

    GlobalRegistry.add('BrowserStorage', BrowserStorage);

    // add a global variable to track which section is currently active
    GlobalRegistry.add('activeSection');

    this._router = new RouterRhea();

    // wait for document ready to render our main view
    // this ensures the document has a body, etc.
    window.$(function () {
      var model = new UIState({
        selectedTab: 'isMedia',
        state: 'default'
      }, this._router.history);
      // wait until we have the page width before rendering any sections, as they need left/right coords derived from the page width
      this.listenToOnce(model, 'change:sectionContainerWidth', function(sameModel, sectionContainerWidth) {
        // we have what we need, we can now start our router and show the appropriate page
        this._router.history.start({
          pushState: true,
          root: ''
        });
      });
      // init our main view
      this.view = new ShellView({
          model: model
      });
      this.view.render();
    }.bind(this));
  }
};

// run it
module.exports.blastoff();

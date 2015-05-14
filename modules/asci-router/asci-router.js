var _ = require('lodash');
var AmpersandRouter = require('ampersand-router');
var BackboneEvents = require('backbone-events-standalone');
var GlobalRegistry = require('../asci-global-registry');

var History = {
  findPathMatch: function(path) {
    var knownPathOverrides = [
      /^advertisers\/.*?\/campaigns\/.*?\/lineItems/
    ];

    // first, weed out the paths we know about but which shouldn't be run through the section parsing logic
    if (_.some(knownPathOverrides, function(overridePath) {
        return overridePath.test(path);
      })) {
      return false;
    }

    // drop the internal-only *notFound route
    var validPaths = this.handlers.slice(0, -1);

    // return true if the current path matches at least one of the valid section paths
    // return false if the current path is an unknown (i.e. a 404)
    return validPaths.some(function (handler) {
      if (handler.route.test(path)) {
        return true;
      }
    });
  },
  getAppFragment: function(fragmentOverride) {
    var fragment = this.getFragment(fragmentOverride);
    if (this._prefix) {
      fragment = fragment.replace(new RegExp('^' + this._prefix), '');
    }
    return fragment;
  },
  getPrefix: function() {
    return this._prefix || '';
  },
  setPrefix: function(prefix) {
    this._prefix = prefix;
  },
  /**
  * Override the history object's loadUrl() method. Our version ensures that each piece of the url fragment is represented by an open section.
  * Flow for example fragment /blue/red/green:
  *  - Execute /blue handler in the router (will be ignored if blue section is already open)
  *  - Execute /blue/red handler in the router (will be ignored if red section is already open)
  *  - Finally, execute /blue/red/green handler in the router to open the green section
  * @param {String} fragmentOverride Contains the current fragment being examined
  * @param {boolean} isEnsure False for the initial call to loadUrl, but true for the calls that ensure the previous sections' existence
  */
  _getLoadUrl: function(history) {
    var backboneLoadUrl = history.loadUrl;
    return function(fragmentOverride, isEnsure) {
      var isBrowserBack = false;
      var currentFragment = this.getFragment(fragmentOverride);
      var isPathFound = this.findPathMatch(currentFragment);
      // only do this for the top level (first) call
      if (isPathFound && !isEnsure) {
        // track the page view on url change
        // utilMetrics.GA.sendPageView(); // FIXME GOOGLE ANALYTICS deactivated for V1
        // let the app know we're starting to ensure head sections in the path are open by iterating over each
        GlobalRegistry.get('vent').trigger('ensurePath:start');
        var currentAppFragment = this.getAppFragment(fragmentOverride);
        var previousFragment = this.getAppFragment();
        isBrowserBack = ((previousFragment !== currentAppFragment) && (previousFragment.indexOf(currentAppFragment) === 0)) ? true : false;
        var sectionIds = currentAppFragment.split('/');
        // if the 'back' button was hit, we'll ensure the entire path
        if (!isBrowserBack) {
          sectionIds.pop(); // get rid of the last section id, since the current function call will take care of it
        }
        var ensureFragment = [];
        // iteratively call the router handler for each piece of the fragment
        for (var i=0; i<sectionIds.length; i++) {
          ensureFragment.push(sectionIds[i]);
          if (!this.loadUrl(ensureFragment.join('/'), true)) {
            return false;
          }
        }
        // let the app know we're done ensuring head sections exist
        GlobalRegistry.get('vent').trigger('ensurePath:stop');
      }
      return (isBrowserBack) ? true : backboneLoadUrl.call(history, fragmentOverride);
    };
  }
};

var Router = AmpersandRouter.extend({
  initialize: function() {
    // Backbone appears to initialize 'this.route' commands in the reverse order from what's intuitive.
    // this._routes still gets to store them in intuitive order, while we just execute the route command in the order backbone wants. Wacky.
    var anyPathRE = /^\*anypath\//;
    var errorRE = /^\w*\/error/;
    for (var i=this._routes.length-1; i>=0; i--) {
      var route = this._routes[i][0];
      var handler = this._routes[i][1];
      if (errorRE.test(route)) {
        // hardcode the error path regex for now, as it can't parse the :code:search pattern properly.
        // if we did error-:code-:search it would be fine, but error-404-?path=blah looks really weird.
        route = /^\w*\/error\-([^/?]+)(?:\?([\s\S]*))?$/;
      } else if (anyPathRE.test(route)) {
        // if the route has our special *anypath token present, replace it with the appropriate regexp.
        // this is just to keep our _routes list relatively clean and readable.
        route = new RegExp(route.replace(anyPathRE, '^(.*\/)?') + '$');
      }
      this.route(route, handler);
    }

    this.history.findPathMatch = History.findPathMatch.bind(this.history);
    this.history.getAppFragment = History.getAppFragment.bind(this.history);
    this.history.getPrefix = History.getPrefix.bind(this.history);
    this.history.loadUrl = History._getLoadUrl(this.history);
    this.history.setPrefix = History.setPrefix.bind(this.history);

    // add a global event listener, listen for navigate events
    GlobalRegistry.add('vent', _.clone(BackboneEvents));
    this.listenTo(GlobalRegistry.get('vent'), 'navigate', this.navigate);
    this.listenTo(GlobalRegistry.get('vent'), 'back', this.back);
  },

  back: function() {
    window.history.back();
  },

  /*
   * Override super's navigate method to intercept the incoming path, and resolve any relative references.
   * Called by triggering the global 'navigate' event, both explicitly in views and implicitly via a glabal click handler for <a> tags.
   */
  navigate: function (path, options) {
    var url = this._resolveRelativePath(path);
    AmpersandRouter.prototype.navigate.call(this, url, options || true);
  },

  _resolveRelativePath: function(path) {
    // this path is root relative, e.g. '/blue/green': just need to return it as-is, but without the leading '/'
    if (/^\//.test(path)) {
      path = path.slice(1);
      var prefix = (new RegExp('^' + this.history.getPrefix() + '\\/').test(path)) ? '' : this.history.getPrefix();
      return prefix + path;
    }
    // this path is relative, e.g. 'blue/green', '../green', etc: need to do some path parsing on it
    // the only relevant part of the path is up to the current active section, so nuke everything after it
    // this handles the situation where user has two sections open, and clicks a link in section 1 to replace section 2
    var activeSection = GlobalRegistry.get('activeSection');
    var rootPath = this.history.fragment.replace(new RegExp('^(.*' + activeSection + ').*$'), '$1');
    // split the incoming path into an array of 'directories'
    var newPath = path.split('/');
    // start with a copy of the current path
    var resolvedPath = rootPath.split('/');
    while (newPath.length > 0) {
      var currentDir = newPath[0];
      if (currentDir === '.') {
        // remove the '.' from the new section of path
        newPath.shift();
      } else if (currentDir === '..') {
        // remove the '..' from the new section of path
        newPath.shift();
        // also remove the last directory from the current location path
        resolvedPath.pop();
      } else {
        // we're left with the correct root plus the correct new path, so just concat them together
        resolvedPath = resolvedPath.concat(newPath);
        break;
      }
    }
    return resolvedPath.join('/');
  },
  /**
   * set some variables extracted from the path in the global registry to make them accessable throughout
   * @param {Object} vars Key-value pairs, whose keys become keys in the global registry (overrides existing)
   */
  _setPathVariablesInRegistry: function(vars) {
    for (var key in vars) {
      GlobalRegistry.set(key, vars[key]);
    }
  }
});

module.exports = Router;

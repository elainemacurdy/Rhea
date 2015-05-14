var $ = require('jquery');
require('browserify-jquery-storage-api/min'); // adds $.localStorage and $.sessionStorage to the global jquery reference

/** Very simple wrapper around the jquerystorage library. Basically just instantiates a namespaced storage object using the username,
 * and exposes the local/session storage objects so the native methods etc. can be used.
 */
var BrowserStorage = {
  _appName: 'default',
  _storage: null,
  _userName: 'admin',

  local: function() {
    return BrowserStorage.namespace().localStorage;
  },
  namespace: function() {
    if (!BrowserStorage._storage) {
      BrowserStorage._storage = $.initNamespaceStorage(['AS', this._appName, this._userName].join('.'));
    }
    return BrowserStorage._storage;
  },
  session: function() {
    return BrowserStorage.namespace().sessionStorage;
  },
  setAppName: function(name) {
    this._appName = name;
    return this;
  },
  setUserName: function(name) {
    this._userName = name;
    return this;
  }
};

module.exports = BrowserStorage;

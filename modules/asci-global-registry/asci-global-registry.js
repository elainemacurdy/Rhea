
var GlobalRegistry = {
  _registry: {},
  // probably not strictly necessary, but I think it'll be useful during development while we sort out our globals.
  add: function(namespace, value) {
    var hasValue = (arguments.length >= 2) ? true : false;
    GlobalRegistry._applyToNamespace(namespace, function(key, parentNode) {
      if ((typeof parentNode[key]) !== 'undefined') {
        throw new Error('Doh! A global variable "' + namespace + '" has already been registered.');
      } else {
        parentNode[key] = (hasValue) ? value : null;
      }
    });
  },
  get: function(namespace) {
    return GlobalRegistry._applyToNamespace(namespace, function(key, parentNode) {
      return parentNode[key];
    });
  },
  set: function(namespace, value) {
    if (arguments.length < 2) {
      GlobalRegistry._applyToNamespace(namespace, function(key, parentNode) {
        delete parentNode[key];
      });
    } else {
      GlobalRegistry._applyToNamespace(namespace, function(key, parentNode) {
        parentNode[key] = value;
      });
    }
  },

  _applyToNamespace: function(key, callback) {
    var namespace = key.split('.');
    var currentNode = GlobalRegistry._registry;
    for (var i=0; i<namespace.length; i++) {
      if (i === namespace.length - 1) {
        return callback(namespace[i], currentNode);
      } else {
        currentNode = currentNode[namespace[i]];
      }
    }
  }
};

window.GlobalRegistry = GlobalRegistry;
module.exports = window.GlobalRegistry;

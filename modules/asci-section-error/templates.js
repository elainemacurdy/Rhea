var templates = {};
templates._runtime = require('domthing/runtime');
templates['error'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'appError');
      (function (parent) {
        (function (parent) {
          var expr = (
            runtime.hooks.EVENTIFY_LITERAL.call(template, " ")
          );
          var node = document.createTextNode((expr.value||expr.value===0) ? expr.value : '');
          expr.on('change', function (text) { node.data = (text||text===0) ? text : ''; });
          parent.appendChild(node);
        })(parent);
        (function (parent) {
          var element = document.createElement('span');
          var expr;
          element.setAttribute('data-hook', 'generic-error-message');
          parent.appendChild(element);
        })(parent);
        (function (parent) {
          var expr = (
            runtime.hooks.EVENTIFY_LITERAL.call(template, " ")
          );
          var node = document.createTextNode((expr.value||expr.value===0) ? expr.value : '');
          expr.on('change', function (text) { node.data = (text||text===0) ? text : ''; });
          parent.appendChild(node);
        })(parent);
        (function (parent) {
          var element = document.createElement('span');
          var expr;
          element.setAttribute('data-hook', 'specific-error-message');
          parent.appendChild(element);
        })(parent);
        (function (parent) {
          var expr = (
            runtime.hooks.EVENTIFY_LITERAL.call(template, " ")
          );
          var node = document.createTextNode((expr.value||expr.value===0) ? expr.value : '');
          expr.on('change', function (text) { node.data = (text||text===0) ? text : ''; });
          parent.appendChild(node);
        })(parent);
      })(element);
      parent.appendChild(element);
    })(parent);
  })(template.html);
  var firstChild = template.html.firstChild;
  firstChild.update = template.update.bind(template);
  return firstChild;
}.bind(templates);
module.exports = templates;
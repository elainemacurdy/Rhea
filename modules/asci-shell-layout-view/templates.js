var templates = {};
templates._runtime = require('domthing/runtime');
templates['body'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'page');
      element.setAttribute('data-hook', 'page');
      parent.appendChild(element);
    })(parent);
  })(template.html);
  var firstChild = template.html.firstChild;
  firstChild.update = template.update.bind(template);
  return firstChild;
}.bind(templates);
templates['head'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('meta');
      var expr;
      element.setAttribute('name', 'viewport');
      element.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0');
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
      var element = document.createElement('meta');
      var expr;
      element.setAttribute('name', 'apple-mobile-web-app-capable');
      element.setAttribute('content', 'yes');
      parent.appendChild(element);
    })(parent);
  })(template.html);
  var firstChild = template.html.firstChild;
  firstChild.update = template.update.bind(template);
  return firstChild;
}.bind(templates);
module.exports = templates;
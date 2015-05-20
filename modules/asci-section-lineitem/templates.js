var templates = {};
templates._runtime = require('domthing/runtime');
templates['lineitemCreateHelp'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var expr = (
        runtime.hooks.EVENTIFY_LITERAL.call(template, "Help for line item create")
      );
      var node = document.createTextNode((expr.value||expr.value===0) ? expr.value : '');
      expr.on('change', function (text) { node.data = (text||text===0) ? text : ''; });
      parent.appendChild(node);
    })(parent);
  })(template.html);
  var firstChild = template.html.firstChild;
  firstChild.update = template.update.bind(template);
  return firstChild;
}.bind(templates);
templates['lineitemEditHelp'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var expr = (
        runtime.hooks.EVENTIFY_LITERAL.call(template, "Help for line item edit")
      );
      var node = document.createTextNode((expr.value||expr.value===0) ? expr.value : '');
      expr.on('change', function (text) { node.data = (text||text===0) ? text : ''; });
      parent.appendChild(node);
    })(parent);
  })(template.html);
  var firstChild = template.html.firstChild;
  firstChild.update = template.update.bind(template);
  return firstChild;
}.bind(templates);
module.exports = templates;
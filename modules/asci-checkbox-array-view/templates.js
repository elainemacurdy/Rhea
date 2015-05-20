var templates = {};
templates._runtime = require('domthing/runtime');
templates['field'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('label');
      var expr;
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
          var element = document.createElement('input');
          var expr;
          element.setAttribute('type', 'checkbox');
          element.setAttribute('class', 'field');
          element.setAttribute('data-hook', 'input');
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
          element.setAttribute('data-hook', 'label');
          element.setAttribute('class', 'label');
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
          element.setAttribute('data-hook', 'message-container');
          element.setAttribute('class', 'message message-below message-error');
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
templates['form'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'formComponent checkboxArrayInput');
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
          element.setAttribute('data-hook', 'arrayLabel');
          element.setAttribute('class', 'label');
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
          var element = document.createElement('div');
          var expr;
          element.setAttribute('class', 'fieldValue');
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
              element.setAttribute('data-hook', 'field-container');
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
              var element = document.createElement('div');
              var expr;
              element.setAttribute('data-hook', 'message-container');
              element.setAttribute('class', 'message message-below message-error');
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
                  var element = document.createElement('p');
                  var expr;
                  element.setAttribute('data-hook', 'message-text');
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
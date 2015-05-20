var templates = {};
templates._runtime = require('domthing/runtime');
templates['field'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'formComponent selectInput');
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
                  var element = document.createElement('select');
                  var expr;
                  element.setAttribute('class', 'field');
                  element.setAttribute('data-hook', 'input');
                  expr = (
                    runtime.hooks.EVENTIFY_BINDING.call(template, context, 'name')
                  );
                  element.setAttribute('name', expr.value ? runtime.hooks.ESCAPE_FOR_ATTRIBUTE('name', expr.value) : '');
                  expr.on('change', function (v) {
                    element.setAttribute('name', v ? runtime.hooks.ESCAPE_FOR_ATTRIBUTE('name', v) : '');
                  });
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
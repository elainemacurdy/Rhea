var templates = {};
templates._runtime = require('domthing/runtime');
templates['header'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'header');
      element.setAttribute('data-hook', 'pageHeader');
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
          var element = document.createElement('div');
          var expr;
          element.setAttribute('class', 'leftContent');
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
              var element = document.createElement('div');
              var expr;
              element.setAttribute('class', 'logo');
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
              element.setAttribute('class', 'tabs');
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
                  var element = document.createElement('a');
                  var expr;
                  element.setAttribute('href', 'javascript:void(0)');
                  element.setAttribute('class', 'button');
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
                      var element = document.createElement('div');
                      var expr;
                      element.setAttribute('class', 'text');
                      element.setAttribute('data-hook', 'dataLabel');
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
                (function (parent) {
                  var element = document.createElement('a');
                  var expr;
                  element.setAttribute('href', 'javascript:void(0)');
                  element.setAttribute('class', 'button selected');
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
                      var element = document.createElement('div');
                      var expr;
                      element.setAttribute('class', 'text');
                      element.setAttribute('data-hook', 'mediaLabel');
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
                (function (parent) {
                  var element = document.createElement('a');
                  var expr;
                  element.setAttribute('href', 'javascript:void(0)');
                  element.setAttribute('class', 'button');
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
                      var element = document.createElement('div');
                      var expr;
                      element.setAttribute('class', 'text');
                      element.setAttribute('data-hook', 'insightsLabel');
                      (function (parent) {
                        (function (parent) {
                          var expr = (
                            runtime.hooks.EVENTIFY_LITERAL.call(template, "Insights")
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
            (function (parent) {
              var element = document.createElement('div');
              var expr;
              element.setAttribute('class', 'options');
              (function (parent) {
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
            (function (parent) {
              var element = document.createElement('div');
              var expr;
              element.setAttribute('class', 'clearfix');
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
        (function (parent) {
          var element = document.createElement('div');
          var expr;
          element.setAttribute('class', 'rightContent');
          (function (parent) {
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
        (function (parent) {
          var element = document.createElement('div');
          var expr;
          element.setAttribute('class', 'clearfix');
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
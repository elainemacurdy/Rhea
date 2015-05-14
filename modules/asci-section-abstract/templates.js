var templates = {};
templates._runtime = require('domthing/runtime');
templates['footer'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('data-hook', 'footerWrap');
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
          element.setAttribute('class', 'buttons');
          element.setAttribute('data-hook', 'buttons');
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
templates['section'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();

  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'section');
      element.setAttribute('data-hook', 'section');
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
          element.setAttribute('class', 'controls');
          element.setAttribute('data-hook', 'controls');
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
              element.setAttribute('class', 'control minimize');
              element.setAttribute('title', 'Minimize');
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
                  element.setAttribute('class', 'icn12x12 icnCollapseHorizontalDark');
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
              element.setAttribute('class', 'control maximize');
              element.setAttribute('title', 'Open');
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
                  element.setAttribute('class', 'icn12x12 icnExpandHorizontalDark');
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
              element.setAttribute('class', 'control close');
              element.setAttribute('title', 'Close');
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
                  element.setAttribute('class', 'icn12x12 icnCloseDark');
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
          element.setAttribute('class', 'navigation');
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
          element.setAttribute('class', 'horizontalScroll');
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
              element.setAttribute('class', 'minWidth');
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
                  element.setAttribute('class', 'header');
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
                      var element = document.createElement('h6');
                      var expr;
                      element.setAttribute('data-hook', 'pretitle');
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
                      var element = document.createElement('h3');
                      var expr;
                      element.setAttribute('data-hook', 'title');
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
                      var element = document.createElement('h4');
                      var expr;
                      element.setAttribute('data-hook', 'subtitle');
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
                      element.setAttribute('data-hook', 'search');
                      element.setAttribute('class', 'search');
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
                  element.setAttribute('class', 'content');
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
                      element.setAttribute('class', 'body');
                      element.setAttribute('data-hook', 'content');
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
                      element.setAttribute('class', 'footer');
                      element.setAttribute('data-hook', 'footer');
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
                  element.setAttribute('class', 'help');
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
                      element.setAttribute('class', 'gutter');
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
        (function (parent) {
          var element = document.createElement('div');
          var expr;
          element.setAttribute('class', 'minimizedHandle');
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
/*eslint no-new-func:1*/
var byString = function(o, s, delimiter) {
  var a;
  if (delimiter) {
    s = s.replace(/\[(\w+)\]/g, delimiter + '$1');  // convert indexes to properties
    s = s.replace(new RegExp('^' + delimiter), '');    // strip a leading delimiter
    a = s.split(delimiter);
  } else{
    s = s.replace(/\[(\w+)\]/g, '.$1');  // convert indexes to properties
    s = s.replace(/^\./, '');            // strip a leading dot
    a = s.split('.');
  }
  while (a.length) {
    var n = a.shift();
    if (n in o) {
      o = o[n];
    } else {
      return;
    }
  }
  return o;
};

/**
 * https://gist.github.com/padolsey/6008842
 * Outputs a new function with interpolated object property values.
 * Use like so:
 *   var fn = makeInterpolator('some/url/{param1}/{param2}');
 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
 */
var makeInterpolator = (function() {
  var rc = {
    '\n': '\\n', '\"': '\\\"',
    '\u2028': '\\u2028', '\u2029': '\\u2029'
  };
  return function makeInterpolator(str) {
    return new Function(
      'o',
      'return "' + (
        str
        .replace(/["\n\r\u2028\u2029]/g, function($0) {
          return rc[$0];
        })
        .replace(/\{\{\s?([\s\S]+?)\s?\}\}/g, '" + o["$1"] + "')
      ) + '";'
    );
  };
}());

var get = function(dict, name, options, delimiter) {
  options = options ? options : {};
  var entry = byString(dict, name, delimiter);
  var result;
  if (entry) {
    if (typeof entry === 'string') {
      result = makeInterpolator(entry)(options);
    } else {
      result = entry;
    }
  } else {
    throw new ReferenceError('asci-dict: cannot find entry for ' + name);
  }

  // not all interpolations took place
  if (/undefined/.test(result)) {
    throw new ReferenceError('asci-dict: at least one reference undefined: ' + entry);
  }

  return result;
};

var has = function(dict, name) {
  var entry = byString(dict, name);
  return (entry) ? true : false;
};

module.exports = { get: get, has: has };

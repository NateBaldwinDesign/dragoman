/*!
 * n-deep-merge - recursive deep merge for objects and arrays
 * (c) 2014 Eric Clifford <ericgclifford@gmail.com>
 * MIT Licensed.
 *
 * http://github.com/eclifford/deep-merge
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return (root.deepmerge = factory(root));
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(root);
  } else {
    root.deepmerge = factory(root);
  }
}(this, function(root) {

  deepmerge = function (dest) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      if (!source && typeof source !== 'boolean')
        continue;

      var isObj = typeof source === 'object',
          isArray = toString.call(source) == '[object Array]';

      if(isArray) {
        dest = dest || [];
        for (var x = 0; x < source.length; x++) {
          if (dest.indexOf(source[x]) === -1) {
            dest.push(source[x]);
          }
        }
      } else if (isObj) {
        dest = dest || {};
        for (var key in source) {
          dest[key] = this.deepmerge(dest[key], source[key]);
        }
      } else {
        dest = source;
      }
    }
    return dest;
  };

  return deepmerge;
}));

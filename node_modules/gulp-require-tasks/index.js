
module.exports = gulpRequireTasks;


const DEFAULT_OPTIONS = {
  path: process.cwd() + '/gulp-tasks',
  separator: ':',
  arguments: [],
  passGulp: true,
  passCallback: true,
  gulp: null
};

const path = require('path');
const requireDirectory = require('require-directory');
const _ = require('lodash');


function gulpRequireTasks (options) {

  options = _.extend({}, DEFAULT_OPTIONS, options);

  const gulp = options.gulp || require('gulp');

  // Recursively visiting all modules in the specified directory
  // and registering Gulp tasks.
  requireDirectory(module, options.path, {
    visit: moduleVisitor
  });

  /**
   * Registers the specified module. Task name is deducted from the specified path.
   *
   * @param {object|function} module
   * @param {string} modulePath
   */
  function moduleVisitor (module, modulePath) {

    module = normalizeModule(module);

    gulp.task(
      taskNameFromPath(modulePath),
      module.dep,
      module.nativeTask || taskFunction
    );

    /**
     * Wrapper around user task function.
     * It passes special arguments to the user function according
     * to the this module configuration.
     *
     * @param {function} callback
     *
     * @returns {*}
     */
    function taskFunction (callback) {
      if ('function' === typeof module.fn) {
        var arguments = _.clone(options.arguments);
        if (options.passGulp) {
          arguments.unshift(gulp);
        }
        if (options.passCallback) {
          arguments.push(callback);
        }
        return module.fn.apply(module, arguments);
      } else {
        callback();
      }
    }

    /**
     * Deducts task name from the specified module path.
     *
     * @returns {string}
     */
    function taskNameFromPath (modulePath) {
      const relativePath = path.relative(options.path, modulePath);
      return removeExtension(relativePath)
        .split(path.sep).join(options.separator)
      ;
    }

  }

}

/**
 * Removes extension from the specified path.
 *
 * @param {string} path
 *
 * @returns {string}
 */
function removeExtension (path) {
  return path.substr(0, path.lastIndexOf('.'))
}

/**
 * Normalizes module definition.
 *
 * @param {function|object} module
 *
 * @returns {object}
 */
function normalizeModule (module) {
  if ('function' === typeof module) {
    return {
      fn: module,
      dep: []
    };
  } else {
    return module;
  }
}

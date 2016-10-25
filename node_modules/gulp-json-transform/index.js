var Promise = require('promise');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-json-transform';

function jsonPromiseParse(rawStr) {
  return new Promise(function(resolve, reject) {
    var json;
    try {
      json = JSON.parse(rawStr);
    } catch (e) {
      return reject(new Error('Invalid JSON: ' + e.message));
    }
    resolve(json);
  });
}

module.exports = function(transformFn, jsonSpace) {
  if (!transformFn) {
    throw new PluginError(PLUGIN_NAME, 'Missing transform function!');
  }

  return through.obj(function(file, enc, cb) {
    var self = this;

    if (file.isStream()) {
      return self.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      var fileContent = file.contents.toString(enc);

      jsonPromiseParse(fileContent)
        .then(function(data){
          return transformFn(data, {
            path: file.path,
            relative: file.relative,
            base: file.base
          });
        })
        .then(function(output) {
          var isString = (typeof output === 'string');
          file.contents = new Buffer(isString ? output : JSON.stringify(output, null, jsonSpace));
          self.push(file);
          cb();
        })
        .catch(function(e) {
          gutil.log(PLUGIN_NAME + ':', gutil.colors.red(e.message));
          self.emit('error', new PluginError(PLUGIN_NAME, e));
          self.emit('end');
        });

    }

  });

};

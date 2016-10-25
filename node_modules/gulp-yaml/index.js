'use strict';

var through       = require('through2');
var gutil         = require('gulp-util');
var yaml          = require('js-yaml');
var xtend         = require('xtend');
var BufferStreams = require('bufferstreams');
var PluginError   = gutil.PluginError;
var PLUGIN_NAME   = 'gulp-yaml';


function yaml2json(buffer, options) {
  var contents = buffer.toString('utf8');
  var ymlOptions = {schema: options.schema, filename: options.filename};
  var ymlDocument = options.safe ? yaml.safeLoad(contents, ymlOptions) : yaml.load(contents, ymlOptions);
  return new Buffer(JSON.stringify(ymlDocument, options.replacer, options.space));
}

function parseSchema(schema) {
  switch (schema) {
    case 'DEFAULT_SAFE_SCHEMA':
    case 'default_safe_schema':
      return yaml.DEFAULT_SAFE_SCHEMA;
    case 'DEFAULT_FULL_SCHEMA':
    case 'default_full_schema':
      return yaml.DEFAULT_FULL_SCHEMA;
    case 'CORE_SCHEMA':
    case 'core_schema':
      return yaml.CORE_SCHEMA;
    case 'JSON_SCHEMA':
    case 'json_schema':
      return yaml.JSON_SCHEMA;
    case 'FAILSAFE_SCHEMA':
    case 'failsafe_schema':
      return yaml.FAILSAFE_SCHEMA;
  }
  throw new PluginError(PLUGIN_NAME, 'Schema ' + schema + ' is not valid');
}

module.exports = function(options) {
  options = xtend({safe: true, replacer: null, space: null}, options);
  var providedFilename = options.filename;

  if (!options.schema) {
    options.schema = options.safe ? yaml.DEFAULT_SAFE_SCHEMA : yaml.DEFAULT_FULL_SCHEMA;
  }
  else {
      options.schema = parseSchema(options.schema);
  }

  return through.obj(function(file, enc, callback) {
    if (!providedFilename) {
      options.filename = file.path;
    }

    if (file.isBuffer()) {
      if (file.contents.length === 0) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'File ' + file.path +
            ' is empty. YAML loader cannot load empty content'));
        return callback();
      }
      try {
        file.contents = yaml2json(file.contents, options);
        file.path = gutil.replaceExtension(file.path, '.json');
      }
      catch (error) {
        this.emit('error', new PluginError(PLUGIN_NAME, error, {showStack: true}));
        return callback();
      }
    }
    else if (file.isStream()) {
      var _this = this;
      var streamer = new BufferStreams(function(err, buf, cb) {
        if (err) {
          _this.emit('error', new PluginError(PLUGIN_NAME, err, {showStack: true}));
        }
        else {
          if (buf.length === 0) {
            _this.emit('error', new PluginError(PLUGIN_NAME, 'File ' + file.path +
                ' is empty. YAML loader cannot load empty content'));
          }
          else {
            try {
              var parsed = yaml2json(buf, options);
              file.path = gutil.replaceExtension(file.path, '.json');
              cb(null, parsed);
            }
            catch (error) {
              _this.emit('error', new PluginError(PLUGIN_NAME, error, {showStack: true}));
            }
          }
        }
      });
      file.contents = file.contents.pipe(streamer);
    }
    this.push(file);
    callback();
  });
};

"use strict";

var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

module.exports = function (fileName) {
  if (!fileName) {
    throw new PluginError('gulp-concat-json', 'Missing fileName option for gulp-concat-json');
  }

  var data = [];
  var firstFile = null;

  function bufferContents(file) {
    if (!firstFile) {
      firstFile = file;
    }

    if (file.isNull()) {
      return; // ignore
    }
    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-concat-json', 'Streaming not supported'));
    }

    data.push(JSON.parse(file.contents.toString()));
  }

  function endStream() {
    var joinedPath = path.join(firstFile.base, fileName);

    var joinedFile = new File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: joinedPath,
      contents: new Buffer(JSON.stringify(data))
    });

    this.emit('data', joinedFile);
    this.emit('end');
  }

  return through(bufferContents, endStream);
};
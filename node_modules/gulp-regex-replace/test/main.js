'use strict';

var replace = require('../'),
    es        = require('event-stream'),
    gutil     = require('gulp-util'),
    should    = require('should');

function generateFile(contents) {
  if (contents == void 0) {contents = ''; }

  return new gutil.File({
    path: './testfile.js',
    cwd: './',
    base: './',
    contents: new Buffer(contents)
  });
}

function expect_equals(options, input, output, done) {
  var stream = replace(options);

  stream.on('data', function(file) {
    String(file.contents).should.equal(output);
    done();
  });

  stream.write(generateFile(input));
  stream.end();
}

var input = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ...';

describe('gulp-regex-replace', function() {
  describe('when given an empty input buffer', function() {
    var regex = '';
    var replace = '';
    var output = input;

    it('does nothing', function(done) {
      expect_equals({regex: regex, replace: replace}, input, output, done);
    });
  });

  describe('given a list of words as input', function() {
    describe('and no regular expression', function() {
      var regex = void 0;
      var replace = 'blah';
      var output = input;

      it('does nothing', function(done) {
        expect_equals({regex: regex, replace: replace}, input, output, done);
      });
    });

    describe('and a regular expression', function() {
      describe('and no replace string', function() {
        var regex = input;
        var replace = void 0;
        var output = '';

        it('removes matching text', function(done) {
          expect_equals({regex: regex, replace: replace}, input, output, done);
        });
      });
    });

    describe('and a replace string without regex groups', function() {
      var regex = 'consectetur adipisicing elit, ...';
      var replace = '...';
      var output = input.replace(regex, replace);

      it('replaces any matching text with the replace string', function(done) {
        expect_equals({regex: regex, replace: replace}, input, output, done);
      });
    });

    describe('and a replace function', function() {
      var regex = '__v_[_A-Za-z0-9]+__';

      it('replaces any matching text with the result of the replace function', function(done) {
        var modifiedInput = input.replace('Lorem', '__v_lorem__');
        var replace = function(v) { return 'DeLorean'; };
        var output = 'DeLorean ipsum dolor sit amet, consectetur adipisicing elit, ...';
        expect_equals({regex: regex, replace: replace}, modifiedInput, output, done);
      });

      it('passes the variable matching the regular expression', function(done) {
        var replace = function(v) { return v; };
        var output = input;
        expect_equals({regex: regex, replace: replace}, input, output, done);
      });
    });

    describe('and a replace string with regex groups', function() {
      var input = 'var xy; var abc = xyz; var xyz;';
      var regex = 'var ([_A-Za-z0-9]+)[ ,;]';
      var replace = 'x';
      var output = 'var x; var x = x; var x;';

      it('replaces any matching text with the replace string', function(done) {
        expect_equals({regex: regex, replace: replace}, input, output, done);
      });
    });

    describe('when given an array of options', function() {
      var input = 'var xy; var abc = xy;';
      var regex = 'xy';
      var regex1 = 'abc';
      var replace = 'x';
      var replace1 = 'y';
      var output = 'var x; var y = x;';

      it('replaces any matching text matching the regular expression for each option in the array', function(done) {
        expect_equals([{regex: regex, replace: replace},
                       {regex: regex1, replace: replace1}
                      ], input, output, done);

      });
    });

    describe('when the regex option is an array', function() {
      var input = 'var yy; var xy, ab = xy, abc = 0; test.  var test;';
      var options = { regex: [ 'var(.*?;)', '([a-zA-Z_$]+)[, =;]' ], replace: 'v' };
      var output = 'var v; var v, v = v, v = 0; v.  var v;'

      it('uses the regex on the previous regex in the array to find the replace string', function(done) {
        expect_equals(options, input, output, done);
      });
    });

    describe('when the regex option is an array', function() {
      var input = 'var viable_1; var yy = xy; abc = 0; test.  var test;';
      var options = { regex: [ 'var (.*?;)', { include: '([a-zA-Z0-9\__$]+)[, =;]', exclude: '=[ ]*?([a-zA-Z0-9\__$]+)[, =;]' } ], replace: 'v' };
      var output = 'var v; var v = xy; abc = 0; v.  var v;'

      it('uses the regex on the previous regex in the array to find the replace string', function(done) {
        expect_equals(options, input, output, done);
      });
    });

    describe('when given a a single (or array) of exclude regex strings', function() {
      var input = 'var do_not_replace; var yy = xy; var dnr; abc = 0; test.  var test; var x = B.C.M.b;';
      var options = { regex: [ 'var (.*?[\.;])', { include: '([a-zA-Z0-9\__$]+)[, =;]', exclude: '=[ ]*?([a-zA-Z0-9\__$]+)[\., =;]' } ], replace: 'v', exclude: ['do_not_replace', 'dn.*']};
      var output = 'var do_not_replace; var v = xy; var dnr; abc = 0; v.  var v; var v = B.C.M.b;'

      it('it will not replace strings matching the the exclude regular expressions', function(done) {
        expect_equals(options, input, output, done);
      });
    });
  });
});

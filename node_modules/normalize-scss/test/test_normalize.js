'use strict';

var sassyTest = new SassyTest();

describe('@include normalize()', function() {
  before(function(done) {
    sassyTest.configurePaths({
      fixtures: path.join(__dirname, 'fixtures/normalize'),
      includePaths: [path.join(__dirname, '../sass')]
    });
    done();
  });

  describe('$include parameter', function() {
    it('should accept a list with multiple values', function() {
      return sassyTest.renderFixture('include-multiple');
    });

    it('should accept a list with a single value', function() {
      return sassyTest.renderFixture('include-single');
    });

    it('should accept a string', function() {
      return sassyTest.renderFixture('include-string');
    });
  });

  describe('$exclude parameter', function() {
    it('should accept a list with multiple values', function() {
      return sassyTest.renderFixture('exclude-multiple');
    });

    it('should accept a list with a single value', function() {
      return sassyTest.renderFixture('exclude-single');
    });

    it('should accept a string', function() {
      return sassyTest.renderFixture('exclude-string');
    });
  });
});

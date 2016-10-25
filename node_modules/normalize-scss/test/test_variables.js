'use strict';

var sassyTest = new SassyTest();

describe('Configuration variables', function() {
  before(function(done) {
    sassyTest.configurePaths({
      fixtures: path.join(__dirname, 'fixtures'),
      includePaths: [path.join(__dirname, '../sass')]
    });
    done();
  });

  describe('default values', function() {
    it('should limit output to the same output as normalize.css', function() {
      return sassyTest.renderFixture('variables/default');
    });
  });

  describe('$base-* and $h*-font-size', function() {
    it('should alter the font, font size, and line-height', function() {
      return sassyTest.renderFixture('variables/font');
    });
  });

  describe('$indent-amount', function() {
    it('should alter the indent amount of elements', function() {
      return sassyTest.renderFixture('variables/indent-amount');
    });
  });

  describe('$support-for', function() {
    it('should support Firefox 29', function() {
      return sassyTest.renderFixture('variables/support-for/firefox29');
    });

    it('should support IE 6', function() {
      return sassyTest.renderFixture('variables/support-for/ie6');
    });

    it('should support IE 7', function() {
      return sassyTest.renderFixture('variables/support-for/ie7');
    });

    it('should support IE 8', function() {
      return sassyTest.renderFixture('variables/support-for/ie8');
    });

    it('should support IE 9', function() {
      return sassyTest.renderFixture('variables/support-for/ie9');
    });

    it('should support IE 10', function() {
      return sassyTest.renderFixture('variables/support-for/ie10');
    });

    it('should support IE 11', function() {
      return sassyTest.renderFixture('variables/support-for/ie11');
    });

    it('should support "last X versions" with -X value', function() {
      return sassyTest.renderFixture('variables/support-for/negative-value');
    });
  });
});

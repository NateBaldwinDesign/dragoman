'use strict';

describe('@import "normalize/import-now";', function() {
  it('should import the CSS immediately on @import', function() {
    var sassyTest = new SassyTest({
      fixtures: path.join(__dirname, 'fixtures'),
      includePaths: [path.join(__dirname, '../sass')]
    });
    return sassyTest.renderFixture('import-now');
  });
});

var expect = require('chai').expect;
var merge = require('../merge');

describe("deep-merge", function() {
  it("should be able to merge properties", function() {
    var obj1 = {
      foo: 'foo'
    };

    var obj2 = {
      baz: 'baz'
    };

    var mergedObj = merge(obj1, obj2);
    expect(mergedObj).to.deep.equal({
      foo: 'foo',
      baz: 'baz'
    });
  });

  it("should able to merge properties from multiple objects", function() {
    var obj1 = {
      foo: 'foo'
    };

    var obj2 = {
      baz: 'baz'
    };

    var obj3 = {
      bar: 'bar'
    };

    var mergedObj = merge(obj1, obj2, obj3);
    expect(mergedObj).to.deep.equal({
      foo: 'foo',
      baz: 'baz',
      bar: 'bar'
    });
  });

  it("should be able to merge objects", function() {
    var obj1 = {
      foo: {
        name: 'foo'
      }
    };

    var obj2 = {
      foo: {
        type: 'rubbish'
      }
    };

    var mergedObj = merge(obj1, obj2);
    expect(mergedObj).to.deep.equal({
      foo: {
        name: 'foo',
        type: 'rubbish'
      }
    });
  });

  it("should be able to merge complex objects with arrays", function() {
    var obj1 = {
      foo: 'foo',
      baz: {
        name: 'baz',
        started: false,
        zones: [
          {
            name: 'a',
            width: 100,
            height: 1000
          }
        ]
      }
    };

    var obj2 = {
      bar: true,
      baz: {
        started: true,
        zones: [
          {
            name: 'b',
            width: 200,
            height: 1000
          }
        ]
      }
    };

    var mergedObjs = merge(obj1, obj2);
    expect(mergedObjs).to.deep.equal({
      foo: 'foo',
      bar: true,
      baz: {
        name: 'baz',
        started: true,
        zones: [
          {
            name: 'a',
            width: 100,
            height: 1000
          },
          {
            name: 'b',
            width: 200,
            height: 1000
          }
        ]
      }
    });

  });

  it("should be able to merge arrays", function() {
    var arr1 = [1, 2, 3];
    var arr2 = [4, 5, 6];

    var mergedArrays = merge(arr1, arr2);
    expect(mergedArrays).to.deep.equal([1, 2, 3, 4, 5, 6]);

    arr3 = [1, 4, 7];
    arr4 = [2, 4, 7];
    var mergedArrays2 = merge(arr3, arr4);
    expect(mergedArrays2).to.deep.equal([1, 4, 7, 2]);
  });
});

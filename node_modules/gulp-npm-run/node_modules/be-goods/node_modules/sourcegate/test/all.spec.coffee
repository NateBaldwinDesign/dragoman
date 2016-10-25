#!/usr/bin/env mocha

fs = require("fs")
path = require("path")
[one, two] = sg(['1.json', '2.json'], {root: 'test/files', merge: false})

describe "sourcegate", ->

  describe "odd cases", ->
    it "returns {} if given no arguments", ->
      expect(sg()).to.eql {}
    it "returns {} if given an empty array", ->
      expect(sg([])).to.eql {}
    it "given an array with a single object, returns that object", ->
      expect(sg([{a: "whatever"}])).to.eql {a: "whatever"}
    it "given an array with a single file path, returns the contents", ->
      expect(sg(["test/files/1.json"]))
        .to.eql one

  describe "json / objects", ->
    it "can deep-merge objects", ->
      expect(sg([{a: 1, m: {b: 2}},{m: {b: "2b", c: 3}}]))
        .to.eql {a: 1, m: {b: "2b", c: 3}}
    it "can deep-merge json file objects", ->
      expect(sg(["test/files/1.json", "test/files/2.json"]))
        .to.eql {a: 1, m: {b: "2b", c: 3}}
    it "can deep-merge arrays within objects", ->
      expect(sg([{scripts: {require: ['something', 'other', 'more']}},
                 {scripts: {require: ['merge']}}]))
        .to.eql  {scripts: {require: ['something', 'other', 'more', 'merge']}}
    it "can sourcegate a sourcegate deep-merging", ->
      expect(sg([{b: 3, c: 3}, sg([{a: 2, b: 2}, {a: 1}])]))
        .to.eql {a: 1, b: 2, c: 3}
    it "does merge without mutating the original objects", ->
      a = {a: 1}
      b = {b: 2}
      expect(sg([a, b])).to.eql {a: 1, b: 2}
      expect(a).to.eql {a: 1}
      expect(b).to.eql {b: 2}

  describe "config opts", ->
    it "can take a root path, relative by default", ->
      expect(sg(['1.json'], {root: 'test/files'}))
        .to.eql one
    it "can take an absolute root path", ->
      expect(sg(['2.json'],
        root: path.join(process.cwd(), 'test/files'),
        relative: false
      )).to.eql two

  describe "-", ->
    outPath = "test/files/out.json"
    testWriteFiles = [
      [ "can write the result given a file path",
        ['1.json'],
        {root: 'test/files', write: {path: "out.json"}},
        one
      ],
      [ "can read json files without .json extension",
        ['test/files/1.jsonrc'],
        {write: {root: 'test/files', path: "out.json"}},
        one
      ],
      [ "can require .js modules, same as .json",
        ['test/files/2.js'],
        {write: {root: 'test/files', path: "out.json"}},
        two
      ]
    ]

    beforeEach -> try fs.unlinkSync outPath
    afterEach -> try fs.unlinkSync outPath

    for [nameTest, arg1, arg2, res] in testWriteFiles
      it nameTest, ->
        expect(sg(arg1, arg2)).to.eql res
        expect(JSON.parse(fs.readFileSync(outPath))).to.eql res

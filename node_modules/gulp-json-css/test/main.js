'use strict';

const sass = require('gulp-sass');
const less = require('gulp-less');
const jsonCss = require('../');
const gUtil = require('gulp-util');
const path = require('path');
const concat = require('gulp-concat');
const through2 = require('through2');
const gulp = require('gulp');
const fs = require('fs');
const test = require('tape');
const chalk = require('chalk');

const runTests = function(t, opt) {
	const suffix = opt.targetPre;

	let fileObj;
	let failedCompilation = false;
	let failedJsonCompilation = false;

	const stream = through2.obj(function(file, encoding, done) {
		if(file.path.match('stub')) {
			fileObj = file;
		}

		this.push(file);

		done();
	});

	stream
		.pipe(jsonCss(opt))
		.on('error', () => {
			failedJsonCompilation = true;
			t.end();
		})
		.pipe(through2.obj(function(file, encoding, done) {
			if(file.path.match('stub')) {
				t.equal(file.contents.toString(), fileObj.contents.toString(), 'non-json files should not be modified (content)');
				t.equal(file.path, fileObj.path, 'non-json files should not be modified (file path)');
			}
			this.push(file);
			done();
		}))
		.pipe(concat('test.' + suffix))
		.pipe(suffix === 'less' ? less() : sass())
		.on('end', () => {
			if(failedJsonCompilation) {
				t.fail(chalk.red('json failed to compile'));
			}
		})
		.on('error', () => {
			failedCompilation = true;
		})
		.pipe(through2.obj((file, encoding, done) => {
			t.end();
			done();
		}));

	stream.write(new gUtil.File({
		path: opt.src,
		contents: fs.readFileSync(opt.src)
	}));

	stream.write(new gUtil.File({
		path: path.join(__dirname, './fixtures/stub.' + suffix),
		contents: fs.readFileSync(path.join(__dirname, './fixtures/stub.' + suffix))
	}));

	stream.end();
};

const setupTest = function(name, opt) {
	test(name, (t) => {
		console.log(chalk.cyan('Test: ' + name) + chalk.green(' (' + opt.targetPre + ' mode)'));
		runTests(t, opt);
	})
};

const preprocessor = ['scss', 'sass', 'less'];

for(let i = 0; i < preprocessor.length; i++) {
	setupTest('base case', {
		src: path.join(__dirname, './fixtures/base.json'),
		targetPre: preprocessor[i]
	});

	setupTest('proper support for variables that begin with numbers', {
		src: path.join(__dirname, './fixtures/numbers.json'),
		targetPre: preprocessor[i]
	});

	setupTest('proper support for removing illegal characters', {
		src: path.join(__dirname, './fixtures/escape.json'),
		targetPre: preprocessor[i]
	});

	setupTest('use maps and lists for objects', {
		src: path.join(__dirname, './fixtures/maps-lists.json'),
		targetPre: preprocessor[i],
		keepObjects: true
	});

}


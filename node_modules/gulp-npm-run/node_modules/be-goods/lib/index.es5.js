'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.pkg = undefined;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpHelpify = gulpHelpify;
exports.gulpTask = gulpTask;
exports.pollen = pollen;

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tracer = require('tracer');

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var pkg = exports.pkg = require(_path2.default.join(process.cwd(), 'package.json'));

function isLocal(name) {
  var dep = _ramda2.default.has(name);
  return dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {});
}

function myRequire(name) {
  var where = _path2.default.normalize(process.cwd() + '/node_modules/' + name);
  return require(_path2.default.join(where, require(_path2.default.join(where, 'package.json')).main));
}

var logger = exports.logger = _tracer2.default.console({
  'filters': { 'log': _chalk2.default.green, 'warn': _chalk2.default.yellow, 'error': _chalk2.default.red },
  'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
});

function gulpIsHelpful(gulp) {
  return _ramda2.default.is(Object, _ramda2.default.path(['help', 'help'], gulp.tasks));
}

function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : (0, _gulpHelp2.default)(gulp, opts);
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".
function gulpTask(gulp, name, desc) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var args = gulpIsHelpful(gulp) ? [].concat(name, desc, rest) : [].concat(name, rest);
  return gulp.task.apply(gulp, _toConsumableArray(args));
}

function pollen(anthers, where) {
  var flaments = require(where || _path2.default.normalize('../src/pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select; // object assumed
  });
  return (0, _sourcegate2.default)(got);
}

//# sourceMappingURL=data:application/json;base64,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QVcsR0FBRyxDQUFDLENBQUE7Q0FDdkIiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBoZWxwIGZyb20gJ2d1bHAtaGVscCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcblxuZXhwb3J0IGNvbnN0IHBrZyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKSlcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWwobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgcmV0dXJuIGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZShuYW1lKSB7XG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9L25vZGVfbW9kdWxlcy8ke25hbWV9YClcbiAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluKSlcbn1cblxuZXhwb3J0IGxldCBsb2dnZXIgPSB0cmFjZXIuY29uc29sZSh7XG4gICdmaWx0ZXJzJzogeydsb2cnOiBjaGFsay5ncmVlbiwgJ3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiBgPCR7cGtnLm5hbWV9IHVzaW5nIHt7cGF0aH19Ont7bGluZX19Plxcbnt7bWVzc2FnZX19XFxuYFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBJc0hlbHBmdWwoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5KGd1bHAsIG9wdHMpIHtcbiAgcmV0dXJuIGd1bHBJc0hlbHBmdWwoZ3VscCkgPyBndWxwIDogaGVscChndWxwLCBvcHRzKVxufVxuXG4vLyBIZWxwZnVsIHRhc2sgY3JlYXRpb24uICBUaGUgZ2l2ZW4gZGVzYyBpcyBkaXNjYXJkZWQgaWYgZ3VscCBpc24ndCBndWxwLWhlbHAgXCJoZWxwZnVsXCIuXG5leHBvcnQgZnVuY3Rpb24gZ3VscFRhc2soZ3VscCwgbmFtZSwgZGVzYywgLi4ucmVzdCkge1xuICBsZXQgYXJncyA9IChndWxwSXNIZWxwZnVsKGd1bHApKSA/IFtdLmNvbmNhdChuYW1lLCBkZXNjLCByZXN0KSA6IFtdLmNvbmNhdChuYW1lLCByZXN0KVxuICByZXR1cm4gZ3VscC50YXNrKC4uLmFyZ3MpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4oYW50aGVycywgd2hlcmUpIHtcbiAgbGV0IGZsYW1lbnRzID0gcmVxdWlyZSh3aGVyZSB8fCBwYXRoLm5vcm1hbGl6ZSgnLi4vc3JjL3BvbGxlbi5qc29uJykpXG4gIGxldCBnb3QgPSBhbnRoZXJzLm1hcChzZWxlY3QgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0ID09PSAnc3RyaW5nJyA/IGZsYW1lbnRzW3NlbGVjdF0gOiBzZWxlY3QgLy8gb2JqZWN0IGFzc3VtZWRcbiAgfSlcbiAgcmV0dXJuIHNvdXJjZWdhdGUoZ290KVxufVxuIl19
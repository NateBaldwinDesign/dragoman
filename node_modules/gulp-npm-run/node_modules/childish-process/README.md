# childish-process

A simpler way to call spawn or exec of `child_process`.
Makes it easy to call spawn with custom event-handlers.
Makes options easy to template, extend, invoke strategies,
generating event-handlers that can notify, for example.

## Use

[![NPM](https://nodei.co/npm/childish-process.png?mini=true)](https://www.npmjs.org/package/childish-process)

```javascript
var run = require('childish-process');
```

- `run(command[, options]);` same as `child_process.spawn` though using [cross-spawn-async](https://github.com/IndigoUnited/node-cross-spawn-async) for better Windows support
- `run(command[, options], callback);` delegates to `child_process.exec`

The options may include a "childish" key with custom event handlers for any of:
`"stdout"`, `"stderr"`, `"error"`, or `"close"`.
It's unlikely that node will ever add a childish option to its `child_process`.

See the [`handlers` function](https://github.com/orlin/childish-process/blob/active/index.coffee)
and its defaults for what can be overridden via `childish` options.

### Configuration

The configuration options are getting a huge upgrade, to be documented and probably tested.
Meanwhile, example usage can be found in [datomiki](https://github.com/datomicon/datomiki)'s
`gulpfile.js` and `notifications.json`,
while [gulp-npm-test](https://github.com/orlin/gulp-npm-test) is an example for code usage.

## Dependencies

[![Dependency Status](https://david-dm.org/orlin/childish-process.svg)](https://david-dm.org/orlin/childish-process)
[![devDependency Status](https://david-dm.org/orlin/childish-process/dev-status.svg)](https://david-dm.org/orlin/childish-process#info=devDependencies)

## Unlicensed

This is free and unencumbered public domain software.
For more information, see [UNLICENSE](http://unlicense.org).

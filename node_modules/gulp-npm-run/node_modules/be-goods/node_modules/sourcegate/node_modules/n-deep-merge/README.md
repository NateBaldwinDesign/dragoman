# n-deep-merge

[![Build Status](https://travis-ci.org/eclifford/bronson.svg?branch=master)](https://travis-ci.org/eclifford/bronson)
[![Coverage Status](https://coveralls.io/repos/eclifford/bronson/badge.png?branch=master)](https://coveralls.io/r/eclifford/bronson?branch=master)

## What is n-deep-merge?

**n-deep-merge** is a CommonJS/AMD/Window compatible function for deep merging of any number
of objects and arrays.  

### Features
- Deep merge any number of complicated objects or arrays
- No external libraries required
- Backward compatible to IE6

### Examples

#### Simple Object Merge

```javascript
var merge = require('deep-merge');

var foo = {
  name: 'foo'
}

var baz = {
  type: 'widget'
}

var obj = merge(foo, baz);

// output
{
  name: 'foo',
  type: 'widget'
}

```

#### More Complex Example

```javascript
var merge = require('n-deep-merge');

var foo = {
  name: 'foo'
  zones: [{
    name: 'a',
    width: 100,
    height: 200
  }
  ]
};

var baz = {
  type: 'widget',
  zones: [{
    name: 'b',
    width: 200,
    height: 400
  }]
}

var obj = merge(foo, baz);

// output
{
  name: 'foo',
  type: 'widget',
  zones: [{
    name: 'a',
    width: 100,
    height: 200
  },
  {
    name: 'b',
    width: 200,
    height: 400
  }]}

```

### Contributing

I welcome any contributions. Please feel free to offer suggestions and submit pull requests.

### License

The MIT License

Copyright (c) 2014 Eric Clifford

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

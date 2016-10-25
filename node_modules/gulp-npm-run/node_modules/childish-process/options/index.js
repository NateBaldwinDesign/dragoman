var merge = require('lodash.merge')
var templates = require('./templates.js')
var strategies = require('./strategies.js')

// Gets the options of a template; extends the template options if extend is set.
// The template is about options.  This function does nothing but get, or extend.
// TODO: Except maybe it should auto-extend when given a string...
var template = function (o) {
  switch (typeof o) {
    case "string":
      return templates[o] || templates.default
    case "object":
      if (templates[o.extends]) {
        if (templates[o.extends].extends) {
          return merge({}, templates[o.extends].extends, templates[o.extends], o)
        }
        else {
          return merge({}, templates[o.extends], o)
        }
      }
  }
  return o
}

var invoke = function (opts) {
  // NOTE: the strategy comes from the templates (probably) or options (both)
  var o = template(opts)
  if (typeof o.strategy === "function") {
    return o.strategy(o)
  }
  else {
    return (strategies[o.strategy] || strategies.exiter)(o)
  }
}

// The point of this is to produce valid event handlers
// for childish-process.run, given "childish": options.
module.exports = function (options) {
  if (typeof options === "object") {
    // NOTE: intentional mutations of templates and strategies
    if (options.templates) merge(templates, options.templates)
    if (options.strategies) merge(strategies, options.strategies)
    if (options.template) {
      // being given options.template - means we'd like to run it
      // maybe rename to invoke, or something more intuitive?
      return invoke(template(options.template))
    }
    else {
      // Perhaps because we'd like to see what extend would do to the options.
      // TODO: shouldn't we be able to invoke based on options without template?
      return template(options)
    }
  }
  else return {}
}

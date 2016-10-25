var notify = require('./notify.js')

module.exports = {

  "exiter": function (opts) {
    // the default strategy
    return {
      "close": function(code) {
        if (opts.debug) {
          console.log('exiter.on("close") called with:\n' + opts)
        }
        if (code === 0) {
          if (opts.success) notify(opts.success)
        }
        else {
          if (opts.failure) notify(opts.failure)
        }
      }
    }
  },

  "outerr": function (opts) {
    // a variation of exiter - anything printed to stdout or stderr means error
    // though it's pretty much exactly like the stdoer, except it's all failure
    // it helps with scripts that don't set the exit code properly
    // if the command is otherwise silent this could be a way to handle it
    var recipe = {}
    if (opts.failure) {
      recipe.stdout = function(data) {
        notify(opts.failure)
        console.log(data.toString())
      }
      recipe.stderr = function(data) {
        notify(opts.failure)
        console.error(data.toString())
        // TODO: the strategy has done its job, yet could it trigger an exit-1?
      }
    }
    return recipe
  },

  "stdoer": function (opts) {
    var recipe = {}
    if (opts.success) {
      recipe.stdout = function(data) {
        notify(opts.success)
      }
    }
    if (opts.failure) {
      recipe.stderr = function(data) {
        notify(opts.failure)
      }
    }
    return recipe
  }

}

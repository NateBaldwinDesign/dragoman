require("source-map-support").install()

exec = require("child_process").exec
spawn = require('cross-spawn-async')
merge = require("lodash.merge")
options = require("./options")

# exec #simple
exe = (cmd, opts, cb) ->
  exec cmd, opts, (err, stdout, stderr) ->
    process.stderr.write(stderr) if stderr
    if err isnt null
      console.trace JSON.stringify(err, null, 2)
    else if cb?
      cb(stdout)
    else
      process.stdout.write(stdout)

# event-handler defaults / overrides
handlers = (opts) ->
  defaults =
    stdout: (data) -> process.stdout.write(data)
    stderr: (data) -> process.stderr.write(data)
    error: (err, context) -> console.trace JSON.stringify(err, null, 2)
    close: (code, context) ->
      unless code is 0
        console.log "This `#{context.cmd}` process exited with #{code}."
  if opts?
    merge({}, defaults, opts)
  else
    defaults

# spawn #simple
run = (cmd, opts = {}) ->
  unless typeof cmd is "string"
    console.log "Expecting command string, instead got:"
    console.log cmd
    throw new Error "Wrong command type: '#{typeof cmd}'."
  cmdArgs = cmd.split /\s+/
  command = cmdArgs.shift()
  handles = handlers(opts.childish)
  context = "cmd": cmd
  chips = spawn(command, cmdArgs, opts)
  chips.stdout.on "data", (data) -> handles.stdout(data)
  chips.stderr.on "data", (data) -> handles.stderr(data)
  chips.on "error", (err) -> handles.error(err, context)
  chips.on "close", (code) -> handles.close(code, context)

index = (cmd, args...) ->
  n = args.length
  if n > 0
    if typeof args[n - 1] is "function"
      if n is 1
        exe cmd, {}, args[0]
      else
        # exe takes at most 3 arguments (here using the first & last of args)
        exe cmd, args[0], args[n - 1]
    else
      # run takes at most 2 arguments, the 2nd, options, could contain childish
      if args[0].childish?
        args[0].childish = options(args[0].childish) # special childish options
      run cmd, args[0]
  else
    run cmd

module.exports = (what, rest...) ->
  if arguments.length is 1 and typeof what is "object"
    return (cmd, args...) ->
      if args.length
        if typeof args[args.length - 1] is "function"
          # NOTE: exec ignores default options for now,
          # as it doesn't need them like spawn (more useful and favored).
          # Treating this as _YAGNI_, though it may be easy to implement...
          index.apply null, arguments
        else
          index.call null, cmd, merge({}, what, args[0])
      else
        # spawn with no options - except `what`-ever defaults
        index.call null, cmd
  else
    index.apply null, arguments

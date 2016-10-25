require("source-map-support").install()

merge = require("n-deep-merge")
path = require("path")
fs = require("fs")
isThere = require("is-there")
nocomments = require("strip-json-comments")

base = (root, relative) ->
  relative ?= true
  if relative and root?
    path.join process.cwd(), root
  else
    root || process.cwd()

read = (sources, opts) ->
  root = base opts.root, opts.relative
  objects = []
  for source in sources
    if typeof source is "object"
      objects.push source
    else if typeof source is "string"
      what = path.join(root, path.normalize(source))
      try
        if isThere what
          if /\.js$/.test(what)
            objects.push require(what)
          else
            objects.push JSON.parse(nocomments(fs.readFileSync(what).toString()))
      catch e
        console.error e
  objects

write = (data, opts) ->
  where = path.join(base(opts.root, opts.relative), path.normalize(opts.path))
  fs.writeFileSync where, JSON.stringify(data, null, 2) + "\n", opts.options
  data


module.exports = (sources = [], opts = {}) ->
  data = {}

  if sources.length > 0
    objects = read sources, opts
    if objects.length is 1
      data = objects[0]
    else
      opts.merge ?= true
      if opts.merge
        # merge mutates, js code is full of mutations / side effects
        objects.unshift {} # mutation bugs prevention - merge it all into {}
        data = merge.apply null, objects
      else
        data = objects

  if opts.write?.path?
    opts.write.root ?= opts.root
    opts.write.relative ?= opts.relative
    write data, opts.write
  else
    data

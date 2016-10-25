chai = require("chai")
chai.config.truncateThreshold = 0 # disable truncating of showDiff
chai.should()

global.assert = chai.assert
global.expect = chai.expect

global.sg = require('../index.js')

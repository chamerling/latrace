var util = require('util');

var utils = {}

utils.safe = function(fn) {
  function log(err, res) {
    if (err) return console.dir(err)
    console.log(util.inspect(res, false, null, true))
  }

  fn = fn || log
  return fn
}

module.exports = utils

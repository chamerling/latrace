/**
 * Simple API client for la-trace.com
 *
 * Copyright(c) 2013 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */
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

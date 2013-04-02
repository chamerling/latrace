/**
 * Simple API client for la-trace.com
 *
 * Copyright(c) 2013 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var _ = require('underscore');

var key = process.env.LA_TRACE_API_KEY;
var LaTrace = require('../lib/latrace').LaTrace;

var client = new LaTrace(key);

// fav the track ID 1000
client.fav(1000, function(err, result) {
  console.log('ERROR', err)
  // false result means that the track is already a fav
  // else well fav'd
  console.log('RESULT', result)
});
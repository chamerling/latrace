/**
 * Simple API client for la-trace.com
 *
 * Copyright(c) 2013 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var key = process.env.LA_TRACE_API_KEY;
var LaTrace = require('../lib/latrace').LaTrace;

var client = new LaTrace(key);

// home ;)
var options = {lat: '43.4888377', lon: '3.669251000000031'};

client.around(options, function(err, result) {
  console.log(err);
  console.log(result);
});
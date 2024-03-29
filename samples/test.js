/**
 * Simple API client for la-trace.com
 *
 * Copyright(c) 2013 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var key = process.env.LA_TRACE_API_KEY;
var LaTrace = require('../lib/latrace').LaTrace;

var client = new LaTrace(key);
client.me(function(err, result) {
  console.log('>>> Me:', result.pseudo);
  
  // get all my traces...
  client.mine(function(err, result) {
    console.log(result)
  });
});

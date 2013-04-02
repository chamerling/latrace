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

// get my traces and their points...
client.mine(function(err, result) {
  _.each(result, function(track) {
    console.log('Points for track', track.name)
    // note that this is not sync at all, points will be returned as soon as they are returned by the API and handled by node ;)
    client.points(track.id, function(err, result) {
      console.log(result);
    });
  });
});
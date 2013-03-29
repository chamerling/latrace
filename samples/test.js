// Get your API KEY at http://la-trace.com

var key = 'KEY';

var LaTrace = require('../lib/latrace').LaTrace;

var client = new LaTrace(key);
client.me(function(err, result) {
  console.log('>>> Me:', result.pseudo);
  
  // get all my traces...
  client.mine(function(err, result) {
    console.log(result)
  });
});
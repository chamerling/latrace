# Node.js Client for la-trace.com

## Usage

Get an API Key from http://la-trace.com and start getting your tracks:

    // get my tracks
    var key = 'MYKEY';
    var LaTrace = require('latrace').LaTrace;
    var client = new LaTrace(key);
    client.mine(function(err, result) {
      console.log(result)
    });

### Samples

Check them out in the *samples* folder. Set the LA\_TRACE\_API\_KEY system environment variable for immediate use...

    export LA_TRACE_API_KEY=YOURKEY 

## TODO

- Check response code and type. HTTP status can be 200 for bad requests. Need to check error in response payload...

## License 

(The MIT License)

Copyright (c) 2013 Christophe Hamerling &lt;christophe.hamerling@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
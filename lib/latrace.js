/**
 * Simple API client for la-trace.com
 *
 * Christophe Hamerling - @chamerling
 *
 */
var request = require('request')
  , utils = require('./utils');

var LaTrace = function(api_key, options) {
  if (!api_key) {
    throw new Error('api_key is required');
  }
  
  var self = this;
  this.api_key = api_key;
  this.options = options || {};
  this.apiServer = this.options.api_server || "http://api.la-trace.com/v1";
  return this;
}

exports.LaTrace = LaTrace;

/**
 * Get user profile
 *
 */
LaTrace.prototype.me = function(callback) {
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/user/me'),
    json: true,
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      callback(null, body.response);
    }
  });
}

/**
 * Get user favorites
 */
LaTrace.prototype.favorites = function(callback) {
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/favorites'),
    json: true,
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      callback(null, body.response);
    }
  });
}

/**
 * Get my traces...
 */
LaTrace.prototype.mine = function(callback) {
  callback = utils.safe(callback);
  var self = this;
  this.me(function(err, response) {
    request({
      url: self.apiServer + '/track/search?user_id=' + response.id + '&api_key=' + self.api_key,
      json: true,
    },
    function(error, res, body) {    
      if (res.statusCode !== 200) {
        callback(error, body);
      } else {
        callback(null, body.response);
      }
    });
  });
}

/**
 * Get the track from its ID
 *
 * @param id
 * @param fn
 */
LaTrace.prototype.track = function(id, callback) {
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/' + id),
    json: true,
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      callback(null, body.response);
    }
  });
}

LaTrace.prototype._makeUrl = function(url) {
  return this.apiServer + '/' + url + '?api_key=' + this.api_key;
}

exports.create = function(options) {
  return new LaTrace(options);
}
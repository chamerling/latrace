/**
 * Simple API client for la-trace.com
 *
 * Copyright(c) 2013 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */
var request = require('request')
  , qs = require('querystring')
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
    json: true
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
    json: true
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
      url: self._makeUrl('/track/search', {user_id : response.id}),
      json: true
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
    json: true
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
 * Get tracks around
 *
 * @param options (lat, lon, radius, limit, skip)
 */
LaTrace.prototype.around = function(options, callback) {
  if (!options || !options.lat || !options.lon) {
    throw new Error('lat, lon required')
  }
  
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/around/', options),
    json: true
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      // TODO : Get error from body since it can be in a 200 response
      callback(null, body.response);
    }
  });
}

/**
 * Get tracks from box coordinates.
 *
 * @param options (lat_min, lat_max, lon_min, lon_max, limit)
 */
LaTrace.prototype.bbox = function(options, callback) {
  if (!options || !options.lat || !options.lon) {
    throw new Error('lat_min, lat_max, lon_min, lon_max required')
  }
  
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/bbox/', options),
    json: true
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      // TODO : Get error from body since it can be in a 200 response
      callback(null, body.response);
    }
  });
}

/**
 * Get points from a track
 *
 * @param id, the ID of the track we want points
 */
LaTrace.prototype.points = function(id, callback) {
  if (!id) throw new Error('id is required')
  
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/' + id + '/points'),
    json: true
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      // TODO : Get error from body since it can be in a 200 response
      callback(null, body.response);
    }
  });
}

/**
 * Get user favorites tracks
 */
LaTrace.prototype.favorites = function(callback) {
  
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/favorites'),
    json: true
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      // TODO : Get error from body since it can be in a 200 response
      callback(null, body.response);
    }
  });
}

/**
 * Put a track as favorite
 */
LaTrace.prototype.fav = function(id, callback) {
  if (!id) throw new Error('id is required')
  
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/' + id + '/favorite'),
    method: 'put',
    json: true
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      // TODO : Get error from body since it can be in a 200 response
      callback(null, body.response);
    }
  });
}

LaTrace.prototype.unfav = function(id, callback) {
  if (!id) throw new Error('id is required')
  
  callback = utils.safe(callback);
  request({
    url: this._makeUrl('/track/' + id + '/favorite'),
    method: 'delete',
    json: true
  },
  function(error, response, body) {
    if (response.statusCode !== 200) {
      callback(error, body);
    } else {
      // TODO : Get error from body since it can be in a 200 response
      callback(null, body.response);
    }
  });
}

LaTrace.prototype._makeUrl = function(url, params) {
  params = params || {};
  params.api_key = this.api_key;
  return this.apiServer + url + '?' + qs.stringify(params);
}

exports.create = function(options) {
  return new LaTrace(options);
}
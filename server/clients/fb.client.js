import Promise from 'bluebird';
import Boom from 'boom';
import request from 'request-promise';

function FBClient(opts = {}) {
  if (!(this instanceof FBClient)) {
    return new FBClient(opts);
  }

  this.FB = opts.FB || {};
}

// TODO (sprada): Move this library to dependency injection
FBClient.prototype.getEvents = function(token) {
  return null;  
};
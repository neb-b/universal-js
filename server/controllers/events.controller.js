import Promise from 'bluebird';
import Boom from 'boom';

function EventController(opts = {}) {
  if (!(this instanceof EventController)) {
    return new EventController(opts);
  }

  this.User = opts.User || {};
  this.Club = opts.Club || {};
  this.Event = opts.Event || {};
}

EventController.prototype.getEvent = function getEvent(req, res, next) {
  return this.Event.findByIdAsync(req.params.id)
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.createEvent = function createEvent(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
    .then(user => this.Club.findByIdAsync(user.club))
    .then(club => {
      if(!club){
        return Promise.reject(Boom.preconditionFailed('You need to register a club to create events'));
      }

      return Promise.all([ club, this.Event.createAndSave(req.body) ]);
    })
    .spread((club, newEvent) => {
      club.events.push(newEvent._id);
      return Promise.all([ club.saveAsync(), newEvent ])
    })
    .spread((club, newEvent) => res.send(newEvent))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.updateEvent = function updateEvent(req, res, next) {
  return this.Event.findByIdAndUpdateAsync(req.params.id, req.body, { new: true })
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.getFBEvent = function getFBEvent(req, res, next) {
  // body...
};

EventController.prototype.purchaseTicket = function purchaseTicket(req, res, next) {
  // body...
};

export default EventController;

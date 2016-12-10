import Promise from 'bluebird';
import Boom from 'boom';

function EventController(opts = {}) {
  if (!(this instanceof EventController)) {
    return new EventController(opts);
  }

  this.User = opts.User || {};
  this.Venue = opts.Venue || {};
  this.Event = opts.Event || {};
}

EventController.prototype.getEvent = function getEvent(req, res, next) {
  return this.Event.findByIdAsync(req.params.id)
    .then(event => res.send(event))
    .catch(() => next(Boom.notFound('Event not found')));
};

EventController.prototype.createEvent = function createEvent(req, res, next) {
    return this.User.findByIdAsync(req.user.id))
    .then(user => this.Venue.findByIdAsync(user.venue))
    .then(venue => {
      if(!dbVenue){
        return Promise.reject(Boom.preconditionFailed('You need to register a venue to create events'));
      }

      return Promise.all([ venue, this.Event.createAndSave(req.body) ]);
    })
    .spread((venue, newEvent) => {
      venue.createdEvents.push(newEvent._id);
      return Promise.all([ venue.saveAsync(), newEvent ])
    })
    .spread((venue, newEvent) => res.send(newEvent))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.updateEvent = function updateEvent(req, res, next) {
  return this.Event.findByIdAndUpdateAsync(req.params.id, req.body, { new: true })
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.deleteEvent = function deleteEvent(req, res, next) {
  return this.Event.findByIdAndRemoveAsync(req.params.id)
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};


export default EventController;

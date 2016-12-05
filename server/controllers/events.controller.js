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
  return this.Event.findById(req.params.id)
    .exec()
    .then(event => res.send(event))
    .catch(() => next(Boom.notFound('Event not found')));
};

EventController.prototype.searchEvents = function getEvents(req, res, next) {
  return this.Event.find()
    .exec()
    .then(events => res.send(events))
    .catch(() => next(Boom.notFound('No events found')));
};

EventController.prototype.createEvent = function createEvent(req, res, next) {
  let user, venue;

  return this.validateInput(req.body)
    .then(params => this.User.findById(req.user.id).exec())
    .then(dbUser => {
      user = dbUser;
      return this.Venue.findById(user.venue).exec();
    })
    .then(dbVenue => {
      if(!dbVenue){
        return Boom.preconditionFailed('You need to register a venue to create events');
      }

      venue = dbVenue;
      return venue.createdEvents.create(req.body);
    })
    .then(newEvent => res.send(newEvent))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.updateEvent = function updateEvent(req, res, next) {
  return this.Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.deleteEvent = function deleteEvent(req, res, next) {
  return this.Event.findByIdAndRemove(req.params.id)
    .exec()
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.validateInput = Promise.method(function validateInput({ name }) {
  if(!name){
    throw Boom.badRequest('name parameter is required to create event');
  }

  return { name };
});

export default EventController;

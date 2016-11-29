import Promise from 'bluebird';
import Boom from 'boom';

function EventController(opts = {}) {
  if (!(this instanceof EventController)) {
    return new EventController(opts);
  }

  this.Event = opts.Event || {};
}

EventController.prototype.getEvent = function getEvent(req, res, next) {
  return Promise.resolve(this.Event.findById(req.params.id))
    .then(event => res.send(event))
    .catch(() => next(Boom.notFound('Event not found')));
};

EventController.prototype.searchEvents = function getEvents(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.Event.find())
    .then(events => res.send(events))
    .catch(() => next(Boom.notFound('No events found')));
};

EventController.prototype.createEvent = function createEvent(req, res, next) {
  return this.validateInput(req.body)
    .then(params => this.Event.createAndSave(params))
    .then(newEvent => res.send(newEvent))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.updateEvent = function updateEvent(req, res, next) {
  return Promise.resolve(this.Event.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.deleteEvent = function deleteEvent(req, res, next) {
  return Promise.resolve(this.Event.findByIdAndRemove(req.params.id))
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

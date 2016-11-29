import Promise from 'bluebird';
import Boom from 'boom';

function VenueController(opts = {}) {
  if (!(this instanceof VenueController)) {
    return new VenueController(opts);
  }

  this.Venue = opts.Venue || {};
}

VenueController.prototype.getVenues = function getVenues(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.Venue.find())
    .then(venues => res.send(venues))
    .catch(() => next(Boom.notFound('No venues found')));
};

VenueController.prototype.getProfile = function getProfile(req, res, next) {
  return Promise.resolve(this.Venue.find())
    .then(venue => res.send(venue))
    .catch(err => next(Boom.notFound('No venue found')));
};

VenueController.prototype.getVenue = function getVenue(req, res, next) {
  return Promise.resolve(this.Venue.findById(req.params.id))
    .then(venue => res.send(venue))
    .catch(() => next(Boom.notFound('Venue not found')));
};

VenueController.prototype.createVenue = function createVenue(req, res, next) {
  return this.validateInput(req.body)
    .then(params => this.Venue.createAndSave(params))
    .then(newVenue => res.send(newVenue))
    .catch(err => {
      console.log(err);
      next(Boom.wrap(err))
    });
};

VenueController.prototype.login = function login(req, res, next) {
  // body...
};

VenueController.prototype.updateVenue = function updateVenue(req, res, next) {
  return Promise.resolve(this.Venue.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(venue => res.send(venue))
    .catch(err => next(Boom.wrap(err)));
};

VenueController.prototype.deleteVenue = function deleteVenue(req, res, next) {
  return Promise.resolve(this.Venue.findByIdAndRemove(req.params.id))
    .then(venue => res.send(venue))
    .catch(err => next(Boom.wrap(err)));
};

VenueController.prototype.validateInput = Promise.method(function validateInput({ name }) {
  if(!name){
    throw Boom.badRequest('Name parameter is required to create venue');
  }

  return { name };
});

export default VenueController;

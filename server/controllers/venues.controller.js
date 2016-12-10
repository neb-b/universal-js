import Promise from 'bluebird';
import Boom from 'boom';

function VenueController(opts = {}) {
  if (!(this instanceof VenueController)) {
    return new VenueController(opts);
  }

  this.Venue = opts.Venue || {};
}

VenueController.prototype.getVenue = function getVenue(req, res, next) {
  return this.Venue.findByIdAsync(req.params.id)
    .then(venue => res.send(venue))
    .catch(() => next(Boom.notFound('Venue not found')));
};

VenueController.prototype.createVenue = function createVenue(req, res, next) {
    return this.Venue.createAndSave(params))
    .then(newVenue => res.send(newVenue))
    .catch(err => next(Boom.wrap(err)));
};

VenueController.prototype.updateVenue = function updateVenue(req, res, next) {
  return this.Venue.findByIdAndUpdateAsync(req.params.id, req.body, { new: true })
    .then(venue => res.send(venue))
    .catch(err => next(Boom.wrap(err)));
};

VenueController.prototype.deleteVenue = function deleteVenue(req, res, next) {
  return this.Venue.findByIdAndRemoveAsync(req.params.id)
    .then(venue => res.send(venue))
    .catch(err => next(Boom.wrap(err)));
};

export default VenueController;

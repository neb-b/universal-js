import Promise from 'bluebird';
import Boom from 'boom';

function ClubController(opts = {}) {
  if (!(this instanceof ClubController)) {
    return new ClubController(opts);
  }

  this.Club = opts.Club || {};
}

ClubController.prototype.getClub = function getClub(req, res, next) {
  return this.Club.findByIdAsync(req.params.id)
    .then(club => res.send(club))
    .catch(() => next(Boom.notFound('Club not found')));
};

ClubController.prototype.createClub = function createClub(req, res, next) {
    return this.Club.createAndSave(params))
    .then(newClub => res.send(newClub))
    .catch(err => next(Boom.wrap(err)));
};

ClubController.prototype.updateClub = function updateClub(req, res, next) {
  return this.Club.findByIdAndUpdateAsync(req.params.id, req.body, { new: true })
    .then(club => res.send(club))
    .catch(err => next(Boom.wrap(err)));
};

ClubController.prototype.deleteClub = function deleteClub(req, res, next) {
  return this.Club.findByIdAndRemoveAsync(req.params.id)
    .then(club => res.send(club))
    .catch(err => next(Boom.wrap(err)));
};

export default ClubController;

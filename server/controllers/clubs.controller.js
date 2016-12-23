import Promise from 'bluebird';
import Boom from 'boom';

class ClubController {
  constructor({ User, Club, Event } = {}) {
    this.User = User || {};
    this.Club = Club || {};
    this.Event = Event || {};
  }

  getClub(req, res, next) {
    return this.Club.findById(req.params.id)
      .populate('events')
      .execAsync()
      .then(club => res.send(club))
      .catch(err => next(Boom.wrap(err)));
  }

  createClub(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
      .then(user => {
        return Promise.props({
          user,
          club: this.Club.createAndSave(req.body)
        });
      })
      .then(({ user, club }) => {
        user.club = club._id;

        return user.saveAsync()
      })
      .then(user => res.send(user))
      .catch(err => next(Boom.wrap(err)));
  }

  updateClub(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
      .then(user => this.Club.findByIdAndUpdateAsync(user.club, req.body, { new: true }))
      .then(club => res.send(club))
      .catch(err => next(Boom.wrap(err)));
  }

  getPendingClubs(req, res, next) {
    return this.Club.findAsync({ pending: true })
      .then(clubs => res.send(clubs))
      .catch(err => next(Boom.wrap(err)));
  }
}

export default ClubController;

import Promise from 'bluebird';
import Boom from 'boom';

function UserController(opts = {}) {
  if (!(this instanceof UserController)) {
    return new UserController(opts);
  }

  this.User = opts.User || {};
  this.Venue = opts.Venue || {};
  this.Event = opts.Event || {};
}

UserController.prototype.searchUser = function searchUser(req, res, next) {
  // Queries are not promises.
  return this.User.find()
    .exec()
    .then(users => res.send(users))
    .catch(() => next(Boom.notFound('No users found')));
};

UserController.prototype.getProfile = function getProfile(req, res, next) {
  return this.User.findById(req.params.id)
    .exec()
    .then(user => res.send(user))
    .catch(err => next(Boom.notFound('No user found')));
};

UserController.prototype.getUser = function getUser(req, res, next) {
  return this.User.findById(req.params.id)
    .exec()
    .then(user => res.send(user))
    .catch(() => next(Boom.notFound('User not found')));
};

UserController.prototype.updateUser = function updateUser(req, res, next) {
  return this.User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.addVenue = function addVenue(req, res, next) {
  const fb_id = req.user.fb_id;

  return this.User.findOne({ fb_id })
    .exec()
    .then(user => {
      return Promise.props({
        user,
        venue: this.Venue.createAndSave(req.params)
      });
    })
    .then(({ user, venue }) => {
      user.venue = venue._id;

      return user.save().exec()
    })
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.getVenue = function getVenue(req, res, next) {
  return this.User.findById(req.params.id)
    .populate('venue')
    .exec()
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.loginOrRegisterVenue = function loginOrRegisterVenue(req, res, next) {
  // body...
};

UserController.prototype.loginCallback = function(req, res, next) {
  // body...
};

UserController.prototype.protected = function(req, res, next) {
  return res.send('TOP SECRET');
};

export default UserController;

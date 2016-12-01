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
  return Promise.resolve(this.User.find())
    .then(users => res.send(users))
    .catch(() => next(Boom.notFound('No users found')));
};

UserController.prototype.getProfile = function getProfile(req, res, next) {
  return Promise.resolve(this.User.findById(req.params.id))
    .then(user => res.send(user))
    .catch(err => next(Boom.notFound('No user found')));
};

UserController.prototype.getUser = function getUser(req, res, next) {
  return Promise.resolve(this.User.findById(req.params.id))
    .then(user => res.send(user))
    .catch(() => next(Boom.notFound('User not found')));
};

UserController.prototype.updateUser = function updateUser(req, res, next) {
  return Promise.resolve(this.User.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.addVenue = function addVenue(req, res, next) {
  const fb_id = req.user.fb_id;

  return Promise.resolve(this.User.find({ fb_id }))
    .then(user => {
      return Promise.props({
        user,
        venue: this.Venue.createAndSave(req.params)
    })
    .then(({ user, venue }) => {
      user.venue = venue._id;
      return user.save().exec()
    })
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

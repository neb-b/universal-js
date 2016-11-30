import Promise from 'bluebird';
import Boom from 'boom';

function UserController(opts = {}) {
  if (!(this instanceof UserController)) {
    return new UserController(opts);
  }

  this.User = opts.Venue || {};
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
    .catch(() => next(Boom.notFound('Venue not found')));
};

UserController.prototype.createUser = function createUser(req, res, next) {
  return this.validateInput(req.body)
    .then(params => this.User.createAndSave(params))
    .then(newUser => res.send(newUser))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.updateUser = function updateUser(req, res, next) {
  return Promise.resolve(this.User.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.deleteUser = function deleteUser(req, res, next) {
  return Promise.resolve(this.User.findByIdAndRemove(req.params.id))
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.validateInput = Promise.method(function validateInput({ name }) {
  if(!name){
    throw Boom.badRequest('Name parameter is required to create user');
  }

  return { name };
});

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

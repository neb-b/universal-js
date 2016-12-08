import Promise from 'bluebird';
import Boom from 'boom';
import _ from 'lodash';

import FB from 'fbgraph';
Promise.promisifyAll(FB);

function UserController(opts = {}) {
  if (!(this instanceof UserController)) {
    return new UserController(opts);
  }

  this.User = opts.User || {};
  this.Venue = opts.Venue || {};
  this.Event = opts.Event || {};
}

UserController.prototype.searchUser = function searchUser(req, res, next) {
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
  // TODO (sprada): Add check for admin users
  return this.User.findById(req.user.id)
    .exec()
    .then(user => {
      return Promise.props({
        user,
        venue: this.Venue.createAndSave(req.body)
      });
    })
    .then(({ user, venue }) => {
      user.venue = venue._id;

      return user.save()
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

UserController.prototype.dashBoard = function dashBoard(req, res, next) {
  return this.User.findById(req.user.id)
    .populate('venue')
    .exec()
    .then(user => {
      FB.setAccessToken(user.token);
      return Promise.props({
        user,
        pages: FB.getAsync('me/accounts')
      });
    })
    .then(({ user, pages }) => {
      return Promise.props({
        user,
        pages: pages.data,
        events: Promise.all(_.map(pages.data, page => FB.getAsync(`${page.id}/events`)))
      });
    })
    .then(({ user, pages, events }) => {
      let entity = {
        user,
        pages: _.map(pages, (page, i) => _.assign({}, page, { events: events[i].data }))
      };

      res.send(entity);
    })
    .catch(err => res.send(err));
};

UserController.prototype.getFBEvent = function(req, res, next) {
  return this.User.findById(req.user.id)
    .exec()
    .then(user => {
      FB.setAccessToken(user.token);
      return FB.getAsync(req.params.id)
    })
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.protected = function(req, res, next) {
  return res.send('TOP SECRET');
};

export default UserController;

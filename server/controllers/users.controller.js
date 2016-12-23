import Promise from 'bluebird';
import Boom from 'boom';
import _ from 'lodash';

import FB from 'fbgraph';
Promise.promisifyAll(FB);

class UserController {
  constructor({ User, Club, Event } = {}) {
    this.User = User || {};
    this.Club = Club || {};
    this.Event = Event || {};
  }

  getUser(req, res, next) {
    return this.User.findById(req.user.id)
      .populate('club')
      .execAsync()
      .then(user => res.send(user))
      .catch((err) => next(Boom.wrap(err)));
  }

  updateUser(req, res, next) {
    return this.User.findByIdAndUpdateAsync(req.user.id, req.body, { new: true })
      .then(user => res.send(user))
      .catch(err => next(Boom.wrap(err)));
  }

  getDashboard(req, res, next) {
    let pages, user;

    return this.User.findById(req.user.id)
      .populate('club')
      .execAsync()
      .then(dbUser => {
        user = dbUser;
        FB.setAccessToken(user.token);

        return FB.getAsync('me/accounts')
      })
      .then(fbPages => {
        pages = fbPages.data;

        return Promise.all(_.map(pages, page => FB.getAsync(`${page.id}/events`)))
      })
      .then(events => {
        let entity = {
          user,
          pages: _.map(pages, (page, i) => _.assign({}, page, { events: events[i].data }))
        };

        return res.send(entity);
      })
      .catch(err => next(Boom.wrap(err)));
  }
}

export default UserController;

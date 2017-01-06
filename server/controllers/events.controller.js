import Promise from 'bluebird';
import Boom from 'boom';
import _ from 'lodash';

import FB from 'fbgraph';
Promise.promisifyAll(FB);

class EventController {
  constructor({ User, Club, Event } = {}) {
    this.User = User || {};
    this.Club = Club || {};
    this.Event = Event || {};
  }

  getEvent(req, res, next) {
    return this.Event.findByIdAsync(req.params.id)
      .then(event => res.send(event))
      .catch(err => next(Boom.wrap(err)));
  };

  getEvents(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
      .then(user => this.Club.findById(user.club).populate('events').execAsync()
      .then(club => res.send(club))
      .catch(err => next(Boom.wrap(err)));
  };

  createEvent(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
      .then(user => this.Club.findByIdAsync(user.club))
      .then(club => {
        if(!club){
          return Promise.reject(Boom.preconditionFailed('You need to register a club to create events'));
        }

        return Promise.all([ club, this.Event.createAndSave(req.body) ]);
      })
      .spread((club, newEvent) => {
        club.events.push(newEvent._id);
        return Promise.all([ club.saveAsync(), newEvent ])
      })
      .spread((club, newEvent) => res.send(newEvent))
      .catch(err => next(Boom.wrap(err)));
  }

  updateEvent(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
      .then(user => this.Club.findByIdAsync(user.club))
      .then(club => {
        if(!club){
          return Promise.reject(Boom.preconditionFailed('You need to register a club to edit events'));
        }

        return Promise.all([
          club.events.indexOf(req.params.id),
          club
        ]);
      })
      .spread((eventIndex, club) => {
        if(eventIndex === -1){
          return Promise.reject(Boom.preconditionFailed('No event with that id in your club'));
        }

        return this.Event.findByIdAndUpdateAsync(club.events[eventIndex], req.body, { new: true })
      })
      .then(event => res.send(event))
      .catch(err => next(Boom.wrap(err)));
  };

  getFBEvent(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
      .then(user => {
        FB.setAccessToken(user.token);

        return Promise.props({
          data: FB.getAsync(`${req.params.id}`),
          cover: FB.getAsync(`${req.params.id}?fields=cover`)
        });
      })
      .then(info => res.send(info))
      .catch(err => next(Boom.wrap(err)));
  };

  purchaseTicket(req, res, next) {
    // body...
  }

}

export default EventController;

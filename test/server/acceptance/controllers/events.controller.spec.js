import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';
import FB from 'fbgraph';
import mongoose from 'mongoose';
import { expect } from 'chai';
import Promise from 'bluebird';

import User from '../../../../server/models/user.model';
import Club from '../../../../server/models/club.model';
import Event from '../../../../server/models/event.model';
import EventController from '../../../../server/controllers/events.controller';

import db from '../helpers/db.init';
import config from '../helpers/config';
import eventsTestData from './eventsTestData';

describe('EventController', () => {
  let controller, mockUser, mockEvent, mockClub;
  before((done) => {
    // Mongo instance
    db(config.mongoUrl);

    td.config({ promiseConstructor: Promise });

    controller = new EventController({ User, Club, Event });
    done();
  });

  beforeEach(() => {
    let club = new Club({ name: 'test-club-name' });
    let user = new User({ name: 'test-user-name' });
    let event = new Event({ name: 'test-event' });

    return Promise.all([
      club.saveAsync(),
      user.saveAsync(),
      event.saveAsync()
    ])
      .spread((dbClub, dbUser, dbEvent) => {
        mockClub = dbClub;
        mockUser = dbUser;
        mockEvent = dbEvent;
      });
  });

  afterEach(() => {
    td.reset();

    return Promise.all([
      Club.removeAsync(),
      User.removeAsync(),
      Event.removeAsync()
    ]);
  });

  after((done) => {
    mongoose.disconnect();
    done();
  });

  context('getEvent', () => {
    it('returns event by id', (done) => {
      let mockRequest = { params: { id: mockEvent._id } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value._id).to.deep.equal(mockEvent._id);
          expect(capture.value.name).to.equal(mockEvent.name);
          done();
        });

      controller.getEvent(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockRequest = { params: { id: 'bad-id' } };
      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.be.true;
          done();
        });

      controller.getEvent(mockRequest, _.noop, mockNext);
    });
  });

  context('createEvent', () => {
    it('returns created event', (done) => {
      let mockRequest = { user: { id: mockUser._id }, body: { name: 'test-party' } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value.name).to.equal(mockRequest.body.name);
          return Club.findByIdAsync(mockClub._id)
            .then(club => {
              expect(club.events).to.an.array;
              expect(club.events).to.have.length(1);
              expect(club.events[0]).to.deep.equal(capture.value._id);
              done();
            });
        });

      mockUser.club = mockClub._id;

      mockUser.saveAsync()
        .then(() => {
          controller.createEvent(mockRequest, mockResponse, _.noop);
        });
    });

    it('rejects for a user with no club', (done) => {
      let mockNext = td.function();
      let mockError = Boom.preconditionFailed('You need to register a club to create events');
      let mockUser = new User({ name: 'sean' });

      td.when(mockNext(mockError))
        .thenDo(() => { done() });

      mockUser.saveAsync()
        .then(user => {
          let mockRequest = { user: { id: mockUser._id }, body: { name: 'test-party' } };
          controller.createEvent(mockRequest, _.noop, mockNext);
        });
    });

    it('handles other errors', (done) => {
      let mockRequest = { user: { id: 'bad-id' }, body: { name: 'test-party' } };
      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.be.true;
          done();
        });

      controller.createEvent(mockRequest, _.noop, mockNext);
    });
  });

  context('updateEvent', () => {
    it('returns event edited', (done) => {
      let mockRequest = {
        user: { id: mockUser._id },
        params: { id: mockEvent._id },
        body: { name: 'test-new-name' }
      };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value.name).to.equal(mockRequest.body.name);
          expect(capture.value._id).to.deep.equal(mockEvent._id);
          done();
        });

      mockUser.club = mockClub._id;
      mockClub.events.push(mockEvent._id);

      Promise.all([
        mockUser.saveAsync(),
        mockClub.saveAsync()
      ])
        .then(() => {
          controller.updateEvent(mockRequest, mockResponse, _.noop);
        });
    });

    it('rejects if user has no club', (done) => {
      let mockNext = td.function();
      let mockUser = new User({ name: 'sean' });
      let mockError = Boom.preconditionFailed('You need to register a club to edit events');

      td.when(mockNext(mockError))
        .thenDo(() => { done() });

      mockUser.saveAsync()
        .then(user => {
          let mockRequest = {
            user: { id: user._id },
            params: { id: 'test-event-id' },
            body: { name: 'test-name'}
          };
          controller.updateEvent(mockRequest, _.noop, mockNext);
        });
    });

    it('rejects if user has no event with that id', (done) => {
      let mockNext = td.function();
      let mockEvent = new Event({ name: 'sean' });
      let mockError = Boom.preconditionFailed('No event with that id in your club');

      td.when(mockNext(mockError))
        .thenDo(() => { done() });

      mockUser.club = mockClub._id;

      Promise.all([
        mockUser.saveAsync(),
        mockEvent.saveAsync()
      ])
        .spread((user, event) => {
          let mockRequest = {
            user: { id: user._id },
            params: { id: event._id },
            body: { name: 'test-name'}
          };
          controller.updateEvent(mockRequest, _.noop, mockNext);
        });
    });

    it('handles server errors', (done) => {
      let mockRequest = { user: { id: 'bad-id' }, body: { name: 'test-party' } };
      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.be.true;
          done();
        });

      controller.updateEvent(mockRequest, _.noop, mockNext);
    });
  });

  context('getFBEvent', () => {
    it('gets event info', (done) => {
      let mockRequest = { user: { id: mockUser._id }, params: { id: 'test-id' } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.replace(FB, 'getAsync');
      td.when(FB.getAsync('test-id'))
        .thenResolve(eventsTestData.getFBEvent.data);

      td.when(FB.getAsync('test-id?fields=cover'))
        .thenResolve(eventsTestData.getFBEvent.cover);

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value).to.deep.equal(eventsTestData.getFBEvent);
          done();
        });

      controller.getFBEvent(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockRequest = { user: { id: mockUser._id }, params: { id: 'bad-id' } };
      let mockNext = td.function();
      let mockError = new Error('test-error');
      let capture = td.matchers.captor();

      td.replace(FB, 'getAsync');
      td.when(FB.getAsync('bad-id'))
        .thenReject(mockError);

      td.when(FB.getAsync('bad-id?fields=cover'))
        .thenReject(mockError);

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.be.true;
          done();
        });

      controller.getFBEvent(mockRequest, _.noop, mockNext);
    });
  });

  context.skip('purchaseTicket', () => {});
});
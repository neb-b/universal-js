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
import ClubController from '../../../../server/controllers/clubs.controller';

import db from '../helpers/db.init';
import config from '../helpers/config';
import usersTestData from './usersTestData';


describe('ClubController', () => {
  let controller, mockClub, mockUser;

  before((done) => {
    // Mongo instance
    db(config.mongoUrl);

    controller = new ClubController({ User, Club, Event });
    done();
  });

  afterEach(() => td.reset());

  beforeEach(() => {
    let club = new Club({ name: 'test-club-name' });
    let user = new User({ name: 'test-user-name' });

    return Promise.all([club.saveAsync(), user.saveAsync()])
      .spread((dbClub, dbUser) => {
        mockClub = dbClub;
        mockUser = dbUser;
      });
  });

  afterEach((done) => {
    td.reset();

    Club.removeAsync()
      .then(() => {
        done();
      });
  });

  after((done) => {
    mongoose.disconnect();
    done();
  })

  context('getClub', () => {
    it('returns club by id with no events', (done) => {
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: mockClub._id } };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value._id).to.deep.equal(mockClub._id);
          expect(capture.value.name).to.equal(mockClub.name);
          expect(capture.value.events).to.be.empty;
          done()
        });

      controller.getClub(mockRequest, mockResponse, _.noop);
    });

    it('populates events', (done) => {
      let event = new Event({ name: 'test-event' });
      let mockEvent;
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: mockClub._id } };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value._id).to.deep.equal(mockClub._id);
          expect(capture.value.name).to.equal(mockClub.name);
          expect(capture.value.events[0]._id).to.deep.equal(mockEvent._id);
          expect(capture.value.events[0].name).to.deep.equal(mockEvent.name);
          done()
        });

      event.saveAsync()
        .then(dbEvent => {
          mockEvent = dbEvent;
          mockClub.events.push(mockEvent._id);
          return mockClub.saveAsync()
        })
        .then(club => {
          controller.getClub(mockRequest, mockResponse, _.noop);
        });
    });

    it('handles server error', (done) => {
      let mockNext = td.function();
      let mockRequest = { params: { id: 'bad-id' } };
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.equal(true);
          done();
        });

      controller.getClub(mockRequest, _.noop, mockNext);
    });
  });

  context('createClub', () => {
    it('returns created club', (done) => {
      let mockRequest = { user: { id: mockUser._id }, body: { name: 'test-club-name-created' } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value._id).to.deep.equal(mockUser._id);
          expect(capture.value.name).to.equal(mockUser.name);
          expect(capture.value.club).to.not.be.undefined;
          done();
        });

      controller.createClub(mockRequest, mockResponse, _.noop);
    });

    it('handles server error', (done) => {
      let mockRequest = { user: { id: 'bad-id' }, body: { name: 'test-club-name-created' } };
      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.be.true;
          done();
        });

      controller.createClub(mockRequest, _.noop, mockNext);
    });
  });

  context('updateClub', () => {
    it('returns the updated club', (done) => {
      let mockRequest = { user: { id: mockUser._id }, body: { name: 'test-updated-name' } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value._id).to.deep.equal(mockClub._id);
          expect(capture.value.name).to.equal(mockRequest.body.name);
          done();
        });
      
      mockUser.club = mockClub._id

      mockUser.saveAsync()
        .then(user => {
          controller.updateClub(mockRequest, mockResponse, _.noop);
        })
        .catch(e => {
          throw new Error('Should not get here');
        });
    });

    it('handles server error', (done) => {
      let mockRequest = { user: { id: 'bad-id' }, body: { name: 'test-club-name-updated' } };
      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.be.true;
          done();
        });

      controller.updateClub(mockRequest, _.noop, mockNext);
    });
  });

  context('getPendingClubs', () => {
    it('returns the list of pending clubs', (done) => {
      let mockRequest = { user: { id: 'test-id' } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      let mockClubOne = new Club({ name: 'club-one', pending: true });
      let mockClubTwo = new Club({ name: 'club-one', pending: true });
      let mockClubThree = new Club({ name: 'club-one', pending: true });

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value).to.have.length(3);
          expect(capture).to.be.array;
          done();
        });

      Promise.all([
        mockClubOne.saveAsync(),
        mockClubTwo.saveAsync(),
        mockClubThree.saveAsync()
      ])
        .then(clubs => {
          controller.getPendingClubs(mockRequest, mockResponse, _.noop);
        })
        .catch(e => {
          throw new Error('Should not get here');
        })
    });

    it('returns the empty list if there are no pending clubs', (done) => {
      let mockRequest = { user: { id: 'test-id' } };
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value).to.have.length(0);
          expect(capture).to.be.array;
          done();
        });

      controller.getPendingClubs(mockRequest, mockResponse, _.noop);
    });
  });
});
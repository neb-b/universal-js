import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';
import FB from 'fbgraph';
import mongoose from 'mongoose';
import { expect } from 'chai';

import UserController from '../../../../server/controllers/users.controller';
import User from '../../../../server/models/user.model';
import Club from '../../../../server/models/club.model';
import Event from '../../../../server/models/event.model';

import db from '../helpers/db.init';
import config from '../helpers/config';

describe('UserController', () => {
  let controller;
  let mockUser
  before((done) => {
    // Mongo instance
    db(config.mongoUrl);
    
    controller = new UserController({ User, Club, Event });
    done();
  });

  beforeEach((done) => {
    let user = new User({ name: 'test-user' });
    user.save()
      .then(dbUser => {
        mockUser = dbUser;
        done();
      });
  });

  afterEach((done) => {
    td.reset();

    User.removeAsync()
      .then(() => {
        done();
      });
  });

  context('getUser', () => {
    it('returns user back from serialized logged in user', (done) => {
      let mockRequest = { user: { id: mockUser._id }};
      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          // TODO(sprada): `_.id` an object ? INVESTIGATE!
          // non-deep-equal is failing && typeof returns object
          expect(capture.value._id).to.deep.equal(mockUser._id);
          expect(capture.value.name).to.equal(mockUser.name);
          done()
        });

      controller.getUser(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockRequest = { user: { id: 'bad-id' }};
      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.equal(true);
          done()
        });

      controller.getUser(mockRequest, _.noop, mockNext);
    });
  });

  context('updateUser', () => {
    it('returns updated user', (done) => {
      let mockRequest = {
        user: { id: mockUser._id },
        body: { email: 'test@test.com' }
      };

      let mockResponse = { send: td.function() };
      let capture = td.matchers.captor();

      td.when(mockResponse.send(capture.capture()))
        .thenDo(() => {
          expect(capture.value.email).to.equal('test@test.com')
          done()
        });

      controller.updateUser(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockRequest = {
        user: { id: 'bad-id' },
        body: { email: 'test@test.com' }
      };

      let mockNext = td.function();
      let capture = td.matchers.captor();

      td.when(mockNext(capture.capture()))
        .thenDo(() => {
          expect(capture.value.isBoom).to.equal(true);
          done();
        });

      controller.updateUser(mockRequest, _.noop, mockNext);
    });
  });

  context('dashBoard', () => {
    it('it returns all data from logged in user', () => {});

    it('handles errors', () => {});
  });
});
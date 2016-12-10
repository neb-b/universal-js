import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';

import UserController from '../../../server/controllers/users.controller';

describe('UserController', () => {
  let controller;

  before(() => controller = new UserController());
  afterEach(() => td.reset());

  context('getUser', () => {
    it('returns user back from serialized logged in user', (done) => {
      let mockResponse = { send: td.function() };
      let mockRequest = { user: { id: 'test-id' } };
      let mockUser = {
        name: 'sean',
        id: 'test-id',
        foo: 'bar'
      };

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-id'))
        .thenResolve(mockUser);

      td.when(mockResponse.send(mockUser))
        .thenDo(() => { done() });

      controller.getUser(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockNext = td.function();
      let mockRequest = { user: { id: 'test-id' } };
      let mockError = new Error('test-error');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-id'))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.getUser(mockRequest, _.noop, mockNext);
    });
  });

  // getUser
  // updateUser

  context('updateUser', () => {
    it('returns updated user', (done) => {
      let mockUser = { "name": "test-name" };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        user: { id: 'test-id' },
        body: { "name": "test-name" }
      };
      
      controller.User = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.User.findByIdAndUpdateAsync(mockRequest.user.id, mockRequest.body, { new: true }))
        .thenResolve(mockUser);

      td.when(mockResponse.send(mockUser)).thenDo(() => done());

      controller.updateUser(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockNext = td.function();
      let mockError = new Error('test-error');
      let mockRequest = {
        user: { id: 'test-id' },
        body: { "name": "test-name" }
      };

      controller.User = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.User.findByIdAndUpdateAsync(mockRequest.user.id, mockRequest.body, { new: true }))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.updateUser(mockRequest, _.noop, mockNext);
    });
  });
});